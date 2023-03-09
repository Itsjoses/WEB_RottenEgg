import WishListHome from "./WishListHome";
import styles from "@/styles/WishListPublic.module.css";
import RightCard from "../GlobalComponent/RightCardWishList";

const WishListPublic = () => {
  return (
    <WishListHome
      content={
        <div>
          <div className={styles["Full-Container"]}>
            <div className={styles["Half-Container"]}>
              <div className={styles["Left-Container"]}>
                <div className={styles["Left-Content"]}>
                    <div className={styles["Content-Box"]}>
                        <div className={styles["Top-Head-Content"]}>
                            <h1>Lists Ratings</h1>
                        </div>
                        <div className={styles["Top-Bottom-Content"]}>
                            <div className={styles["Lists-Egg"]}>
                                <div className={styles["Lists-Egg-Checkbox"]}>
                                    <input type="checkbox" />
                                </div>
                                <div className={styles["Lists-Egg-Total"]}>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                </div>
                            </div>
                            <div className={styles["Lists-Egg"]}>
                                <div className={styles["Lists-Egg-Checkbox"]}>
                                    <input type="checkbox" />
                                </div>
                                <div className={styles["Lists-Egg-Total"]}>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                </div>
                            </div>
                            <div className={styles["Lists-Egg"]}>
                                <div className={styles["Lists-Egg-Checkbox"]}>
                                    <input type="checkbox" />
                                </div>
                                <div className={styles["Lists-Egg-Total"]}>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>

                                </div>
                            </div>
                            <div className={styles["Lists-Egg"]}>
                                <div className={styles["Lists-Egg-Checkbox"]}>
                                    <input type="checkbox" />
                                </div>
                                <div className={styles["Lists-Egg-Total"]}>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>

                                </div>
                            </div>
                            <div className={styles["Lists-Egg"]}>
                                <div className={styles["Lists-Egg-Checkbox"]}>
                                    <input type="checkbox" />
                                </div>
                                <div className={styles["Lists-Egg-Total"]}>
                                    <i className="fa-solid fa-star"></i>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles["Content-Box"]}>
                    <div className={styles["Top-Head-Content"]}>
                            <h1>Lists Ratings</h1>
                        </div>
                        <div className={styles["Top-Bottom-Content"]}>
                            <div className={styles["Lists-Egg"]}>
                                <div className={styles["Lists-Egg-Checkbox"]}>
                                    <input type="checkbox" />
                                </div>
                                <div className={styles["Lists-Egg-Total"]}>
                                    $0 - $10
                                </div>
                            </div>
                            <div className={styles["Lists-Egg"]}>
                                <div className={styles["Lists-Egg-Checkbox"]}>
                                    <input type="checkbox" />
                                </div>
                                <div className={styles["Lists-Egg-Total"]}>
                                $10 - $25
                                </div>
                            </div>
                            <div className={styles["Lists-Egg"]}>
                                <div className={styles["Lists-Egg-Checkbox"]}>
                                    <input type="checkbox" />
                                </div>
                                <div className={styles["Lists-Egg-Total"]}>
                                $25 - $50

                                </div>
                            </div>
                            <div className={styles["Lists-Egg"]}>
                                <div className={styles["Lists-Egg-Checkbox"]}>
                                    <input type="checkbox" />
                                </div>
                                <div className={styles["Lists-Egg-Total"]}>
                                $50 - $100

                                </div>
                            </div>
                            <div className={styles["Lists-Egg"]}>
                                <div className={styles["Lists-Egg-Checkbox"]}>
                                    <input type="checkbox" />
                                </div>
                                <div className={styles["Lists-Egg-Total"]}>
                                $100 - $200
                                </div>
                            </div>
                            <div className={styles["Lists-Egg"]}>
                                <div className={styles["Lists-Egg-Checkbox"]}>
                                    <input type="checkbox" />
                                </div>
                                <div className={styles["Lists-Egg-Total"]}>
                                $200 - $500
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
              <div className={styles["Right-Container"]}>
                <RightCard/>
              </div>
            </div>
          </div>
        </div>
      }
    ></WishListHome>
  );
};

export default WishListPublic;
