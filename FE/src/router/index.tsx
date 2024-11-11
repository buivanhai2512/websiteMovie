import { Navigate, Route, Routes } from "react-router-dom";
import Homepage from "../pages/Client/home/_components/Homepage";
import PhimLe from "@/pages/Client/home/_components/Phimle";
import Top10 from "@/components/Top10Film";
import Info from "@/components/InfoFilm";
import LayoutWebsite from "@/pages/Client/home/LayoutWebsite";
import Login from "@/pages/Client/users/_components/Login";
import Register from "@/pages/Client/users/_components/Resgister";
import LayoutAdmin from "@/pages/(dashboard)/LayoutAdmin";
import CreateMovies from "@/pages/(dashboard)/Movies/CreateMovies";
import ListMovies from "@/pages/(dashboard)/Movies/ListMovies";
import NotFound from "@/pages/NotFound";
import ListCountry from "@/pages/(dashboard)/Country/ListCountry";
import CreateCountry from "@/pages/(dashboard)/Country/CreateCountry";
import EditCountry from "@/pages/(dashboard)/Country/EditCountry";
import ListGenres from "@/pages/(dashboard)/Genres/ListGenres";
import CreateGenres from "@/pages/(dashboard)/Genres/CreateGenres";
import EditGenre from "@/pages/(dashboard)/Genres/EditGenres";
import EditMovies from "@/pages/(dashboard)/Movies/EditMovies";
import PrivateRouter from "@/private/PrivateRouter";
import Profile from "@/pages/Client/users/ProfileUser";
import WatchMovie from "@/pages/Client/WatchMovies";
import EpisodeManagement from "@/pages/(dashboard)/Movies/EpisodeManagement";
import ListEpiode from "@/pages/(dashboard)/Movies/ListEpiode";
import EditEpisode from "@/pages/(dashboard)/Movies/EditEpisode";
import ListUsers from "@/pages/(dashboard)/auth/ListUsers";
import Phimbo from "@/pages/Client/home/_components/Phimbo";
import PhimHoatHinh from "@/pages/Client/home/_components/PhimHoatHinh";
const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<LayoutWebsite />}>
        <Route index element={<Homepage />} />
        <Route path="/phim-le" element={<PhimLe />} />
        <Route path="/hoat-hinh" element={<PhimHoatHinh />} />
        <Route path="/phim-le/:slug" element={<WatchMovie />} />
        <Route path="/:slug" element={<WatchMovie />} />
        <Route path="/:slug/:episode" element={<WatchMovie />} />
        <Route path="/phim-bo" element={<Phimbo />} />
        <Route path="/top10" element={<Top10 />} />
        <Route path="/info" element={<Info />} />
        <Route path="/profile/:userId" element={<Profile />} />
        {/* Đường dẫn đăng nhập, đăng ký */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route path="*" element={<NotFound />} />
      {/* Admin routes */}
      <Route path="/admin" element={ <PrivateRouter><LayoutAdmin /></PrivateRouter> }>
        <Route index element={<Navigate to="list-movies" />} />
        <Route path="list-movies" element={<ListMovies />} />
        <Route path="list-users" element={<ListUsers />} />
        <Route path="list-country" element={<ListCountry />} />
        <Route path="list-genres" element={<ListGenres />} />
        <Route path="create-movies" element={<CreateMovies />} />
        <Route path="create-country" element={<CreateCountry />} />
        <Route path="create-tap-phim/:movieSlug" element={<EpisodeManagement/>} />
        <Route path="list-tap-phim/:movieSlug" element={<ListEpiode/>} />
        <Route path="edit-tap-phim/:slug" element={<EditEpisode />} />
        <Route path="create-genres" element={<CreateGenres />} />
        <Route path="edit/:slug/country" element={<EditCountry />} />
        <Route path="edit/:slug/movies" element={<EditMovies />} />
        <Route path="edit/:slug/genres" element={<EditGenre />} />
      </Route>
    </Routes>
  );
};

export default Router;
