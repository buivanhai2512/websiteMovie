import { Route, Routes } from "react-router-dom"
import Homepage from "../pages/Client/home/Homepage"

const Router = () => {
  return (
    <Routes>
    <Route path="/" element={<Homepage/>}>
    </Route>
  </Routes>
  )
}

export default Router