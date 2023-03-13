import styles from "@/styles/ProductComponent.module.css"
import axios from "axios";
import { useEffect, useState } from "react";
const ProductComponent = ({type}) => {
    const [ShopDetail,setshopdetail] = useState([])
    const [product,setProduct] = useState([])
    const [productuse,setProductuse] = useState([])
    const [keyword,setkeyword] = useState()
    useEffect(() =>{
        if(type == "Shop"){
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
        }else if(type == "Search"){
            const getproduct = async()=>{
                const GetCurrentWishList = await axios.post(
                    "http://localhost:8080/query",
                    {
                      query: `
                      query getproduct{
                        Product{
                        id
                            ProductName
                        ProductImage
                        ProductPrice
                      }	
                    }
                          `,
                    }
                  )
                  setProduct(GetCurrentWishList.data.data.Product)
            }
            getproduct();
            
        }
    },[])

    useEffect(() =>{
        setProductuse(product.filter((e) => (e.ProductName).includes(keyword)))
    },[])

    return ( 
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
                    {(type == "Shop") ? 
                    <>
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
                    </> :
                    <>
                    {productuse.map((e) => {
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
                    </>}
                  
                  </div>
                </div>
              </div>
            </div>
     );
}
 
export default ProductComponent;