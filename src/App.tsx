import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Scrolltotop from "./components/Scrolltotop";
import Artist from "./pages/Artist";
import Home from "./pages/Home";
import Song from "./pages/Song";
import Error from "./pages/Error";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <section className="flex w-full min-h-screen">
      <Scrolltotop />
      <Sidebar />

      <div className="pl-60 w-full">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/song/:songId/*" element={<Song />} />
          <Route path="/artist/:artistId/*" element={<Artist />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </section>
  );
}

export default App;
