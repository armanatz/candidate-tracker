import classNames from 'classnames';
import styles from './Card.module.scss';

interface CardProps extends React.PropsWithChildren {
  withPadding?: boolean;
}

function Card({ children, withPadding }: CardProps) {
  return (
    <div
      className={classNames(styles.card, {
        [`${styles.padding}`]: withPadding,
      })}
    >
      {children}
    </div>
  );
}

Card.defaultProps = {
  withPadding: true,
};

export default Card;
