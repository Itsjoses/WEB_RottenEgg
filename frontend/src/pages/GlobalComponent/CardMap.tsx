import styles from "@/styles/CardMap.module.css"
import axios from "axios";
import {  useEffect } from "react"
const CardMap = ({fst2, data2, typeload} : any) => {

    useEffect(() => {
      
    })
    const Finalize = async(e: any) =>{
      
        const profile = sessionStorage.getItem("ID")
        
        const ReviewQueue = await axios.post(
          "http://localhost:8080/query",
          {
            query: `
            mutation ReviewQueue($id: String!,$user_id: String!){
              CreateNewQueue(id: $id , user_id: $user_id){
              Id
                User {
                  id
                }
                Product {
                  id
                }
                Quantity
                  
              }
            }
            `,
            variables:{
              id: e,
              user_id: profile
            }
          }
        ) 

        const GetCurrentUser = await axios.post(
            "http://localhost:8080/query",
            {
              query: `
              mutation UpdateTransaction($user_id: String!){
                UpdateDone(user_id: $user_id){
                  id
                  User {
                    id
                    first_name
                  }
                  Status
                  TransactionDetail{
                          Product{
                              ProductName
                      ProductImage
                      ProductPrice
                    }	
                    quantity
                  }
                }
              }
              `,
              variables:{
                user_id: profile
              }
            }
          ) 
    }

    const Cancel = async(e) => {
        const profile = sessionStorage.getItem("ID")
        const GetCurrentUser = await axios.post(
            "http://localhost:8080/query",
            {
              query: `
              mutation UpdateTransaction($user_id: String!){
                UpdateCancel(user_id: $user_id){
                  id
                  User {
                    id
                    first_name
                  }
                  Status
                  TransactionDetail{
                          Product{
                              ProductName
                      ProductImage
                      ProductPrice
                    }	
                    quantity
                  }
                }
              }
              `,
              variables:{
                user_id: profile
              }
            }
          ) 
    }

    const PreviousData = async(e: any) =>{
        const profile = sessionStorage.getItem("ID")
        console.log(profile);
        console.log(e);
        
        
        const GetCurrentUser = await axios.post(
            "http://localhost:8080/query",
            {
              query: `
              mutation PreviousData($id: String!,$user_id: String!){
                PreviousData(id: $id,user_id: $user_id){
                 TransactionHeader{
                  id
                }
                  Product{
                    ProductName
                  }
              }
              }
              `,
              variables:{
                id: e,
                user_id: profile
              }
            }
          ) 
        
        alert("Successfully add to cart")
    }
    const button = (e: any) => {
        if(data2 === "Pending"){
            return (
                <>
                                <button onClick={() => Finalize(e)}>Finalize Order</button>
                                <button onClick={() => Cancel(e)}>Cancle Order</button>
                                </>
            )
        }else if(data2 === "Done" || data2 === "Cancel"){
            return (
                <>
                    <button onClick={() => PreviousData(e)}>Add To Cart</button>
                </>
            )
        }
    }

    return ( 
        <>
        <div className={styles["Container"]}>
            {fst2.map((e) =>{
                console.log(e);
                
                return (
                    <>
                   <div className={styles["Card-Top"]}>
                        <div className={styles["Card-Top-Container"]}>
                            <div className={styles["Card-Top-Left"]}>
                                    {e.User.first_name}
                                </div>
                                <div className={styles["Card-Top-Right"]}>
                                    {button(e.id)}
                                    {/* {(data === "Done") ? {
                                        return(
                                            <>
                                            <button>Finalize Order</button>
                                            <button>Cancle Order</button>
                                            </>
                                            
                                        )

                                    } } */}
                                    
                            </div>
                        </div>
                            
            </div>
            <div className={styles["Card-Bottom"]}>
            {e.TransactionDetail.map((e2) =>{
                return (
                    <>
<div className={styles["Card-Bottom-Container"]}>
                        <div className={styles["Card-Bottom-Left"]}>
                            <img src={e2.Product.ProductImage} alt="" />
                        </div>
                        <div className={styles["Card-Bottom-Mid"]}>
                            <p>{e2.Product.ProductName}</p>
                        </div>
                        <div className={styles["Card-Bottom-Right"]}>
                            <p>$ {e2.ProductPrice}</p>
                            <p>Quantity: {e2.quantity}</p>
                        </div>  
                    </div>
                    </>
                )
            })}

                    

                </div>
            
           
                    </>
                )
            })}
             
               
        </div>
            
        </>
     );
}
 
export default CardMap;