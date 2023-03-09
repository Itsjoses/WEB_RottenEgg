import axios from "axios";
import Link from "next/link";
import { SetStateAction, useState } from "react";
import styles from "../../styles/WishListCard.module.css";
const CardWishList = ({ props }: { props: any[] }) => {
    const [modal,setmodal] = useState({
        display:"none"
    })
    const [id,setid] = useState("")
    const [name,setname] = useState("");
    const [privacy,setPrivacy] = useState("");
    const[reload,setreload] = useState(0)
    const UpdateWishList = async () =>{
        
        const GetCurrentWishList = await axios.post(
            "http://localhost:8080/query",
            {
              query: `
              mutation updateWishList($id: String!,$name: String!,$Privacy: String!){
                UpdateWishList(id: $id,name: $name,Privacy: $Privacy){
                    id
                  Name
                  Privacy               
                }
              }
                  `,
              variables: {
                id: id,
                name: name,
                Privacy: privacy,
              },
            }
          );
    }

    const closeCreate = () =>{
        setmodal({display:"none"})
    }
    const openUpdate = (id: SetStateAction<string>,e: any,name: any,privacy: any) => {
            setid(id)
            setname(name)
            setPrivacy(privacy)
            setmodal({display:"inherit"})
    }
  return (
    <>
      <div className={styles["modal-container"]} style={modal}>
            <div className={styles["modal-container-half"]}>
              <div className="top">
                <h1>List Settings</h1>
              </div>
              <div className={styles["middle-top"]}>
                <p>Name</p>
                <input type="text" value={name} onChange={(e) => setname(e.target.value)}/>
              </div>
              <div className={styles["middle"]}>
                <p>Privacy</p>
                <div className={styles["middle-button"]}>
                  <button onClick={(e) => setPrivacy("Public")}>Public</button>
                  <button onClick={(e) => setPrivacy("Private")}>Private</button>
                </div>
              </div>
              <div className={styles["bottom"]}>
                <button onClick={() => UpdateWishList()}>Save</button>
              </div>
              <div className={styles["Close"]}>
                <button className={styles["button-close"]} onClick={() => closeCreate()}>&times;</button>
              </div>
            </div>
          </div>


        <div className={styles["CardContainer-full"]}>
        <div className={styles["CardContainer"]}>
        {props.map((e) => {
          return (
            <>
            <Link href={`/WishList/WishListDetail?value=${e.id}`}>
              <div className={styles["WishListCard"]}>
                <div className={styles["WishListCard-Top"]}>
                  <div className={styles["WishListCard-Top-Name"]}>
                    <h1>{e.Name}</h1>
                  </div>
                  <div className={styles["WishListCard-Top-Button"]}>
                    <button >Delete</button>
                    <div className={styles["line-vertical"]}></div>
                    <button >Duplicate</button>
                    <div className={styles["line-vertical"]}></div>
                    <button onClick={() => openUpdate(e.id,e,e.name,e.privacy)}>Settings</button>
                  </div>
                </div>
                
                <div className={styles["WishListCard-Bottom"]}>
                  
                  <div className={styles["WishListCard-Bottom-Left"]}></div>
                  <div className={styles["WishListCard-Bottom-Right"]}></div>
                  
                </div>
                
              </div>
              </Link>
            </>
          );
        })}
      </div>
        </div>
      
    </>
  );
};

export default CardWishList;
