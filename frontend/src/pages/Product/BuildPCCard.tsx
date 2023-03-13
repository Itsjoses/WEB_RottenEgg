import styles from "@/styles/BuildPCDetail.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
const BuildPCCard = ({ BuildId, type, Section,pilih}) => {
    const [product,setproduct] = useState([])
    const [mylist,setmylist] = useState([])
    useEffect(() =>{
        const GetAllList = async () =>{
            console.log(BuildId);
            console.log(type);
            console.log(type);
            console.log(Section);
            
            const profile = sessionStorage.getItem("ID")
            if(pilih == "Build"){
                const getBuildList = await axios.post(
                    "http://localhost:8080/query",
                    {
                    query: `
                    query getSelectedProduct($type: String!,$section: String!){
                        getAllProductSelected(type:$type,section:$section){
                            id
                        ProductName
                        ProductImage
                        ProductPrice
                        ProductCategory{
                                CategoryName
                        }
                      }
                    }
                        `,
                    variables: {
                        type: type,
                        section: Section
                    }
                    }
                )
                console.log(getBuildList.data.data.getAllProductSelected);
                setproduct(getBuildList.data.data.getAllProductSelected)
            }else if(pilih == "MyList"){
              const getmylist = await axios.post(
                "http://localhost:8080/query",
                {
                query: `
                query get{
                  GetAllItem(BuildList_id:"9b7dfa91-409f-41d1-9baa-f2deb17c6ec5"){
                    BuildList {
                      id
                    }
                    Product {
                      id
                      ProductName
                      ProductImage
                      ProductPrice
                    }
                  Quantity
                  }
                }
              }
                    `,
                variables: {
                    type: type,
                    section: Section
                }
                }
            )
            setmylist(getmylist.data.data.GetAllItem)
            }
          }
        GetAllList()
        
    },[type,Section,pilih])
    const insertitem = async(productid: any) =>{
        const insert = await axios.post(
            "http://localhost:8080/query",
            {
            query: `
            mutation Insert($product_id: String!,$BuildList_id: String!){
                InsertItem(product_id: $product_id,BuildList_id: $BuildList_id){
                  Quantity
                }
              }
                `,
            variables: {
                product_id: productid,
                BuildList_id: BuildId
            }
            }
        )
        alert("successfully insert to build list")
    }
  return (
    <div className={styles["Container"]}>
      <div className={styles["Content"]}>
        {(pilih == "Build") ? 
        <>
{product.map(e =>{
            console.log(e);
            return (
                <>
                <div className={styles["Card"]}>
          <div className={styles["Card-Left"]}>
            <div className={styles["Card-Left-Image"]}>
                <img src={e.ProductImage} alt="" />
            </div>
            <div className={styles["Card-Left-Title"]}>
                <h3>{e.ProductName}</h3>
            </div>
          </div>
          <div className={styles["Card-Right"]}>
            <div className={styles["Card-Right-Price"]}>
                $ {e.ProductPrice}
            </div>
            <div className={styles["Card-Right-Button"]}>
                <button onClick={() => insertitem(e.id)}>Select +</button>
            </div>
          </div>
        </div>
                </>
            )
        })}
        </> : 
        <>
        {mylist.map(e =>{
          console.log(e);
          
            return (
                <>
                <div className={styles["Card"]}>
          <div className={styles["Card-Left"]}>
            <div className={styles["Card-Left-Image"]}>
                <img src={e.ProductImage} alt="" />
            </div>
            <div className={styles["Card-Left-Title"]}>
                <h3>{e.ProductName}</h3>
            </div>
          </div>
          <div className={styles["Card-Right"]}>
            <div className={styles["Card-Right-Price"]}>
                $ {e.ProductPrice}
            </div>
            <div className={styles["Card-Right-Button"]}>
                <button onClick={() => insertitem(e.id)}>Select +</button>
            </div>
          </div>
        </div>
                </>
            )
        })}
        </>}
        
        
      </div>
    </div>
  );
};

export default BuildPCCard;
