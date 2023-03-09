import axios from "axios";
import { useRouter } from "next/router";
import { FormEvent, MouseEvent, useEffect, useState } from "react";
import styles from "../../../styles/UpdateNumber.module.css"

const UpdateNumberPhone = () => {
    const [email,setemail] = useState("");
    const [phonenumber,setphonenumber] = useState("")
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

    const UpdatePhoneFuction = async () => {
        const update = await axios.post(
            "http://localhost:8080/query",
            {
              query: `
              mutation updateUser($email: String!,$phone_number: String!){
                    updatePhone(email : $email, phone_number: $phone_number){
                        phone_number
                    }
                }
              `,
              variables:{
                email: email,
                phone_number: phonenumber
              }
            }
        )
        router.push("/AccountPage/Setting")
    }

    const updatePhoneSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(phonenumber.length < 12) return
        UpdatePhoneFuction()
    }

    const updatePhoneClick = async() => {
        if(phonenumber.length < 12) return
        UpdatePhoneFuction()
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
                            <strong>Update Phone Number</strong> 
                    </div>

                    <div className={styles["SignUp-note"]}>
                    Enter the mobile phone number you would like to associate with your profile. We will send a One-time Code to that number.
                    </div>
                    <form action="" onSubmit={(e) => updatePhoneSubmit(e)}>
                    <div className={styles["SignIn-Form"]}>
                            <div className={styles["form"]}>
                                <div className={styles["SignIn-Email"]}>
                                    {/* <label htmlFor="Email-Address">Email Address</label> */}
                                    <input id="Email-Address" type="tel" placeholder="Mobile Phone Number" onChange={(e) => setphonenumber(e.target.value)}/>
                                </div>
                            </div>

                            <div className={styles["form"]}>
                                <button className={styles["SignInButton"]} onClick={() => updatePhoneClick()} >SAVE</button>
                            </div>
                        <div className={styles["form"]}>
                            <button className={styles["CancelButton"]}>CANCEL</button>
                        </div>

                        <label className={styles["form-checkbox"]}>
                            <input type="checkbox" value="1"/>
                            <span className={styles["form-checkbox-menu"]} >
                            Agree to receive promotional and marketing text messages from Newegg at this number. Message and data rates may apply. Message frequency varies. View <a href="">Terms & Conditions</a>. 
                            </span>
                        </label>

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
 
export default UpdateNumberPhone;