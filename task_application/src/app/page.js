'use client'

import React from 'react';
import { Provider } from 'react-redux';
import { store } from './state/store';
import Image from "next/image";
import AllTasksPage from "./pages/all-tasks";
import StaffPage from './pages/staff';
import MetricsPage from './pages/metrics';
import Tabs from "./components/Tabs";
import ClientProvider from './ClientProvider';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


export default function Home() {
  return (
    <ClientProvider>
      <Router>
        <>
          <Tabs/>
          <Routes>
            <Route path="/all-tasks" element={<AllTasksPage/>}/>
            <Route path="/staff" element={<StaffPage/>}/>
            <Route path="/metrics" element={<MetricsPage/>}/>
            <Route path="/" element={<AllTasksPage/>}/>
          </Routes>
        </>
      </Router>
    </ClientProvider>
  );
}
