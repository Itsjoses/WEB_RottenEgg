import Layout from "../GlobalComponent/LayoutComponent";
import styles from "@/styles/ProductDetail.module.css"
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
const ProductDetail = () => {
    // ==== route
    const router = useRouter();
    const {value} = router.query;
    const [product,setproduct] = useState("")
    // =====

    useEffect(() => {
        if(value != null){
            console.log(value);
            const getDetail = async() => {
                const WishListDetail = await axios.post(
                    "http://localhost:8080/query",
                    {
                      query: `
                      query getProductDetail($id: String!){
                        ProductDetail(id:$id){
                             id
                         ProductName
                         ProductImage
                         ProductDescription
                         ProductPrice
                         ProductStock
                       }
                     }
                          `,
                      variables: {
                        id: value,
                      }
                    }
                  ).then((e) => {
                    console.log(e.data.data.ProductDetail)
                    setproduct(e.data.data.ProductDetail)

                  });
        }
        getDetail()
        }
           
        
    },[value])

    const [quantity,setquantity] = useState(1)

    const add = () =>{
        setquantity(quantity+1)
    }

    const min = () =>{
        setquantity(quantity-1)
    }

    const addToCart = async (e: any) => {
        const profile = sessionStorage.getItem("ID")
        const AddCart = await axios.post(
            "http://localhost:8080/query",
            {
              query: `
              mutation createCart($user_id: String!,$product_id: String!,$quantity: Int!){
                CreateNewCart(user_id: $user_id, product_id: $product_id, quantity: $quantity){
                 User{
                         first_name
                 }
                 Product{
                     ProductName
                 }
                     Quantity
               }
             }
                  `,
              variables: {
                user_id: profile,
                product_id: e, 
                quantity:quantity,
              }
            }
          )
        alert("Item(s) is successfully Added to Cart")
    }
    return <Layout content={
        <div className={styles["ProductDetail-Container"]}>
            <div className={styles["ProductDetail-Content"]}>
                <div className={styles["ProductDetail-Content-Left"]}>
                    <img src={product.ProductImage}  alt="" />
                </div>
                <div className={styles["ProductDetail-Content-Right"]}>
                    <div className={styles["Content-Right-Top"]}>
                        <div className={styles["Content-Right-Top-Title"]}>
                            <h1>{product.ProductName}</h1>

                        </div>
                        <div className={styles["Content-Right-Top-Detail"]}>
                            <p>{product.ProductDescription}</p>
                        </div>
                    </div>
                    <div className={styles["Content-Right-Bottom"]}>
                        <h1>$ 1000</h1>
                        <div className={styles["Content-Right-Bottom-Button"]}>
                            <div className={styles["Content-Right-Bottom-Button-quntity"]}>
                                <button onClick={() => min()}>-</button>
                                <input type="text" disabled value={quantity}/>
                                <button onClick={() => add()}>+</button>
                            </div>  
                            <div className={styles["Content-Right-Bottom-Button-cart"]}>
                                <button onClick={() => addToCart(product.id)}>ADD TO CART</button>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }></Layout>;
}
 
export default ProductDetail;