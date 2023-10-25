import Header from "./components/header/Header";
import "./scss/app.scss";
// import { pizzas } from "./assets/pizzas.json";
import React, { createContext, useEffect, useState } from "react";
import Skeleton from "./components/pizzaBlock/Skeleton";
import Home from "./pages/Home";
import NotFoundBlock from "./components/notFoundBlock/NotFoundBlock";
import NotFound from "./pages/NotFound";
import { Route, Routes } from "react-router-dom";
import Cart from "./pages/cart/cart";

export const SearchContext = createContext();

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [handlerLogo, setHandlerLogo] = useState(false)

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue, handlerLogo, setHandlerLogo }}>
        <Header />
        <div className="content">
          {/* <div className="container"> */}
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
          {/* </div> */}
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
