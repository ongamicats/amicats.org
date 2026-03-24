import {
    Children,
    cloneElement,
    isValidElement,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react"
import { AnteriorButton } from "./button/anterior"
import { ProximoButton } from "./button/proximo"
import type {
    ComponentColor,
    ComponentShape,
} from "@/components/layout/shared/types/types.constants"
import type { ReactElement, ReactNode } from "react"
import { cn } from "@/components/layout/shared/helpers/class.helper"

const TRANSITION_MS = 300
const AUTO_PLAY_MS = 4000
const USER_PAUSE_MS = 6000
const SWIPE_THRESHOLD_PX = 40

function useResponsiveVisibleCards(override?: number): number {
    const getDefault = () => {
        if (typeof window === "undefined") return 1
        if (window.matchMedia("(orientation: landscape) and (max-height: 500px)").matches) return 3
        if (window.matchMedia("(min-width: 768px)").matches) return 4
        return 1
    }

    const [cards, setCards] = useState<number>(() => override ?? getDefault())

    useEffect(() => {
        if (override !== undefined) {
            setCards(override)
            return
        }
        const mqLandscape = window.matchMedia("(orientation: landscape) and (max-height: 500px)")
        const mqDesktop = window.matchMedia("(min-width: 768px)")
        const update = () => {
            if (mqLandscape.matches) setCards(3)
            else if (mqDesktop.matches) setCards(4)
            else setCards(1)
        }
        mqLandscape.addEventListener("change", update)
        mqDesktop.addEventListener("change", update)
        return () => {
            mqLandscape.removeEventListener("change", update)
            mqDesktop.removeEventListener("change", update)
        }
    }, [override])

    return cards
}

export interface GatosCarouselProps {
    children: ReactNode
    visibleCards?: number
    buttonShape?: ComponentShape
    buttonColor?: ComponentColor
    peekFraction?: number
    className?: string
}

export function GatosCarousel({
    children,
    visibleCards: visibleCardsProp,
    buttonShape = "circle",
    buttonColor = "primary",
    peekFraction = 0.2,
    className,
}: GatosCarouselProps) {
    const visibleCards = useResponsiveVisibleCards(visibleCardsProp)

    const containerRef = useRef<HTMLDivElement>(null)
    const sliderRef = useRef<HTMLDivElement>(null)
    const [containerWidth, setContainerWidth] = useState(0)
    const [currentIndex, setCurrentIndex] = useState(() => visibleCards)
    const [animate, setAnimate] = useState(false)
    const lockRef = useRef(false)
    const prevVisibleRef = useRef(visibleCards)
    const autoPlayPausedRef = useRef(false)
    const pauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const navigateRef = useRef<(direction: 1 | -1) => void>(() => {})
    const handleUserNavigateRef = useRef<(direction: 1 | -1) => void>(() => {})

    const realCards = Children.toArray(children)
    const realCount = realCards.length
    const cloneCount = visibleCards

    const allItems: Array<ReactNode> = [
        ...realCards
            .slice(realCount - cloneCount)
            .map((child, i) =>
                isValidElement(child)
                    ? cloneElement(child as ReactElement<{ key?: string }>, {
                          key: `pre-clone-${i}`,
                      })
                    : child
            ),
        ...realCards,
        ...realCards
            .slice(0, cloneCount)
            .map((child, i) =>
                isValidElement(child)
                    ? cloneElement(child as ReactElement<{ key?: string }>, {
                          key: `post-clone-${i}`,
                      })
                    : child
            ),
    ]

    const cardWidth =
        containerWidth > 0
            ? containerWidth / (visibleCards + 2 * peekFraction)
            : 0
    const peekWidth = cardWidth * peekFraction
    const peekPct =
        containerWidth > 0 ? (peekWidth / containerWidth) * 100 : 0

    const getTranslateX = (index: number) => -(index * cardWidth) + peekWidth

    useEffect(() => {
        const el = containerRef.current
        if (!el) return
        const ro = new ResizeObserver(([entry]) =>
            setContainerWidth(entry.contentRect.width)
        )
        ro.observe(el)
        setContainerWidth(el.getBoundingClientRect().width)
        return () => ro.disconnect()
    }, [])

    useEffect(() => {
        if (prevVisibleRef.current !== visibleCards) {
            prevVisibleRef.current = visibleCards
            setAnimate(false)
            setCurrentIndex(visibleCards)
            lockRef.current = false
        }
    }, [visibleCards])

    const navigate = useCallback(
        (direction: 1 | -1) => {
            if (lockRef.current) return
            lockRef.current = true
            setAnimate(true)

            const nextIndex = currentIndex + direction
            setCurrentIndex(nextIndex)

            setTimeout(() => {
                if (nextIndex >= cloneCount + realCount) {
                    setAnimate(false)
                    setCurrentIndex(cloneCount)
                } else if (nextIndex < cloneCount) {
                    setAnimate(false)
                    setCurrentIndex(cloneCount + realCount - 1)
                }
                lockRef.current = false
            }, TRANSITION_MS + 20)
        },
        [currentIndex, cloneCount, realCount]
    )

    useEffect(() => {
        navigateRef.current = navigate
    }, [navigate])

    const handleUserNavigate = useCallback(
        (direction: 1 | -1) => {
            autoPlayPausedRef.current = true
            if (pauseTimeoutRef.current !== null) {
                clearTimeout(pauseTimeoutRef.current)
            }
            navigate(direction)
            pauseTimeoutRef.current = setTimeout(() => {
                autoPlayPausedRef.current = false
                pauseTimeoutRef.current = null
            }, USER_PAUSE_MS)
        },
        [navigate]
    )

    useEffect(() => {
        handleUserNavigateRef.current = handleUserNavigate
    }, [handleUserNavigate])

    useEffect(() => {
        const id = setInterval(() => {
            if (!autoPlayPausedRef.current) {
                navigateRef.current(1)
            }
        }, AUTO_PLAY_MS)
        return () => clearInterval(id)
    }, [])

    useEffect(() => {
        const slider = sliderRef.current
        if (!slider) return

        let startX: number | null = null
        let swipeConsumed = false

        const onTouchStart = (e: TouchEvent) => {
            startX = e.touches[0].clientX
            swipeConsumed = false
        }

        const onTouchMove = (e: TouchEvent) => {
            if (startX === null || swipeConsumed) return
            const delta = e.touches[0].clientX - startX
            if (Math.abs(delta) >= SWIPE_THRESHOLD_PX) {
                e.preventDefault()
                swipeConsumed = true
                handleUserNavigateRef.current(delta < 0 ? 1 : -1)
            }
        }

        const onTouchEnd = () => {
            startX = null
        }

        slider.addEventListener("touchstart", onTouchStart, { passive: true })
        slider.addEventListener("touchmove", onTouchMove, { passive: false })
        slider.addEventListener("touchend", onTouchEnd, { passive: true })

        return () => {
            slider.removeEventListener("touchstart", onTouchStart)
            slider.removeEventListener("touchmove", onTouchMove)
            slider.removeEventListener("touchend", onTouchEnd)
        }
    }, [])

    return (
        <div ref={containerRef} className={cn("relative w-full py-4", className)}>
            <div
                className="overflow-hidden"
                style={
                    containerWidth > 0
                        ? {
                              WebkitMaskImage: `linear-gradient(to right, transparent 0%, black ${peekPct}%, black ${100 - peekPct}%, transparent 100%)`,
                              maskImage: `linear-gradient(to right, transparent 0%, black ${peekPct}%, black ${100 - peekPct}%, transparent 100%)`,
                          }
                        : undefined
                }
            >
                <div
                    ref={sliderRef}
                    className="flex"
                    style={{
                        transform: `translateX(${getTranslateX(currentIndex)}px)`,
                        transition: animate
                            ? `transform ${TRANSITION_MS}ms ease-in-out`
                            : "none",
                        willChange: "transform",
                    }}
                >
                    {allItems.map((item, i) => (
                        <div
                            // biome-ignore lint/suspicious/noArrayIndexKey: clone strip — index is intentional
                            key={i}
                            className="shrink-0 px-2"
                            style={{
                                width:
                                    cardWidth > 0
                                        ? `${cardWidth}px`
                                        : "100%",
                            }}
                        >
                            {item}
                        </div>
                    ))}
                </div>
            </div>

            <div className="absolute top-1/2 -translate-y-1/2 left-2 z-20">
                <AnteriorButton
                    shape={buttonShape}
                    color={buttonColor}
                    onClick={() => handleUserNavigate(-1)}
                />
            </div>

            <div className="absolute top-1/2 -translate-y-1/2 right-2 z-20">
                <ProximoButton
                    shape={buttonShape}
                    color={buttonColor}
                    onClick={() => handleUserNavigate(1)}
                />
            </div>
        </div>
    )
}

export const GatosCarouselComponent = Object.assign(GatosCarousel, {
    ProximoButton,
    AnteriorButton,
})
