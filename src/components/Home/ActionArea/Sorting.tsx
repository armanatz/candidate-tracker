import { useContext } from 'react';
import { IconSortAscending2, IconSortDescending2 } from '@tabler/icons';
import { useSearchParams } from 'react-router-dom';

import CandidatesContext from '../../../contexts/Candidates';

import { useSortCandidates } from '../../../hooks';
import { getCurrentSearchParams } from '../../../utils';

import { FormControl, Select, SingleToggleGroup } from '../../DS';

const sortSelectItems = [
  { value: 'none', name: 'None' },
  { value: 'position_applied', name: 'Position Applied' },
  { value: 'year_of_experience', name: 'Years of Experience' },
  { value: 'application_date', name: 'Application Date' },
];

const sortDirectionToggles = [
  { value: 'asc', children: <IconSortAscending2 /> },
  { value: 'desc', children: <IconSortDescending2 /> },
];

export default function Sorting() {
  const { candidates, sortBy, setSortBy, filters } =
    useContext(CandidatesContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const sortCandidates = useSortCandidates();

  const handleOnSortSelectionChange = (sortKey: UICandidateSortKeys) => {
    const sortDir = sortBy.dir;

    setSortBy(currentState => ({
      ...currentState,
      key: sortKey,
    }));

    const currentSearchParams = getCurrentSearchParams(searchParams);

    setSearchParams({
      ...currentSearchParams,
      sortKey,
      ...(!currentSearchParams.sortDir && { sortDir }),
    });

    const isDataFiltered = Object.keys(filters).length !== 0;

    if (isDataFiltered) {
      return sortCandidates({ data: candidates, sortKey, sortDir });
    }

    return sortCandidates({ sortKey, sortDir });
  };

  const handleOnSortDirectionChange = (sortDir: SortDirection | '') => {
    if (sortDir === '' || sortDir === sortBy.dir) {
      return false;
    }

    const sortKey = sortBy.key;

    setSortBy(currentState => ({
      ...currentState,
      dir: sortDir,
    }));

    const currentSearchParams = getCurrentSearchParams(searchParams);

    setSearchParams({
      ...currentSearchParams,
      sortDir,
    });

    const isDataFiltered = Object.keys(filters).length !== 0;

    if (isDataFiltered) {
      return sortCandidates({ data: candidates, sortKey, sortDir });
    }

    return sortCandidates({ sortKey, sortDir });
  };

  return (
    <>
      <FormControl inline labelProps={{ name: 'Sort By:', htmlFor: 'sorting' }}>
        <Select
          id="sorting"
          placeholder="Select sorting..."
          value={sortBy.key}
          items={sortSelectItems}
          onValueChange={handleOnSortSelectionChange}
        />
      </FormControl>
      {sortBy.key !== 'none' ? (
        <SingleToggleGroup
          value={sortBy.dir}
          onValueChange={(sortDir: string) =>
            handleOnSortDirectionChange(sortDir as SortDirection)
          }
          items={sortDirectionToggles}
        />
      ) : null}
    </>
  );
}
