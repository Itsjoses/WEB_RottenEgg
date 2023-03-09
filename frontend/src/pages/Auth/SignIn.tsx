import axios from "axios";
import { validate } from "graphql";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { convertToObject } from "typescript";
import styles from "../../styles/Login.module.css"
import { LOGIN } from "../Query/Mutation/Mutation";
const SignIn = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [emailerrorState,setEMailError] = useState("");
    const [passworderrorState,setPasswordError] = useState("");
    const [error,seterror] = useState("");

    // const [authentication] = useMutation(LOGIN, {
    //     variables:{
    //         email: email,
    //         password: password
    //     } 
    // })
    let emailerror,passworderror;
    let router= useRouter()
    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        emailerror= document.getElementById("email") as HTMLHeadingElement
        passworderror = document.getElementById("password")as HTMLHeadingElement
        if(email == ""){
            setEMailError("Email is required");

        }else{
            setEMailError("");
        }
        
        if(password == ""){
            setPasswordError("Password is required");

        }else if(password.length < 6){
            setPasswordError("Password must be more than 6 characters");
        }else{
            setPasswordError("");
        }
        console.log(email)
        console.log(password)


        if(email != "" && password != ""){
            const Userdata = await axios.post(
                "http://localhost:8080/query",
                {
                    query: `
                    query getdata($email: String!, $password: String!)
                        {
                            Login(email: $email,password: $password){
                                id
                            }
                        }
                    `,
                    variables:{
                        email:email,
                        password:password
                    }
                }
            ).catch((err)=>{
                alert(err.message)
            })
            if(Userdata.data.errors != null) alert("Email dan Password salah KON-")
            else{
                console.log(Userdata.data.data.Login.id)
                sessionStorage.setItem("ID",Userdata.data.data.Login.id);
                alert(":V")

                router.push("/Home")
            }  
        }
        
       
    };

    // useEffect(() =>{
    //     console.log(password)
    // },[password])

    const x = async () => {
        
        const reg = await axios.post(
            "http://localhost:8080/query",
            {
              query: `
              mutation checkLogin($email: String!, $password: String!) {
                login(email:$email,password:$password){
                    id
                }
            }
                `,
                variables:{
                    email:email,
                    password:password
                },
            }
        )
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
                            Sign in
                    </div>
                    <div className={styles["SignIn-Form"]}>
                        <form action="" onSubmit={(e) => submit(e)}>

                        
                        <div className={styles["form"]}>
                            <div className={styles["SignIn-Email"]}>
                                {/* <label htmlFor="Email-Address">Email Address</label> */}
                                <input id="Email-Address" type="email" placeholder="Email Address"
                                onChange={e => (setEmail(e.target.value))}
                                ref={emailerror}/>
                            </div>
                            <div id="email-error" className={`${styles["error-messages"]} ${styles["email"]}`}>
                                {emailerrorState}
                            </div>
                            
                        </div>

                        <div className={styles["form"]}>
                            <div className={styles["SignIn-Email"]}>
                                {/* <label htmlFor="Email-Address">Email Address</label> */}
                                <input id="Email-Address" type="password" placeholder="Password"
                                onChange={e => (setPassword(e.target.value))}/>
                            </div>
                            <div id="password-error" className={`${styles["error-messages"]} ${styles["password"]}`}>
                            {passworderrorState}
                            </div>
                        </div>

                        <div className={styles["form"]}>
                            <button className={styles["SignInButton"]} onClick={() => x()}>SIGN IN</button>
                        </div>

                        <div className={styles["form"]}>
                            <button className={styles["SignInOneTime"]}>GET ONE-TIME SIGN IN CODE</button>
                            <div className={styles.note}>
                                <a href="">What's the One-Time Code? </a>
                            </div>
                        </div>

                        <div className={styles["form"]}>
                            <div className={styles.SignUp}>
                                New to Newegg? <a href="">Sign Up</a>
                            </div>
                        </div>
                        <div className={styles["split-line"]}>
                            <div className={styles.SignUp}>
                                <span>OR</span>
                            </div>
                        </div>

                        <div className={styles["form"]}>
                        <button className={styles["SignInGoogle"]}>
                            <div className={styles.image}>
                                <img src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png" alt="" />
                            </div>
                            SIGN IN WITH GOOGLE</button>
                        </div>
                        <div className={styles["form"]}>
                        <button className={styles["SignInGoogle"]}>
                            <div className={styles.image}>
                                <img src="https://www.freepnglogos.com/uploads/apple-logo-png/apple-logo-png-dallas-shootings-don-add-are-speech-zones-used-4.png" alt="" />
                            </div>
                            SIGN IN WITH APPLE</button>
                        </div>
                        </form> 
                    </div>
                    
                    
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
 
export default SignIn;