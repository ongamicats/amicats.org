import {
    ComponentColor,
    ComponentShape,
    ComponentSize,
} from "../types/types.constants";

export const daisyColors: Record<ComponentColor, string> = {
    neutral: "neutral",
    primary: "primary",
    secondary: "secondary",
    accent: "accent",
    info: "info",
    success: "success",
    warning: "warning",
    error: "error",
    ghost: "ghost",
    link: "link",
    outline: "outline",
    active: "active",
    disabled: "disabled",
};

export const daisySizes: Record<ComponentSize, string> = {
    lg: "lg",
    md: "md",
    sm: "sm",
    xs: "xs",
};

export const daisyShapes: Record<ComponentShape, string> = {
    square: "square",
    circle: "circle",
};
