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

function App() {


  return (
    <>
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <Home/>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
