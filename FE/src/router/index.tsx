import { Route, Routes } from "react-router-dom";
import Homepage from "../pages/Client/home/Homepage";
import PhimBo from "@/pages/Client/Phimbo";
import PhimLe from "@/pages/Client/Phimle";
import Top10 from "@/components/Top10Film";
import Info from "@/components/InfoFilm";
import LayoutWebsite from "@/pages/Client/home/LayoutWebsite";
import Login from "@/pages/Client/users/_components/Login";
import Register from "@/pages/Client/users/_components/Resgister";
import LayoutAdmin from "@/pages/(dashboard)/LayoutAdmin";
const Router = () => {
  return (
      

    <Routes>
    <Route path="/" element={<LayoutWebsite />}></Route>
      <Route index element={<Homepage/>} />
      <Route path="/phimle" element={<PhimLe/>}></Route>
      <Route path="/phimbo" element={<PhimBo/>}></Route>
      <Route path="/top10" element={<Top10/>}></Route>
      <Route path="/info" element={<Info/>}></Route>
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
