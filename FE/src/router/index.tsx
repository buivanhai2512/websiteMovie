import { Route, Routes } from "react-router-dom";
import LayoutWebsite from "../pages/Client/home/LayoutWebsite";
import Login from "@/pages/Client/users/_components/Login";
import Register from "@/pages/Client/users/_components/Resgister";
import LayoutAdmin from "@/pages/(dashboard)/LayoutAdmin";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<LayoutWebsite />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      <Route path="/admin" element={<LayoutAdmin/>}>
        <Route index element={<LayoutAdmin/>} />
      </Route>
    </Routes>
  );
};

export default Router;
