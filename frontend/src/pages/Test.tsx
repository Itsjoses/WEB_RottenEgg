import { ApolloClient } from "@apollo/client";
import { InMemoryCache } from "@apollo/client/cache";
import { gql } from "@apollo/client/core";
import Testing from "./Testing";
import styles from "../styles/test.module.css"
import { useEffect, useState } from "react";
import { storage } from "@/Firebase/firebase";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { Temp } from "./types/model";
const Test = () => {
    const [imageUpload, setimageUpload] = useState(null)
    const [imageList,setImageList] = useState<Temp[]>([])
    const imageListRef = ref(storage,"image/")
    const uploadImage = async () => {
        if(imageUpload == null) return;
        const urlImage = `image/${imageUpload.name}`
        const imageRef = ref(storage, urlImage)

        
        await uploadBytes(imageRef,imageUpload)
        
        getDownloadURL(imageRef).then((url) => {
            console.log(url);
        
            setImageList((prev) => [...prev,url]);
            alert('suc')
        })
        
    }

    // useEffect(() => {
    //     listAll(imageListRef).then((e) =>{
    //         e.items.forEach((items) => {
    //             console.log(items)
    //             // getDownloadURL(items).then((url) => {
    //             //     setImageList((prev) => [...prev,url]);
    //             //     // console.log(url)
    //             // })
    //             const url = getDownloadURL(items._location.path_)
    //         })
    //     })
    // },[])


    return ( 
            <div className={styles.testing}>
                <div>
                <input type="file" name="" id="" onChange={(e) => {setimageUpload(e.target.files[0])}}/>
                <button onClick={uploadImage}>submit</button>
                </div>
                <img src="https://firebasestorage.googleapis.com/v0/b/tpaweb-7a7f2.appspot.com/o/image%2F568ef7c6c8fa376cc3247298aebda6f6.jpg?alt=media&token=5b2d8f33-6f5d-46ff-a2ef-b797346a1c81" alt="" />
                {/* {imageList && (
                    imageList.map((e) => {
                        console.log(e)
                        console.log(e)
                            return (
                            )
                    })
                    // console.log(imageList)
                    
                )} */}
            </div>
     );
}
 
export default Test;