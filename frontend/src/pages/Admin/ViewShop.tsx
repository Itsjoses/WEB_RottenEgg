import axios from "axios"
import { THEME, ThemeContext } from "Context/Theme"
import { useEffect, useState } from "react"
import Footer from "../Utilites/Footer"
import Header from "../Utilites/Header"
import styles from "../../styles/ViewUser.module.css"

const ViewShop = () => {
    const [theme,setTheme] = useState(THEME.light)
    const [allshop, setallshop] = useState([])
    const [count,setCount] = useState(0);
    const [update,setupdate] =useState("update")

    useEffect(() => {
        const getData = async () => {
            const getAllShop = await axios.post(
              "http://localhost:8080/query",
              {
                query: `
                query GetAllShop{
                    GetShop{
                          id
                      ShopName
                      ShopEmail
                      banned
                    }
                  }
                `
              }
            ) 
            setallshop(getAllShop.data.data.GetShop)
        }
        getData()
      },[count]);

    const handleTheme = () => {
        if (theme == THEME.light) {
            setTheme(THEME.dark)
            sessionStorage.setItem("theme","dark")
        } else {
            setTheme(THEME.light)
            sessionStorage.setItem("theme","light")
        }
      }

      const BannedShop = async(banned: any,email: any) => {
        console.log(email)
        console.log(banned)

        const bannedShop = await axios.post(
            "http://localhost:8080/query",
            {
              query: `
              mutation BannedShop($email: String!,$banned: String!) {
                bannedShop(banned: $banned,email: $email){
                    banned
                }
              }
              `,
              variables:{
                email: email,
                banned: banned
              },
            }
          )
          setCount(count +1)
    }

    const banButton = (banned: any,email: any) => {
        if(banned == "unban"){
            return (
                <button className={styles["button-color-ban"]} onClick={() => BannedShop("ban",email)}>Ban</button>
            )
        }else{
            return (
                <button className={styles["button-color-unban"]} onClick={() => BannedShop("unban",email)}>Unban</button>
            )
        }
        
    }

    return ( 
        <ThemeContext.Provider value={theme}>
            <Header handleTheme={handleTheme}/>
            <div className={styles.BodyContainer}>
                    <div className={styles["Container"]}>
                    {allshop.map((e) =>{
            return(
                // eslint-disable-next-line react/jsx-key
                <div className={styles["Container-content"]}>
                    <div className={styles["Content-user"]}> 
                        <div className={styles["Content-Name"]}> 
                        Name: {e.ShopName}
                        </div>
                        <div className={styles["Content-Name"]}> 
                        email: {e.ShopEmail}
                        </div>
                    </div>

                    <div className={styles["Content-button"]}>
                        {banButton(e.banned,e.ShopEmail)}
                    </div>

                </div>
            )
            })}
                    </div>
                </div>
            <Footer/>
        </ThemeContext.Provider>
     );
}
 
export default ViewShop;