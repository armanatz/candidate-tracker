import { useContext } from 'react';
import { IconUsers } from '@tabler/icons';

import CandidatesContext from '../../contexts/Candidates';

import useGetCandidates from '../../hooks/queries/candidates';

import CandidateCard from '../../components/Home/CandidateCard';
import ActionArea from '../../components/Home/ActionArea';

import styles from './Home.module.scss';

export default function Home() {
  const { sortBy, setSortBy, setCandidatesCached } =
    useContext(CandidatesContext);

  const { data: candidates, status: candidatesStatus } = useGetCandidates({
    onSuccess: data => {
      if (sortBy.key !== 'none') {
        setSortBy(currentState => ({
          ...currentState,
          key: 'none',
        }));
      }

      if (data.data) {
        setCandidatesCached(data.data);
      }
    },
  });

  let candidateList: JSX.Element | JSX.Element[] = <p>Loading...</p>;

  if (candidatesStatus === 'success' && candidates.data) {
    candidateList = candidates.data?.map(candidate => (
      <CandidateCard key={candidate.id} {...candidate} />
    ));
  }

  return (
    <>
      <div className={styles.header}>
        <div className={styles.title}>
          <IconUsers stroke={2.5} />
          <h1>Applicants</h1>
        </div>
        <ActionArea />
      </div>
      <div className={styles['grid-container']}>
        <div className={styles.grid}>{candidateList}</div>
      </div>
    </>
  );
}
