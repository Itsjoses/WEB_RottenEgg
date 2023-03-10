import WishListHome from "./WishListHome";

import styles from "../../styles/WishListHomePage.module.css"
import CardWishList from "../GlobalComponent/CardWishListComponent";
import { useEffect, useState } from "react";
import axios from "axios";

const WishListHomePage = () => {
    const [WishList, setWishLit] = useState([]);
    const [modal,setmodal] = useState({
            display:"none"
        })

    const [name,setname] = useState("");
    const [privacy,setPrivacy] = useState("");
    const[reload,setreload] = useState(0)

    useEffect(() => {
        const getData = async () => {
          const profile = sessionStorage.getItem("ID");
          if (profile != null) {
            const GetCurrentWishList = await axios.post(
              "http://localhost:8080/query",
              {
                query: `
                    query WishListGet($id: String!){
                        WishList(id: $id){
                        id
                        Name
                        Privacy
                      }
                    }
                    `,
                variables: {
                  id: profile,
                },
              }
            );
            console.log(profile);
            
            setWishLit(GetCurrentWishList.data.data.WishList);
            console.log(GetCurrentWishList.data.data.WishList);
          }
        };
        getData();
      }, [reload]);

      const showCreate = () => {
        setmodal({display: "inherit"})
        setPrivacy("Public")
      }
    
      const closeCreate = () => {
        setmodal({display: "none"})
      }
    
      const CreateWishList = async () => {
        const profile = sessionStorage.getItem("ID");
        let email;
    
        const GetCurrentEmail = await axios.post(
            "http://localhost:8080/query",
            {
              query: `
              query getCurrentUser($id: String!)
                      {
                        GetUser(id : $id){
                          first_name
                          email
                        }
                      }
                  `,
                  variables:{
                    id: profile
                  },
            }
          );
          email = GetCurrentEmail.data.data.GetUser.email
    
        const GetCurrentWishList = await axios.post(
            "http://localhost:8080/query",
            {
              query: `
              mutation WishList($name: String!,$Privacy: String!,$UserEmail: String!){
                CreateWishList(name:$name,Privacy:$Privacy,UserEmail:$UserEmail){
                    id
                  Name
                  Privacy
                  User{
                        id
                    first_name
                    last_name
                  }
                }
                }
                  `,
              variables: {
                name: name,
                Privacy: privacy,
                UserEmail: email,
              },
            }
          );
          alert("success")
        setreload(reload+ 1)
      }




    return ( 
        <WishListHome content={
          <div className={styles["body-Container"]}>
                <div className={styles["modal-container"]} style={modal}>
            <div className={styles["modal-container-half"]}>
              <div className="top">
                <h1>Create a List</h1>
              </div>
              <div className={styles["middle-top"]}>
                <p>Name</p>
                <input type="text" onChange={(e) => setname(e.target.value)}/>
              </div>
              <div className={styles["middle"]}>
                <p>Privacy</p>
                <div className={styles["middle-button"]}>
                  <button onClick={(e) => setPrivacy("Public")}>Public</button>
                  <button onClick={(e) => setPrivacy("Private")}>Private</button>
                </div>
              </div>
              <div className={styles["bottom"]}>
                <button onClick={() => CreateWishList()}>Create</button>
              </div>
              <div className={styles["Close"]}>
                <button className={styles["button-close"]} onClick={() => closeCreate()}>&times;</button>
              </div>
            </div>
          </div>
                <div className={styles["body-top-Container"]}>
                    <button className={styles["body-button"]} onClick={()=> showCreate()}>Create List</button>
                  <button>Manage List</button>
                </div>
                <div className={styles["body-bottom-Container"]}>
                  <CardWishList props={WishList} type= "mylist"/>
                </div>
            </div>
        }></WishListHome>


     );
}
 
export default WishListHomePage;