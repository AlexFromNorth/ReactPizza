import axios from "axios";
import Categories from "./components/categories/Categories";
import Header from "./components/header/Header";
import PizzaBlock from "./components/pizzaBlock/PizzaBlock";
import Sort from "./components/sort/Sort";
import "./scss/app.scss";
// import { pizzas } from "./assets/pizzas.json";
import React, { createContext, useEffect, useState } from "react";
import Skeleton from "./components/pizzaBlock/Skeleton";
import Home from "./pages/Home";
import NotFoundBlock from "./components/notFoundBlock/NotFoundBlock";
import NotFound from "./pages/NotFound";
import { Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "./redux/slices/filterSlice";

export const SearchContext = createContext();
function App() {
  const [searchValue, setSearchValue] = useState("");

  const filter = useSelector((state) => state.filter.value);
  const dispatch = useDispatch();

  return (
    <div className="wrapper">
      {/*  */}
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{filter}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
      {/*  */}
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
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
