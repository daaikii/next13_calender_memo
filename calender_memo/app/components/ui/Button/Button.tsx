import { IconType } from "react-icons"

type ButtonProps = {
  label: string
  type: "button" | "submit" | "reset",
  disabled: boolean
  icon?: IconType
}

const Button = ({ icon: Icon, label, type, disabled }: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className="p-1 border rounded-xl mt-6 min-w-full"
    >
      {Icon && <Icon />}
      {label}
    </button>
  )
}

export default Button