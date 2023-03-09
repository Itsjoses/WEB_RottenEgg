import axios from "axios";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import styles from "../../../styles/UpdatePassword.module.css"

const UpdatePassword = () => {
    const [currentPassword,setcurrentpassword] = useState("");
    const [newPassword,setnewPassword] = useState("")
    const [email,setemail] = useState("")
    let router= useRouter()

    useEffect(() => {
        const getData = async () => {
            const profile = sessionStorage.getItem("ID")
            if(profile != null){
              const GetCurrentUser = await axios.post(
                "http://localhost:8080/query",
                {
                  query: `
                    query getCurrentUser($id: String!)
                    {
                      GetUser(id : $id){
                        email
                        phone_number
                      }
                    }
                  `,
                  variables:{
                    id: profile
                  }
                }
              ) 
              setemail(GetCurrentUser.data.data.GetUser.email)
            }
    }
    getData();
})



    const UpdatePassword = async () => {
        const UpdatePasswordQuery = await axios.post(
            "http://localhost:8080/query",
            {
              query: `
              mutation Update($email: String!, $currentpassword: String!, $newpassword: String!){
                updatePassword(email : $email, currentpassword : $currentpassword, newpassword : $newpassword){
                    password
              }
            }
              `,
              variables:{
                email: email,
                currentpassword: currentPassword,
                newpassword: newPassword
              }
            }
          ) 
        //   console.log(UpdatePasswordQuery.data)
          if(UpdatePasswordQuery.data.errors != null) alert("Invalid Password")
          else{
              alert("Update Success")
              router.push("/AccountPage/Setting")
          }  

    }

    const UpdatePasswordClick = () => {
        // if(currentPassword != "" && newPassword != "")
        UpdatePassword();
    }

    const UpdatePasswordSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // console.log("asdasd")
        // if(currentPassword != "" && newPassword != "")
        UpdatePassword();
    }



    return ( 
        <div className={styles.SignIn}>
            <div className={`${styles["SignIn-Header"]}`}>
                <a href="">
                    <img src="https://c1.neweggimages.com/WebResource/Themes/2005/Nest/logo_424x210.png" alt="" />
                </a>
            </div>
            <div className={styles["SignIn-Body"]}>
                <div className={styles["SignIn-Box"]}>
                    <div className={styles["SignIn-Title"]}>
                            <strong>Change Your Password</strong> 
                    </div>


                    <form action="" onSubmit={(e) => UpdatePasswordSubmit(e)}>
                    <div className={styles["SignIn-Form"]}>
                            <div className={styles["form"]}>
                                <div className={styles["SignIn-Email"]}>
                                    {/* <label htmlFor="Email-Address">Email Address</label> */}
                                    <input id="Email-Address" type="password" placeholder="Current Password" onChange={(e) => setcurrentpassword(e.target.value)}/>
                                </div>
                            </div>

                            <div className={styles["form"]}>
                                <div className={styles["SignIn-Email"]}>
                                    {/* <label htmlFor="Email-Address">Email Address</label> */}
                                    <input id="Email-Address" type="password" placeholder="New Password" onChange={(e) => setnewPassword(e.target.value)}/>
                                </div>
                            </div>

                            <div className={styles["form"]}>
                                <button className={styles["SignInButton"]} onSubmit={() => UpdatePasswordClick()}>SAVE CHANGES</button>
                            </div>

                            <div className={styles["form"]}>
                            <div className={styles.note}>
                                Need Help? <a href="">Contact Customer Service</a>
                            </div>
                        </div>

                    </div>

                    </form>
                    
                    
                </div>
                    
            </div>
            <div className={`${styles["SignIn-Footer"]}`}>
                <p>
                    <a href="">Terms & Conditions</a>
                    <span> | </span>
                    <a href="">Privact Policy</a>
                </p>
                <p>© 2023 Newegg - SE22-2</p>
            </div>
        </div>


     );
}
 
export default UpdatePassword;