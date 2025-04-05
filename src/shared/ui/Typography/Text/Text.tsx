import { Typography, TypographyProps } from '@mui/material';
import cn from 'classnames';
import { PropsWithChildren } from 'react';

import { Colors } from '../../../model/types/colors';

import styles from './Text.module.css';

export type TextProps = Omit<TypographyProps, 'color'> & {
  color?: Colors;
};

export const Text = (props: PropsWithChildren<TextProps>) => {
  const { children, color = 'primary', className, ...rest } = props;

  const classNames = cn(styles[`text-${color}`], className);

  return (
    <Typography className={classNames} {...rest}>
      {children}
    </Typography>
  );
};
