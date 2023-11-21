import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form"
import styles from "./Input.module.scss"

type InputProps = {
  register: UseFormRegister<FieldValues>,
  disabled: boolean,
  required?: boolean,
  errors: FieldErrors
  label: string,
  type: string,
  id: string
}

const Input = (
  {
    register,
    disabled,
    required,
    errors,
    label,
    type,
    id
  }: InputProps
) => {
  return (
    <>
      {errors[id]}
      <label htmlFor={id}>{label}</label>
      <input
        className={styles.input}
        disabled={disabled}
        required={required}
        type={type}
        id={id}
        {...register}
      />
    </>
  )
}

export default Input