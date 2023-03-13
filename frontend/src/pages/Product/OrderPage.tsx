import Header from "../Utilites/Header";
import Footer from "../Utilites/Footer";
import styles from "@/styles/OrderPage.module.css"
import { THEME, ThemeContext } from "Context/Theme";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import CardMap from "../GlobalComponent/CardMap";
import { Reload } from "Context/Reload";
import { ReloadContext } from "Context/Reload";
const Setting = () => {
    const [typedata, settype] = useState("")
    const [email,setemail] = useState();
    const [first_name,setfirstname] = useState();
    const [last_name,setlastname] = useState();
    const [phone_number,setphonenumber] = useState();
    const [transaction,setTransaction] = useState([])
    useEffect(() => {
        const profile = sessionStorage.getItem("ID")
        const getData = async () => {
            const GetCurrentUser = await axios.post(
                "http://localhost:8080/query",
                {
                  query: `
                  query getPending($user_id: String!){
                    TransactionHeaderPending(user_id: $user_id){
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
              setTransaction(GetCurrentUser.data.data.TransactionHeaderPending)
              console.log(GetCurrentUser.data.data.TransactionHeaderPending);
              
        }
        getData();

    },[])

    useEffect(() => {
            const getData = async () => {
                const profile = sessionStorage.getItem("ID")
                if(profile != null){
                  const GetCurrentUser = await axios.post(
                    "http://localhost:8080/query",
                    {
                      query: `
                        query getCurrentUser($id: String!)
                        {
                          GetUser(id : $id){
                            first_name
                            last_name
                            email
                            phone_number
                          }
                        }
                      `,
                      variables:{
                        id: profile
                      }
                    }
                  ) 
                  setemail(GetCurrentUser.data.data.GetUser.email)
                  setphonenumber(GetCurrentUser.data.data.GetUser.phone_number)
                  setfirstname(GetCurrentUser.data.data.GetUser.first_name)
                  setlastname(GetCurrentUser.data.data.GetUser.last_name)
                }
        }
        getData();
        settype("Pending")
    },[])
    const [theme,setTheme] = useState(THEME.light)

    const handleTheme = () => {
          if (theme == THEME.light) {
              setTheme(THEME.dark)
              sessionStorage.setItem("theme","dark")
          } else {
              setTheme(THEME.light)
              sessionStorage.setItem("theme","light")
          }
        }
       
    const Finalize = async ()=>{
        const profile = sessionStorage.getItem("ID")
        settype("Pending")

        const GetCurrentUser = await axios.post(
            "http://localhost:8080/query",
            {
              query: `
              query getPending($user_id: String!){
                TransactionHeaderPending(user_id: $user_id){
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
          if(GetCurrentUser.data.errors != null){
            console.log("asd");
            
              setTransaction([])
          }else{
              setTransaction(GetCurrentUser.data.data.TransactionHeaderPending)
          }
    }    

    const Done = async()=>{
        const profile = sessionStorage.getItem("ID")
        settype("Done")
        const GetCurrentUser = await axios.post(
            "http://localhost:8080/query",
            {
              query: `
              query getPending($user_id: String!){
                TransactionHeaderDone(user_id: $user_id){
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
        console.log(GetCurrentUser.data);
        
        if(GetCurrentUser.data.errors != null){
          console.log("asd");
            setTransaction([])
        }else{
            setTransaction(GetCurrentUser.data.data.TransactionHeaderDone)
        }
          
    } 

    const Cancel = async()=>{
        const profile = sessionStorage.getItem("ID")
        settype("Cancel")
        const GetCurrentUser = await axios.post(
            "http://localhost:8080/query",
            {
              query: `
              query getPending($user_id: String!){
                TransactionHeaderCancle(user_id: $user_id){
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
          if(GetCurrentUser.data.errors != null){
            console.log("asd");
            
              setTransaction([])
          }else{
              setTransaction(GetCurrentUser.data.data.TransactionHeaderCancle)
          }
          
    } 

    return ( 
        
        <>
        <ThemeContext.Provider value={theme}>
        <Header handleTheme={handleTheme}/>
        <div className={styles["body-container-setting"]}>
            <div className={styles["body-container"]}>
                <div className={styles["container-setting-left"]}>
                    <div className={styles["container-setting-left-greeting"]}>
                        <a href="">Hi, {first_name}</a>     
                    </div> 
                    <div className={styles["container-setting-left-content"]}>
                           <div className={`${styles["container-setting-left-content-fontline"]} ${styles["container-setting-left-content-title"]}`}>
                                Orders
                            </div>       
                            <div className={`${styles["container-setting-left-content-fontline"]} ${styles["container-setting-left-content-body"]}`}>
                                <ul className={styles["left-content-fontline"]}>
                                    <li><a href="">Order History</a></li>
                                    <li><a href="">Digital Orders</a></li>
                                    <li><a href="">Subscription Orders</a></li>
                                    <li><a href="">Return Status / History</a></li>
                                    <li><a href="">MarketPlace Claim History</a></li>
                                </ul>
                            </div>          
                    </div>     
                    <div className={styles["container-setting-left-content"]}>
                           <div className={`${styles["container-setting-left-content-fontline"]} ${styles["container-setting-left-content-title"]}`}>
                                Manage Account
                            </div>       
                            <div className={`${styles["container-setting-left-content-fontline"]} ${styles["container-setting-left-content-body"]}`}>
                                <ul className={styles["left-content-fontline"]}>
                                    <li><a href="">Account Settings</a></li>
                                    <li><a href="">Address Book</a></li>
                                    <li><a href="">Payment Options</a></li>
                                    <li><a href="">EggPoints</a></li>
                                    <li><a href="">Academic Info</a></li>
                                    <li><a href="">Manage Reviews</a></li>
                                    <li><a href="">Tax Exemption Application</a></li>
                                </ul>
                            </div>          
                    </div>      
                    <div className={styles["container-setting-left-content"]}>
                           <div className={`${styles["container-setting-left-content-fontline"]} ${styles["container-setting-left-content-title"]}`}>
                                Notification
                            </div>       
                            <div className={`${styles["container-setting-left-content-fontline"]} ${styles["container-setting-left-content-body"]}`}>
                                <ul className={styles["left-content-fontline"]}>
                                    <li><a href="">Message Center</a></li>
                                    <li><a href="">Email Notifications</a></li>
                                    <li><a href="">Mobile Text Alert</a></li>
                                    <li><a href="">Auto Notify</a></li>
                                    <li><a href="">Price Alerts</a></li>
                                </ul>
                            </div>          
                    </div>    
                </div>   
                <div className={styles["container-setting-right"]}>
                    <div className={styles["container-setting-right-top"]}>
                        <button onClick={() => Finalize()}>Pending Order</button>
                        <button onClick={() => Done()}>Done Order</button>
                        <button onClick={() => Cancel()}>Cancel Order</button>
                    </div>
                    <div className={styles["container-setting-right-bottom"]}>
                      {/* {console.log(transaction.length)} */}
                      {(transaction.length !== 0) ? <CardMap data2 = {typedata} fst2 = {transaction}/> : <>Tidak ada Data</>}
                        
                        {/* <CardMap data2 = "Done"/> */}
                    </div>
                        
                </div>     
            </div>
        </div>
        <Footer/>
        
        </ThemeContext.Provider>
        </>
     );
}
 
export default Setting;