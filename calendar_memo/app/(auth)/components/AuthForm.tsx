"use client"

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
      router.push("/calendar")
    }
  }, [router, session.status])

  const toggleVariant = useCallback(() => {
    if (valiant === "Login") {
      setValiant("Register")
    } else {
      setValiant("Login")
    }
  }, [valiant])


  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    //ログインの場合
    if (valiant === "Login") {
      setIsLoading(true)
      signIn("credentials", { ...data })
        .then((callback) => {
          if (callback?.error) {
            //エラー文を表示
          }
          if (callback?.ok) {
            router.push("/calendar")
          }
        }
        ).finally(() => setIsLoading(false))
    }

    //レジスターの場合
    if (valiant === "Register") {
      setIsLoading(true)
      axios
        .post("/api/register", data)
        .then(() => signIn("credentials", { ...data, redirect: false }))
        .then((callback) => {
          if (callback?.error) {
            //エラー文を表示
          }
          if (callback?.ok) {
            router.push("/calendar")
          }
        })
        .finally(() => setIsLoading(false))
    }
  }


  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="        
      bg-white
        px-4
        py-8
        shadow
        sm:rounded-lg
        sm:px-10"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=""
        >
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
            label={"name"}
            type={"text"}
            id={"name"}
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
          <Button type="submit" disabled={isLoading} label={valiant === "Register" ? "Register" : "Login"} />
        </form>
        <p onClick={() => toggleVariant()} className="mt-3 cursor-pointer text-blue-200 text-center">
          {valiant === "Register" ? "Login" : "Register"}
        </p>
      </div>
    </div>
  )
}

export default AuthForm