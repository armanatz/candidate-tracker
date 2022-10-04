import { createContext, useState, useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

import { getCurrentSearchParams, pureName } from '../utils';

type SortByState = {
  key: UICandidateSortKeys;
  dir: SortDirection;
};

type SetCandidates = React.Dispatch<React.SetStateAction<CandidateData[]>>;

type SetFilters = React.Dispatch<React.SetStateAction<CandidateFilters>>;

interface ContextState {
  candidates: CandidateData[];
  setCandidates: SetCandidates;
  sortBy: SortByState;
  setSortBy: React.Dispatch<React.SetStateAction<SortByState>>;
  filters: CandidateFilters;
  setFilters: SetFilters;
}

const CandidatesContext = createContext({} as ContextState);

export const CandidatesProvider = ({ children }: React.PropsWithChildren) => {
  const [searchParams] = useSearchParams();
  const initialSearchParams = useRef(getCurrentSearchParams(searchParams));

  const filterKeys = Object.keys(initialSearchParams.current).filter(key =>
    key.includes('filter_'),
  );

  let newFilters: CandidateFilters = {};

  if (filterKeys.length !== 0) {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { filter_name, filter_position_applied, filter_status } =
      initialSearchParams.current;

    newFilters = {
      ...(filter_name && {
        name: {
          value: filter_name,
          handler: (str: string) =>
            pureName(str)
              .toLocaleLowerCase()
              .includes(decodeURI(filter_name).toLocaleLowerCase()),
        },
      }),
      ...(filter_position_applied && {
        position_applied: decodeURI(filter_position_applied),
      }),
      ...(filter_status && { status: decodeURI(filter_status).split(',') }),
    };
  }

  const [candidates, setCandidates] = useState<CandidateData[]>([]);

  const [sortBy, setSortBy] = useState<SortByState>({
    key: (initialSearchParams.current.sortKey as UICandidateSortKeys) || 'none',
    dir: (initialSearchParams.current.sortDir as SortDirection) || 'asc',
  });

  const [filters, setFilters] = useState(newFilters);

  const providerProps = useMemo(
    () => ({
      candidates,
      setCandidates,
      sortBy,
      setSortBy,
      filters,
      setFilters,
    }),
    [sortBy, candidates, filters],
  );

  return (
    <CandidatesContext.Provider value={providerProps}>
      {children}
    </CandidatesContext.Provider>
  );
};

export default CandidatesContext;
