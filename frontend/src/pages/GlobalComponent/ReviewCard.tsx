import styles from "@/styles/ReviewCard.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
const ReviewCard = ({ typeload }: any) => {
  const [product, setdata] = useState([]);
  const [reload,setreload] = useState(0)

  useEffect(() => {
    const profile = sessionStorage.getItem("ID");
    const generate = async () => {
      if (typeload === "Queue") {
        console.log("asd");

        const ReviewQueue = await axios.post("http://localhost:8080/query", {
          query: `
                      query GetQueue($user_id: String!){
                        getQueue(user_id:$user_id){
                        Id
                        User{
                            id
                          first_name
                        }
                        Product{
                            id
                          ProductName
                          ProductImage
                          ProductDescription
                          Shop{
                                    id
                          }
                        }
                    }
                    }
                      `,
          variables: {
            user_id: profile,
          },
        });
        setdata(ReviewQueue.data.data.getQueue);
      }else if(typeload === "Review"){
        console.log("Review");
        
        const Review = await axios.post("http://localhost:8080/query", {
          query: `
          query GetReview($user_id: String!){
            GetReview(user_id:$user_id){
              id
              User {
                id
              }
              Product {
                id
                ProductName
                          ProductImage
                          ProductDescription
              }
              Shop {
                id
              }
              Pros
              Cons
              Overall
              Star
              }
          }
                      `,
          variables: {
            user_id: profile,
          },
        });
        setdata(Review.data.data.GetReview);
        console.log("Asd");
        
      }
    };
    generate();
  }, [reload,typeload]);
  const [modal, setmodal] = useState({
    display: "none",
  });
  const [modalPreview, setmodalPreview] = useState({
    display: "none",
  });
  const [modalupdate, setmodalupdate] = useState({
    display: "none",
  });

  const [Pro, setPro] = useState("");
  const [Cons, setCons] = useState("");
  const [OverAll, setOverAll] = useState("");
  const [Productid,setProductId] = useState("")
  const [ShopId,setShopId] = useState("")
  const [Star,setStar] = useState("")
  const [idQueue,setidQueue] = useState("")
  const [id,setid] = useState("") 
  const CreateReview = async() => {
    const profile = sessionStorage.getItem("ID");
    
    const AddNewReview = await axios.post("http://localhost:8080/query", {
      query: `
      mutation createNewReview($ProductId: String!,$UserId: String!,$ShopId: String!,$Pros: String!,$Cons: String!,$Star: Int!,$Overall:String!){
        CreateReview(input:{ProductId:$ProductId,UserId:$UserId,ShopId:$ShopId,Pros:$Pros,Cons:$Cons,Star:$Star,Overall:$Overall}){
              id
          Product{
              id
          }
          User{
          id
          }
          Pros
          Cons
        }
      }
              `,
      variables: {
        ProductId: Productid,
        UserId: profile,
        ShopId: ShopId,
        Pros: Pro,
        Cons: Cons,
        Star: Number(Star),
        Overall: OverAll
      },
    });
    console.log("Asd");
    
    const RemoveQueue = await axios.post("http://localhost:8080/query", {
          query: `
          mutation DoneQueue($idProduct: String!){
            DoneQueue(id: $idProduct){
                Id
          }
        }	
        
                      `,
          variables: {
            idProduct: idQueue,
          },
        });
    setmodal({ display: "none" });
    setreload(reload +1)
    alert("success")
    

  };
  const closeCreate = () => {
    setmodal({ display: "none" });
    setmodalupdate({ display: "none" });
    setProductId("")
    setShopId("")
    setidQueue("")
  };
  const closePreview= () => {
    setmodalPreview({ display: "none" });
  };
  const openCreate = (e,e1,id) => {
    setmodal({ display: "inherit" });
    setProductId(e)
    setShopId(e1)
    setidQueue(id)
  };

  const [typeReview,setTypeReview] = useState("")

  const DetailReview = (e) =>{
    setPro(e.Pros)
    setCons(e.Cons)
    setOverAll(e.Overall)
    setStar(e.Star)
    setmodalPreview({ display: "inherit" });
  }

  const updateReview = (e) =>{
    setPro(e.Pros)
    setCons(e.Cons)
    setOverAll(e.Overall)
    setStar(e.Star)
    setid(e.id)
    setmodalupdate({ display: "inherit" });
  }

  // const DeleteReview = (e) =>{
  //   setPro(e.Pros)
  //   setCons(e.Cons)
  //   setOverAll(e.Overall)
  //   setStar(e.Star)
  //   setmodalupdate({ display: "inherit" });
  // }

  const SetUpdateReview = async () =>{
    console.log(id);
    const UpdateReview = await axios.post("http://localhost:8080/query", {
      query: `
      mutation updatereview($id: String!,$Pros: String!,$Cons: String!,$Overall: String!,$Star: Int!){
        UpdateReview(id: $id,Pros:$Pros,Cons:$Cons,Overall:$Overall,Star: $Star){
          id
          Pros
          Cons
          Overall
        }
      }
              `,
      variables: {
        id: id,
        Pros: Pro,
        Cons: Cons,
        Overall: OverAll,
        Star: Star
      },
    });
    setmodalupdate({ display: "none" });
    alert("success")
    setreload(reload + 1)
  }

  const DeleteReview = async(e) =>{
    console.log(e);
    
    const DeleteReview = await axios.post("http://localhost:8080/query", {
      query: `
      mutation DeleteReview($id: String!){
        DeleteReview(id: $id){
          id
          Pros
          Cons
          Overall
        }
      }
              `,
      variables: {
        id: e,
      },
    });
    alert("Review Successfully Deleted")
    setreload(reload+1)
  }
  return (
    <>
      <div className={styles["Container"]}>
        {/* modal */}
        <div className={styles["modal-container"]} style={modal}>
          <div className={styles["modal-container-half"]}>
            <div className="top">
              <h1>Create Address</h1>
            </div>
            <div className={styles["middle-top"]}>
              <p>Pro</p>
              <textarea onChange={(e) => setPro(e.target.value)} />
            </div>
            <div className={styles["middle-top"]}>
              <p>Cons</p>
              <textarea onChange={(e) => setCons(e.target.value)} />
            </div>
            <div className={styles["middle-top"]}>
              <p>OverAll</p>
              <textarea onChange={(e) => setOverAll(e.target.value)} />
            </div>
            <div className={styles["middle-top"]}>
              <p>Star</p>
              <select name="" id="" onChange={(e) => setStar(e.target.value)} >
                <option value="1">1 Star</option>
                <option value="2">2 Star</option>
                <option value="3">3 Star</option>
                <option value="4">4 Star</option>
                <option value="5">5 Star</option>
              </select>
            </div>
            <div className={styles["bottom"]}>
              <button onClick={() => CreateReview()}>Save</button>
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
        {/* Final modal */}

        {/*View Second Modal  */}
        <div className={styles["modal-container"]} style={modalPreview}>
          <div className={styles["modal-container-half"]}>
            <div className="top">
              <h1>Detail Review</h1>
            </div>
            <div className={styles["middle-top"]}>
              <p>Pro</p>
              <textarea value={Pro} readOnly/>
            </div>
            <div className={styles["middle-top"]}>
              <p>Cons</p>
              <textarea value={Cons} readOnly/>
            </div>
            <div className={styles["middle-top"]}>
              <p>OverAll</p>
              <textarea value={OverAll} readOnly/>
            </div>
            <div className={styles["middle-top"]}>
              <p>Star</p>
              <select name="" id=""  value={Star}>
                <option value="">{Star} stars</option>
              </select>
            </div>
            {(typeReview === "update") ? <>
              <div className={styles["bottom"]}>
                <button onClick={() => SetUpdateReview()}>Save</button>
              </div>
            </> : <></>}
            
            <div className={styles["Close"]}>
              <button
                className={styles["button-close"]}
                onClick={() => closePreview()}
              >
                &times;
              </button>
            </div>
          </div>
        </div>
        {/* Final modal */}

        {/*View Second Modal  */}
        <div className={styles["modal-container"]} style={modalupdate}>
          <div className={styles["modal-container-half"]}>
            <div className="top">
              <h1>Update Review</h1>
            </div>
            <div className={styles["middle-top"]}>
              <p>Pro</p>
              <textarea value={Pro} onChange={(e) => setPro(e.target.value)} />
            </div>
            <div className={styles["middle-top"]}>
              <p>Cons</p>
              <textarea value={Cons} onChange={(e) => setCons(e.target.value)} />
            </div>
            <div className={styles["middle-top"]}>
              <p>OverAll</p>
              <textarea value={OverAll} onChange={(e) => setOverAll(e.target.value)} />
            </div>
            <div className={styles["middle-top"]}>
              <p>Star</p>
              <select name="" id="" value={Star } onChange={(e) => setStar(e.target.value)} >
                <option value="1">1 Star</option>
                <option value="2">2 Star</option>
                <option value="3">3 Star</option>
                <option value="4">4 Star</option>
                <option value="5">5 Star</option>
              </select>
            </div>
            <div className={styles["bottom"]}>
              <button onClick={() => SetUpdateReview()}>Save</button>
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
        {/* Final modal */}


        <div className={styles["Container"]}>
          <div className={styles["Card-Top"]}>
            <div className={styles["Card-Top-Container"]}>
              <div className={styles["Card-Top-Left"]}>Head</div>
              <div className={styles["Card-Top-Right"]}>
                {/* {button(e.id)} */}
                {/* {(data === "Done") ? {
                                        return(
                                            <>
                                            <button>Finalize Order</button>
                                            <button>Cancle Order</button>
                                            </>
                                            
                                        )

                                    } } */}
              </div>
            </div>
          </div>
          <div className={styles["Card-Bottom"]}>
            {product.map((e) => {
              return (
                <>
                
                  <div className={styles["Card-Bottom-Container"]}>
                    <div className={styles["Card-Bottom-Left"]}>
                      {(typeload === "Queue") ? <img src={e.Product.ProductImage} alt="" /> : <img src={e.Product.ProductImage} alt="" />}
                      
                    </div>
                    <div className={styles["Card-Bottom-Mid"]}>
                      {(typeload === "Queue") ? <>
                        <p>{e.Product.ProductName}</p>
                        <p>{e.Product.ProductDescription}</p>
                      </> : <>
                        <p>{e.Product.ProductName}</p>
                        <p>{e.Star}</p>
                        <p>{e.Product.ProductDescription}</p>
                      </>}
                      
                    </div>
                    <div className={styles["Card-Bottom-Right"]}>
                      <p>$ 123</p>
                      <p>Quantity: 12</p>
                      {(typeload === "Queue") ? <button onClick={() => openCreate(e.Product.id,e.Product.Shop.id,e.Id)}>Review</button> : <button onClick={() => DetailReview(e)}>Detail Review</button>}
                      {(typeload === "Review") ? <>
                      <button onClick={() => updateReview(e)}>update</button> 
                      <button onClick={() => DeleteReview(e.id)}>Delete</button> 
                      </> : <></>}
                      
                      
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewCard;
