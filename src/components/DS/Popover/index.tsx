// Implemented using Radix UI Popover Primitive
// Docs: https://www.radix-ui.com/docs/primitives/components/popover

import { forwardRef } from 'react';
import {
  Root,
  Trigger,
  Anchor,
  Portal,
  Content,
  Close,
} from '@radix-ui/react-popover';
import { IconX } from '@tabler/icons';

import styles from './Popover.module.scss';

type MainProps = {
  children: JSX.Element[];
};

const PopoverTrigger = forwardRef<HTMLButtonElement, React.PropsWithChildren>(
  ({ children }, forwardedRef) => {
    return (
      <Trigger ref={forwardedRef} className={styles.trigger}>
        {children}
        <Anchor />
      </Trigger>
    );
  },
);

const PopoverContent = forwardRef<HTMLDivElement, React.PropsWithChildren>(
  ({ children }, forwardedRef) => {
    return (
      <Content ref={forwardedRef} className={styles.content} sideOffset={26}>
        {children}
        <Close className={styles.close}>
          <IconX />
        </Close>
      </Content>
    );
  },
);

function Main({ children }: MainProps) {
  return (
    <Root>
      {children[0]}
      <Portal>{children[1]}</Portal>
    </Root>
  );
}

const Popover = {
  Main,
  Trigger: PopoverTrigger,
  Content: PopoverContent,
};

export default Popover;
