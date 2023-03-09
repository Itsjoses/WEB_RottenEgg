import Header from "./Utilites/Header";
import Footer from "./Utilites/Footer";

import styles from "../styles/Home.module.css"
import { useEffect, useState } from "react";
import axios from "axios";
import { THEME, ThemeContext } from "Context/Theme";
import CardComponent from "./GlobalComponent/CardComponent";
const Home = () => {    
    const [page,setPage] = useState(1)
    const [profile, setProfile] = useState<any>("")
    const [product,setProduct] = useState<any>([])
    const [producttemp,setProducttemp] = useState<any>([])
    const [hasEffectRun, setHasEffectRun] = useState(false);
    
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

    useEffect(() => {
        const getProduct = async () => {
            
            console.log(page)
            let pagecurr = page
            const GetCurrentUser = await axios.post(
              "http://localhost:8080/query",
              {
                query: `
                query GetProduct($page : Int!){
                    GetProduct(page: $page){
                        id
                        ProductImage
                        ProductName
                        ProductPrice
                    }
                  }
                `,
                variables : {
                    page : pagecurr
                }
              }
            )

            
                if(GetCurrentUser.data.errors != null){
                    console.log("data sudah semua ditarik")
                }else{
                    if(!product.includes(GetCurrentUser.data.data.GetProduct)){
                        setProduct(GetCurrentUser.data.data.GetProduct)
                    }
                    
                }
            setPage(page+1)  
        }
        getProduct();
        
    },[])
    

    
      useEffect(() => {
        const getProduct = async () => {
            let pagetemp = page;
            console.log(page)
            const GetCurrentUser = await axios.post(
              "http://localhost:8080/query",
              {
                query: `
                query GetProduct($page : Int!){
                    GetProduct(page: $page){
                        id
                        ProductImage
                        ProductName
                        ProductPrice
                    }
                  }
                `,
                variables : {
                    page : pagetemp
                }
              }
            ).then((e) => {
                if(e.data.errors != null){
                    console.log("data sudah semua ditarik")
                }else{
                    if(!product.includes(e.data.data.GetProduct)){
                        // setProducttemp(...e.data.data.GetProduct)
                        setProduct(prev => [...prev, ...e.data.data.GetProduct])
                    }
                    
                }
                setPage(page + 1)
            })
        }
        
        const handleScroll = () => {
          if (
            window.innerHeight + window.scrollY >= document.body.offsetHeight - 100
          ) {
            getProduct();
          }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      }, [page]);
      
    const [bundelImageCrousel,setbundelImageCrousel] = useState([
        "https://promotions.newegg.com/nepro/23-0147/1920x660@2x.jpg",
        "https://promotions.newegg.com/nepro/23-0121/1920x660@2x.jpg",
        "https://promotions.newegg.com/nepro/23-0177/B%20version/1920x660@2x.jpg",
        "https://promotions.newegg.com/nepro/23-0196/1920x660@2x.jpg",
        "https://promotions.newegg.com/wd/22-1109/banner/1920x660@2x.jpg",
        "https://promotions.newegg.com/nepro/23-0187/1920x660@2x.png"
    ])

    var index = 0;
    const [imageCrousel,setImageCrousel] = useState(bundelImageCrousel[0])
    const [imageCrouselIndex,setImageCrouselIndex] = useState(0);

    useEffect(()=> {
        setImageCrousel(bundelImageCrousel[imageCrouselIndex])
        const interval = setInterval(next, 3500)
        return () => clearInterval(interval)
    },[bundelImageCrousel, imageCrouselIndex])

        useEffect(() => {
            const sessionTheme = sessionStorage.getItem('theme')
            if(sessionTheme == 'dark') setTheme(THEME.dark)
            else if(sessionTheme == 'light') setTheme(THEME.light)
            else setTheme(THEME.light)
          }, [])
    
    const Carousel =  {
        backgroundImage: `url(${imageCrousel})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
    }

    const prev = () =>{
        if(imageCrouselIndex > 0){
            setImageCrouselIndex(imageCrouselIndex-1);
        }else if(imageCrouselIndex == 0){
            setImageCrouselIndex(5);
        }
    }

    const next = () => {
        if(imageCrouselIndex < 5){
            setImageCrouselIndex(imageCrouselIndex+1);
        }else if(imageCrouselIndex == 5){
            setImageCrouselIndex(0);
        }
    }

    const leftContainer = () => {
        if(profile == ""){
            return (
                <div className={styles["lower-Carousel-Content"]}>
                    <button>SIGN IN</button>
                    <p>New to Newegg? <a href="">SIGN UP &#62;</a></p>
                </div>
            )
        }else{
            return (
                <>
                    <div className={styles["welcome"]}>
                                Welcome to Newegg! Hope you enjoy <br />
                                shopping here today. If you have any <br />
                                comment or  suggestion, please leave us <br />
                                <a href="">feedback</a>
                                </div>
                                <div className={styles["welcome-button"]}>
                                    <a href="">Your Account</a>
                                    <a href="">Your Orders</a>
                                </div>
                </>
            )
        }
    }

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
      

    return <div>
        <ThemeContext.Provider value={theme}>
        <Header handleTheme={handleTheme}/>
        <div className={styles["body-Container-Full"]}>
            <div className={styles["body-Container"]}>
                <div className={styles["body"]} style={Carousel}>
                    <div className={styles["sidebar-Container"]}>
                        <div className={styles["sidebar"]}>
                            <ul>
                                <li><a href=""><div className={styles.navbarContent}><i className="fa-solid fa-computer"></i><div className={styles.navbarTitle}>Components & Storage</div></div></a></li> 
                                <li><a href=""><div className={styles.navbarContent}><i className="fa-solid fa-laptop"></i> Computer Systems</div></a></li> 
                                <li><a href=""><div className={styles.navbarContent}><i className="fa-solid fa-keyboard"></i> Computer Peripherals</div></a></li> 
                                <li><a href=""><div className={styles.navbarContent}><i className="fa-solid fa-kitchen-set"></i> Appliances</div></a></li> 
                                <li><a href=""><div className={styles.navbarContent}><i className="fa-solid fa-tv"></i> TV & Home Theater</div></a></li> 
                                <li><a href=""><div className={styles.navbarContent}><i className="fa-solid fa-headphones"></i> Electronics</div></a></li> 
                                <li><a href=""><div className={styles.navbarContent}><i className="fa-solid fa-gamepad"></i> Gaming & VR</div></a></li> 
                                <li><a href=""><div className={styles.navbarContent}><i className="fa-solid fa-wifi"></i> Networking</div></a></li> 
                                <li><a href=""><div className={styles.navbarContent}><i className="fa-solid fa-house-signal"></i> Smart Home & Security</div></a></li> 
                                <li><a href=""><div className={styles.navbarContent}><i className="fa-solid fa-print"></i> Office Solutions</div></a></li> 
                                <li><a href=""><div className={styles.navbarContent}><i className="fa-solid fa-compact-disc"></i> Software & Services</div></a></li> 
                                <li><a href=""><div className={styles.navbarContent}><i className="fa-solid fa-car"></i> Automotive & Tool</div></a></li> 
                                <li><a href=""><div className={styles.navbarContent}><i className="fa-solid fa-house"></i> Home & Outdoors</div></a></li> 
                                <li><a href=""><div className={styles.navbarContent}><i className="fa-solid fa-medal"></i> Health & Sports</div></a></li> 
                                <li><a href=""><div className={styles.navbarContent}><i className="fa-solid fa-chess"></i> Toys, Drones & Marker</div></a></li> 
                            </ul>
                        </div>
                    </div>
                    <div className={styles["right-Carousel-Container"]}>
                        <div className={styles["button-Carousel-Container"]}>
                            <button onClick={() => prev()} className={styles["Carousel-Button"]}><i className="fa-solid fa-chevron-left"></i></button> 
                            <button onClick={() => next()} className={styles["Carousel-Button"]}><i className="fa-solid fa-chevron-right"></i></button> 
                        </div>
                        <div className={styles["lower-Carousel-Container"]}>
                            <div className={`${styles["lower-Carousel"]} ${styles["left"]}`}>
                                <div className={styles["lower-Carousel-Title"]}>
                                    {(profile == "") ? "SIGN IN FOR THE BEST EXPERIENCE" : ("Hi, "+ profile) }
                                </div> 
                                {leftContainer()}
                                {/* <div className={styles["lower-Carousel-Content"]}>
                                    <button>SIGN IN</button>
                                    <p>New to Newegg? <a href="">SIGN UP &#62;</a></p>
                                </div> */}
                                
                            </div>
                            <div className={`${styles["lower-Carousel"]} ${styles["middle"]}`}>
                                <div className={styles["lower-Carousel-Title"]}>
                                    REFENTLY VIEWED ITEMS
                                </div>
                                <div className={styles["lower-Carousel-Content"]}>
                                    SIGN IN FOR THE BEST EXPERIENCE
                                </div>
                                
                            </div>
                            <div className={`${styles["lower-Carousel"]} ${styles["right"]}`}>
                                <div className={styles["lower-Carousel-Title"]}>
                                        CATEGORIES YOU MAY BE INTERESTED IN
                                    </div>
                                    <div className={styles["lower-Carousel-Content"]}>
                                        SIGN IN FOR THE BEST EXPERIENCE
                                    </div>
                                
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <div className={styles["Infinite-Scroll"]}>
            <CardComponent props={product}/>
        </div>
        <Footer/>
        </ThemeContext.Provider>
    </div>
        

}
 
export default Home;

