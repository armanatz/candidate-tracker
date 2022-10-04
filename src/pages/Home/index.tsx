import { useContext } from 'react';
import { IconUsers } from '@tabler/icons';

import CandidatesContext from '../../contexts/Candidates';

import {
  useFilterCandidates,
  useGetCandidates,
  useSortCandidates,
} from '../../hooks';

import CandidateCard from '../../components/Home/CandidateCard';
import ActionArea from '../../components/Home/ActionArea';
import FullPageLoader from '../../components/FullPageLoader';

import styles from './Home.module.scss';

export default function Home() {
  const { sortBy, candidates, setCandidates, filters } =
    useContext(CandidatesContext);
  const sortCandidates = useSortCandidates();
  const filterCandidates = useFilterCandidates();

  const handleQuerySuccess = (res: GetCandidatesResponse) => {
    let { data } = res;

    if (sortBy.key !== 'none') {
      data = sortCandidates({
        data,
        saveData: false,
        sortKey: sortBy.key,
        sortDir: sortBy.dir,
      });
    }

    if (Object.keys(filters).length !== 0) {
      data = filterCandidates({
        data,
        saveData: false,
        filters,
      });
    }

    if (data) {
      setCandidates(data);
    }
  };

  const { data: fetchedCandidates, status: candidatesStatus } =
    useGetCandidates({
      retry: 2,
      onSuccess: handleQuerySuccess,
    });

  if (candidatesStatus === 'loading') {
    return <FullPageLoader />;
  }

  let candidateList: JSX.Element[] = [];

  const renderListFromContext =
    candidates.length !== 0 ||
    (candidatesStatus === 'success' &&
      candidates.length === 0 &&
      (sortBy.key !== 'none' || Object.keys(filters).length !== 0));

  const renderListFromQuery =
    sortBy.key === 'none' &&
    Object.keys(filters).length !== 0 &&
    fetchedCandidates &&
    fetchedCandidates.data &&
    candidatesStatus === 'success';

  if (renderListFromContext) {
    candidateList = candidates.map(candidate => (
      <CandidateCard key={candidate.id} {...candidate} />
    ));
  } else if (renderListFromQuery) {
    candidateList = fetchedCandidates.data?.map(candidate => (
      <CandidateCard key={candidate.id} {...candidate} />
    )) as JSX.Element[];
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
      <div className={styles.main}>
        <h2 className={styles.total}>
          Total ({candidates.length}/{fetchedCandidates?.data?.length})
        </h2>
        <div className={styles['grid-container']}>
          {candidateList?.length !== 0 ? (
            <div className={styles.grid}>{candidateList}</div>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <p>No candidates found</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
