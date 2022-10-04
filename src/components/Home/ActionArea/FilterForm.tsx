import { useContext, useMemo, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { IconRefresh } from '@tabler/icons';

import { getCurrentSearchParams, pureName } from '../../../utils';
import { useFilterCandidates, useSortCandidates } from '../../../hooks';

import { FormControl, Input, Select, MultiToggleGroup } from '../../DS';

import CandidatesContext from '../../../contexts/Candidates';

import styles from './ActionArea.module.scss';

const FilterForm = () => {
  const queryClient = useQueryClient();
  const {
    sortBy,
    candidates,
    setCandidates,
    filters: filtersFromContext,
    setFilters,
  } = useContext(CandidatesContext);

  const [searchParams, setSearchParams] = useSearchParams();

  const [name, setName] = useState<string | undefined>(
    getCurrentSearchParams(searchParams).filter_name,
  );
  const [position, setPosition] = useState(
    getCurrentSearchParams(searchParams).filter_position_applied || 'none',
  );
  const [status, setStatus] = useState(
    getCurrentSearchParams(searchParams)?.filter_status?.split(',') || [],
  );

  const filters = useRef<CandidateFilters>({});
  const filterCandidates = useFilterCandidates();
  const sortCandidates = useSortCandidates();

  const statusFilterToggles = [
    { value: 'waiting', children: <p>Waiting</p> },
    { value: 'approved', children: <p>Approved</p> },
    { value: 'rejected', children: <p>Rejected</p> },
  ];

  const positions = useMemo(() => {
    const queryData = queryClient.getQueryData<GetCandidatesResponse>([
      'candidates',
    ])?.data;

    if (queryData) {
      return [
        ...new Set(queryData.map(candidate => candidate.position_applied)),
      ]
        .filter(pos => pos !== null && pos !== undefined && pos !== '')
        .sort()
        .map(item => ({
          value: item,
          name: item,
        }));
    }

    return [];
  }, [queryClient]);

  const cleanUpFilterSearchParams = () => {
    const currentSearchParams = {
      ...getCurrentSearchParams(searchParams),
    };

    delete currentSearchParams.filter_name;
    delete currentSearchParams.filter_position_applied;
    delete currentSearchParams.filter_status;

    return currentSearchParams;
  };

  const handleReset = () => {
    const cleanSearchParams = cleanUpFilterSearchParams();
    const isDataSorted = sortBy.key !== 'none';

    const queryData = queryClient.getQueryData<GetCandidatesResponse>([
      'candidates',
    ])?.data;

    filters.current = {};
    setSearchParams(() => ({ ...cleanSearchParams }));
    setFilters({});
    setName(undefined);
    setPosition('none');
    setStatus([]);

    if (isDataSorted) {
      return sortCandidates({
        data: queryData,
        sortKey: sortBy.key,
        sortDir: sortBy.dir,
      });
    }

    return setCandidates(queryData || []);
  };

  const handleSubmit = () => {
    const cleanSearchParams = cleanUpFilterSearchParams();

    const newFilters = {
      ...(name &&
        name !== '' && {
          name: {
            value: name,
            handler: (str: string) =>
              pureName(str)
                .toLocaleLowerCase()
                .includes(name.toLocaleLowerCase()),
          },
        }),
      ...(position !== 'none' && {
        position_applied: position,
      }),
      ...(status.length !== 0 && { status }),
    };

    const allFormValues = { name, position, status };

    const currentFilters = {
      ...filters.current,
      name: filters.current.name?.value,
    };

    const isFilterDifferent =
      JSON.stringify(currentFilters) !== JSON.stringify(allFormValues);

    const isDataFiltered = Object.keys(filtersFromContext).length !== 0;

    const isDataSorted = sortBy.key !== 'none';

    let data = candidates;

    if (isFilterDifferent) {
      const queryData = queryClient.getQueryData<GetCandidatesResponse>([
        'candidates',
      ])?.data;

      if (isDataSorted) {
        data = sortCandidates({
          data: queryData,
          sortKey: sortBy.key,
          sortDir: sortBy.dir,
          saveData: false,
        });
      } else if (queryData) {
        data = queryData;
      }
    }

    setSearchParams(() => ({
      ...cleanSearchParams,
      ...(name && name !== '' && { filter_name: name }),
      ...(position !== 'none' && {
        filter_position_applied: position,
      }),
      ...(status.length !== 0 && { filter_status: status.toString() }),
    }));

    filters.current = newFilters;

    setFilters(newFilters);

    return filterCandidates({
      filters: newFilters,
      ...((isDataSorted || isDataFiltered) && { data }),
    });
  };

  return (
    <div>
      <FormControl labelProps={{ name: 'Name', htmlFor: 'name' }}>
        <Input
          name="name"
          placeholder="Search for candidate..."
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </FormControl>
      <FormControl
        labelProps={{
          name: 'Position Applied',
          htmlFor: 'positionApplied',
        }}
      >
        <Select
          id="positionApplied"
          ariaLabel="Search by position applied"
          placeholder="Select position applied..."
          value={position}
          items={[
            {
              value: 'none',
              name: 'None',
            },
            ...positions,
          ]}
          onValueChange={setPosition}
          className={styles.select}
        />
      </FormControl>
      <FormControl labelProps={{ name: 'Status', htmlFor: 'status' }}>
        <MultiToggleGroup
          value={status}
          items={statusFilterToggles}
          onValueChange={setStatus}
        />
      </FormControl>
      <FormControl inline className={styles['buttons-area']}>
        {Object.keys(filtersFromContext).length !== 0 ? (
          <button type="reset" className={styles.button} onClick={handleReset}>
            <IconRefresh />
          </button>
        ) : null}
        <button
          type="submit"
          className={styles.button}
          onClick={handleSubmit}
          disabled={name === '' && position === 'none' && status.length === 0}
        >
          Filter
        </button>
      </FormControl>
    </div>
  );
};

export default FilterForm;
