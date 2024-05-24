import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Player from "./components/Player";
import Scrolltotop from "./components/Scrolltotop";
import Sidebar from "./components/Sidebar";
import Error from "./modules/Error";
import Favourites from "./modules/Favourites";
import Genre from "./modules/Genre";
import Home from "./modules/Home";
import Search from "./modules/Search";
import Artist from "./modules/artist/Artist";
import Library from "./modules/library/Library";
import Album from "./modules/album/Album";
import Playlist from "./modules/playlist/Playlist";

function App() {
  return (
    <section className="flex w-full min-h-screen flex-col ">
      <Scrolltotop />
      <Navbar />

      <Sidebar />
      <div className="pl-60 w-full pb-24">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/genre" element={<Genre />} />
          <Route path="/library" element={<Library />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/artist/:artistId/*" element={<Artist />} />
          <Route path="/album/:albumId/*" element={<Album />} />
          <Route path="/playlist/:playlistId/*" element={<Playlist />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
      <Player />
    </section>
  );
}

export default App;
