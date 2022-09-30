import { createContext, useState, useMemo } from 'react';

type SortByState = {
  key: 'none' | CandidateSortKeys;
  dir: SortDirection;
};

interface ContextState {
  sortBy: SortByState;
  setSortBy: React.Dispatch<React.SetStateAction<SortByState>>;
  candidatesCached: CandidateData[];
  setCandidatesCached: React.Dispatch<React.SetStateAction<CandidateData[]>>;
}

const CandidatesContext = createContext({} as ContextState);

export const CandidatesProvider = ({ children }: React.PropsWithChildren) => {
  const [candidatesCached, setCandidatesCached] = useState<CandidateData[]>([]);

  const [sortBy, setSortBy] = useState<SortByState>({
    key: 'none',
    dir: 'asc',
  });

  const providerProps = useMemo(
    () => ({ sortBy, setSortBy, candidatesCached, setCandidatesCached }),
    [sortBy, candidatesCached],
  );

  return (
    <CandidatesContext.Provider value={providerProps}>
      {children}
    </CandidatesContext.Provider>
  );
};

export default CandidatesContext;
