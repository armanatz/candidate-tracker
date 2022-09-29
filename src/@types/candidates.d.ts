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
