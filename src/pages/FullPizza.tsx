import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const FullPizza = () => {
  const [pizza, setPizza] = useState();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get("https://6525522667cfb1e59ce71807.mockapi.io/items/" + id)
      .then((res) => {
        setPizza(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  if(!pizza){
    return (<h2>Загрузка...</h2>)
  }

  return (
    <div className="container center">
      <img src={pizza.imageUrl} alt="picture" />
      <h2 className="mt-10">{pizza.title}</h2>
      <h4 className="mt-10">{pizza.price} руб</h4>
    </div>
  );
};

export default FullPizza;
