type CandidateData = {
  id: number;
  name: string;
  email: string;
  birth_date: string;
  year_of_experience: number;
  position_applied: string;
  application_date: string;
  status: string;
};

type GetCandidatesResponse = {
  data?: CandidateData[];
  error?: {
    code: number;
    message: string;
  };
};

type CandidateSortKeys = keyof Pick<
  CandidateData,
  'position_applied' | 'year_of_experience' | 'application_date'
>;

type UICandidateSortKeys = 'none' | CandidateSortKeys;

type CandidateFilterKeys = keyof Pick<
  CandidateData,
  'name' | 'status' | 'position_applied'
>;

type CandidateFilters = {
  name?: {
    value: string;
    handler: (string: string) => boolean;
  };
  position?: string;
  status?: string[];
};

type FilterCandidatesOpts = {
  data?: CandidateData[];
  saveData?: boolean;
  filters: CandidateFilters;
};

interface SortCandidatesOpts
  extends Pick<FilterCandidatesOpts, 'data' | 'saveData'> {
  sortKey: UICandidateSortKeys;
  sortDir: SortDirection;
}
