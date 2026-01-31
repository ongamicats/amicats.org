import { ComponentProps } from "react";
import {
    ComponentColor,
    ComponentSize,
} from "../../../../shared/types/types.constants";

export type ButtonProps = ComponentProps<"button"> & {
    variant?: ComponentColor;
    size?: ComponentSize;
};
