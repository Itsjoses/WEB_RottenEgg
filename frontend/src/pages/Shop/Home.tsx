import ShopLayout from "./ShopLayout";
import styles from "@/styles/ShopHome.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
const ShopHome = () => {
  // get about shop
  let [banner,setbanner] = useState("")
  const [ShopDetail,setshopdetail] = useState([])
  const [category,setcategory] = useState([])
  const [recommend,setrecommend] = useState([])
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
          setbanner(GetCurrentWishList.data.data.Shopget.banner)
          
    };
    getDataShop();
  }, []);
  // ======

  //get category
  useEffect(() => {
    const getDataShop = async () => {
        const GetCurrentWishList = await axios.post(
          "http://localhost:8080/query",
          {
            query: `
            query category($id: String!){
              CategoryGet(id: $id){
                id
                ProductName
                ProductImage
                ProductCategory{
                  id
                  CategoryName
                }
             }
           }
                `,
            variables: {
              id: "1e3a9b6d-b4ff-4b6d-a92f-ab5f3a0260c8",
            },
          }
        )
          console.log(GetCurrentWishList.data.data.CategoryGet);
          setcategory(GetCurrentWishList.data.data.CategoryGet)
          
    };
    getDataShop();
  }, []);
  // ===

  // get Recommend
useEffect(() => {
    const getDataShop = async () => {
        const GetCurrentWishList = await axios.post(
          "http://localhost:8080/query",
          {
            query: `
            query ProductRecommen($id: String!){
              ProductRecommended(id: $id){
                id
                ProductName
                ProductImage
                ProductPrice
             }
           }
                `,
            variables: {
              id: "1e3a9b6d-b4ff-4b6d-a92f-ab5f3a0260c8",
            },
          }
        )
          setrecommend(GetCurrentWishList.data.data.ProductRecommended)
          
    };
    getDataShop();
  }, []);
  //===


  const bannerstyle = {
    backgroundImage: `url(${banner})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }


  return (
    <ShopLayout
      context={
        <div className={styles["Container"]}>
          <div className={styles["Container-Banner"]} style={bannerstyle}>
            

          </div>

          <div className={styles["Container-Category"]}>
            <div className={styles["Container-Category-Container"]}>
              <div className={styles["Container-Category-Title"]}>
                <h1>Shop By Category</h1>
              </div>
              {category.map(e =>{
                return(
                  <>
                  <div className={styles["Container-Category-List"]}>
                <div className={styles["Container-Category-List-item"]}>
                  <div className={styles["Container-Category-List-image"]}>
                    <img
                      src={e.ProductImage}
                      alt=""
                    />
                  </div>
                  <div className={styles["Container-Category-List-subtitle"]}>
                    <p>{e.ProductCategory.CategoryName}</p>
                  </div>
                </div>
              </div>
                  </>
                )
              })}
              
            </div>
          </div>
          <div className={styles["Container-Category"]}>
            <div className={styles["Container-Category-Container"]}>
              <div className={styles["Container-Category-Title"]}>
                <h1>Recommended</h1>
              </div>
              <div className={styles["Container-Category-List"]}>
                {recommend.map(e => {
                  return(
                        <>
<div className={styles["Container-Category-List-item"]}>
                  <div className={styles["Container-Category-List-image"]}>
                    <img
                      src={e.ProductImage}
                      alt=""
                    />
                  </div>
                  <div className={styles["Container-Category-List-subtitle"]}>
                    <h4>{e.ProductName}</h4>
                    <h2>{e.ProductPrice}</h2>
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

          <div className={styles["Product-container"]}>
            <div className={styles["Product-container-container"]}>
              <h1>Product</h1>
              <div className={styles["Product-container-subcontainer"]}>

                <div className={styles["Product-container-side"]}>
                <div className={styles["Content-Box"]}>
                        <div className={styles["Top-Head-Content"]}>
                            <h1>Ratings</h1>
                        </div>
                        <div className={styles["Top-Bottom-Content"]}>
                            <div className={styles["Lists-Egg"]}>
                                <div className={styles["Lists-Egg-Checkbox"]}>
                                    <input type="radio" name="test" />
                                </div>
                                <div className={styles["Lists-Egg-Total"]}>
                                    $0 - $10
                                </div>
                            </div>
                            <div className={styles["Lists-Egg"]}>
                                <div className={styles["Lists-Egg-Checkbox"]}>
                                    <input type="radio" name="test"/>
                                </div>
                                <div className={styles["Lists-Egg-Total"]}>
                                  $10 - $25
                                </div>
                            </div>
                            <div className={styles["Lists-Egg"]}>
                                <div className={styles["Lists-Egg-Checkbox"]}>
                                    <input type="radio" name="test"/>
                                </div>
                                <div className={styles["Lists-Egg-Total"]}>
                                $25 - $50

                                </div>
                            </div>
                            <div className={styles["Lists-Egg"]}>
                                <div className={styles["Lists-Egg-Checkbox"]}>
                                    <input type="radio" name="test"/>
                                </div>
                                <div className={styles["Lists-Egg-Total"]}>
                                $50 - $75

                                </div>
                            </div>
                            <div className={styles["Lists-Egg"]}>
                                <div className={styles["Lists-Egg-Checkbox"]}>
                                    <input type="radio" name="test"/>
                                </div>
                                <div className={styles["Lists-Egg-Total"]}>
                                $75 - ...

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
                  <div className={styles["Container-Category-List-product"]}>
                  {ShopDetail.map((e) => {
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
                       <h1>$ {e.ProductPrice}</h1>
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
      }
    ></ShopLayout>
  );
};

export default ShopHome;
