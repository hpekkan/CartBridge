import React from "react"
import Link from "next/link"
import {  PageBody } from "../style"
import Navigation from "../components/Navigation/navigation"

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Navigation/>
      <PageBody>{children}</PageBody>
    </React.Fragment>
  )
}

export default Layout