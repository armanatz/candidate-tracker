// Implemented using Radix UI Toggle Group Primitive
// Docs: https://www.radix-ui.com/docs/primitives/components/toggle-group

import { forwardRef, useState } from 'react';
import { Root, Item } from '@radix-ui/react-toggle-group';

import styles from './ToggleGroup.module.scss';

interface SingleToggleGroupProps {
  items: {
    value: string;
    children: React.ReactNode;
  }[];
  value?: string;
  onValueChange?: (value: string) => void;
}

interface MultiToggleGroupProps {
  items: {
    value: string;
    children: React.ReactNode;
  }[];
  value?: string[];
  onValueChange?: (value: string[]) => void;
}

const SingleToggleGroup = forwardRef<HTMLDivElement, SingleToggleGroupProps>(
  (props, forwardedRef) => {
    const { value, onValueChange } = props;
    const [toggleValue, setToggleValue] = useState(value || '');

    const handleOnValueChange = (changedValue: string) => {
      setToggleValue(changedValue);

      if (onValueChange) {
        return onValueChange(changedValue);
      }

      return false;
    };

    return (
      <Root
        type="single"
        {...props}
        ref={forwardedRef}
        className={styles.root}
        value={toggleValue}
        onValueChange={handleOnValueChange}
      >
        {props.items.map(item => (
          <Item key={item.value} value={item.value} className={styles.item}>
            {item.children}
          </Item>
        ))}
      </Root>
    );
  },
);

const MultiToggleGroup = forwardRef<HTMLDivElement, MultiToggleGroupProps>(
  (props, forwardedRef) => {
    const { value, onValueChange } = props;
    const [toggleValue, setToggleValue] = useState(value || []);

    const handleOnValueChange = (changedValue: string[]) => {
      setToggleValue(changedValue);

      if (onValueChange) {
        return onValueChange(changedValue);
      }

      return false;
    };

    return (
      <Root
        type="multiple"
        {...props}
        ref={forwardedRef}
        className={styles.root}
        value={toggleValue}
        onValueChange={handleOnValueChange}
      >
        {props.items.map(item => (
          <Item key={item.value} value={item.value} className={styles.item}>
            {item.children}
          </Item>
        ))}
      </Root>
    );
  },
);

SingleToggleGroup.defaultProps = {
  value: undefined,
  onValueChange: undefined,
};

MultiToggleGroup.defaultProps = {
  value: undefined,
  onValueChange: undefined,
};

export { SingleToggleGroup, MultiToggleGroup };
