import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Scrolltotop from "./components/Scrolltotop";
import Artist from "./pages/Artist";
import Home from "./pages/Home";
import Song from "./pages/Song";
import Error from "./pages/Error";
import Sidebar from "./components/Sidebar";
import Player from "./components/Player";
import Genre from "./pages/Genre";
import Library from "./pages/Library";
import Favourites from "./pages/Favourites";

function App() {
  return (
    <section className="flex w-full min-h-screen">
      <Scrolltotop />
      <Sidebar />

      <div className="pl-60 w-full pb-24">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/genre" element={<Genre />} />
          <Route path="/library" element={<Library />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/song/:songId/*" element={<Song />} />
          <Route path="/artist/:artistId/*" element={<Artist />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
      <Player />
    </section>
  );
}

export default App;
