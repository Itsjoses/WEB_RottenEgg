import Layout from "../GlobalComponent/LayoutComponent";
import styles from "../../styles/WishListDetail.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import CardWishList from "../GlobalComponent/CardWishListComponent";

const WishListDetail = () => {
    const router = useRouter();
    const {value} = router.query;
    const [idget,setidget] = useState("");
    const [product,setProduct] = useState([])
    useEffect(() => {
        if(value != null){
            console.log(value);
            
            const getDetail = async() => {
                
                const WishListDetail = await axios.post(
                    "http://localhost:8080/query",
                    {
                      query: `
                      query getDetail($id: String!){
                        GetWishListDetail(id: $id) {
                          id
                          WishListDetails {
                            
                            Product {
                              id,
                              ProductName,
                              ProductImage,
        ProductPrice
                            }
                          }
                        }
                      }
                          `,
                      variables: {
                        id: value,
                      }
                    }
                  ).then((e) => {
                    setProduct(e.data.data.GetWishListDetail.WishListDetails)
                    
                  });
                  
            
        }
        getDetail()
        }
           
        
    },[value])
    
  return (
    <Layout
      content={
        <div className={styles["fullcontainer"]}>
          <div className={styles["fullcontainer-half"]}>
            <div className={styles["content"]}>
              <div className={styles["half-left"]}>
                <div className={styles["half-left-top"]}>
                
                </div>
                <div className={styles["half-left-bottom"]}>
                
                </div>
              </div>
              <div className={styles["half-right"]}>
                <CardWishList props = {product} type= "Detail"/>
                {product.map((e) =>{
                    return(
                        <>
                        <img src={e.Product.ProductImage} alt="" />
                            {e.Product.id}
                            {e.Product.ProductName}
                            {e.Product.ProductPrice}
                        </>
                    )
                })}
              </div>
            </div>
          </div>
        </div>
      }
    ></Layout>
  );
};

export default WishListDetail;
