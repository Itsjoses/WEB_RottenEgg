import { THEME, ThemeContext } from "Context/Theme";
import { FormEvent, useState } from "react";
import Footer from "../Utilites/Footer";
import Header from "../Utilites/Header";
import styles from "../../styles/NewsLetter.module.css"
import { useRouter } from "next/router";
import axios from "axios";

const NewsLetter = () => {
    let router= useRouter()
    const [theme,setTheme] = useState(THEME.light)
    const [subject,setsubject] = useState("")
    const [content,setcontent] = useState("")
    const handleTheme = () => {
        if (theme == THEME.light) {
            setTheme(THEME.dark)
            sessionStorage.setItem("theme","dark")
        } else {
            setTheme(THEME.light)
            sessionStorage.setItem("theme","light")
        }
      }

      const sendEmil = async () => {
        console.log("Asd")
              const GetAllUser = await axios.post(
                "http://localhost:8080/query",
                {
                  query: `
                  mutation SendEmail($subject: String!,$content:String!) {
                    sendNewsLetter(subject:$subject,content:$content){
                      email
                    }
                  }
                  `,
                  variables:{
                    subject: subject,
                    content: content
                  }
                }
              ) 
          window.location.reload()
      }

      const submitwithEnter = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        sendEmil()
      }

      const submitwithClick = () =>{
        sendEmil()
      }
    return ( 
        <ThemeContext.Provider value={theme}>
            <Header handleTheme={handleTheme}/>
                <div className={styles["LetterContainer"]}>
                    <div className={styles["Container"]}>
                        <div className={styles["form-Container"]}>
                        <form action="" onSubmit={(e) => submitwithEnter(e)}>
                            <div className={styles["Subject"]}>
                                <input type="text" placeholder="Add a Subject" onChange={(e) => setsubject(e.target.value)}/>
                            </div>  
                            <div className={styles["Letter"]}>
                                <textarea name="" id="" onChange={(e) => setsubject(e.target.value)}>

                                </textarea>
                            </div> 
                        </form>
                        
                        </div>
                        <div className={styles["form-button-Container"]}>
                            <button className={styles["Submit-Letter"]} onClick={() => submitwithClick()}>Submit</button>  
                        </div>
                        
                    </div>  
                </div>  
            <Footer/>
        </ThemeContext.Provider>


     );
}
 
export default NewsLetter;