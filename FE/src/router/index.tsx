import { Route, Routes } from "react-router-dom";
import Homepage from "../pages/Client/home/Homepage";
import PhimBo from "@/pages/Client/Phimbo";
import PhimLe from "@/pages/Client/Phimle";
import Top10 from "@/components/Top10Film";
import Info from "@/components/InfoFilm";
const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />}></Route>
      <Route path="/phimle" element={<PhimLe/>}></Route>
      <Route path="/phimbo" element={<PhimBo/>}></Route>
      <Route path="/top10" element={<Top10/>}></Route>
      <Route path="/info" element={<Info/>}></Route>
    </Routes>
  );
};

export default Router;
