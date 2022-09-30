// Implemented using Radix UI Select Primitive
// Docs: https://www.radix-ui.com/docs/primitives/components/select

import { forwardRef } from 'react';
import { Item, ItemText } from '@radix-ui/react-select';

import styles from './Select.module.scss';

interface OptionProps extends React.PropsWithChildren {
  value: string;
}

const Option = forwardRef<HTMLDivElement, OptionProps>(
  ({ children, ...props }, forwardedRef) => {
    return (
      <Item
        {...props}
        ref={forwardedRef}
        className={styles.item}
        value={props.value}
      >
        <ItemText>{children}</ItemText>
      </Item>
    );
  },
);

export default Option;
