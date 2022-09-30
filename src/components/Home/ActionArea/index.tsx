import { useContext, useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { IconSortAscending2, IconSortDescending2 } from '@tabler/icons';

import CandidatesContext from 'contexts/Candidates';
import { sortArrOfObjs } from '../../../utils';

import SortSelect from './SortSelect';
import { ToggleGroup } from '../../DS';

import styles from './ActionArea.module.scss';

export default function ActionArea() {
  const { sortBy, setSortBy, candidatesCached } = useContext(CandidatesContext);
  const queryClient = useQueryClient();

  const candidates = queryClient.getQueryData<GetCandidatesResponse>([
    'candidates',
  ]);

  const sortDirectionToggles = useMemo(
    () => [
      { value: 'asc', children: <IconSortAscending2 /> },
      { value: 'desc', children: <IconSortDescending2 /> },
    ],
    [],
  );

  const sortCandidates = (
    key: 'none' | CandidateSortKeys,
    dir: SortDirection = 'asc',
  ) => {
    if (candidates && candidates.data) {
      if (key !== 'none') {
        const sortedData = sortArrOfObjs<CandidateData, CandidateSortKeys>(
          candidates.data,
          key,
          dir,
        );

        return queryClient.setQueryData(['candidates'], {
          data: sortedData,
        });
      }
    }

    return queryClient.setQueryData(['candidates'], {
      data: candidatesCached,
    });
  };

  const handleOnSortSelectionChange = (sortKey: 'none' | CandidateSortKeys) => {
    setSortBy(currentState => ({
      ...currentState,
      key: sortKey,
    }));

    return sortCandidates(sortKey, sortBy.dir);
  };

  const handleOnSortDirectionChange = (dir: SortDirection) => {
    setSortBy(currentState => ({
      ...currentState,
      dir,
    }));

    return sortCandidates(sortBy.key, dir);
  };

  return (
    <div className={styles.main}>
      <SortSelect
        selectedValue={sortBy.key}
        onChange={handleOnSortSelectionChange}
      />
      {sortBy.key !== 'none' ? (
        <ToggleGroup
          value={sortBy.dir}
          onValueChange={(dir: SortDirection) =>
            handleOnSortDirectionChange(dir)
          }
          items={sortDirectionToggles}
        />
      ) : null}
    </div>
  );
}
