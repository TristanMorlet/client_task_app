'use client'
import dynamic from "next/dynamic"

const MetricsPage = dynamic(() => import ('./Metrics'), {
    ssr: false
})


export default function Metrics() {
    return (
      <MetricsPage />
    )
}