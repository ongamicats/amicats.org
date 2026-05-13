import {
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useNavigate } from '@tanstack/react-router';
import { cn } from '@/components/layout/shared/helpers/class.helper';

export interface TabItem {
  id: string;
  label: React.ReactNode;
}

export interface TabListProps {
  items: Array<TabItem>;
  className?: string;
  orientation?: 'vertical' | 'horizontal';
  /** Optional stable id prefix for ARIA ids (helps panels outside component match aria-controls) */
  idPrefix?: string;
  /**
   * Optional name for syncing selection to the URL search param. If provided
   * the component will read / update `?{name}={id}` to enable deep-linking.
   */
  name?: string;
  /** Controlled value */
  value?: string;
  /** Uncontrolled default */
  defaultValue?: string;
  onChange?: (id: string) => void;
  /** Optional mapping of item id -> extra className applied to the tab button (use DaisyUI semantic classes) */
  itemClassName?: Record<string, string>;
}

/**
 * Generic, accessible TabList built on DaisyUI tab classes.
 * Uses semantic roles and supports optional URL search-param deep-linking.
 */
export function TabList({
  items,
  className,
  orientation = 'horizontal',
  name,
  value: controlledValue,
  defaultValue,
  onChange,
  idPrefix,
  itemClassName,
}: TabListProps) {
  const generatedId = useId();
  const id = idPrefix ?? generatedId;
  const navigate = useNavigate();

  const nameKey = name ?? 'tab';

  // derive initial value: controlled > URL param > defaultValue > first item
  const getInitialFromUrl = () => {
    if (typeof window === 'undefined') return undefined;
    try {
      const params = new URLSearchParams(window.location.search);
      return params.get(nameKey) || undefined;
    } catch {
      return undefined;
    }
  };

  const [internalValue, setInternalValue] = useState<string | undefined>(() => {
    return (
      controlledValue ?? getInitialFromUrl() ?? defaultValue ?? items[0]?.id
    );
  });

  useEffect(() => {
    if (controlledValue !== undefined) return;
    // if URL changes externally (e.g. user navigated) we should pick it up on mount
    const urlVal = getInitialFromUrl();
    if (urlVal && urlVal !== internalValue) {
      setInternalValue(urlVal);
    }
  }, []);

  // keep controlled in sync
  useEffect(() => {
    if (controlledValue !== undefined) {
      setInternalValue(controlledValue);
    }
  }, [controlledValue]);

  const selected = controlledValue ?? internalValue ?? items[0]?.id;

  const containerRef = useRef<HTMLDivElement | null>(null);

  const tabsClass = useMemo(() => {
    return cn(
      'tabs relative',
      // keep DaisyUI tab orientation but add a small gap between stacked
      // tab buttons so options feel separated on vertical layouts.
      orientation === 'vertical'
        ? 'tabs-vertical flex flex-col gap-2'
        : 'tabs-horizontal',
      'tabs-border',
      className,
    );
  }, [orientation, className]);

  // indicator state for active tab animation (reusable)
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [indicatorStyle, setIndicatorStyle] = useState<
    React.CSSProperties | undefined
  >(undefined);

  function handleSelect(nextId: string) {
    if (controlledValue === undefined) setInternalValue(nextId);
    onChange?.(nextId);

    // sync to URL if requested
    if (name) {
      if (typeof window === 'undefined') return;
      const { pathname, search, hash } = window.location;
      const params = new URLSearchParams(search);
      params.set(nameKey, nextId);
      const to = `${pathname}?${params.toString()}${hash ?? ''}`;
      // preserve scroll behaviour
      navigate({ to, resetScroll: false });
    }
  }

  // compute indicator position on mount and when selection changes
  // NOTE: indicator is only used for horizontal tabs. Vertical (stacked)
  // layout must remain a true stacked list — do not render the indicator
  // for vertical orientation which could overlap items.
  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const activeIdx = items.findIndex((it) => it.id === selected);
    const el = itemRefs.current[activeIdx] || null;
    if (!el) {
      setIndicatorStyle(undefined);
      return;
    }

    const containerRect = containerRef.current.getBoundingClientRect();
    const rect = el.getBoundingClientRect();

    if (orientation === 'vertical') {
      // For vertical orientation compute top/height so the indicator can
      // animate smoothly without breaking stacked layout. The indicator is
      // rendered behind the buttons (DOM order) and uses a subtle bg.
      setIndicatorStyle({
        top: rect.top - containerRect.top + containerRef.current.scrollTop,
        height: rect.height,
        left: 0,
        right: 0,
      });
      return;
    }

    setIndicatorStyle({
      left: rect.left - containerRect.left + containerRef.current.scrollLeft,
      width: rect.width,
      top: 0,
      bottom: 0,
    });
  }, [selected, orientation, items]);

  return (
    <div
      role="tablist"
      aria-orientation={orientation}
      className={tabsClass}
      ref={containerRef}
    >
      {/* moving indicator */}
      {indicatorStyle && (
        <div
          aria-hidden
          className="pointer-events-none absolute bg-primary/10 rounded-md transition-all duration-300"
          style={indicatorStyle}
        />
      )}

      {items.map((it, idx) => {
        const isActive = it.id === selected;
        const tabId = `${id}-tab-${it.id}`;
        const panelId = `${id}-panel-${it.id}`;
        return (
          <button
            key={it.id}
            id={tabId}
            role="tab"
            aria-selected={isActive}
            aria-controls={panelId}
            tabIndex={0}
            type="button"
            className={cn(
              'tab',
              isActive && 'tab-active',
              'transition-all duration-300',
              orientation === 'vertical' && 'w-full text-left',
              // apply per-item visual identity only when the tab is active so
              // the background tint does not remain on inactive options.
              isActive && itemClassName?.[it.id],
            )}
            ref={(el) => (itemRefs.current[idx] = el)}
            onClick={() => handleSelect(it.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleSelect(it.id);
              }
            }}
          >
            {it.label}
          </button>
        );
      })}
    </div>
  );
}

export default TabList;
