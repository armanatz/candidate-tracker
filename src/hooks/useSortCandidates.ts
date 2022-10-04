import { useContext } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { sortArrOfObjs } from '../utils';
import CandidatesContext from '../contexts/Candidates';

export default function useSortCandidates() {
  const { setCandidates } = useContext(CandidatesContext);
  const queryClient = useQueryClient();

  const sortCandidates = ({
    sortKey,
    sortDir,
    data = undefined,
    saveData = true,
  }: SortCandidatesOpts) => {
    const candidates =
      data ||
      queryClient.getQueryData<GetCandidatesResponse>(['candidates'])?.data;

    if (candidates) {
      if (sortKey !== 'none') {
        const sortedData = sortArrOfObjs<CandidateData, CandidateSortKeys>(
          candidates,
          sortKey,
          sortDir,
        );

        if (saveData) {
          setCandidates(sortedData);
        }

        return sortedData;
      }

      if (saveData) {
        setCandidates(candidates);
      }
    }

    return candidates || [];
  };

  return sortCandidates;
}
