import ShopHome from "../ShopHome";
import styles from "../../styles/AboutUs.module.css"
import ShopLayout from "./ShopLayout";
import { useEffect, useState } from "react";
import axios from "axios";
const AboutUs = () => {
  return <ShopLayout context={
    <div  className={styles["AboutUs-Container"]}>
    <div className={styles["About-Us-Margin"]}>
      <h1>About Us</h1>
    </div>
    <div className={styles["About-Us-Margin"]}>
      HOT DEALS 4 LESS STORE
      85,503 sales
    </div>

    <div className={styles["About-Us-Margin"]}>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio corrupti error consequatur esse eos eum architecto, non quisquam ex, quod vitae perferendis placeat nostrum, nemo rerum officiis neque cupiditate maiores.
    </div>

    <div className={styles["About-Us-Margin"]}>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere maxime saepe atque corporis non mollitia architecto expedita tenetur dolores impedit.
    </div>

    </div>


  }></ShopLayout>;
};

export default AboutUs;
