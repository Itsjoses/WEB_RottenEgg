import Header from "../Utilites/Header";
import Footer from "../Utilites/Footer";
import styles from "../../styles/Setting.module.css"
import { THEME, ThemeContext } from "Context/Theme";
import { useEffect, useState } from "react";
import axios from "axios";

const Setting = () => {
    const [email,setemail] = useState();
    const [first_name,setfirstname] = useState();
    const [last_name,setlastname] = useState();
    const [phone_number,setphonenumber] = useState();
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
                  console.log(GetCurrentUser.data.data.GetUser.email)
                  setemail(GetCurrentUser.data.data.GetUser.email)
                  setphonenumber(GetCurrentUser.data.data.GetUser.phone_number)
                  setfirstname(GetCurrentUser.data.data.GetUser.first_name)
                  setlastname(GetCurrentUser.data.data.GetUser.last_name)
                }
        }
        getData();
    })
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
                    <div className={styles["container-setting-right-title"]}>
                        <h2>ACCOUNT SETTINGS</h2>
                        <p>Control, protect, and secure your account</p>
                    </div>    
                    <div className={styles["container-setting-right-body"]}>
                        <table>
                            <tbody>
                                <tr className={styles["celltable"]}>
                                    <td className={styles["celltable-left"]}>Account Information</td>
                                    <td className={styles["celltable-right"]}>
                                        <div className={styles["title-table"]}>
                                            <strong>{first_name} {last_name}</strong>
                                            <button>EDIT</button>
                                        </div>
                                        <div className={styles["detail-table"]}>
                                            <p>{email}</p>
                                            <p>Display as Anonymous</p>
                                        </div>
                                    </td>
                                </tr>
                                <tr className={styles["celltable"]}>
                                    <td className={styles["celltable-left"]}>Mobile Number</td>
                                    <td className={styles["celltable-right"]}>
                                        <div className={styles["title-table"]}>
                                        <strong>{(phone_number == null) ? "To enchance your account security, add your mobile number" : phone_number}</strong>
                                            <button>EDIT</button>
                                        </div>
                                    </td>
                                </tr>
                                <tr className={styles["celltable"]}>
                                    <td className={styles["celltable-left"]}>Password</td>
                                    <td className={styles["celltable-right"]}>
                                        <div className={styles["title-table"]}>
                                            <strong>*********</strong>
                                            <button>EDIT</button>
                                        </div>
                                    </td>
                                </tr>
                                <tr className={styles["celltable"]}>
                                    <td className={styles["celltable-left"]}>2-Step Verification</td>
                                    <td className={styles["celltable-right"]}>
                                        <div className={styles["title-table"]}>
                                            <strong>Enable 2-Step Verification for enhanced account security.</strong>
                                            <button>ENABLE</button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>    
                    <div className={styles["container-setting-right-footer"]}>
                    Newegg is the sole owner of the information collected on this site. We will not sell, share, or rent this information to any outside parties, except as outlined in the privacy policy.
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