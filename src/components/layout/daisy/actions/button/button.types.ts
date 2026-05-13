import type { ComponentProps } from 'react';
import type {
  ComponentColor,
  ComponentSize,
} from '../../../shared/types/types.constants';

export type ButtonProps = ComponentProps<'button'> &
  ComponentProps<'a'> & {
    variant?: ComponentColor;
    size?: ComponentSize;
    href?: string;
    target?: string;
    rel?: string;
  };
