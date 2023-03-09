import styles from "@/styles/RightWishListCard.module.css";
import axios from "axios";
import { useEffect, useState } from "react";

const RightCard = () => {
  const [WishList, setWishList] = useState([]);

  const [name, setname] = useState("");
  const [privacy, setPrivacy] = useState("");
  const [reload, setreload] = useState(0);
  const [duplicateid, setDuplicateID] = useState("");
  const [modal, setmodal] = useState({
    display: "none",
  });

  const showCreate = (id: any) => {
    setDuplicateID(id);
    setmodal({ display: "inherit" });
    setPrivacy("Public");
  };

  const closeCreate = () => {
    setmodal({ display: "none" });
  };

  const CreateDuplicate = async () => {
    const profile = sessionStorage.getItem("ID");
    let email;

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
    alert("success");
    setreload(reload + 1);
  };

  useEffect(() => {
    const getData = async () => {
      const profile = sessionStorage.getItem("ID");
      if (profile != null) {
        const PublicWishList = await axios.post("http://localhost:8080/query", {
          query: `
                query getPublic($id: String!){
                    GetPublicWishList(id: $id){
                      id
                      Name
                      Privacy
                      WishListDetails{
                              Product{
                          ProductName
                          ProductImage
                        }
                      }
                      User{
                              first_name
                      }
                      }
                  }
                    `,
          variables: {
            id: profile,
          },
        });
        setWishList(PublicWishList.data.data.GetPublicWishList);
        console.log(PublicWishList.data.data.GetPublicWishList);
      }
    };
    getData();
  }, [reload]);

  return (
    <>
      <div className={styles["modal-container"]} style={modal}>
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
      </div>

      <div className={styles["Top-Container"]}>
        <div className={styles["Top-Container-content"]}>
          <div className={styles["Top-content-left"]}>
            <div>143,361 Lists</div>
            <div>
              Sort By:
              <select name="" id="">
                <option value="">Create Date</option>
                <option value="">highest Rating</option>
                <option value="">Lowest Price</option>
                <option value="">highest Price</option>
                <option value="">Most Reviews</option>
                <option value="">Most Following</option>
              </select>
            </div>
          </div>
          <div className={styles["Top-content-right"]}></div>
        </div>
      </div>
      <div className={styles["Bottom-Container"]}>
        {WishList.map((e) => {
          console.log(e);
          return (
            <>
              <div className={styles["Bottom-Container-Card"]}>
                <div className={styles["Bottom-Top-Container"]}>
                  <div>
                    <h1>{e.Name}</h1>
                  </div>
                  <div>
                    <button>Follow</button>
                    <button onClick={() => showCreate(e.id)}>Duplicate</button>
                  </div>
                </div>
                <div className={styles["Bottom-Bottom-Container"]}>
                  <div className={styles["Bottom-Left-Container"]}></div>
                  <div className={styles["Bottom-right-Container"]}></div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default RightCard;
