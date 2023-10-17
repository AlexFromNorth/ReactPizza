import React, { useEffect, useState } from "react";
import Categories from "../components/categories/Categories";
import Sort from "../components/sort/Sort";
import Skeleton from "../components/pizzaBlock/Skeleton";
import PizzaBlock from "../components/pizzaBlock/PizzaBlock";
import axios from "axios";

const Home = () => {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({name: "популярности", sortProperty: "rating", filter: "desc"});


  useEffect(() => {
    setIsLoading(true);

    axios
      .get(`https://6525522667cfb1e59ce71807.mockapi.io/items?${categoryId > 0 ? 'category=' + categoryId : ''}&sortBy=${sortType.sortProperty}&order=${sortType.filter}`)
      .then((response) => {
        // setTimeout(() => {
          setPizzas(response.data);
          setIsLoading(false);
        // }, 600);
      })
      .catch((error) => {
        console.error("Ошибка при выполнении запроса:", error);
      });

    window.scrollTo(0, 0);
  }, [categoryId, sortType]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={(i)=>setCategoryId(i)}/>
        <Sort value={sortType} onChangeSort={(i)=>setSortType(i)}/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
          : pizzas.map((item) => <PizzaBlock key={item.id} {...item} />)}
      </div>
    </div>
  );
};

export default Home;
