import { THEME, ThemeContext } from "Context/Theme";
import { FormEvent, MouseEvent, useEffect, useState } from "react";
import Footer from "../Utilites/Footer";
import Header from "../Utilites/Header";
import styles from "../../styles/InsertNewShop.module.css";
import axios from "axios";
const InsertNewShop = () => {
    const [theme, setTheme] = useState(THEME.light);
    const [ShopName, setShopName] = useState("");
    const [ShopEmail, setShopEmail] = useState("");
    const [ShopPassword, setShopPassword] = useState("");
    const handleTheme = () => {
        if (theme == THEME.light) {
      setTheme(THEME.dark);
      sessionStorage.setItem("theme", "dark");
    } else {
      setTheme(THEME.light);
      sessionStorage.setItem("theme", "light");
    }
  };


  const CreateShop = async () => {
    const CreateShop = await axios.post(
        "http://localhost:8080/query",
        {
          query: `
          mutation SendEmail($ShopName: String!,$ShopEmail: String!,$ShopPassword: String!) {
            CreateShop(input:{ShopName: $ShopName,ShopEmail: $ShopEmail,ShopPassword: $ShopPassword}){
              id
              ShopName
              ShopEmail
              ShopPassword
            }
          }
          `,
          variables:{
            ShopName: ShopName,
            ShopEmail: ShopEmail,
            ShopPassword: ShopPassword
          }
        }
    ) 
    if(CreateShop.data.errors != null) alert(CreateShop.data.errors[0].message)
    else alert("Successfully Create New Shop")
    window.location.reload()
    
  }

  const ShopWithSubmit= (e: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    CreateShop()
  }

  return (
    <ThemeContext.Provider value={theme}>
      <Header handleTheme={handleTheme} />
      <div className={styles.SignIn}>
        <div className={`${styles["SignIn-Header"]}`}>
          <a href="">
            <img
              src="https://c1.neweggimages.com/WebResource/Themes/2005/Nest/logo_424x210.png"
              alt=""
            />
          </a>
        </div>
        <div className={styles["SignIn-Body"]}>
          <div className={styles["SignIn-Box"]}>
            <div className={styles["SignIn-Title"]}>
              <strong>Register Shop</strong>
            </div>

            <div className={styles["SignUp-note"]}>
              Register Shop to increase the Point in My TPA :V.
            </div>
            <form action="" onSubmit={(e)=> ShopWithSubmit(e)}>
              <div className={styles["SignIn-Form"]}>
                <div className={styles["form"]}>
                  <div className={styles["SignIn-Email"]}>
                    {/* <label htmlFor="Email-Address">Email Address</label> */}
                    <input
                      id="Email-Address"
                      type="text"
                      placeholder="Shop Name"
                      onChange={(e) => setShopName(e.target.value)}
                    />
                  </div>
                </div>

                <div className={styles["form"]}>
                  <div className={styles["SignIn-Email"]}>
                    {/* <label htmlFor="Email-Address">Email Address</label> */}
                    <input
                      id="Email-Address"
                      type="email"
                      placeholder="Show Email"
                      onChange={(e) => setShopEmail(e.target.value)}
                    />
                  </div>
                </div>  

                <div className={styles["form"]}>
                  <div className={styles["SignIn-Email"]}>
                    {/* <label htmlFor="Email-Address">Email Address</label> */}
                    <input
                      id="Email-Address"
                      type="password"
                      placeholder="Shop Password"
                      onChange={(e) => setShopPassword(e.target.value)}
                    />
                  </div>
                </div>

                

                <div className={styles["form"]}>
                  <button className={styles["SignInButton"]} onClick={(e) => ShopWithSubmit(e)}>SAVE</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </ThemeContext.Provider>
  );
};

export default InsertNewShop;
