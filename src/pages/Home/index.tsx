import { useCallback, useRef, useState } from 'react';
import {
  IconSortAscending2,
  IconSortDescending2,
  IconUsers,
} from '@tabler/icons';
import { useQueryClient } from '@tanstack/react-query';

import { sortArrOfObjs } from '../../utils';
import useGetCandidates from '../../hooks/queries/candidates';

import {
  Card,
  Select,
  Option,
  ToggleGroup,
} from '../../components/DS';

import CandidateInfo from '../../components/CandidateInfo';

import styles from './Home.module.scss';

type SortingKeys =
  | 'position_applied'
  | 'year_of_experience'
  | 'application_date';

type SortByState = {
  key: 'none' | SortingKeys;
  dir: SortDirection;
};

export default function Home() {
  const candidatesCached = useRef<CandidateData[]>([]);

  const [sortBy, setSortBy] = useState<SortByState>({
    key: 'none',
    dir: 'asc',
  });

  const queryClient = useQueryClient();

  const { data: candidates, status: candidatesStatus } =
    useGetCandidates({
      onSuccess: data => {
        setSortBy(currentState => ({
          ...currentState,
          key: 'none',
        }));

        if (data.data) {
          candidatesCached.current = data.data;
        }
      },
    });

  const sortCandidates = useCallback(
    (
      sortKey: 'none' | SortingKeys,
      direction: SortDirection = 'asc',
    ) => {
      if (candidates && candidates.data) {
        if (sortKey !== 'none') {
          const sorted = sortArrOfObjs<
            CandidateData,
            SortingKeys
          >(
            candidates.data,
            sortKey as SortingKeys,
            direction,
          );

          return queryClient.setQueryData(['candidates'], {
            data: sorted,
          });
        }

        return queryClient.setQueryData(['candidates'], {
          data: candidatesCached.current,
        });
      }

      return undefined;
    },
    [candidates, candidatesCached, queryClient],
  );

  const handleOnSortSelectionChange = (
    sortKey: 'none' | SortingKeys,
  ) => {
    setSortBy(currentState => ({
      ...currentState,
      key: sortKey,
    }));

    return sortCandidates(sortKey, sortBy.dir);
  };

  const handleOnSortDirectionChange = (
    direction: SortDirection,
  ) => {
    setSortBy(currentState => ({
      ...currentState,
      dir: direction,
    }));

    return sortCandidates(sortBy.key, direction);
  };

  let candidateList: JSX.Element | JSX.Element[] = (
    <p>Loading...</p>
  );

  if (candidatesStatus === 'success' && candidates.data) {
    candidateList = candidates.data?.map(candidate => (
      <Card withPadding={false} key={candidate.id}>
        <CandidateInfo
          name={candidate.name}
          email={candidate.email}
          birthDate={candidate.birth_date}
          yearsOfExperience={candidate.year_of_experience}
          positionApplied={candidate.position_applied}
          applicationDate={candidate.application_date}
          status={candidate.status}
        />
      </Card>
    ));
  }

  return (
    <div>
      <div className={styles['action-area']}>
        <div className={styles.title}>
          <IconUsers stroke={2.5} />
          <h1>Applicants</h1>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5em',
          }}
        >
          <p>Sort By:</p>
          <Select
            ariaLabel="Sort by"
            placeholder="Select sorting..."
            value={sortBy.key}
            onChange={(value: 'none' | SortingKeys) =>
              handleOnSortSelectionChange(value)
            }
          >
            <Option value="none">None</Option>
            <Option value="position_applied">
              Position Applied
            </Option>
            <Option value="year_of_experience">
              Years of Experience
            </Option>
            <Option value="application_date">
              Application Date
            </Option>
          </Select>
          {sortBy.key !== 'none' ? (
            <ToggleGroup
              value={sortBy.dir}
              onValueChange={(dir: SortDirection) =>
                handleOnSortDirectionChange(dir)
              }
              items={[
                {
                  value: 'asc',
                  children: <IconSortAscending2 />,
                },
                {
                  value: 'desc',
                  children: <IconSortDescending2 />,
                },
              ]}
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
