import ShopHome from "../ShopHome";
import styles from "../../styles/AboutUs.module.css"
import { ReactNode } from "react";

interface LayoutProps{
    context: ReactNode
}

const ShopLayout = (props : LayoutProps) => {
    const {context} = props
    return <ShopHome content={
        <div className={styles["full-container"]}>
        <div className={styles["half-container"]}>
            <div className={styles["body-header"]}>
                <div className={styles["body-content"]}>
                <a href=""><span>Store Home</span></a>
                <div className={styles["line-vertical"]}></div>
                <a href=""><span>All Products</span></a>
                <div className={styles["line-vertical"]}></div>
                <a href=""><span>Reviews</span></a>
                <div className={styles["line-vertical"]}></div>
                <a href=""><span>Return Policy</span></a>
                <div className={styles["line-vertical"]}></div>
                <a href=""><span>About Us</span></a>
                </div>
                
            </div>

            {context}

            </div>
        </div>
    }></ShopHome>;
}
 
export default ShopLayout