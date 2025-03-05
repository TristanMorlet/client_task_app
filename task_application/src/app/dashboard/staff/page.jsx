'use client'
import dynamic from "next/dynamic"

const StaffPage = dynamic(() => import ('./Staff'), {
    ssr: false
})


export default function Staff() {
    return (
      <StaffPage />
    )
}