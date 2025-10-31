import styles from "./FormInput.module.css";

interface InputProps {
  name: string;
  label?: string;
  type?: string;
  value: string;
  textarea?: boolean;
  onChange: (field: string, value: string) => void;
  onBlur: (field: string) => void;
  error: string;
  touched: boolean;
}

export default function FormInput({
  name,
  label,
  type,
  textarea,
  value,
  onChange,
  onBlur,
  error,
  touched,
}: InputProps) {
  function handleChange(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) {
    onChange(name, e.target.value);
  }

  return (
    <div className={styles.container}>
      <label className={styles.label}>
        {label}
        {!textarea ? (
          <input
            className={styles.input}
            name={name}
            type={type}
            value={value}
            onChange={handleChange}
            onBlur={() => onBlur(name)}
          />
        ) : (
          <textarea
            className={styles.input}
            name={name}
            value={value}
            onChange={handleChange}
            onBlur={() => onBlur(name)}
          ></textarea>
        )}
      </label>
      <span className={`${styles.error} ${!touched && styles.hide}`}>
        {touched && error}
      </span>
    </div>
  );
}
