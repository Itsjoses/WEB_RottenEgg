import { ThemeContext } from "Context/Theme";
import { useContext } from "react";
import styles from "../../styles/Footer.module.css"

const Footer = () => {

    const THEME = useContext(ThemeContext);

    return ( 
        <div className="div" style={{backgroundColor: THEME.footerbackGround}}>
        <footer className={styles.footercontainer}>
            <div className={styles.footer}>
                <div className={styles["footermiddle"]}>
                <div className={`${styles["footer-Content"]} ${styles["footer-1"]}`}>
                    <div className={styles["footer-Title"]}>
                        Customer Service
                    </div>
                    <div className={styles["footer-Detail"]}>
                        <ul>
                            <li><a href="">Help Center</a></li>
                            <li><a href="">Track an Order</a></li>
                            <li><a href="">Return an Item</a></li>
                            <li><a href="">Return Policy</a></li>
                            <li><a href="">Privacy & Security</a></li>
                            <li><a href="">Feedback</a></li>
                        </ul>
                    </div>
                </div>
                <div className={`${styles["footer-Content"]} ${styles["footer-2"]}`}>
                    <div className={styles["footer-Title"]}>
                    My Account
                    </div>
                    <div className={styles["footer-Detail"]}>
                        <ul>
                            <li><a href="">Login/Register</a></li>
                            <li><a href="">Order History</a></li>
                            <li><a href="">Returns History</a></li>
                            <li><a href="">Address Book</a></li>
                            <li><a href="">Wish Lists</a></li>
                            <li><a href="">My Build Lists</a></li>
                            <li><a href="">My Build Showcase</a></li>
                            <li><a href="">Email Notifications</a></li>
                            <li><a href="">Subscriptions Orders</a></li>
                            <li><a href="">Auto Notifications</a></li>
                        </ul>
                    </div>
                </div>
                <div className={`${styles["footer-Content"]} ${styles["footer-3"]}`}>
                <div className={styles["footer-Title"]}>
                Company Information
                    </div>
                    <div className={styles["footer-Detail"]}>
                        <ul>
                            <li><a href="">About Newegg</a></li>
                            <li><a href="">Investor Relations</a></li>
                            <li><a href="">Awards/Rankings</a></li>
                            <li><a href="">Hours and Locations</a></li>
                            <li><a href="">Press Inquiries</a></li>
                            <li><a href="">Newegg Careers</a></li>
                            <li><a href="">Newsroom</a></li>
                            <li><a href="">Newegg Insider</a></li>
                            <li><a href="">Calif. Transparency<br/>in Supply Chains Act</a></li>
                            <li><a href="">Cigna MRF</a></li>
                        </ul>
                    </div>
                </div>
                <div className={`${styles["footer-Content"]} ${styles["footer-4"]}`}>
                <div className={styles["footer-Title"]}>
                Tools & Resources
                    </div>
                    <div className={styles["footer-Detail"]}>
                        <ul>
                            <li><a href="">Sell on Newegg</a></li>
                            <li><a href="">For Your Business</a></li>
                            <li><a href="">Newegg Partner Services</a></li>
                            <li><a href="">Become an Affiliate</a></li>
                            <li><a href="">Newegg Creators</a></li>
                            <li><a href="">Site Map</a></li>
                            <li><a href="">Shop by Brand</a></li>
                            <li><a href="">Rebates</a></li>
                            <li><a href="">Mobile Apps</a></li>
                        </ul>
                    </div>
                </div>
                <div className={`${styles["footer-Content"]} ${styles["footer-5"]}`}>
                <div className={styles["footer-Title"]}>
                Shop Our Brands
                    </div>
                    <div className={styles["footer-Detail"]}>
                        <ul>
                            <li><a href="">Newegg Business</a></li>
                            <li><a href="">Newegg Global</a></li>
                            <li><a href="">ABS</a></li>
                            <li><a href="">Rosewill</a></li>
                        </ul>
                    </div>
                </div>
                </div>
                <div className={styles["footerlower"]}>
                </div>
            </div>
        </footer>
        </div>
     );
}
 
export default Footer;