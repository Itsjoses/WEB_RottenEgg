import styles from "@/styles/CardMap.module.css"
import { useEffect } from "react"
const CardMap = ({fst2, data2} : any) => {

    useEffect(() => {
        
    })

    const button = () => {
        if(data2 === "Pending"){
            return (
                <>
                                <button>Finalize Order</button>
                                <button>Cancle Order</button>
                                </>
            )
        }else if(data2 === "Done"){
            return (
                <>
                    <button>Add To Cart</button>
                </>
            )
        }
    }

    return ( 
        <>
        <div className={styles["Container"]}>
        <div className={styles["Card-Top"]}>
            <div className={styles["Card-Top-Container"]}>
                <div className={styles["Card-Top-Left"]}>
                        JOse
                    </div>
                    <div className={styles["Card-Top-Right"]}>
                        {button()}
                        {/* {(data === "Done") ? {
                            return(
                                <>
                                <button>Finalize Order</button>
                                <button>Cancle Order</button>
                                </>
                                
                            )

                        } } */}
                        
                </div>
            </div>
                
            </div>
            <div className={styles["Card-Bottom"]}>
                <div className={styles["Card-Bottom-Container"]}>
                    <div className={styles["Card-Bottom-Left"]}>
                        <img src="data:image/jpeg;base64,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" alt="" />
                    </div>
                    <div className={styles["Card-Bottom-Mid"]}>
                        <p>Nama Product</p>
                    </div>
                    <div className={styles["Card-Bottom-Right"]}>
                        <p>$ 1000</p>
                        <p>Quantity: 8</p>
                    </div>  
                </div>
                
                <div className={styles["Card-Bottom-Container"]}>
                    <div className={styles["Card-Bottom-Left"]}>
                        <img src="data:image/jpeg;base64,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" alt="" />
                    </div>
                    <div className={styles["Card-Bottom-Mid"]}>
                        <p>Nama Product</p>
                    </div>
                    <div className={styles["Card-Bottom-Right"]}>
                        <p>$ 1000</p>
                        <p>Quantity: 8</p>
                    </div>  
                </div>
            </div>
        </div>
            
        </>
     );
}
 
export default CardMap;