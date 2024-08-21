import { Route, Routes } from "react-router-dom";
import Homepage from "../pages/Client/home/Homepage";
import PhimBo from "@/pages/Client/Phimbo";
import PhimLe from "@/pages/Client/Phimle";
const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />}></Route>
      <Route path="/phimle" element={<PhimLe/>}></Route>
      <Route path="/phimbo" element={<PhimBo/>}></Route>
    </Routes>
  );
};

export default Router;
