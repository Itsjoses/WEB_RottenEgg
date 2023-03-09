import { THEME, ThemeContext } from "Context/Theme"
import { useEffect, useState } from "react"
import Header from "../Utilites/Header"
import styles from "../../styles/ViewUser.module.css"
import Footer from "../Utilites/Footer"
import axios from "axios"
const ViewUser = () => {
    const [theme,setTheme] = useState(THEME.light)
    const [alluser, setalluser] = useState([])
    const [count,setCount] = useState(0);
    const [update,setupdate] =useState("update")
    useEffect(() => {
        const getData = async () => {
          const profile = sessionStorage.getItem("ID")
          if(profile != null){
            const GetAllUser = await axios.post(
              "http://localhost:8080/query",
              {
                query: `
                query GetAlluserVoucher{
                    users{
                        id
                        first_name
                        email
                        phone_number
                        banned
                  }
                }
                `
              }
            ) 
            setalluser(GetAllUser.data.data.users)
          }
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


    const bannedUser = async(banned: any,email: any) => {
        console.log(email)
        console.log(banned)

        const BannedUser = await axios.post(
            "http://localhost:8080/query",
            {
              query: `
              mutation ChangeUser($email: String!,$banned: String!) {
                changeBanned(email: $email,banned: $banned){
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
                <button className={styles["button-color-ban"]} onClick={() => bannedUser("ban",email)}>Ban</button>
            )
        }else{
            return (
                <button className={styles["button-color-unban"]} onClick={() => bannedUser("unban",email)}>Unban</button>
            )
        }
        
    }

    const returnUser = (e) =>{
        {alluser.map((e) =>{
            return(
                // eslint-disable-next-line react/jsx-key
                <div className={styles["Container-content"]}>
                    <div className={styles["Content-user"]}> 
                        <div className={styles["Content-Name"]}> 
                        Name: {e.first_name}
                        </div>
                        <div className={styles["Content-Name"]}> 
                        email: {e.email}
                        </div>
                        <div className={styles["Content-Name"]}> 
                        PhoneNumber: {e.phone_number}
                        </div>
                    </div>

                    {/* <div className={styles["Content-button"]}>
                        {banButton(e.banned,e.email)}
                    </div> */}

                </div>
            )
            })}
    } 
    return ( 
        <>
            <ThemeContext.Provider value={theme}>
                <Header handleTheme={handleTheme}/>
                <div className={styles.BodyContainer}>
                    <div className={styles["Container"]}>
                    {alluser.map((e) =>{
            return(
                // eslint-disable-next-line react/jsx-key
                <div className={styles["Container-content"]}>
                    <div className={styles["Content-user"]}> 
                        <div className={styles["Content-Name"]}> 
                        Name: {e.first_name}
                        </div>
                        <div className={styles["Content-Name"]}> 
                        email: {e.email}
                        </div>
                        <div className={styles["Content-Name"]}> 
                        PhoneNumber: {e.phone_number}
                        </div>
                    </div>

                    <div className={styles["Content-button"]}>
                        {banButton(e.banned,e.email)}
                    </div>

                </div>
            )
            })}
                    </div>
                </div>

                <Footer/>
            </ThemeContext.Provider>
        </>

     );
}
 
export default ViewUser;