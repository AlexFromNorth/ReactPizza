import axios from "axios";
import Categories from "./components/categories/Categories";
import Header from "./components/header/Header";
import PizzaBlock from "./components/pizzaBlock/PizzaBlock";
import Sort from "./components/sort/Sort";
import "./scss/app.scss";
// import { pizzas } from "./assets/pizzas.json";
import { useEffect, useState } from "react";
import Skeleton from "./components/pizzaBlock/Skeleton";
import Home from "./pages/Home";
import NotFoundBlock from "./components/notFoundBlock/NotFoundBlock";
import NotFound from "./pages/NotFound";
import { Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart";

function App() {
  const [searchValue, setSearchValue] = useState('')


  return (
    <>
      <div className="wrapper">
        <Header searchValue={searchValue} setSearchValue={setSearchValue}/>
        <div className="content">
          {/* <div className="container"> */}
            <Routes>
              <Route path="*" element={<NotFound/>}/>
              <Route path="/" element={<Home searchValue={searchValue}/>}/>
              <Route path="/cart" element={<Cart/>}/>
            </Routes>
          {/* </div> */}
        </div>
      </div>
    </>
  );
}

export default App;
