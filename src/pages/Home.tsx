import React, { useContext, useEffect, useRef, useState } from "react";
import Categories from "../components/categories/Categories";
import Sort, { sortList } from "../components/sort/Sort";
import Skeleton from "../components/pizzaBlock/Skeleton";
import PizzaBlock from "../components/pizzaBlock/PizzaBlock";
import axios from "axios";
import qs from "qs";
import { SearchContext } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryId, setFilters } from "../redux/slices/filterSlice";
import { useNavigate } from "react-router-dom";
import {  fetchPizzas } from "../redux/slices/pizzasSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const isInitialLoad = useRef(true)

  const { categoryId, sort } = useSelector((state) => state.filter);
  const {pizzas} = useSelector((state) => state.pizza);
  const { searchValue, handlerLogo } = useContext(SearchContext);
  const category = categoryId > 0 ? "category=" + categoryId : "";
  
  const [isLoading, setIsLoading] = useState(true);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const getPizzas = async () => {
    setIsLoading(true);

    try{
      // const { data } = await axios.get(
      //   `https://6525522667cfb1e59ce71807.mockapi.io/items?${category}&sortBy=${sort.sortProperty}&order=${sort.filter}`
      // )
      // dispatch(setItems(data))
      dispatch(fetchPizzas({
        sort,
        category,
        // searchValue,
        // categoryId,
      }))
    }catch(error){
      console.error("Ошибка при выполнении запроса:", error);
    }finally{
      setIsLoading(false);
    }

    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const params = qs.parse(window.location.search, {
      ignoreQueryPrefix: true,
    });

    if (Object.keys(params).length > 0) {
      const sort = sortList.find(
        (obj) => obj.sortProperty === params.sortProperty
      );

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
    }
  }, []);

  useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        filter: sort.filter,
        categoryId,
      });

      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [categoryId, sort.sortProperty, sort.filter]);

  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }

    navigate("");
  }, [handlerLogo]);

  // console.log(pizzas)
  const pizzaItems = pizzas
    .filter((el) => {
      if (el.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      return false;
    })
    .map((item) => <PizzaBlock key={item.id} {...item} />);

  const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzaItems}</div>
    </div>
  );
};

export default Home;
