import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const Navbar = () => {
  const { search, setSearch, theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <div
      className={`sm:flex sm:px-8 z-50 px-4 py-4 sm:justify-between sm:items-center dark:bg-orange-700 bg-orange-400 text-white sticky top-0`}
    >
      <Link to={"/"} className="font-bold text-lg">
        MusicREPO
      </Link>
      <div className="flex border border-gray-200 px-2 py-2 items-center sm:w-96">
        <form
          className="w-full"
          onSubmit={(e) => {
            e.preventDefault();
            navigate("/");
          }}
        >
          <input
            className="dark:bg-orange-700 bg-orange-400  mx-2 outline-none w-full placeholder:text-white"
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>

        <FaSearch
          className="cursor-pointer"
          onClick={() => navigate("/")}
          size={20}
        />
      </div>
      <div
        className="bg-orange-500  hover:bg-orange-600 cursor-pointer p-2 rounded-[50%] fixed bottom-16 right-4 z-90 sm:static"
        onClick={() => {
          if (theme === "light") {
            localStorage.setItem("theme", "dark");
            toggleTheme();
          } else {
            localStorage.setItem("theme", "light");
            toggleTheme();
          }
        }}
      >
        {theme === "light" ? (
          <MdLightMode size={20} />
        ) : (
          <MdDarkMode size={20} />
        )}
      </div>
    </div>
  );
};

export default Navbar;
