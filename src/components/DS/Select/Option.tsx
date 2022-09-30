import { Item, ItemText } from '@radix-ui/react-select';

import styles from './Select.module.scss';

interface OptionProps extends React.PropsWithChildren {
  value: string;
}

export default function Option({
  children,
  value,
}: OptionProps) {
  return (
    <Item value={value} className={styles.item}>
      <ItemText>{children}</ItemText>
    </Item>
  );
}
