import WishListHome from "./WishListHome";
import styles from "@/styles/WishListFollowed.module.css"
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import CardWishList from "../GlobalComponent/CardWishListComponent";



const Followed = () => {
    const [followed,setFollowed] = useState([])
    const [count,setcount] = useState(0)

    useEffect(() => {
        const getData = async () => {
            const profile = sessionStorage.getItem("ID");
            if (profile != null) {
              const GetCurrentWishList = await axios.post(
                "http://localhost:8080/query",
                {
                  query: `
                  query getfollowed($id: String!){
                    GetFollowed(id: $id){
                        Followed{
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
                    id: profile,
                  },
                }
              );
              
              console.log(GetCurrentWishList.data.data.GetFollowed);
              
              if(GetCurrentWishList.data.data.GetFollowed.Followed != null){
                setFollowed(GetCurrentWishList.data.data.GetFollowed.Followed);
              }
            }
          };
          getData();
    },[count])

    const unfollow = (id: any) => {
        const getData = async () => {
            const profile = sessionStorage.getItem("ID");
            if (profile != null) {
              const GetCurrentWishList = await axios.post(
                "http://localhost:8080/query",
                {
                  query: `
                  mutation unfollow($user_id: String!, $wishlist_is: String!){
                    unfollow(user_id: $user_id,wishlist_is: $wishlist_is){
                      WishList{
                        id
                        Name
                      }
                  
                    }
                   
                  }
                      `,
                  variables: {
                    user_id: profile,
                    wishlist_is: id
                  },
                }
              );
              setcount(count+1)
            }
          };
          getData();
    }


    return ( 
        <WishListHome content={
          <div>
            <div className={styles["body-Container"]}>
                <div className={styles["half-Container"]}>
                    <div className={styles["Bottom-half-Container"]}>
                        <CardWishList type= "Followed" props={followed}/>
                    </div>
                </div>
            </div>
        </div>

      //       <div className={styles["CardContainer-full"]}>
      //   <div className={styles["CardContainer"]}>
      //   {followed.map((e) => {
      //     return (
      //       <>
            
      //         <div className={styles["WishListCard"]}>
      //           <div className={styles["WishListCard-Top"]}>
      //             <div className={styles["WishListCard-Top-Name"]}>
      //               <Link href={`/WishList/WishListDetail?value=${e.WishList.id}`}><h1>testing</h1></Link>
      //             </div>
      //             <div className={styles["WishListCard-Top-Button"]}>
      //               <button onClick={() => unfollow(e.WishList.id)} >Unfollow</button>
      //               {/* <div className={styles["line-vertical"]}></div>
      //               <button >Duplicate</button>
      //               <div className={styles["line-vertical"]}></div>
      //               <button >Settings</button> */}
      //             </div>
      //           </div>
                
      //           <div className={styles["WishListCard-Bottom"]}>
                  
      //             <div className={styles["WishListCard-Bottom-Left"]}></div>
      //             <div className={styles["WishListCard-Bottom-Right"]}></div>
                  
      //           </div>
                
      //         </div>
              
      //       </>
      //     );
      //   })}
      // </div>
      //   </div>

        }></WishListHome>


     );
}
 
export default Followed;