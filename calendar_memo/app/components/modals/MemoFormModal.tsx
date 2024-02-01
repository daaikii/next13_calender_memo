"use client"
import { useState, useEffect } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import axios from "axios"
import Input from "../ui/Input/Input"
import { useRouter } from "next/navigation"
import Button from "../ui/Button/Button"
import { Memo } from "@prisma/client"

type Props = { year: number, month: number, day: number, onClose: () => void, memoData?: Memo, disabled: boolean }

const MemoFormModal = ({ year, month, day, onClose, memoData, disabled }: Props) => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const onSUbmit: SubmitHandler<FieldValues> = (data) => {
    axios.post("/api/memo", { year, month, day, ...data })
      .then(() => {
        router.refresh()
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        setIsLoading(false)
        onClose()
      })
  }

  useEffect(() => {
    setValue('title', memoData?.title)
    setValue('content', memoData?.content)
  }, [])

  return <>
    <form
      onSubmit={handleSubmit(onSUbmit)}
      className="
      absolute
      top-0
      left-0
      max-w-xl
      w-full 
      h-full 
      bg-white 
      p-2
      "
    >
      <Input
        type="text"
        label="title"
        id="title"
        disabled={isLoading || disabled}
        required={true}
        register={register}
        errors={errors}
      />
      <Input
        type="textarea"
        label="content"
        id="content"
        disabled={isLoading || disabled}
        required={true}
        register={register}
        errors={errors}
      />
      <Button label="SUBMIT" type="submit" disabled={isLoading || disabled} />
    </form>
  </>
}


export default MemoFormModal