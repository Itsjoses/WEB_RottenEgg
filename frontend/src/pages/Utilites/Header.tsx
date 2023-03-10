import axios from "axios";
import { THEME, ThemeContext } from "Context/Theme";
import Link from "next/link";
import { arch } from "os";
import { useContext, useEffect, useState } from "react";
import styles from "../../styles/Header.module.css";
import { GetCurrentShop, GetCurrentUser } from "../Query/Header&Home/UserLogin";
// interface Parameter{
//   handleTheme: Function
// }

const Header = ({handleTheme}:{handleTheme:Function}) => {
  const [latitude,setlatitude] = useState(0)
  const [longtitued,setlongtitude] = useState(0)
  const [profile, setProfile] = useState("")
  const [search,setsearch] = useState("")
  useEffect(() =>{
    sessionStorage.setItem("Search",search);
  },[search])
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
      const role = sessionStorage.getItem("Role")
      if(profile != null){
        if(role == "User"){
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
        }else if(role == "Shop"){
            const GetCurrentShop = await axios.post(
                "http://localhost:8080/query",
                {
                  query: `
                  query GetCurrentShop($id: String!){
                    Shopget(id:$id){
                      id
                  ShopName
                  ShopEmail
                  ShopPassword
                  
                }
              }
                  `,
                  variables:{
                    id: profile
                  }
                }
              ) 
              setProfile(GetCurrentShop.data.data.Shopget.ShopName)
        }
        
      }
    }

    getData()
    
  },[]);

  useEffect(() =>{
    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    }
    
    function showPosition(position: GeolocationPosition) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      setlatitude(latitude);
      setlongtitude(longitude)
    }
    getLocation();
  },[])
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
                      <h1>Longitude: {longtitued}</h1>
                      <h1>Latitued: {latitude}</h1>
                  </div>
                </a>
              </div>

              <div className={styles["Search"]}>
                <input type="text" placeholder="Search.." name="search" className={styles["Seach-input"]} onChange={(e) => setsearch(e.target.value)}/>
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

