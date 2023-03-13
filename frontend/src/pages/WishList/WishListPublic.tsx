import WishListHome from "./WishListHome";
import styles from "@/styles/WishListPublic.module.css";
import RightCard from "../GlobalComponent/RightCardWishList";
import { useEffect, useState } from "react";
import CardWishList from "../GlobalComponent/CardWishListComponent";
import axios from "axios";

const WishListPublic = () => {
    const [wishlist,setwishlist] = useState([])
    useEffect(() =>{
        const getData = async () => {
            const profile = sessionStorage.getItem("ID");
            if (profile != null) {
              const PublicWishList = await axios.post("http://localhost:8080/query", {
                query: `
                      query getPublic($id: String!){
                          GetPublicWishList(id: $id){
                            id
                            Name
                            Privacy
                            WishListDetails{
                                    Product{
                                ProductName
                                ProductImage
                              }
                            }
                            User{
                                    first_name
                            }
                            }
                        }
                          `,
                variables: {
                  id: profile,
                },
              });
              setwishlist(PublicWishList.data.data.GetPublicWishList);
            }
          };
          getData();
    },[])
  return (
    <WishListHome
      content={
        <div>
            <div className={styles["body-Container"]}>
                <div className={styles["half-Container"]}>
                    <div className={styles["Top-half-Container"]}>
                        <div className={styles["Top-half-Container"]}>
                            WishListPublic
                        </div>
                        <div className={styles["Top-half-Container"]}>
                            <div className={styles["Top-half-Container-Left"]}>
                                <select name="" id="">
                                    <option value="">15</option>
                                    <option value="">30</option>
                                    <option value="">60</option>
                                    <option value="">90</option>
                                </select>
                            </div>
                            <div className={styles["Top-half-Container-Right"]}>
                                <button>Prev</button>
                                <button>Next</button>
                            </div>
                        </div>
                    </div>
                    <div className={styles["Bottom-half-Container"]}>
                        <CardWishList type= "Public" props={wishlist}/>
                    </div>
                </div>
            </div>
          {/* <div className={styles["Full-Container"]}>
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
          </div> */}
        </div>
      }
    ></WishListHome>
  );
};

export default WishListPublic;
