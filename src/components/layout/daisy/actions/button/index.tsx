import { forwardRef } from "react";
import { ButtonProps } from "./button.types";
import {
    cn,
    createDaisyClassBuilder,
} from "../../../../shared/helpers/class.helper";
import {
    daisyColors,
    daisySizes,
} from "../../../../shared/constants/class.constants";

const buildBtnClass = createDaisyClassBuilder("btn");

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, children, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "btn",
                    buildBtnClass(variant && daisyColors[variant]),
                    buildBtnClass(size && daisySizes[size]),
                    className
                )}
                {...props}
            >
                {children}
            </button>
        );
    }
);

Button.displayName = "Button";
