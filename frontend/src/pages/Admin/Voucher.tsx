import { THEME, ThemeContext } from "Context/Theme"
import { FormEvent, useState } from "react"
import Header from "../Utilites/Header"
import Footer from "../Utilites/Footer"
import styles from "../../styles/Voucher.module.css"
import axios from "axios"

const Voucher = () => {

    const [theme,setTheme] = useState(THEME.light)
    const [voucherName, setvoucherName] = useState("")
    const [voucherDecPrice, setvoucherDecPrice] = useState("")
    const handleTheme = () => {
          if (theme == THEME.light) {
              setTheme(THEME.dark)
              sessionStorage.setItem("theme","dark")
          } else {
              setTheme(THEME.light)
              sessionStorage.setItem("theme","light")
          }
        }

        const CreateNewVoucher = async (e: FormEvent<HTMLButtonElement>) => {
            e.preventDefault()
            if(voucherName != "" && voucherDecPrice != "" ){
                const newVoucher = await axios.post(
                    "http://localhost:8080/query",
                    {
                      query: `
                      mutation CreateVoucher($VoucherName: String!,$VoucherDecPrice: String!){
                        CreateVoucher(input:{VoucherName: $VoucherName, VoucherDecPrice: $VoucherDecPrice}){
                            id
                            VoucherName
                            VoucherDecPrice
                      }
                    }
                        `,
                        variables:{
                            VoucherName: voucherName,
                            VoucherDecPrice: voucherDecPrice
                        },
                    }
                )
            }
            
        }



    return ( 
        <>
        <ThemeContext.Provider value={theme}>
        <Header handleTheme={handleTheme}/>
            <div className={styles.VoucherBody}>
                <div className={styles["VoucherBody-Container"]}>
                    <form action="" onSubmit={(e) => CreateNewVoucher(e)}>
                    <div className={styles["Voucher-Name"]}>
                        <input type="text" placeholder="VoucherName" onChange={(e) => setvoucherName(e.target.value)}/>
                    </div>
                    <div className={styles["Voucher-Dec-Price"]}>
                    
                        <input type="text" placeholder="Voucher Dec Price"/>
                    </div>
                    <div className={styles["Voucher-Button"]}>
                    
                        <button onSubmit={(e) => CreateNewVoucher(e)}>Create Voucher</button>
                    </div>
                    </form>
                    
                </div>

            </div>
        <Footer/>
        </ThemeContext.Provider>
        </>

     );
}
 
export default Voucher;