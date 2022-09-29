import { IconUsers } from '@tabler/icons';

import useGetCandidates from '../../hooks/queries/candidates';

import { Card } from '../../components/DS';

import FullPageLoader from '../../components/FullPageLoader';
import CandidateInfo from '../../components/CandidateInfo';

import styles from './Home.module.scss';

export default function Home() {
  const { data: candidates, status: candidatesStatus } =
    useGetCandidates();

  if (candidatesStatus === 'loading') {
    return <FullPageLoader />;
  }

  let candidateList = null;

  if (candidatesStatus !== 'error') {
    candidateList = candidates.data?.map(candidate => (
      <Card withPadding={false} key={candidate.id}>
        <CandidateInfo
          name={candidate.name}
          email={candidate.email}
          birthDate={candidate.birth_date}
          yearsOfExperience={candidate.year_of_experience}
          positionApplied={candidate.position_applied}
          applicationDate={candidate.application_date}
          status={candidate.status}
        />
      </Card>
    ));
  }

  return (
    <div>
      <div className={styles.title}>
        <IconUsers stroke={2.5} />
        <h1>Applicants</h1>
      </div>
      <div className={styles['grid-container']}>
        <div className={styles.grid}>{candidateList}</div>
      </div>
    </div>
  );
}
