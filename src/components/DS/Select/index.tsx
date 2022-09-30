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
} from '@radix-ui/react-select';
import {
  IconChevronDown,
  IconCaretUp,
  IconCaretDown,
} from '@tabler/icons';

import styles from './Select.module.scss';

interface SelectProps extends React.PropsWithChildren {
  ariaLabel: string;
  placeholder: string;
  value?: string;
  onChange?: (value: any) => void;
}

const Select = forwardRef<HTMLButtonElement, SelectProps>(
  ({ children, ...props }, forwardedRef) => {
    return (
      <Root
        value={props.value}
        onValueChange={props.onChange}
      >
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
            <ScrollUpButton
              className={styles['scroll-btn']}
            >
              <IconCaretUp />
            </ScrollUpButton>
            <Viewport className={styles.viewport}>
              {children}
            </Viewport>
            <ScrollDownButton
              className={styles['scroll-btn']}
            >
              <IconCaretDown />
            </ScrollDownButton>
          </Content>
        </Portal>
      </Root>
    );
  },
);

Select.defaultProps = {
  value: undefined,
  onChange: undefined,
};

export default Select;
