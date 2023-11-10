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
import { setItems } from "../redux/slices/pizzasSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const isInitialLoad = useRef(true)

  const { categoryId, sort } = useSelector((state) => state.filter);
  const {pizzas} = useSelector((state) => state.pizza);

  const { searchValue, handlerLogo } = useContext(SearchContext);
  
  console.log(pizzas, 123)
  // const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const category = categoryId > 0 ? "category=" + categoryId : "";

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const fetchPizzas = () => {
    setIsLoading(true);

    axios
      .get(
        `https://6525522667cfb1e59ce71807.mockapi.io/items?${category}&sortBy=${sort.sortProperty}&order=${sort.filter}`
      )
      .then((response) => {
        console.log(response.data, 55)
        dispatch(setItems(response.data))
        // setPizzas(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Ошибка при выполнении запроса:", error);
      });
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
      fetchPizzas();
    }
    isSearch.current = false;
    window.scrollTo(0, 0);
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
