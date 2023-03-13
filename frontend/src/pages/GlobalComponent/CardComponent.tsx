import Link from "next/link";
import { useState } from "react";
import styles from "../../styles/CardComponents.module.css";
const CardComponent = ({ props }: { props: any[] }) => {
  const [products, setProducts] = useState(props);
  return (
    <>
      <div className={styles["ProductCard-Container"]}>
        <div className={styles["ProductCard-Container-inner"]}>
          <div className={styles["cardComponents-container"]}>
            {props.map((e) => {
              // console.log(e)
              return (
                <>
                  <div className={styles["CardComponents"]}>
                    <div className={styles["ImageCardComponents-Container"]}>
                        {/* <div className={styles["ImageCardComponents"]}></div> */}
                        <img src={e.ProductImage}alt="" />
                        </div>
                    <div className={styles["CardComponents-Detail"]}>
                        <div className={styles["CardComponents-Detail-Title"]}>
                          <Link href={`/Product/ProductDetail?value=${e.id}`} className={styles["Title"]}>
                          <h3>{e.ProductName}</h3>
                          </Link>
                          
                          </div>
                        <div className={styles["CardComponents-Detail-Detail"]}>
                        <div className={styles["Detail-Container"]}>
                        <div className={styles["CardComponents-Detail-Detail-Price"]}>
                          <h3>${e.ProductPrice}</h3>
                          </div>
                          <div className={styles["CardComponents-Detail-Button"]}>
                              <button>ADD TO CART</button>
                          </div>
                        </div>
                          
                        </div>
                        
                    </div>
                    
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default CardComponent;
