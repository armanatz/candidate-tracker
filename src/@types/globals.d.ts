type SortDirection = 'asc' | 'desc';

type CandidateSortKeys = keyof Pick<
  CandidateData,
  'position_applied' | 'year_of_experience' | 'application_date'
>;
