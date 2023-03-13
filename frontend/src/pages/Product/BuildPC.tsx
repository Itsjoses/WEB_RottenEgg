import Layout from "../GlobalComponent/LayoutComponent";
import styles from "@/styles/BuildPC.module.css"
import BuildPCCard from "./BuildPCCard";
import { SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import { stat } from "fs";
const BuildPC = () => {
    // set kiri
    const [name,setname] = useState("")
    const [buildListAll,setbuildList] = useState([])
    const [buildlistId,setbuildListid] = useState("")
    const [updateid,setupdateid] = useState("")
    const [reload,setreload] = useState(0)
    const [state,setstate] = useState("")
    const [section,setsection] = useState("")
    //set kanan
    const [level,setlevel] = useState("")
    const [pilih,setpilih] = useState("")
    useEffect(() =>{
console.log(level);

    },[level])
    useEffect(() => {
        const GetAllList = async () =>{
            const profile = sessionStorage.getItem("ID")
            console.log(profile);
            
            const getBuildList = await axios.post(
                "http://localhost:8080/query",
                {
                query: `
                query getBuildList($user_id: String!){
                    GetAllBuildList(user_id:$user_id){
                        id
                        BuildName
                  }
                }
                    `,
                variables: {
                    user_id: profile,
                }
                }
            )
            setpilih("Build")
            setlevel("Low")
            setsection("MotherBoard")
            if(getBuildList.data.errors != null) setbuildList([])
            else{
                setbuildListid(getBuildList.data.data.GetAllBuildList[0].id)
                setbuildList(getBuildList.data.data.GetAllBuildList)
            } 
            
        }
        GetAllList()
    },[reload])
   
    const [modal,setmodal] = useState({
        display:"none"
    })
    const showCreate = () => {
        setmodal({display: "inherit"})
        setstate("Create")
    }

    const showUpdate= (e: SetStateAction<string>) => {
        setmodal({display: "inherit"})
        setstate("Update")
        setupdateid(e);
    }
    
      const closeCreate = () => {
        setmodal({display: "none"})
      }

      const CreateBuildList = async() =>{
        const profile = sessionStorage.getItem("ID")
            const AddBuildList = await axios.post(
                "http://localhost:8080/query",
                {
                query: `
                mutation NewBuildlist($user_id: String!,$name: String!){
                    CreateBuildList(user_id:$user_id,name:$name){
                      id
                      User {
                        id
                      }
                      BuildName
                    }
                  }
                    `,
                variables: {
                    user_id: profile,
                    name: name
                }
                }
            )
            setreload(reload+1)
      }

      const UpdateBuildList = async() =>{
        const AddBuildList = await axios.post(
            "http://localhost:8080/query",
            {
            query: `
            mutation NewBuildlist($id: String!,$name: String!){
                UpdateBuildList(id:$id,name:$name){
                  id
                  User {
                    id
                  }
                  BuildName
                }
              }
                `,
            variables: {
                id: updateid,
                name: name
            }
            }
        )
        setreload(reload+1)
      }

      useEffect(() =>{
        console.log(buildlistId);
        
      },[buildlistId])

      const DeleteBuildList = async(e:any) =>{
        const AddBuildList = await axios.post(
            "http://localhost:8080/query",
            {
            query: `
            mutation NewBuildlist($id: String!){
                DeleteBuildList(id:$id){
                  id
                  User {
                    id
                  }
                  BuildName
                }
              }
                `,
            variables: {
                id: e,
            }
            }
        )
        setreload(reload+1)
      }
    return ( 
        <Layout content={
            
            <div className={styles["Container"]}>
                {/* //modal */}
                <div className={styles["modal-container"]} style={modal}>
            <div className={styles["modal-container-half"]}>
              <div className="top">
                <h1>Create a List</h1>
              </div>
              <div className={styles["middle-top"]}>
                <p>Name</p>
                <input type="text" onChange={(e) => setname(e.target.value)}/>
              </div>
              <div className={styles["bottom"]}>
                {(state == "Create") ? <button onClick={() => CreateBuildList()}>Create</button> :
                <button onClick={() => UpdateBuildList()}>Update</button>}
                
              </div>
              <div className={styles["Close"]}>
                <button className={styles["button-close"]} onClick={() => closeCreate()}>&times;</button>
              </div>
            </div>
          </div>
          {/* //end modal */}
                <div className={styles["Choose-PC"]}>
                <div className={styles["Choose-PC-Left"]}>
                    <div className={styles["Choose-PC-Left-Container"]}>
                    <div className={styles["Left-Container-Top"]}>
                        <h1>Build List</h1>
                        <button onClick={showCreate}>New List</button>
                    </div>
                    <div className={styles["Left-Container-Bottom"]}>
                        <div className={styles["Container-Bottom-Top"]}>
                            <h1>My List</h1>
                        </div>
                        <div className={styles["Container-Bottom-Bottom"]}>
                            {buildListAll.map(e =>{
                                return(
                                    <>
                                    <div className={styles["List-Card"]}>
                                        <div>
                                            <input type="radio" name="sama" onClick={() =>  setbuildListid(e.id)}/>
                                        </div>
                                        <div className={styles["List-Card-Title"]}>
                                            {e.BuildName}
                                        </div>
                                        <div className={styles["List-Card-Button"]}>
                                            <button onClick={() => showUpdate(e.id)}><i className="fa-solid fa-pencil"></i></button>
                                            <button onClick={() => DeleteBuildList(e.id)}><i className="fa-solid fa-trash"></i></button>
                                        </div>
                                    </div>
                                    </>
                                )
                            })}
                            
                        </div>
                        
                    </div>
                    </div>
                </div>
                <div className={styles["Choose-PC-Right"]}>
                    <div className={styles["Choose-PC-Top"]}>
                    <div className={styles["PC-card"]} onClick={(e) => setlevel("Low")}>
                            <div className={styles["PC-card-image"]}>
                                <img src="https://c1.neweggimages.com/NeweggImage/ProductImageCompressAll300/11-352-072-V22.jpg" alt="" />
                            </div>
                            <div className={styles["PC-card-detail"]}>
                                <div className={styles["PC-card-detail-title"]}>
                                    Entry Level
                                </div>
                                <div className={styles["PC-card-detail-subtitle"]}>
                                    Sub $Murahlah Pokoknya
                                </div>
                            </div>
                        
                        </div>
                        <div className={styles["PC-card"]}>
                            <div className={styles["PC-card-image"]} onClick={() => setlevel("Mid")}>
                                <img src="https://c1.neweggimages.com/NeweggImage/ProductImageCompressAll300/11-352-072-V22.jpg" alt="" />
                            </div>
                            <div className={styles["PC-card-detail"]}>
                                <div className={styles["PC-card-detail-title"]}>
                                    MainStream
                                </div>
                                <div className={styles["PC-card-detail-subtitle"]}>
                                    Sub $Murahlah Pokoknya
                                </div>
                            </div>
                        </div>
                        <div className={styles["PC-card"]}>
                            <div className={styles["PC-card-image"]} onClick={(e) => setlevel("High")}>
                                <img src="https://c1.neweggimages.com/NeweggImage/ProductImageCompressAll300/11-139-138-V08.jpg" alt="" />
                            </div>
                            <div className={styles["PC-card-detail"]}>
                                <div className={styles["PC-card-detail-title"]}>
                                    Enthusiast
                                </div>
                                <div className={styles["PC-card-detail-subtitle"]}>
                                    Sub $Murahlah Pokoknya
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles["Choose-PC-Bottom"]}>
                        <div className={styles["Choose-PC-Bottom-Top"]} >
                            <button onClick={(e) => setpilih("Build")}>Build</button>
                            <button onClick={(e) => setpilih("MyList")}>My List</button>
                        </div>
                        <div className={styles["Choose-PC-Bottom-Mid"]}>
                            <button onClick={(e) => setsection("MotherBoard")}>MotherBoard</button>
                            <button onClick={(e) => setsection("RAM")}>Ram</button>
                            <button onClick={(e) => setsection("VGA")}>VGA</button>
                        </div>
                        <div className={styles["Choose-PC-Bottom-Detail"]}>
                                <BuildPCCard BuildId={buildlistId} type={level} Section={section} pilih={pilih}/>
                        </div>


                    </div>
                </div>
                
                </div>
            </div>

        }></Layout>

     );
}
 
export default BuildPC;