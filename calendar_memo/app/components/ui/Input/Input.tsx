import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form"

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
    <div className="mt-3">
      <p>
        {errors[id] && `${errors[id]}`}
      </p>
      <label htmlFor={id} className="mt">{label}</label>
      {type === "textarea"
        ? <textarea
          className="w-full border mt-1 leading-6 h-60"
          disabled={disabled}
          id={id}
          {...register(id, { required })}
        />
        : <input
          className="w-full border mt-1"
          disabled={disabled}
          type={type}
          id={id}
          {...register(id, { required })}
        />
      }
    </div>
  )
}

export default Input