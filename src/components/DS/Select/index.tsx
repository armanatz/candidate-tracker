import {
  Root,
  Trigger,
  Value,
  Icon,
  Portal,
  Content,
  Viewport,
} from '@radix-ui/react-select';
import { IconChevronDown } from '@tabler/icons';

import styles from './Select.module.scss';

interface SelectProps extends React.PropsWithChildren {
  label: string;
  placeholder: string;
  value?: string;
  onChange?: (value: string) => void;
}

function Select({
  children,
  label,
  placeholder,
  value,
  onChange,
}: SelectProps) {
  return (
    <Root value={value} onValueChange={onChange}>
      <Trigger
        aria-label={label}
        className={styles.trigger}
      >
        <Value placeholder={placeholder} />
        <Icon className={styles.icon}>
          <IconChevronDown />
        </Icon>
      </Trigger>
      <Portal>
        <Content className={styles.content}>
          <Viewport className={styles.viewport}>
            {children}
          </Viewport>
        </Content>
      </Portal>
    </Root>
  );
}

Select.defaultProps = {
  value: undefined,
  onChange: undefined,
};

export default Select;
