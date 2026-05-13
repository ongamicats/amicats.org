import { forwardRef } from 'react';
import {
  cn,
  createDaisyClassBuilder,
} from '../../../shared/helpers/class.helper';
import {
  daisyColors,
  daisySizes,
} from '../../../shared/constants/class.constants';
import type { ButtonProps } from './button.types';
import type { ComponentProps } from 'react';

const buildBtnClass = createDaisyClassBuilder('btn');

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(({ className, variant, size, children, href, ...props }, ref) => {
  const classes = cn(
    'btn',
    buildBtnClass(variant && daisyColors[variant]),
    buildBtnClass(size && daisySizes[size]),
    className,
  );

  if (href) {
    return (
      <a
        ref={ref as any}
        href={href}
        className={classes}
        {...(props as ComponentProps<'a'>)}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as any}
      className={classes}
      {...(props as ComponentProps<'button'>)}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';
