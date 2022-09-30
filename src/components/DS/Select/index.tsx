// Implemented using Radix UI Select Primitive
// Docs: https://www.radix-ui.com/docs/primitives/components/select

import { forwardRef } from 'react';
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
} from '@radix-ui/react-select';
import { IconChevronDown, IconCaretUp, IconCaretDown } from '@tabler/icons';

import styles from './Select.module.scss';

interface MySelectProps extends SelectProps {
  ariaLabel: string;
  placeholder: string;
  onChange?: (value: any) => void;
}

const Select = forwardRef<HTMLButtonElement, MySelectProps>(
  ({ children, ...props }, forwardedRef) => {
    return (
      <Root {...props} value={props.value} onValueChange={props.onChange}>
        <Trigger
          ref={forwardedRef}
          aria-label={props.ariaLabel}
          className={styles.trigger}
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
            <Viewport className={styles.viewport}>{children}</Viewport>
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
  onChange: undefined,
};

export default Select;
