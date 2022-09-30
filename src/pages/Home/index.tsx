import { useState } from 'react';
import { IconUsers } from '@tabler/icons';

import useGetCandidates from '../../hooks/queries/candidates';

import { Card, Select, Option } from '../../components/DS';

import CandidateInfo from '../../components/CandidateInfo';

import styles from './Home.module.scss';

export default function Home() {
  const [sortBy, setSortBy] = useState('none');

  const { data: candidates, status: candidatesStatus } =
    useGetCandidates();

  const sortCandidates = (value: string) => {
    setSortBy(value);
  };

  let candidateList: JSX.Element | JSX.Element[] = (
    <p>Loading...</p>
  );

  if (candidatesStatus === 'success' && candidates.data) {
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
      <div className={styles['action-area']}>
        <div className={styles.title}>
          <IconUsers stroke={2.5} />
          <h1>Applicants</h1>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5em',
          }}
        >
          <p>Sort By:</p>
          <Select
            label="Sort by"
            placeholder="Select sorting..."
            value={sortBy}
            onChange={sortCandidates}
          >
            <Option value="none">None</Option>
            <Option value="position_applied">
              Position Applied
            </Option>
            <Option value="year_of_experience">
              Years of Experience
            </Option>
            <Option value="application_date">
              Application Date
            </Option>
          </Select>
        </div>
      </div>
      <div className={styles['grid-container']}>
        <div className={styles.grid}>{candidateList}</div>
      </div>
    </div>
  );
}
