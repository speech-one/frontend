'use client';

import * as MuiIcons from '@mui/icons-material';
import type { SvgIconProps } from '@mui/material';
import type { ComponentType } from 'react';

export interface IconProps extends Omit<SvgIconProps, 'component'> {
  name: string;
}

export function Icon({
  name,
  fontSize = 'medium',
  sx,
  ...props
}: IconProps) {
  const iconName = name.endsWith('Rounded') ? name : `${name}Rounded`;
  const IconComponent = MuiIcons[iconName as keyof typeof MuiIcons] as ComponentType<SvgIconProps>;

  if (!IconComponent) {
    console.warn(`Icon "${iconName}" not found in @mui/icons-material`);

    return null;
  }

  return (
    <IconComponent
      fontSize={fontSize}
      sx={{
        fontWeight: 300,
        ...sx,
      }}
      {...props}
    />
  );
}
