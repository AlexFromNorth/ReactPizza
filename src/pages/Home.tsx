import React, { useContext, useEffect, useState } from "react";
import Categories from "../components/categories/Categories";
import Sort from "../components/sort/Sort";
import Skeleton from "../components/pizzaBlock/Skeleton";
import PizzaBlock from "../components/pizzaBlock/PizzaBlock";
import axios from "axios";
import { SearchContext } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryId } from '../redux/slices/filterSlice'

const Home = () => {
  const dispatch = useDispatch()
  const {categoryId, sort} = useSelector((state) => state.filter);


  // переделать searchValue и убрать юзКонтекст
  const { searchValue } = useContext(SearchContext);
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const category = categoryId > 0 ? "category=" + categoryId : "";


  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id))
  }

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(
        `https://6525522667cfb1e59ce71807.mockapi.io/items?${category}&sortBy=${sort.sortProperty}&order=${sort.filter}`
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
  }, [categoryId, sort, searchValue]);

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
          onChangeCategory={onChangeCategory}
        />
        <Sort  />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzaItems}</div>
    </div>
  );
};

export default Home;
