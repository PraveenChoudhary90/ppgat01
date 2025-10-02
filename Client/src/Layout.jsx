import React from 'react'
import TopNav from './Components/TopNav'
import Footer from './Components/Footer'
import {Outlet} from "react-router-dom";
function Layout() {
  return (
    <>
    <TopNav/>
    <main style={{margin:"40px"}}>
        <Outlet/>
    </main>
    <Footer/>

   </>
)
}

export default Layout