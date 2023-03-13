import axios from "axios";
import { list } from "firebase/storage";
import Link from "next/link";
import { SetStateAction, useState } from "react";
import styles from "../../styles/WishListCard.module.css";
import { Follow, UpdateWishListQuery } from "../Query/WishList/WishListQuery";
const CardWishList = ({props,type} : any) => {
  console.log(type);
  
    const [modal,setmodal] = useState({display: "none"})
    const [id,setid] = useState("")
    const [name,setname] = useState("");
    const [privacy,setPrivacy] = useState("");
    const[reload,setreload] = useState(0)
    const UpdateWishList = async () =>{
        
        // const GetCurrentWishList = await axios.post(
        //     "http://localhost:8080/query",
        //     {
        //       query: `
        //       mutation updateWishList($id: String!,$name: String!,$Privacy: String!){
        //         UpdateWishList(id: $id,name: $name,Privacy: $Privacy){
        //             id
        //           Name
        //           Privacy               
        //         }
        //       }
        //           `,
        //       variables: {
        //         id: id,
        //         name: name,
        //         Privacy: privacy,
        //       },
        //     }
        //   );
        UpdateWishListQuery(id,name,privacy)
      }

    const closeCreate = () =>{
        setmodal({display: "none"})
    }
    const openUpdate = (id: any) => {
            setid(id)
            setmodal({display: "inherit"})
    }

    const CreateDuplicate = async () => {
      const profile = sessionStorage.getItem("ID");
      let email;
      console.log(duplicateid);
      console.log(name);
      console.log(privacy);
      console.log(profile);
      
      const duplicate = await axios.post("http://localhost:8080/query", {
        query: `
                mutation unfollow($id: String!, $name: String!, $privacy: String!, $user_id:String! ){
                  createDuplicate(id:$id,name: $name, privacy: $privacy, user_id: $user_id){
                   
                    id
                    Name
                    Privacy
                    WishListDetails{
                      WishList{
                        id
                        Name
                        Privacy
                      }
                    }
                  }
                }
                    `,
        variables: {
          id: duplicateid,
          name: name,
          privacy: privacy,
          user_id: profile
        },
      });
      setname("")
      setPrivacy("")
      alert("success");
    };

    const CreateFollow = async (e: any) =>{
      const profile = sessionStorage.getItem("ID");
      Follow(e, profile)
      console.log("Successfully Followed");
      
    }

    const [duplicateid, setDuplicateID] = useState("");

    const showCreate = (id: any) => {
      console.log("asd");
      
      setDuplicateID(id);
      
      setPrivacy("Public");
      setmodal({display: "none"});
    };

  //   const unfollow = (id: any) => {
  //     const getData = async () => {
  //         const profile = sessionStorage.getItem("ID");
  //         if (profile != null) {
  //           const GetCurrentWishList = await axios.post(
  //             "http://localhost:8080/query",
  //             {
  //               query: `
  //               mutation unfollow($user_id: String!, $wishlist_is: String!){
  //                 unfollow(user_id: $user_id,wishlist_is: $wishlist_is){
  //                   WishList{
  //                     id
  //                     Name
  //                   }
                
  //                 }
                 
  //               }
  //                   `,
  //               variables: {
  //                 user_id: profile,
  //                 wishlist_is: id
  //               },
  //             }
  //           );
  //         }
  //       };
  //       getData();
  // }


  return (
    <>
      <div className={styles["modal-container"]} style={modal}>
        {/* First Modal */}
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
                {(type === "mylist") ? <>
                <button onClick={() => UpdateWishList()}>Save</button>
                </> : <>
                  <button onClick={() => CreateDuplicate()}>Create</button>
                </>}
              </div>
              <div className={styles["Close"]}>
                <button className={styles["button-close"]} onClick={() => closeCreate()}>&times;</button>
              </div>
            </div>
            {/* End Modal */}
{/* Second */}
{/* <div className={styles["modal-container"]} style={modal.public}>
        <div className={styles["modal-container-half"]}>
          <div className="top">
            <h1>Duplicate a List</h1>
          </div>
          <div className={styles["middle-top"]}>
            <p>Name</p>
            <input type="text" onChange={(e) => setname(e.target.value)} />
          </div>
          <div className={styles["middle"]}>
            <p>Privacy</p>
            <div className={styles["middle-button"]}>
              <button onClick={(e) => setPrivacy("Public")}>Public</button>
              <button onClick={(e) => setPrivacy("Private")}>Private</button>
            </div>
          </div>
          <div className={styles["bottom"]}>
            <button onClick={() => CreateDuplicate()}>Create</button>
          </div>
          <div className={styles["Close"]}>
            <button
              className={styles["button-close"]}
              onClick={() => closeCreate()}
            >
              &times;
            </button>
          </div>
        </div>
      </div> */}

{/* EndModal */}

          </div>


        <div className={styles["CardContainer-full"]}>
        <div className={styles["CardContainer"]}>
          {(type == "mylist") ? <>
          {props.map((e) => {
          return (
            <>
            
              <div className={styles["WishListCard"]}>
                <div className={styles["WishListCard-Top"]}>
                <Link href={`/WishList/WishListDetail?value=${e.id}`}>
                  <div className={styles["WishListCard-Top-Name"]}>
                    <h1>{e.Name}</h1>
                  </div>
                  </Link>
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
              
            </>
          );
        })}
          </> : (type === "Public") ? <>
          {props.map((e) => {
            
          return (
            <>
            
              <div className={styles["WishListCard"]}>
                <div className={styles["WishListCard-Top"]}>
                <Link href={`/WishList/WishListDetail?value=${e.id}`}>
                  <div className={styles["WishListCard-Top-Name"]}>
                    <h1>{e.Name}</h1>
                  </div>
                  </Link>
                  <div className={styles["WishListCard-Top-Button"]}>
                    <button onClick={() => CreateFollow(e.id)}>Follow</button>
                    <div className={styles["line-vertical"]}></div>
                    <button onClick={() => openUpdate(e.id)}>Duplicate</button>
                  </div>
                </div>
                
                <div className={styles["WishListCard-Bottom"]}>
                  
                  <div className={styles["WishListCard-Bottom-Left"]}></div>
                  <div className={styles["WishListCard-Bottom-Right"]}></div>
                  
                </div>
                
              </div>
              
            </>
          );
        })}
          </> : (type === "Detail") ? <>
          {props.map((e) => {
            
            return (
              <>
                {console.log(e)}
                
                <div className={styles["DetailCard"]}>
                  <div className={styles["DetailCard-Top"]}>
                    <img src={e.Product.ProductImage} alt="" />
                  </div>
                  <div className={styles["DetailCard-Bottom"]}>
                    
                    <div className={styles["WishListCard-Bottom-Left"]}>
                      {e.Product.ProductName}
                    </div>
                    <div className={styles["WishListCard-Bottom-Right"]}></div>
                    
                  </div>
                  
                </div>
                
              </>
            );
          })}
          </> : <>
          {props.map((e) => {
            
            return (
              <>
              
                <div className={styles["WishListCard"]}>
                  <div className={styles["WishListCard-Top"]}>
                  <Link href={`/WishList/WishListDetail?value=${e.WishList. id}`}>
                    <div className={styles["WishListCard-Top-Name"]}>
                      <h1>{e.WishList.Name}</h1>
                    </div>
                    </Link>
                    <div className={styles["WishListCard-Top-Button"]}>
                      {/* <button onClick={() => unfollow(e.id)}>UnFollow</button> */}
                      <div className={styles["line-vertical"]}></div>
                      <button onClick={() => openUpdate(e.WishList.id)}>Duplicate</button>
                    </div>
                  </div>
                  
                  <div className={styles["WishListCard-Bottom"]}>
                    
                    <div className={styles["WishListCard-Bottom-Left"]}></div>
                    <div className={styles["WishListCard-Bottom-Right"]}></div>
                    
                  </div>
                  
                </div>
                
              </>
            );
          })}
          </>}
        
      </div>
        </div>
      
    </>
  );
};

export default CardWishList;
