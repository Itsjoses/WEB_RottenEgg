import axios from "axios";
import { THEME, ThemeContext } from "Context/Theme";
import Link from "next/link";
import { arch } from "os";
import { useContext, useEffect, useState } from "react";
import styles from "../../styles/Header.module.css";
// interface Parameter{
//   handleTheme: Function
// }

const Header = ({handleTheme}:{handleTheme:Function}) => {
  const [profile, setProfile] = useState("")
  // const handleTheme = () => {
  //   if (theme == THEME.light) {
  //       setTheme(THEME.dark)
  //   } else {
  //       setTheme(THEME.light)
  //   }
  // }
  const THEME = useContext(ThemeContext);
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
                }
              }
            `,
            variables:{
              id: profile
            }
          }
        ) 
        setProfile(GetCurrentUser.data.data.GetUser.first_name)
      }
    }
    getData()
  },[]);
  return (
    
    <header>
      <div className={styles.header}>
        <div className={styles["header-container"]}>
          <div className={styles["header-upper"]}>
            <div className={styles["header-upper-left"]}>
              <div className={styles["hamburger"]}>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
              </div>

              <div className={styles["Pic"]}>
                <img
                  src="https://c1.neweggimages.com/WebResource/Themes/2005/Nest/logo_424x210.png"
                  alt=""
                />
              </div>

              <div className={styles["Location"]}>
                <a href="">
                <i className="fa-solid fa-location-dot"></i>
                  <div className={styles["Location-Title"]}>
                      <h2>Hello</h2>
                      <h1>Select Address</h1>
                  </div>
                </a>
              </div>

              <div className={styles["Search"]}>
                <input type="text" placeholder="Search.." name="search" className={styles["Seach-input"]}/>
                <button type="submit" className={styles["Search-Button"]}>
                  <i className="fa fa-search"></i>
                </button>
              </div>
            </div>
            <div className={styles["header-upper-right"]}>
                <div className={styles["Notification"]}>
                    <i className="fa-regular fa-bell"></i>
                </div>

                <div className={styles["Flag"]}>
                    <img src="https://cdn-icons-png.flaticon.com/512/555/555526.png" alt="" />
                </div>

                <div className={styles["Theme-Toggle"]}>
                    <label className={styles.switch}>
                        <input type={'checkbox'} className={styles.checkbox} onChange = {_=> handleTheme()}/>
                        <span className={`${styles["slider"]} ${styles["round"]}`}></span>
                    </label>
                </div>

                <div className={styles["User"]}>
                  <i className="fa-regular fa-user"></i>
                  <div className={styles["User-Title"]}>
                    <div className={styles["User-Title-h2"]}>
                      <h2>Welcome</h2>
                    </div>
                    <div className={styles["User-Title-h1"]}>
                      {(profile == "") ? <h1>Sign In / Register</h1> : <h1>{profile}</h1>}
                    </div>
                  </div>
                </div>

                <div className={styles["Order"]}>
                    <h2>Returns</h2>
                    <div className={styles["Order-Title-h1"]}>
                      <h1>& Orders</h1>
                    </div>
                    
                </div>

                <div className={styles["Cart"]}>
                  <Link href={"/Product/CartPage"}>
                  <i className="fa-solid fa-cart-shopping"></i>
                  </Link>
                
                </div>

            </div>
          </div>
          <div className={styles["header-lower"]}></div>
        </div>
      </div>
    </header>
  );
};

export default Header;

