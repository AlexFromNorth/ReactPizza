import React from "react";

import styles from "./style.module.css";

const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <h1 >
        <span>&#128577;</span>
        <br />
        Ничего не найдено
      </h1>
      <p className={styles.description}>К сожалению данная страница отсутствует в нашем интернет магазине</p>
    </div>
  );
};

export default NotFoundBlock;
