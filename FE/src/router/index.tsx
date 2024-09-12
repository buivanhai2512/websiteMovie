import { Route, Routes } from "react-router-dom"
import LayoutWebsite from "../pages/Client/home/LayoutWebsite"
import Login from "@/pages/Client/users/_components/Login"
import Register from "@/pages/Client/users/_components/Resgister"

const Router = () => {
  return (
    <Routes>
    <Route path="/" element={<LayoutWebsite/>}>
    <Route path="/login" element={<Login/>} />
    <Route path="/register" element={<Register/>} />
    </Route>
  </Routes>
  )
}

export default Router