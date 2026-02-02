import { forwardRef, ComponentProps } from "react";
import { ButtonProps } from "./button.types";
import {
    cn,
    createDaisyClassBuilder,
} from "../../../shared/helpers/class.helper";
import {
    daisyColors,
    daisySizes,
} from "../../../shared/constants/class.constants";

const buildBtnClass = createDaisyClassBuilder("btn");

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
    ({ className, variant, size, children, href, ...props }, ref) => {
        const classes = cn(
            "btn",
            buildBtnClass(variant && daisyColors[variant]),
            buildBtnClass(size && daisySizes[size]),
            className
        );

        if (href) {
            return (
                <a
                    ref={ref as any}
                    href={href}
                    className={classes}
                    {...props as ComponentProps<"a">}
                >
                    {children}
                </a>
            );
        }

        return (
            <button
                ref={ref as any}
                className={classes}
                {...props as ComponentProps<"button">}
            >
                {children}
            </button>
        );
    }
);

Button.displayName = "Button";
