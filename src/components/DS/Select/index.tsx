// Implemented using Radix UI Select Primitive
// Docs: https://www.radix-ui.com/docs/primitives/components/select

import { forwardRef, useState, useCallback, useEffect } from 'react';
import {
  Root,
  Trigger,
  Value,
  Icon,
  Portal,
  Content,
  ScrollUpButton,
  Viewport,
  ScrollDownButton,
  SelectProps,
  Item,
  ItemText,
  SelectItemProps,
} from '@radix-ui/react-select';
import { IconChevronDown, IconCaretUp, IconCaretDown } from '@tabler/icons';
import classNames from 'classnames';

import styles from './Select.module.scss';

interface OptionProps extends SelectItemProps {
  name: string;
}

interface MySelectProps extends SelectProps {
  placeholder: string;
  items: OptionProps[];
  id?: string;
  ariaLabel?: string;
  className?: string;
}

const Option = forwardRef<HTMLDivElement, Omit<OptionProps, 'name'>>(
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

const Select = forwardRef<HTMLButtonElement, MySelectProps>(
  ({ ...props }, forwardedRef) => {
    const { value, onValueChange } = props;

    const [selectValue, setSelectValue] = useState(value || undefined);

    const resetValue = useCallback(() => {
      if (value && value !== selectValue) {
        setSelectValue(value);
      }
    }, [value, selectValue]);

    useEffect(() => {
      resetValue();
    }, [value, resetValue]);

    const handleOnValueChange = (changedValue: string) => {
      setSelectValue(changedValue);

      if (onValueChange) {
        return onValueChange(changedValue);
      }

      return false;
    };

    return (
      <Root {...props} value={selectValue} onValueChange={handleOnValueChange}>
        <Trigger
          id={props.id}
          ref={forwardedRef}
          aria-label={props.ariaLabel}
          className={classNames(styles.trigger, {
            [`${props.className}`]: props.className,
          })}
        >
          <Value placeholder={props.placeholder} />
          <Icon className={styles.icon}>
            <IconChevronDown />
          </Icon>
        </Trigger>
        <Portal>
          <Content className={styles.content}>
            <ScrollUpButton className={styles['scroll-btn']}>
              <IconCaretUp />
            </ScrollUpButton>
            <Viewport className={styles.viewport}>
              {props.items.map(item => (
                <Option key={item.value} value={item.value}>
                  {item.name}
                </Option>
              ))}
            </Viewport>
            <ScrollDownButton className={styles['scroll-btn']}>
              <IconCaretDown />
            </ScrollDownButton>
          </Content>
        </Portal>
      </Root>
    );
  },
);

Select.defaultProps = {
  id: undefined,
  ariaLabel: undefined,
  className: undefined,
};

export default Select;
