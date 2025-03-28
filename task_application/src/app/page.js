'use client'

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Provider } from 'react-redux';
import { store } from './state/store';
import Image from "next/image";
import AllTasksPage from "./login/page";
import StaffPage from './dashboard/staff/page';
import MetricsPage from './dashboard/metrics/page';
import Tabs from "./components/Tabs";



export default function Home() {
  
  const router = useRouter()

  useEffect(() => {
    router.push("/login")
  }, [router])
  
  
  return (
        <>
          
        </>
  );
}
