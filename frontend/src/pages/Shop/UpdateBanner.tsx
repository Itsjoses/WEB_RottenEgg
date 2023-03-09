import Layout from "../GlobalComponent/LayoutComponent";
import styles from "@/styles/UpdateBanner.module.css"
import { storage } from "@/Firebase/firebase";
import { MouseEvent, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import axios from "axios";
const UpdateBanner = () => {
    const [Images,setImages] = useState("")

    const UpdateBanner = async (e: MouseEvent<HTMLButtonElement, MouseEvent>) =>{
        e.preventDefault()
        const urlImage = `Product/1e3a9b6d-b4ff-4b6d-a92f-ab5f3a0260c8/Banner/${Images.name}`
        const imageRef = ref(storage, urlImage)

        await uploadBytes(imageRef,Images)

        let url 
        await getDownloadURL(imageRef).then((e) => {
            url = e
         })

         const UpdateBanner = await axios.post(
            "http://localhost:8080/query",
            {
              query: `
              mutation ChangeBanner($banner: String!,$id: String!){
                updateBanner(banner: $banner,id:$id){
                id
                banner  
              }
            }
              `,
              variables:{
                banner: url,
                id: "1e3a9b6d-b4ff-4b6d-a92f-ab5f3a0260c8",
              }
            }
         )
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
              <strong>Update Banner</strong>
            </div>

            <div className={styles["SignUp-note"]}>
              Insert Product to increase the Point in My TPA :V.
            </div>
            <form action="" 
            // onSubmit={(e)=> insertProductEnter(e)}
            >
              <div className={styles["SignIn-Form"]}>

        

       

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

                <div className={styles["form"]}>
                  <button className={styles["SignInButton"]} 
                  onClick={(e) => UpdateBanner(e)}
                  >SAVE</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    } ></Layout>;
}
 
export default UpdateBanner;