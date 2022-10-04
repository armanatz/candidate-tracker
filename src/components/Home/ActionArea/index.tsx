import { IconFilter } from '@tabler/icons';

import { Popover } from '../../DS';
import Sorting from './Sorting';
import FilterForm from './FilterForm';

import styles from './ActionArea.module.scss';

export default function ActionArea() {
  return (
    <div className={styles.main}>
      <Sorting />
      <Popover.Main>
        <Popover.Trigger>
          <IconFilter />
        </Popover.Trigger>
        <Popover.Content>
          <FilterForm />
        </Popover.Content>
      </Popover.Main>
    </div>
  );
}
