declare const classNames: {
  readonly container: 'container';
  readonly bio: 'bio';
  readonly email: 'email';
  readonly info: 'info';
  readonly topic: 'topic';
  readonly 'status-container': 'status-container';
  readonly status: 'status';
  readonly approved: 'approved';
  readonly waiting: 'waiting';
  readonly rejected: 'rejected';
};
export default classNames;
export type ClassNames =
  | 'container'
  | 'bio'
  | 'email'
  | 'info'
  | 'topic'
  | 'status-container'
  | 'status'
  | 'approved'
  | 'waiting'
  | 'rejected';
