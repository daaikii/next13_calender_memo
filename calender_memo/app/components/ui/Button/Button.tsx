import { IconType } from "react-icons"

import styles from "./Button.module.scss"

type ButtonProps = {
  icon?: IconType
  label: string
  type: "button" | "submit" | "reset",
  disabled: boolean
}

const Button = ({ icon: Icon, label, type, disabled }: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={styles.button}
    >
      {Icon && <Icon />}
      {label}
    </button>
  )
}

export default Button