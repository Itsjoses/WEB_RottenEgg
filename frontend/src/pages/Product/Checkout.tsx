import Layout from "../GlobalComponent/LayoutComponent";
import styles from "@/styles/Checkout.module.css"
import { useEffect, useState } from "react";
import axios from "axios";
import { title } from "process";
const Checkout = () => {
    const [reload,setreload] = useState(0)
    const [totalPrice,settotalPrice] = useState(0)
    const [address,setAddress] = useState([])
    const [cart,setCart] = useState([])
    useEffect(() => {
        const profile = sessionStorage.getItem("ID")
        
        if(profile != null){
            const getDetail = async() => {
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
                  setCart(NoSave.data.data.GetUserNoSaveCart)
                var totalPriceall = 0
                NoSave.data.data.GetUserNoSaveCart.map(e => {
                    
                  console.log(e.Product.ProductPrice);
                  totalPriceall = totalPriceall + e.Product.ProductPrice

                })

                settotalPrice(totalPriceall)
        }
        getDetail()
        }
    },[])

    useEffect(() => {
        const getAddress = async() =>{
            const profile = sessionStorage.getItem("ID")
            const Cartuser = await axios.post(
                "http://localhost:8080/query",
                {
                  query: `
                  query getaddress($user_id: String!) {
                    GetUserAddress(user_id: $user_id) {
                      Title
                      address
                      User {
                        id
                        first_name
                        phone_number
                      }
                    }
                  }
                      `,
                  variables: {
                    user_id: profile,
                  }
                }
              )
            
              setAddress(Cartuser.data.data.GetUserAddress)
              console.log(Cartuser.data.data.GetUserAddress)
        }
        getAddress();
    },[reload])

    const saveProduct = async() =>{
        const profile = sessionStorage.getItem("ID")
        // const AddReviewQueue = await axios.post(
        //     "http://localhost:8080/query",
        //     {
        //       query: `
        //       mutation CreateReviewQueue($id: String!){
        //         CreateNewQueue(id: $id){
        //           Id
        //           User{
        //                   first_name
        //           }
        //           Product{
        //                   ProductName
        //           }
        //           Quantity
        //       }
        //       }
        //           `,
        //       variables: {
        //         id: profile,
        //       }
        //     }
        //   )


          const AddNewTransactionHistory = await axios.post(
            "http://localhost:8080/query",
            {
              query: `
              mutation CreateTransactionHistory($user_id: String!){
                CreateNewHeader(user_id: $user_id){
                  id
                  User{
                        id
                    first_name
                    last_name
                    
                  }
              }
              }
                  `,
              variables: {
                user_id: profile,
              }
            }

          )

          const DeleteCart = await axios.post(
            "http://localhost:8080/query",
            {
              query: `
              mutation deleteCart($user_id: String!){
                CheckoutCart(user_id: $user_id){
                    Quantity
                }
              }
                  `,
              variables: {
                user_id: profile,
              }
            }
          )  

          alert("Successfully save the order")
    }

    const [Title,setTitleModal] = useState("")
    const [Address,setAddressModal] = useState("")

    const [Delivery,setDelivery] = useState("")
    const [Payment,setPayment] = useState("")

    const [modal,setmodal] = useState({
        display:"none"
    })
    const [Savemodal,setSavemodal] = useState({
        display:"none"
    })

    const closeCreate = () =>{
        setmodal({display:"none"})
    }
    const openCreate = () =>{
        setmodal({display:"inherit"})
    }

    const closeSaveCreate = () =>{
        setSavemodal({display:"none"})
    }
    const openSaveCreate = () =>{
        setSavemodal({display:"inherit"})
    }

    const CreateAddress = async() =>{
        const profile = sessionStorage.getItem("ID")
        const CreateNewAddress = await axios.post(
            "http://localhost:8080/query",
            {
              query: `
              mutation newAddress($Title: String!, $address: String!,$user_id: String!){
                CreateNewAddress(Title: $Title,address:$address,user_id: $user_id){
                  Title
                  address
                  User {
                    id
                  }
                }
              }
                  `,
              variables: {
                Title: Title,
                address: Address,
                user_id: profile
              }
            }
          ) 
          setreload(reload+1)
          closeCreate()
    }


    return <Layout content={
        <div className={styles["Checkout-Container"]}>
            {/* modal */}
            <div className={styles["modal-container"]} style={modal}>
            <div className={styles["modal-container-half"]}>
              <div className="top">
                <h1>Create Address</h1>
              </div>
              <div className={styles["middle-top"]}>
                <p>Title</p>
                <input type="text" onChange={(e) => setTitleModal(e.target.value)}/>
              </div>
              <div className={styles["middle-top"]}>
                <p>Address</p>
                <input type="text" onChange={(e) => setAddressModal(e.target.value)}/>
              </div>
              <div className={styles["bottom"]}>
                <button onClick={() => CreateAddress()}>Save</button>
              </div>
              <div className={styles["Close"]}>
                <button className={styles["button-close"]} onClick={() => closeCreate()}>&times;</button>
              </div>
            </div>
          </div>
            {  /* Final modal */} 

              {/* save Modal */}
              <div className={styles["modal-container"]} style={Savemodal}>
            <div className={styles["modal-container-half"]}>
              <div className="top">
                <h1>Save Transaction</h1>
              </div>
              <div className={styles["middle-top"]}>
                <p>Delivery Provider</p>
                <select name="" id="" onChange={(e) => setDelivery(e.target.value)}>
                    <option value="">JnE</option>
                    <option value="">JnT</option>
                    <option value="">Si Cepat</option>
                </select>
              </div>
              <div className={styles["middle-top"]}>
                <p>Payment Method</p>
                <select name="" id="" onChange={(e) => setPayment(e.target.value)}>
                    <option value="">COD</option>
                    <option value="">Wallet</option>
                </select>
              </div>
              <div className={styles["bottom"]}>
                <button onClick={() => saveProduct()}>Save</button>
              </div>
              <div className={styles["Close"]}>
                <button className={styles["button-close"]} onClick={() => closeSaveCreate()}>&times;</button>
              </div>
            </div>
          </div>
              {/* Final Modal */}
          <div className={styles["Checkout-Content"]}>
            <div className={styles["Checkout-Content-Left"]}>
                <div className={styles["Checkout-Content-Left-Top"]}>
                    1 SHIPPING
                </div>
                <div className={styles["Checkout-Content-Left-Bottom"]}>
                    <div className={styles["Checkout-Content-Left-Bottom-Top"]}>
                        <div className={styles["Checkout-Content-Left-Bottom-Top-Top"]}>
                            How would you like to get your order?
                        </div>
                        <div className={styles["Checkout-Content-Left-Bottom-Top-Bottom"]}>
                            <div className={styles["Bottom-Top-Bottom-Left"]}>
                                <p>Ship to</p>
                                <p>Your Location</p>
                            </div>
                            <div className={styles["Bottom-Top-Bottom-Right"]}>
                                <i className="fa-solid fa-house"></i>
                            </div>
                        </div>
                    </div>

                    <div className={styles["Checkout-Content-Left-Bottom-Bottom"]}>
                    <div className={styles["Left-Bottom-Top"]}>
                        <h3>Shop To Your Location</h3>
                        <p>Have your order delivered to your home,offive, or anywhere.</p>
                        <p>We Work with a number of different carriers & will ship via the one who can best next your delivery needs</p>
                    </div>
                    <div className={styles["Left-Bottom-mid"]}>
                        <button onClick={() => openCreate()}>+ ADD NEW ADDRESS</button>
                    </div>

                    <div className={styles["Left-Bottom-Bottom-Container"]}>
                    {address.map(e => {
                        console.log(e);
                        
                        return(
                            <>
<div className={styles["Left-Bottom-Bottom"]}>
                        <div className={styles["Left-Bottom-Bottom-Left"]}>
                            <div className={styles["Radio-input"]}>
                            <input type="radio" />
                            </div>
                            
                        </div>
                        <div className={styles["Left-Bottom-Bottom-Right"]}>
                            <h2>{e.Title}</h2>
                            <h5>{e.User.first_name}</h5>
                            <p>{e.address}</p>
                            <p>{e.User.phone_number}</p>
                            <div className={styles["Left-Bottom-Bottom-Right-Button"]}>
                                <div className={styles["Left-Bottom-Right-Left"]}>
                                    <button>DEFAULT</button>
                                </div>
                                <div className={styles["Left-Bottom-Right-Right"]}>
                                    <button>EDIT</button>
                                    <button>REMOVE</button>
                                </div>
                            </div>
                        </div>
                    </div>
                            </>
                        )
                    })}
                

                    </div>

                    
                    <div className={styles["Left-Bottom-Button"]}>
                        <button onClick={() => openSaveCreate()}>SAVE</button>
                    </div>  
                    </div>
                    
                </div>
       
                
               
            </div>
            <div className={styles["Checkout-Content-Right"]}>
            <div className={styles["ProductCart-Content-Right-Content"]}>
                <div className={styles["Content-Right-Top"]}>
                        Order Summmary
                    </div>
                    <div className={styles["Content-Right-Mid"]}>
                        <div className={styles["Content-Right-Mid-Top"]}>
                            Item(s): ${totalPrice}
                        </div>
                        <div className={styles["Content-Right-Mid-Bottom"]}>
                            Delivery: $0.00
                        </div>
                    </div>
                    <div className={styles["Content-Right-Mid"]}>
                        <div className={styles["Content-Right-Mid-Top"]}>
                            <h3></h3>
                        </div>
                        <div className={styles["Content-Right-Mid-Bottom"]}>
                            Delivery: $0.00
                        </div>
                    </div>
                    <div className={styles["Content-Right-Mid"]}>
                        <div className={styles["Content-Right-Mid-Top"]}>
                            Item(s): ${totalPrice}
                        </div>
                        <div className={styles["Content-Right-Mid-Bottom"]}>
                            Delivery: $0.00
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
                    </div>
                </div>
                    
            </div>
          </div>
        </div>
    }></Layout>;
}
 
export default Checkout;