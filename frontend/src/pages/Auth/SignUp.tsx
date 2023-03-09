import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import styles from "../../styles/SignUp.module.css"
import { CREATE_USER } from "../Query/Mutation/Mutation";
const SignUp = () => {
    let router= useRouter()

    const atLeastOneUppercase = /[A-Z]/g; // capital letters from A to Z
    const atLeastOneLowercase = /[a-z]/g; // small letters from a to z
    const atLeastOneNumeric = /[0-9]/g; // numbers from 0 to 9
    const atLeastOneSpecialChar = /[#?!@$%^&*-]/g; // any of the special characters within the square brackets

   

    const [email,setEmail] = useState("")
    const [first_name,setfirstname] = useState("")
    const [last_name,setlastname] = useState("")
    const [password,setpassword] = useState("")
    const [phone_number,setphonenumber] = useState("")
    const [checkbox,setcheckbox] = useState("")

    const [erroremail,seterrorEmail] = useState("")
    const [errorfirst_name,seterrorfirstname] = useState("")
    const [errorlast_name,seterrorlastname] = useState("")
    const [errorpassword,seterrorpassword] = useState("")
    const [errorphone_number,seterrorphonenumber] = useState("")
    const [errorcheckbox,seterrorcheckbox] = useState("")

    const passwordTracker = {
        uppercase: password.match(atLeastOneUppercase),
        lowercase: password.match(atLeastOneLowercase),
        number: password.match(atLeastOneNumeric),
        specialChar: password.match(atLeastOneSpecialChar)
      }
    const Register = async (e: FormEvent<HTMLFormElement>) =>{
        e.preventDefault();

        if(first_name == ""){
            seterrorfirstname("FirstName must be fill")
        }else{
            seterrorfirstname("")
        }

        if(last_name == ""){
            seterrorlastname("LastName must be fill")
        }else{
            seterrorlastname("")
        }


        if(email == ""){
            seterrorEmail("Email must be fill")
        }else{
            seterrorEmail("")
        }


        if(password == ""){
            seterrorpassword("Password must be fill")
        }else if(password.length < 8 || password.length > 30 && !passwordTracker.uppercase 
            && !passwordTracker.lowercase && !passwordTracker.number && !passwordTracker.specialChar ){
                seterrorpassword("password must contain capital letters, lower-case letters, numbers, and special symbols, and has a length of 8 – 30 characters.")
        }
        else{
            seterrorpassword("")
        }

        if(phone_number == ""){
            seterrorphonenumber("PhoneNumber must be fill")
        }else if(phone_number.length > 13){
            seterrorphonenumber("PhoneNumber must be valid phone number")
        }else{
            seterrorphonenumber("")
        }

        if(checkbox != "on"){
            setcheckbox("Harus di centang")
        }


        if(first_name != "" && last_name != "" && email != "" && phone_number != "" && password != ""){
            const reg = await axios.post(
                "http://localhost:8080/query",
                {
                  query: `
                  mutation Register($first_name: String!, $last_name: String!, $password: String!, $email: String!, $phone_number: String!) {
                    createUser(input:{first_name: $first_name,last_name:$last_name,password:$password,email:$email,phone_number:$phone_number}) {
                        id
                        first_name
                        last_name
                        email
                        password
                        phone_number
                    }
                    }
                    `,
                    variables:{
                        first_name:first_name,
                        last_name:last_name,
                        password:password,
                        email:email,
                        phone_number:phone_number
                    },
                }
            )
            alert("Register Success")
            router.push("/Home")
        }
        
        // alert('success')
    }

    useEffect(() => {
        console.log(checkbox)
    },[checkbox])

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
                            Create Account
                    </div>

                    <div className={styles["SignUp-note"]}>
                        Shopping for your business? <a href="">Create a free business account</a>.
                    </div>
                    <form action="" onSubmit={(e) => Register(e)}>
                    <div className={styles["SignIn-Form"]}>
                        <div className={styles["form"]}>
                            <div className={styles["SignIn-Email"]}>
                                {/* <label htmlFor="Email-Address">Email Address</label> */}
                                <input id="First-Name" type="text" placeholder="First Name" onChange={(e) =>(setfirstname(e.target.value))}/>
                            </div>
                            <div id="email-error" className={`${styles["error-messages"]} ${styles["email"]}`}>
                                {errorfirst_name}
                            </div>
                        </div>

                        <div className={styles["form"]}>
                            <div className={styles["SignIn-Email"]}>
                                {/* <label htmlFor="Email-Address">Email Address</label> */}
                                <input id="Last-Name" type="text" placeholder="Last Name" onChange={(e) =>(setlastname(e.target.value))}/>
                            </div>
                            <div id="email-error" className={`${styles["error-messages"]} ${styles["email"]}`}>
                            {errorlast_name}
                            </div>
                        </div>

                        <div className={styles["form"]}>
                            <div className={styles["SignIn-Email"]}>
                                {/* <label htmlFor="Email-Address">Email Address</label> */}
                                <input id="Email-Address" type="email" placeholder="Email Address" onChange={(e) =>(setEmail(e.target.value))}/>
                            </div>
                            <div id="email-error" className={`${styles["error-messages"]} ${styles["email"]}`}>
                            {erroremail}
                            </div>
                        </div>

                        <div className={styles["form"]}>
                            <div className={styles["SignIn-Email"]}>
                                {/* <label htmlFor="Email-Address">Email Address</label> */}
                                <input id="Email-Address" type="tel" placeholder="Mobile Phone Number (optional)" onChange={(e) =>(setphonenumber(e.target.value))}/>
                            </div>
                            <div id="email-error" className={`${styles["error-messages"]} ${styles["email"]}`}>
                            {errorphone_number}
                            </div>
                        </div>

                        <div className={styles["form"]}>
                            <div className={styles["SignIn-Email"]}>
                                {/* <label htmlFor="Email-Address">Email Address</label> */}
                                <input id="Password" type="password" placeholder="Password" onChange={(e) =>(setpassword(e.target.value))}/>
                            </div>
                            <div id="email-error" className={`${styles["error-messages"]} ${styles["email"]}`}>
                                {errorpassword}
                            </div>
                        </div>

                        <label className={styles["form-checkbox"]}>
                            <input type="checkbox" onChange={(e) => {setcheckbox(e.target.value)}}/>
                            <span className={styles["form-checkbox-menu"]}>
                                Subscribe for exclusive e-mail offers and discounts
                            </span>
                        </label>

                        <div className={styles["form"]}>
                            <div className={styles.note}>
                                By creating an account, you agree to Newegg's <a href="">Privacy Notice</a> <span> and </span> <a href="">Terms of Use</a>.
                            </div>
                        </div>

                        <div className={styles["form"]}>
                            <div id="email-error" className={`${styles["error-messages"]} ${styles["email"]}`}>
                                {checkbox}
                            </div>
                            <button className={styles["SignInButton"]}>SIGN UP</button>
                        </div>

                        <div className={styles["form"]}>
                            
                            <div className={styles.SignUp}>
                                Have an account? <a href="">Sign In</a>
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
 
export default SignUp;