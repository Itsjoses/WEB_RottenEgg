import Layout from "../GlobalComponent/LayoutComponent";
import styles from "../../styles/InsertProduct.module.css"
import { FormEvent, MouseEvent, useEffect, useState } from "react";
import axios from "axios";
import { storage } from "@/Firebase/firebase";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";

const InsertProduct = () => {

    const [Name,setName] = useState("")
    const [AllCategory,setCategory] = useState([])
    const [Images,setImages] = useState("")
    const [Description,setDescription] = useState("")
    const [Price,setPrice] = useState(0)
    const [Stock,setStock] = useState(0)
    const [Category,setCategorySelect] = useState("")
    useEffect(() => {
      const getCategory = async () => {
        const getAllCategory = await axios.post(
            "http://localhost:8080/query",
            {
              query: `
              query getCategory{
                Category{
                  id
                  CategoryName
                }
              }
              `,
            }
        ) 
        setCategory(getAllCategory.data.data.Category)
      }
      getCategory()
    },[])
    

    const InsertNewProduct = async () => {
        console.log(Name)
        console.log(Category)
        console.log(Images)
        console.log(Description)
        console.log(Price)
        console.log(Stock)

        const urlImage = `Product/1e3a9b6d-b4ff-4b6d-a92f-ab5f3a0260c8/${Images.name}`
        const imageRef = ref(storage, urlImage)

        await uploadBytes(imageRef,Images)

        let url 
        await getDownloadURL(imageRef).then((e) => {
            url = e
         })
        
        const pushProduct = await axios.post(
            "http://localhost:8080/query",
            {
              query: `
              mutation createProuct($ProductName: String!,$ProductCategoryName: String!, $ProductImage: String!,
                $ProductDescription: String!, $ProductPrice: Int!, $ProductStock: Int!){

                CreateProduct(input:{ProductName:$ProductName,ProductCategoryName:$ProductCategoryName,ProductImage:$ProductImage,ProductDescription:$ProductDescription,ProductPrice: $ProductPrice,ProductStock: $ProductStock}){

                  id
                  ProductName
                  ProductCategory{
                    CategoryName
                  }
                  ProductImage
                  ProductDescription
                  ProductPrice
                  ProductStock
                }
              }
              `,
              variables:{
                ProductName: Name,
                ProductCategoryName: Category,
                ProductImage: url,
                ProductDescription: Description,
                ProductPrice: Price,
                ProductStock: Stock
              }
            }
        ) 

        console.log("success");
        
    }

    const insertProductEnter = (e: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement, MouseEvent>) =>{
        e.preventDefault()
        InsertNewProduct()
    }


    return <Layout content={
        <div className={styles.SignIn}>
        <div className={`${styles["SignIn-Header"]}`}>
          <a href="">
            <img
              src="https://c1.neweggimages.com/WebResource/Themes/2005/Nest/logo_424x210.png"
              alt=""
            />
          </a>
        </div>
        <div className={styles["SignIn-Body"]}>
          <div className={styles["SignIn-Box"]}>
            <div className={styles["SignIn-Title"]}>
              <strong>Insert Product</strong>
            </div>

            <div className={styles["SignUp-note"]}>
              Insert Product to increase the Point in My TPA :V.
            </div>
            <form action="" 
            onSubmit={(e)=> insertProductEnter(e)}
            >
              <div className={styles["SignIn-Form"]}>
                <div className={styles["form"]}>
                  <div className={styles["SignIn-Email"]}>
                    {/* <label htmlFor="Email-Address">Email Address</label> */}
                    <input
                      id="Email-Address"
                      type="text"
                      placeholder="Product Name"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>

                 

                <div className={styles["form"]}>
                  <div className={styles["SignIn-Email"]}>
                    {/* <label htmlFor="Email-Address">Email Address</label> */}
                    {/* <input
                      id="Email-Address"
                      type="text"
                      placeholder="Product Description"
                      onChange={(e) => setShopPassword(e.target.value)}
                    /> */}

                    <textarea className={styles["text-area"]} placeholder="Description"
                    onChange={(e) => setDescription(e.target.value)}
                    >

                    </textarea>
                  </div>
                </div>

                <div className={styles["form"]}>
                  <div className={styles["SignIn-Email"]}>
                    {/* <label htmlFor="Email-Address">Email Address</label> */}
                    <input
                      id="Email-Address"
                      type="number"
                      placeholder="Product Price"
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                </div>

                <div className={styles["form"]}>
                  <div className={styles["SignIn-Email"]}>
                    {/* <label htmlFor="Email-Address">Email Address</label> */}
                    <input
                      id="Email-Address"
                      type="number"
                      placeholder="Product Stock"
                      onChange={(e) => setStock(e.target.value)}
                    />
                  </div>
                </div>

                <div className={styles["form"]}>
                  <div className={styles["SignIn-Email"]}>
                    {/* <label htmlFor="Email-Address">Email Address</label> */}
                    {/* <input
                      id="Email-Address"
                      type="text"
                      placeholder="Product Category"
                    //   onChange={(e) => setShopEmail(e.target.value)}
                    /> */}
                        <input list="browsers" name="browser" id="browser" placeholder="Category" 
                        onChange={(e) => setCategorySelect(e.target.value)}
                        />
                        
                        
                        <datalist id="browsers">
                          {AllCategory.map((e) => {
                                  return (  
                                    <>
                                      <option value={e.CategoryName}></option>
                                    </>
                                    
                                  )
                              })}
                        </datalist>
                  </div>
                </div> 

                <div className={styles["form"]}>
                  <div className={styles["SignIn-Email"]}>
                    {/* <label htmlFor="Email-Address">Email Address</label> */}
                    <input
                      id="Email-Address"
                      type="file"
                      placeholder="Product Stock"
                      onChange={(e) => setImages(e.target.files[0])}
                    />
                  </div>
                </div>
                {/* {AllCategory.map((e) => {
                                  return (  
                                    <h1>{e.CategoryName}</h1>
                                    
                                  )
                              })} */}
                <div className={styles["form"]}>
                  <button className={styles["SignInButton"]} 
                  onClick={(e) => insertProductEnter(e)}
                  >SAVE</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    } ></Layout>;
}
 
export default InsertProduct;