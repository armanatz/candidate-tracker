// Implemented using Radix UI Toggle Group Primitive
// Docs: https://www.radix-ui.com/docs/primitives/components/toggle-group

import { forwardRef } from 'react';
import {
  Root,
  Item,
  ToggleGroupImplSingleProps,
} from '@radix-ui/react-toggle-group';

import styles from './ToggleGroup.module.scss';

interface ToggleGroupProps
  extends ToggleGroupImplSingleProps {
  items: {
    value: string;
    children: React.ReactNode;
  }[];
}

const ToggleGroup = forwardRef<
  HTMLDivElement,
  ToggleGroupProps
>((props, forwardedRef) => {
  return (
    <Root
      ref={forwardedRef}
      type="single"
      {...props}
      className={styles.root}
    >
      {props.items.map(item => (
        <Item
          key={item.value}
          value={item.value}
          className={styles.item}
        >
          {item.children}
        </Item>
      ))}
    </Root>
  );
});

export default ToggleGroup;
