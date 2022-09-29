import { IconMail } from '@tabler/icons';
import classNames from 'classnames';

import {
  calculateAge,
  prettyDate,
  toTitleCase,
} from '../../utils';

import styles from './CandidateInfo.module.scss';

// TODO: There should be a better way to merge the CandidateData type with this...
type CandidateInfoProps = {
  name: string;
  email: string;
  birthDate: string;
  yearsOfExperience: number;
  positionApplied: string;
  applicationDate: string;
  status: string;
};

export default function CandidateInfo({
  name,
  email,
  birthDate,
  yearsOfExperience,
  positionApplied,
  applicationDate,
  status,
}: CandidateInfoProps) {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.bio}>
          <div>
            <h2>{name}</h2>
          </div>
          <div className={styles.email}>
            <IconMail />
            <a href={`mailto:${email}`}>{email}</a>
          </div>
        </div>
        <div className={styles.info}>
          <div>
            <p className={styles.topic}>Position</p>
            <p>{positionApplied}</p>
          </div>
          <div>
            <p className={styles.topic}>Experience</p>
            <p>
              {yearsOfExperience}{' '}
              {yearsOfExperience > 1 &&
              yearsOfExperience !== 0
                ? 'years'
                : 'year'}
            </p>
          </div>
          <div>
            <p className={styles.topic}>Applied On</p>
            <p>{prettyDate(applicationDate)}</p>
          </div>
          <div>
            <p className={styles.topic}>Age</p>
            <p>{calculateAge(birthDate)}</p>
          </div>
        </div>
      </div>
      <div className={styles['status-container']}>
        <div
          className={classNames(
            styles.status,
            { [`${styles.waiting}`]: status === 'waiting' },
            {
              [`${styles.approved}`]: status === 'approved',
            },
            {
              [`${styles.rejected}`]: status === 'rejected',
            },
          )}
        >
          <b>{toTitleCase(status)}</b>
        </div>
      </div>
    </>
  );
}
