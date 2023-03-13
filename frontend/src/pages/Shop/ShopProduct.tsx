import ShopLayout from "./ShopLayout";
import styles from "@/styles/ShopProduct.module.css"
import { useEffect, useState } from "react";
import axios from "axios";


const ShopProduct = () => {
    const [ShopDetail,setshopdetail] = useState([])
    const [product,setproduct] = useState([])
    const [search,setsearch] = useState("")
    useEffect(() => {
      const getDataShop = async () => {
          const GetCurrentWishList = await axios.post(
            "http://localhost:8080/query",
            {
              query: `
              query CurrentShop($id: String!){
                Shopget(id: $id){
                 id
                 ShopName
                 banner
                 Product{
                   id
                   ProductName
                   ProductImage
                   ProductDescription
                   ProductPrice
                 }
               }
             }
                  `,
              variables: {
                id: "1e3a9b6d-b4ff-4b6d-a92f-ab5f3a0260c8",
              },
            }
          )
            setshopdetail(GetCurrentWishList.data.data.Shopget.Product)
      };
      getDataShop();
    }, []);

    useEffect(() =>{
        setproduct(ShopDetail.filter((e) => (e.ProductName).includes(search)))
    },[search])
    //=====
    return <ShopLayout context={
        <div>
<div className={styles["Product-container"]}>
            <div className={styles["Product-container-container"]}>
              <div className={styles["Product-container-subcontainer"]}>

                <div className={styles["Product-container-side"]}>
                <div className={styles["Content-Box"]}>
                        <div className={styles["Top-Head-Content"]}>
                            <h1>Ratings</h1>
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
                                $50 - $75

                                </div>
                            </div>
                            <div className={styles["Lists-Egg"]}>
                                <div className={styles["Lists-Egg-Checkbox"]}>
                                    <input type="checkbox" />
                                </div>
                                <div className={styles["Lists-Egg-Total"]}>
                                $75 - $100

                                </div>
                            </div>
                        </div>
                </div>

                <div className={styles["Content-Box"]}>
                        <div className={styles["Top-Head-Content"]}>
                            <h1>Ratings</h1>
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
                            <h1>Review</h1>
                        </div>
                        <div className={styles["Top-Bottom-Content"]}>
                            <div className={styles["Lists-Egg"]}>
                                <div className={styles["Lists-Egg-Checkbox"]}>
                                    <input type="checkbox" />
                                </div>
                                <div className={styles["Lists-Egg-Total"]}>
                                    1 - 10
                                </div>
                            </div>
                            <div className={styles["Lists-Egg"]}>
                                <div className={styles["Lists-Egg-Checkbox"]}>
                                    <input type="checkbox" />
                                </div>
                                <div className={styles["Lists-Egg-Total"]}>
                                    10 - 20
                                </div>
                            </div>
                            <div className={styles["Lists-Egg"]}>
                                <div className={styles["Lists-Egg-Checkbox"]}>
                                    <input type="checkbox" />
                                </div>
                                <div className={styles["Lists-Egg-Total"]}>
                                    20 - 30

                                </div>
                            </div>
                            <div className={styles["Lists-Egg"]}>
                                <div className={styles["Lists-Egg-Checkbox"]}>
                                    <input type="checkbox" />
                                </div>
                                <div className={styles["Lists-Egg-Total"]}>
                                    30 - 40

                                </div>
                            </div>
                            <div className={styles["Lists-Egg"]}>
                                <div className={styles["Lists-Egg-Checkbox"]}>
                                    <input type="checkbox" />
                                </div>
                                <div className={styles["Lists-Egg-Total"]}>
                                    40 - 100

                                </div>
                            </div>
                        </div>
                </div>


                <div className={styles["Content-Box-final"]}>
                        <div className={styles["Top-Head-Content"]}>
                            <h1>Number Bought</h1>
                        </div>
                        <div className={styles["Top-Bottom-Content"]}>
                            <div className={styles["Lists-Egg"]}>
                                <div className={styles["Lists-Egg-Checkbox"]}>
                                    <input type="checkbox" />
                                </div>
                                <div className={styles["Lists-Egg-Total"]}>
                                    1 - 10
                                </div>
                            </div>
                            <div className={styles["Lists-Egg"]}>
                                <div className={styles["Lists-Egg-Checkbox"]}>
                                    <input type="checkbox" />
                                </div>
                                <div className={styles["Lists-Egg-Total"]}>
                                    10 - 20
                                </div>
                            </div>
                            <div className={styles["Lists-Egg"]}>
                                <div className={styles["Lists-Egg-Checkbox"]}>
                                    <input type="checkbox" />
                                </div>
                                <div className={styles["Lists-Egg-Total"]}>
                                    20 - 30

                                </div>
                            </div>
                            <div className={styles["Lists-Egg"]}>
                                <div className={styles["Lists-Egg-Checkbox"]}>
                                    <input type="checkbox" />
                                </div>
                                <div className={styles["Lists-Egg-Total"]}>
                                    30 - 40

                                </div>
                            </div>
                            <div className={styles["Lists-Egg"]}>
                                <div className={styles["Lists-Egg-Checkbox"]}>
                                    <input type="checkbox" />
                                </div>
                                <div className={styles["Lists-Egg-Total"]}>
                                    40 - 100

                                </div>
                            </div>
                        </div>
                </div>



                </div>

                <div className={styles["Product-container-all"]}>
                    <div className={styles["Container-Category-List-Search"]}>
                    <div className={styles["Container-Category-List-Search-Left"]}>
                        <div className={styles["Search-Left"]}> 
                            <input type="text" placeholder="Search Within" onChange={(e) => setsearch(e.target.value)}/>
                            <button type="submit" className={styles["Search-Button"]}>
                                <i className="fa fa-search"></i>
                            </button>
                        </div>
                        <div className={styles["Search-Right"]}>
                            Sort By
                            <select>
                                <option value="">Featured Items</option>
                                <option value="">Lowest Price</option>
                                <option value="">Highest Price</option>
                                <option value="">Best Selling</option>
                                <option value="">Best Rating</option>
                                <option value="">Most Reviews</option>
                            </select>
                        </div>
                        
                    </div>
                    <div className={styles["Container-Category-List-Search-right"]}>
                        <div className={styles["Search-right-Content-left"]}>
                            128 Items
                            <div className={styles["Search-right-Content-left-line"]}></div>
                        </div>
                        <div className={styles["Search-right-Content-mid"]}>
                            View
                            <select>
                                <option value="">60</option>
                                <option value="">120</option>
                                <option value="">180</option>
                            </select>
                        </div>

                        <div className={styles["Search-right-Content-right"]}>
                            <button>Prev</button>
                            <button>Next</button>
                        </div>
                    </div>
                    </div>
                  <div className={styles["Container-Category-List-product"]}>
                    {product.map(e => {
                        return(
<>
<div className={styles["Container-Category-List-item-product"]}>
                     
                     <div className={styles["Container-Category-List-image-product"]}>
                       <img
                         src={e.ProductImage}
                         alt=""
                       />
                     </div>
                     <div className={styles["Container-Category-List-subtitle-product-list"]}>
                       <h3>{e.ProductName}</h3>
                       <h1>{e.ProductPrice}</h1>
                       <div
                       className={styles["Container-Category-List-subtitle-bottom"]}>
                         <button>ADD TO CART</button>
                     </div>
                     </div>
                   </div>
</>
                            
                        )
                    })}

                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>


    }></ShopLayout>;
}
 
export default ShopProduct;