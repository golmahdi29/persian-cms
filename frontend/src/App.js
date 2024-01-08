import React from "react";
import SideBar from "./Components/Sidebar/SideBar";
import Header from "./Components/Header/Header";
import routes from "./Routes";
import { useRoutes } from 'react-router-dom'
import './App.css'

function App() {

  const router = useRoutes(routes)

  return (
    <>
      <SideBar />

      <div className="main">
        <Header />

        <div className="contaner mt-5">
          {router}
        </div>
      </div>
    </>
  );
}

export default App;
