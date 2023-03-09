import Layout from "../GlobalComponent/LayoutComponent";
import styles from "@/styles/ProductCart.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
const CartPage = () => {
    const [reload,setreload] = useState(0)
    const [cart,setCart] = useState([])
    const [totalPrice,settotalPrice] = useState(0)
    const [Product,setProduct] = useState([])
    const [saveLater,setsaveLater] = useState([])
    useEffect(() => {
        const profile = sessionStorage.getItem("ID")
        if(profile != null){
            const getDetail = async() => {
                const Save = await axios.post(
                    "http://localhost:8080/query",
                    {
                      query: `
                      query getCart($user_id: String!){
                        GetUserSaveCart(user_id: $user_id){
                             User{
                                 first_name
                                }
                                Product{
                                    id
                                    ProductName
                                    ProductPrice
                            ProductImage
                            ProductPrice
                                }
                         Quantity
                         Status
                       }
                     }
                          `,
                      variables: {
                        user_id: profile,
                      }
                    }
                  )

                  const NoSave = await axios.post(
                    "http://localhost:8080/query",
                    {
                      query: `
                      query getCart($user_id: String!){
                        GetUserNoSaveCart(user_id: $user_id){
                             User{
                                 first_name
                                }
                                Product{
                                    id
                                    ProductName
                                    ProductPrice
                            ProductImage
                            ProductPrice
                                }
                         Quantity
                         Status
                       }
                     }
                          `,
                      variables: {
                        user_id: profile,
                      }
                    }
                  )

                

                setsaveLater(Save.data.data.GetUserSaveCart)
                setProduct(NoSave.data.data.GetUserNoSaveCart)
                var totalPriceall = 0
                NoSave.data.data.GetUserNoSaveCart.map(e => {
                  console.log(e.Product.ProductPrice);
                  totalPriceall = totalPriceall + e.Product.ProductPrice
                  // totalPriceall += 
                })

                settotalPrice(totalPriceall)
        }
        getDetail()
        }
        
    },[reload])

    // const [quantity,setquantity] = useState(1)

    const add = async (e: undefined) =>{
      const profile = sessionStorage.getItem("ID")
      const AddCart = await axios.post(
        "http://localhost:8080/query",
        {
          query: `
          mutation deleteCart($user_id: String!,$product_id: String!){
            IncrementCart(user_id: $user_id,product_id: $product_id){
                  Quantity
            
            }
          }
              `,
          variables: {
            user_id: profile,
            product_id: e
          }
        }
      )
      setreload(reload+1)
    }

    const min = async(e: undefined) =>{
      const profile = sessionStorage.getItem("ID")
      const MinCart = await axios.post(
        "http://localhost:8080/query",
        {
          query: `
          mutation deleteCart($user_id: String!,$product_id: String!){
            DecrementCart(user_id: $user_id,product_id: $product_id){
                  Quantity
            
            }
          }
              `,
          variables: {
            user_id: profile,
            product_id: e
          }
        }
      )
      setreload(reload+1)
    }

    const deleted = async (e: any) =>{
        const profile = sessionStorage.getItem("ID")
        const deleteCart = await axios.post(
            "http://localhost:8080/query",
            {
              query: `
              mutation deleteCart($user_id: String!,$product_id: String!){
                DeleteCart(user_id: $user_id,product_id: $product_id){
                      Quantity
                
                }
              }
                  `,
              variables: {
                user_id: profile,
                product_id: e
              }
            }
          )
          setreload(reload+1)
    }   

    const SaveLater = async (e: any) => {
      const profile = sessionStorage.getItem("ID")
      const SaveCart = await axios.post(
        "http://localhost:8080/query",
        {
          query: `
          mutation Save($user_id: String!,$product_id: String!) {
            SaveCart(
              user_id: $user_id
              product_id: $product_id
            ) {
              User {
                id
              }
              Quantity
              Status
            }
          }
              `,
          variables: {
            user_id: profile,
            product_id: e
          }
        }
      )
      setreload(reload+1)
    }

    const DeleteSaveLater = async (e: any) => {
      const profile = sessionStorage.getItem("ID")
      const SaveCart = await axios.post(
        "http://localhost:8080/query",
        {
          query: `
          mutation Save($user_id: String!,$product_id: String!) {
            UnSaveCart(
              user_id: $user_id
              product_id: $product_id
            ) {
              User {
                id
              }
              Quantity
              Status
            }
          }
              `,
          variables: {
            user_id: profile,
            product_id: e
          }
        }
      )
      setreload(reload+1)
    }

  return (
    <Layout
      content={
        <div className={styles["ProductCart-Container"]}>
          <div className={styles["ProductCart-Content"]}>
            <div className={styles["ProductCart-Content-Left"]}>
              <div className={styles["Container"]}>
              <h1>Cart</h1>
                {Product.map(e => {
                    
                    return(
                        <>
                        <div className={styles["ProductCart-Content-Left-Card"]}>
                <div className={styles["Content-Left-Left"]}>
                        <img src={e.Product.ProductImage} alt="" />
                    </div>
                    <div className={styles["Content-Left-Mid"]}>
                        <h1>{e.Product.ProductName}</h1>
                    </div>
                    <div className={styles["Content-Left-Right"]}>
                                <div className={styles["Content-Right-Bottom-Button-quntity"]}>
                                    <button onClick={() => min(e.Product.id)}>-</button>
                                    <input type="text" disabled value={e.Quantity}/>
                                    <button onClick={() => add(e.Product.id)}>+</button>
                                </div>  
                                <div className={styles["Content-Right-Bottom-Button-Delete"]}>
                                    <div className={styles["Button-Delete-Top"]}>
                                    <h2>$ {e.Product.ProductPrice}</h2> 

                                    </div>
                                    <div className={styles["Button-Delete-Bottom"]}>
                                    <button onClick={() => SaveLater(e.Product.id)}>
                                        <i class="fa-regular fa-bookmark"></i>
                                        </button>
                                    
                                        <button onClick={() => deleted(e.Product.id)}>
                                        <i className="fa-solid fa-trash"></i>
                                        </button>

                                    </div>
                                    

                                </div>
                    </div>
                </div>
                        </>
                    )
                })}
              </div>
                
              <div className={styles["Container"]}>
              <h1>SaveLater</h1>
                {saveLater.map(e => {
                    
                    return(
                        <>
                        <div className={styles["ProductCart-Content-Left-Card"]}>
                <div className={styles["Content-Left-Left"]}>
                        <img src={e.Product.ProductImage} alt="" />
                    </div>
                    <div className={styles["Content-Left-Mid"]}>
                        <h1>{e.Product.ProductName}</h1>
                    </div>
                    <div className={styles["Content-Left-Right"]}>
                                <div className={styles["Content-Right-Bottom-Button-quntity"]}>
                                    <button onClick={() => min()}>-</button>
                                    <input type="text" disabled value={e.Quantity}/>
                                    <button onClick={() => add()}>+</button>
                                </div>  
                                <div className={styles["Content-Right-Bottom-Button-Delete"]}>
                                    <div className={styles["Button-Delete-Top"]}>
                                    <h2>$ {e.Product.ProductPrice}</h2> 

                                    </div>
                                    <div className={styles["Button-Delete-Bottom"]}>
                                    
                                        <button onClick={() => DeleteSaveLater(e.Product.id)}>
                                        <i className="fa-solid fa-trash"></i>
                                        </button>

                                    </div>
                                    

                                </div>
                    </div>
                </div>
                        </>
                    )
                })}
              </div>

               
            </div>
            <div className={styles["ProductCart-Content-Right"]}>
                <div className={styles["ProductCart-Content-Right-Content"]}>
                <div className={styles["Content-Right-Top"]}>
                        Summmary
                    </div>
                    <div className={styles["Content-Right-Mid"]}>
                        <div className={styles["Content-Right-Mid-Top"]}>
                            Item(s): ${totalPrice}
                        </div>
                        <div className={styles["Content-Right-Mid-Bottom"]}>
                            Est. Delivery: $0.00
                        </div>
                    </div>
                    <div className={styles["Content-Right-Button"]}>
                        <div className={styles["Content-Right-Button-Top"]}>
                            <div className={styles["Content-Right-Button-Top-Left"]}>
                                Est. Total:
                            </div>
                            <div className={styles["Content-Right-Button-Top-Right"]}>
                                ${totalPrice}
                            </div>
                        </div>
                        <div className={styles["Content-Right-Button-Bottom"]}>
                            <button>SECURE CHECKOUT</button>
                        </div>
                    </div>
                </div>
                    
            </div>
          </div>
        </div>
      }
    ></Layout>
  );
};

export default CartPage;
