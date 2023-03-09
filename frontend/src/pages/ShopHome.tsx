import Header from "./Utilites/Header";
import Footer from "./Utilites/Footer";
import { THEME, ThemeContext } from "Context/Theme";
import { ReactNode, useEffect, useState } from "react";
import styles from "../styles/ShopHeader.module.css"
import axios from "axios";
interface LayoutProps{
    content:ReactNode
}
const ShopHome = (props: LayoutProps) => {
    const {content} = props
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

          // get about shop
  let [banner,setbanner] = useState("")
  const [ShopDetail,setshopdetail] = useState([])
  useEffect(() => {
    const getDataShop = async () => {
        const GetCurrentWishList = await axios.post(
          "http://localhost:8080/query",
          {
            query: `
            query CurrentShop($id: String!){
              Shopget(id: $id){
               id
               ShopName
               banner
               Product{
                 id
                 ProductName
                 ProductImage
                 ProductDescription
                 ProductPrice
               }
             }
           }
                `,
            variables: {
              id: "1e3a9b6d-b4ff-4b6d-a92f-ab5f3a0260c8",
            },
          }
        )
          setshopdetail(GetCurrentWishList.data.data.Shopget.Product)
          setbanner(GetCurrentWishList.data.data.Shopget)
    };
    getDataShop();
  }, []);


  const avatar = {
    backgroundImage: `url(${banner.banner})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }
  // ======
        
    return ( 
        <>
        <ThemeContext.Provider value={theme}>
        <Header handleTheme={handleTheme}/>
        <main>
            <div className={styles["Header-Container-full"]}>
                <div className={styles["Header-Container"]}>
                    <div className={styles["Header-Container-left"]}>
                        <div className={styles["Shop-Avatar"]}>
                            <img src={banner.banner} alt="" />
                        </div>
                        <div className={styles["Shop-Detail"]}>
                            <ul>
                                <li className={styles["Shop-head"]}>DOWINX STORE</li>
                                <li className={styles["Shop-data"]}>
                                    <span className={styles["Shop-detail"]}>
                                        <strong>19,409</strong> 
                                        Sales
                                        <div className={styles["line-vertical"]}></div>
                                    </span>
                                    <span className={styles["Shop-detail"]}>
                                        <strong>129</strong> 
                                        Followers
                                        <div className={styles["line-vertical"]}></div>
                                    </span>
                                    <div className={styles["Data-Rating"]}>
                                        <div className={styles["star"]}><i className="fa-solid fa-star"></i></div>
                                        <span>116</span>
                                        <span>Ratings</span>
                                        <span>(91% Positive in the last 12 months)</span>
                                    </div>
                                </li>
                                <li className={styles["Shop-btn"]}>
                                    <div className={styles["Shop-BUtton"]}>
                                        <button className={styles["button"]}>
                                        <i className="fa-thin fa-plus"></i>
                                            <span>FOLLOW</span>
                                        </button >
                                        
                                        <a href="" >
                                            <button className={`${styles["button"]} ${styles["button-href"]}`}>
                                            <i className="fa-regular fa-envelope"></i>
                                            <span>CONTACT</span>
                                            </button>
                                            
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={styles["Header-Container-right"]}>
                        <div className={styles["searchbar"]}>   
                            <input type="text" placeholder="Search"/>
                        </div> 
                        
                    </div> 
                </div>
            </div>
        </main>
        {content}
        <Footer/>
        </ThemeContext.Provider>
        </>


     );
}
 
export default ShopHome;