"use client"
import { useState, useCallback } from "react"
import clsx from "clsx";
import { Memo } from "@prisma/client"
import { CiPen } from "react-icons/ci";

import MemoFormModal from "@/app/components/modals/MemoFormModal"

type Props = { memoData: Memo, year: number, month: number, day: number }

// const Memo = ({ memoData, year, month, day }: Props) => {
const Memo = ({ memoData, year, month, day }: Props) => {
  const [modal, setModal] = useState("CLOSE")

  const toggleModal = useCallback(() => {
    if (modal === "CLOSE") {
      setModal("OPEN")
    }
    if (modal === "OPEN") {
      setModal("CLOSE")
    }
  }, [modal])

  const onClose = () => {
    setModal("CLOSE")
  }

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-center text-3xl">
        <span>{year}</span>.
        <span>{month}</span>.
        <span>{day}</span>
      </h2>

      <div className="
        rounded-full 
        text-right
        mt-5
        ">
        <button onClick={() => toggleModal()}>
          <CiPen size={30} className="rotate-[270deg] " />
        </button>
      </div>

      <div className="
        border-2
        min-h-[500px] 
        max-w-xl 
        mx-auto 
        mt-2 
        p-2
        "
      >
        <h3>{memoData && memoData.title}</h3>
        <p className="break-words">
          {memoData
            ? memoData.content
            : ""
          }
        </p>
        <div className={clsx(
          "relative w-full transition duration-500 ease-in-out ",
          modal === "OPEN" ? "opacity-100 z-10" : " opacity-0 z-0 "
        )}
        >
          <MemoFormModal
            year={year}
            month={month}
            day={day}
            onClose={onClose}
            memoData={memoData}
            disabled={modal === "CLOSE"}
          />
        </div>
      </div>
    </div>
  )
}

export default Memo