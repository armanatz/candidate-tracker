import classNames from 'classnames';
import styles from './FormControl.module.scss';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  name: React.ReactNode;
}

interface FormControlProps extends React.PropsWithChildren {
  children: React.ReactNode;
  inline?: boolean;
  labelProps?: LabelProps;
  className?: string;
}

function FormControl(props: FormControlProps) {
  const { children, labelProps, inline, className } = props;

  return (
    <div
      className={classNames(styles['form-control'], {
        [`${styles.inline}`]: inline,
        [`${className}`]: className,
      })}
    >
      {labelProps?.name ? (
        <label {...labelProps} className={styles.label}>
          {labelProps.name}
        </label>
      ) : null}
      {children}
    </div>
  );
}

FormControl.defaultProps = {
  inline: false,
  labelProps: undefined,
  className: undefined,
};

export default FormControl;
