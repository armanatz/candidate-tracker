/* eslint-disable @typescript-eslint/naming-convention */
import { memo } from 'react';
import { Card } from 'components/DS';
import CandidateInfo from 'components/CandidateInfo';

const CandidateCard = memo((candidate: CandidateData) => {
  const {
    name,
    email,
    birth_date,
    year_of_experience,
    position_applied,
    application_date,
    status,
  } = candidate;

  return (
    <Card withPadding={false}>
      <CandidateInfo
        name={name}
        email={email}
        birthDate={birth_date}
        yearsOfExperience={year_of_experience}
        positionApplied={position_applied}
        applicationDate={application_date}
        status={status}
      />
    </Card>
  );
});

export default CandidateCard;
