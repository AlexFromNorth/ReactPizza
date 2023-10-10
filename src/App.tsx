import axios from "axios";
import Categories from "./components/categories/Categories";
import Header from "./components/header/Header";
import PizzaBlock from "./components/pizzaBlock/PizzaBlock";
import Sort from "./components/sort/Sort";
import "./scss/app.scss";
// import { pizzas } from "./assets/pizzas.json";
import { useEffect, useState } from "react";

function App() {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    axios.get("https://6525522667cfb1e59ce71807.mockapi.io/items")
      .then((response) => {
        setPizzas(response.data);
      })
      .catch((error) => {
        console.error("Ошибка при выполнении запроса:", error);
      });
  }, []);

  return (
    <>
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <div className="content__top">
              <Categories />
              <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
              {pizzas.map((item) => (
                <PizzaBlock key={item.id} {...item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
