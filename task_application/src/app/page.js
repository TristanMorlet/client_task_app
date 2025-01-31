import React from 'react';
import { Provider } from 'react-redux';
import { store } from './state/store';
import Image from "next/image";
import AllTasksPage from "./pages/AllTasksPage";
import Tabs from "./components/Tabs";
import ClientProvider from './ClientProvider';

export default function Home() {
  return (
    <ClientProvider>
      <>
        <Tabs/>
        <AllTasksPage/>
      </>
    </ClientProvider>
  );
}
