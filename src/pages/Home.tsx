import React, { useContext, useEffect, useState } from "react";
import Categories from "../components/categories/Categories";
import Sort from "../components/sort/Sort";
import Skeleton from "../components/pizzaBlock/Skeleton";
import PizzaBlock from "../components/pizzaBlock/PizzaBlock";
import axios from "axios";
import { SearchContext } from "../App";


const Home = () => {
  const {searchValue} = useContext(SearchContext)

  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const category = categoryId > 0 ? "category=" + categoryId : "";
  // const search = searchValue ? "&search=" + searchValue : "";
  const [sortType, setSortType] = useState({
    name: "популярности",
    sortProperty: "rating",
    filter: "desc",
  });

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(
        `https://6525522667cfb1e59ce71807.mockapi.io/items?${category}&sortBy=${sortType.sortProperty}&order=${sortType.filter}`
        // `https://6525522667cfb1e59ce71807.mockapi.io/items?${category}&sortBy=${sortType.sortProperty}&order=${sortType.filter}${search}`
      )
      .then((response) => {
        setPizzas(response.data);
        // setTimeout(() => {
        setIsLoading(false);
        // }, 3000);
      })
      .catch((error) => {
        console.error("Ошибка при выполнении запроса:", error);
      });

    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue]);

  const pizzaItems = pizzas
    .filter((el) => {
      if (el.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      return false;
    })
    .map((item) => <PizzaBlock key={item.id} {...item} />);
  // const pizzaItems = pizzas.map((item) => (
  //   <PizzaBlock key={item.id} {...item} />
  // ));
  const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={(i) => setCategoryId(i)}
        />
        <Sort value={sortType} onChangeSort={(i) => setSortType(i)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzaItems}</div>
    </div>
  );
};

export default Home;
