import { useMemo, useRef, useState } from 'react';
import {
  IconSortAscending2,
  IconSortDescending2,
  IconUsers,
} from '@tabler/icons';
import { useQueryClient } from '@tanstack/react-query';

import { sortArrOfObjs } from '../../utils';
import useGetCandidates from '../../hooks/queries/candidates';

import { ToggleGroup } from '../../components/DS';

import CandidateCard from '../../components/Home/CandidateCard';
import SortSelect from '../../components/Home/SortSelect';

import styles from './Home.module.scss';

type SortByState = {
  key: 'none' | CandidateSortKeys;
  dir: SortDirection;
};

export default function Home() {
  const queryClient = useQueryClient();

  const sortDirectionToggles = useMemo(
    () => [
      {
        value: 'asc',
        children: <IconSortAscending2 />,
      },
      {
        value: 'desc',
        children: <IconSortDescending2 />,
      },
    ],
    [],
  );

  const candidatesCached = useRef<CandidateData[]>([]);

  const [sortBy, setSortBy] = useState<SortByState>({
    key: 'none',
    dir: 'asc',
  });

  const { data: candidates, status: candidatesStatus } = useGetCandidates({
    onSuccess: data => {
      if (sortBy.key !== 'none') {
        setSortBy(currentState => ({
          ...currentState,
          key: 'none',
        }));
      }

      if (data.data) {
        candidatesCached.current = data.data;
      }
    },
  });

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
      data: candidatesCached.current,
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

  let candidateList: JSX.Element | JSX.Element[] = <p>Loading...</p>;

  if (candidatesStatus === 'success' && candidates.data) {
    candidateList = candidates.data?.map(candidate => (
      <CandidateCard key={candidate.id} {...candidate} />
    ));
  }

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.title}>
          <IconUsers stroke={2.5} />
          <h1>Applicants</h1>
        </div>
        <div className={styles['action-area']}>
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
      </div>
      <div className={styles['grid-container']}>
        <div className={styles.grid}>{candidateList}</div>
      </div>
    </div>
  );
}
