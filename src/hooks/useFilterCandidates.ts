import { useContext } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { filterArrOfObjs } from '../utils';

import CandidatesContext from '../contexts/Candidates';

export default function useFilterCandidates() {
  const { setCandidates } = useContext(CandidatesContext);
  const queryClient = useQueryClient();

  const filterCandidates = ({
    filters,
    data = undefined,
    saveData = true,
  }: FilterCandidatesOpts) => {
    const candidates =
      data ||
      queryClient.getQueryData<GetCandidatesResponse>(['candidates'])?.data;

    if (candidates) {
      const filteredData = filterArrOfObjs<CandidateData, CandidateFilterKeys>(
        candidates,
        filters,
      );

      if (saveData) {
        setCandidates(filteredData);
      }

      return filteredData;
    }

    return candidates || [];
  };

  return filterCandidates;
}
