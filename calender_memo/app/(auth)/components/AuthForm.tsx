import { useState, useEffect, useCallback } from "react"
import { useForm, FieldValues, SubmitHandler } from "react-hook-form"
import { useSession, signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import axios from "axios"

import Input from "@/app/components/ui/Input/Input"
import Button from "@/app/components/ui/Button/Button"

type Variant = "Login" | "Register"

const AuthForm = () => {
  const session = useSession()
  const router = useRouter()
  const [valiant, setValiant] = useState<Variant>("Login")
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm()

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/calender")
    }
  }, [router, session.status])

  const toggleValiant = useCallback(() => {
    if (valiant === "Login") {
      setValiant("Register")
    } else {
      setValiant("Login")
    }
  }, [valiant])


  const onSubmit: SubmitHandler<FieldValues> = async (data: FieldValues) => {
    //ログインの場合
    if (valiant === "Login") {
      setIsLoading(true)
      signIn("credentials", { ...data })
        .then((callback) => {
          if (callback?.error) {
            //エラー文を表示
          }
          if (callback?.ok) {
            router.push("/calender")
          }
        }
        ).finally(() => setIsLoading(false))
    }

    //レジスターの場合
    if (valiant === "Register") {
      setIsLoading(true)
      axios.post("/app/api/register", data)
        .then(() => signIn("credentials", { ...data, redirect: false }))
        .then((callback) => {
          if (callback?.error) {
            //エラー文を表示
          }
          if (callback?.ok) {
            router.push("/calender")
          }
        })
        .finally(() => setIsLoading(false))
    }
  }


  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {valiant === "Register" &&
          <Input
            register={register}
            disabled={isLoading}
            required
            errors={errors}
            label={"email"}
            type={"text"}
            id={"email"}
          />
        }
        <Input
          register={register}
          disabled={isLoading}
          required
          errors={errors}
          label={"id"}
          type={"text"}
          id={"id"}
        />
        <Input
          register={register}
          disabled={isLoading}
          required
          errors={errors}
          label={"password"}
          type={"password"}
          id={"password"}
        />
        <Button type="submit" disabled={isLoading} label="SUBMIT" />
      </form>
      <p onClick={() => toggleValiant()}>
        {valiant === "Register" ? "Login" : "Register"}
      </p>
    </>
  )
}

export default AuthForm