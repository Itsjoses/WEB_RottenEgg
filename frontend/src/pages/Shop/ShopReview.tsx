import ShopLayout from "./ShopLayout";
import styles from "@/styles/ShopReview.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

const ShopReview = () => {
  const [review,setreview] = useState([])
  const [totalreview,settotalreview] = useState(0)
  const [onestar,setonestar] = useState(0)
  const [twostar,settwostar] = useState(0)
  const [threestar,setthreestar] = useState(0)
  const [fourstar,setfourstar] = useState(0)
  const [fivestar,setfivestar] = useState(0)
  useEffect(() => {
    const getReview = async() =>{
      const GetCurrentWishList = await axios.post(
        "http://localhost:8080/query",
        {
          query: `
          query GetShop($id: String!){
            Shopget(id: $id){
              id
              Review{
                id
                User{
                  first_name
                }
                Product{
                  ProductName
                }
                Pros
                Cons
                Overall
                Star
              }
            }
          }
              `,
          variables: {
            id: "1e3a9b6d-b4ff-4b6d-a92f-ab5f3a0260c8",
          },
        }
      );
      setreview(GetCurrentWishList.data.data.Shopget.Review)
      const x = GetCurrentWishList.data.data.Shopget.Review
      settotalreview(x.length)
      let onestar = 0;
      let twostar = 0;
      let threestar = 0;
      let fourstar = 0;
      let fivestar = 0;
      x.map(e =>{
        if(e.Star === 5) fivestar += 1
        else if(e.Star === 4) fourstar += 1
        else if(e.Star === 3) threestar += 1
        else if(e.Star === 2) twostar += 1
        else if(e.Star === 1) onestar += 1
      })
      setonestar(onestar)
      settwostar(twostar)
      setthreestar(threestar)
      setfourstar(fourstar)
      setfivestar(fivestar)
    }
    getReview()
  },[])
  console.log(fivestar);
  
  const onestarget = onestar/ totalreview * 100
  const twostarget = twostar/ totalreview * 100
  const threestarget = threestar/ totalreview * 100
  const fourstarget = fourstar/ totalreview * 100
  const fivestarget = fivestar/ totalreview * 100
  console.log(fivestarget);
  
  const stars = {
    one: {
      width: onestarget+"%"
    },
    two: {
      width: twostarget+"%"
    },
    three: {
      width: threestarget+"%"
    },
    four: {
      width: fourstarget+"%"
    },
    five: {
      width: fivestarget+"%"
    }
  }
  console.log(stars.five);
  
  return (
    <ShopLayout
      context={
        <div>
          <div className={styles["Product-container"]}>
            <div className={styles["Product-container-container"]}>
              <div className={styles["Product-container-subcontainer"]}>
                <div className={styles["Product-container-all"]}>
                  <h1 className={styles["Product-container-all-title"]}>
                    FEEDBACK
                  </h1>
                  <div className={styles["Product-container-all-top"]}>
                    <div className={styles["all-top-content"]}>
                      <h1>{totalreview} Ratings</h1>
                      <p>
                        To rate this seller or report a problem, please use the
                        link provided in the order confirmation email or the
                        order history section located in your account settings.
                      </p>
                    </div>
                    <div className={styles["all-top-content"]}>
                      <div className={styles["all-top-content-all"]}>
                        <div className={styles["top-content-review-left"]}>
                          1 egg
                        </div>
                        <div className={styles["top-content-review-mid"]}>
                          <div
                            className={styles["top-content-review-mid-bar"]}
                            style={stars.one}
                          ></div>
                        </div>
                        <div className={styles["top-content-review-right"]}>
                        {onestarget}%
                        </div>
                      </div>
                      <div className={styles["all-top-content-all"]}>
                        <div className={styles["top-content-review-left"]}>
                          2 egg
                        </div>
                        <div className={styles["top-content-review-mid"]}>
                          <div
                            className={styles["top-content-review-mid-bar"]}
                            style={stars.two}
                          ></div>
                        </div>
                        <div className={styles["top-content-review-right"]}>
                        {twostarget}%
                        </div>
                      </div>

                      <div className={styles["all-top-content-all"]}>
                        <div className={styles["top-content-review-left"]}>
                          3 egg
                        </div>
                        <div className={styles["top-content-review-mid"]}>
                          <div
                            className={styles["top-content-review-mid-bar"]}
                            style={stars.three}
                          ></div>
                        </div>
                        <div className={styles["top-content-review-right"]}>
                        {threestar}%
                        </div>
                      </div>

                      <div className={styles["all-top-content-all"]}>
                        <div className={styles["top-content-review-left"]}>
                          4 egg
                        </div>
                        <div className={styles["top-content-review-mid"]}>
                          <div
                            className={styles["top-content-review-mid-bar"]}
                            style={stars.four}
                          ></div>
                        </div>
                        <div className={styles["top-content-review-right"]}>
                        {fourstarget}%
                        </div>
                      </div>

                      <div className={styles["all-top-content-all"]}>
                        <div className={styles["top-content-review-left"]}>
                          5 egg
                        </div>
                        <div className={styles["top-content-review-mid"]}>
                          <div
                            className={styles["top-content-review-mid-bar"]}
                            style={stars.five}
                          ></div>
                        </div>
                        <div className={styles["top-content-review-right"]}>
                        {fivestarget}%
                        </div>
                      </div>
                    </div>
                    <div className={styles["all-top-content"]}>
                      {/* <section>
                            <h2>Positive chart value</h2>
                            <svg class="circle-chart" viewbox="0 0 33.83098862 33.83098862" width="200" height="200" xmlns="http://www.w3.org/2000/svg">
                            <circle class="circle-chart__background" stroke="#efefef" stroke-width="2" fill="none" cx="16.91549431" cy="16.91549431" r="15.91549431" />
                            <circle class="circle-chart__circle" stroke="#00acc1" stroke-width="2" stroke-dasharray="30,100" stroke-linecap="round" fill="none" cx="16.91549431" cy="16.91549431" r="15.91549431" />
                            <g class="circle-chart__info">
                                <text class="circle-chart__percent" x="16.91549431" y="15.5" alignment-baseline="central" text-anchor="middle" font-size="8">30%</text>
                                <text class="circle-chart__subline" x="16.91549431" y="20.5" alignment-baseline="central" text-anchor="middle" font-size="2">Yay 30% progress!</text>
                            </g>
                            </svg>
                        </section> */}
                    </div>
                  </div>

                  <div className={styles["Container-Category-List-Search"]}>
                    <div
                      className={styles["Container-Category-List-Search-Left"]}
                    >
                      <div className={styles["Search-Left"]}>
                        <p>Search Reviews:</p>

                        <input type="text" placeholder="Search Within" />
                        <button
                          type="submit"
                          className={styles["Search-Button"]}
                        >
                          GO
                        </button>
                      </div>
                    </div>
                    <div
                      className={styles["Container-Category-List-Search-right"]}
                    >
                      <div className={styles["Search-right-Content-mid"]}>
                        Reviews 1 - 4 of 4
                        <select>
                          <option value="">Date Posted</option>
                          <option value="">Most Helpful</option>
                          <option value="">Highest Rated</option>
                          <option value="">Lowest Rated</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className={styles["line"]}></div>
                  {review.map(e =>{
                    {console.log(e.User.first_name)}
                    return(
                      <>
                      <div className={styles["Container-review"]}>
                      <div className={styles["Container-review-left"]}>
                        <h2>{e.User.first_name}</h2>
                        Ordered on 11/10/2022
                      </div>
                      <div className={styles["Container-review-mid"]}>
                        <div className={styles["Container-review-top"]}>
                          <div className={styles["Container-review-left"]}>
                            {(e.Star === 5) ? <>
                              <i className="fa-solid fa-star"></i>
                              <i className="fa-solid fa-star"></i>
                              <i className="fa-solid fa-star"></i>
                              <i className="fa-solid fa-star"></i>
                              <i className="fa-solid fa-star"></i>
                            </> : (e.Star === 4) ?  <>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            </> : (e.Star === 3) ? <>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            </> : (e.Star === 2) ? <>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            </> : <>
                            <i className="fa-solid fa-star"></i>
                            </>}

                          </div>
                          <div className={styles["Container-review-right"]}>
                            <h4>{e.Product.ProductName}</h4>
                          </div>
                        </div>
                        <div className={styles["Container-review-bottom"]}>
                          <p><strong>Pros:</strong> {e.Pros}</p>
                          <p><strong>Cons:</strong> {e.Cons}</p>
                          <p><strong>Overall:</strong> {e.Overall}</p>
                        </div>
                      </div>
                      <div className={styles["Container-review-right"]}>
                        <div className={styles["Container-review-right-top"]}>
                          12/1/2022 3:54:42 AM
                        </div>
                        <div className={styles["Container-review-right-bottom"]}>
                          <div
                            className={
                              styles["Container-review-right-bottom-top"]
                            }
                          >
                            <div className={styles["bottom-top-card"]}>
                              <div className={styles["bottom-top-card-content"]}>
                                <div
                                  className={
                                    styles["bottom-top-card-content-first"]
                                  }
                                >
                                  items(s) delivered on time?
                                </div>
                                <div
                                  className={
                                    styles["bottom-top-card-content-last"]
                                  }
                                >
                                  YES
                                </div>
                              </div>
                              <div className={styles["bottom-top-card-content"]}>
                                <div
                                  className={
                                    styles["bottom-top-card-content-first"]
                                  }
                                >
                                  items(s) delivered on time?
                                </div>
                                <div
                                  className={
                                    styles["bottom-top-card-content-last"]
                                  }
                                >
                                  YES
                                </div>
                              </div>
                              <div className={styles["bottom-top-card-content"]}>
                                <div
                                  className={
                                    styles["bottom-top-card-content-first"]
                                  }
                                >
                                  Satisfactory customer service?
                                </div>
                                <div
                                  className={
                                    styles["bottom-top-card-content-last"]
                                  }
                                >
                                  YES
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className={
                              styles["Container-review-right-bottom-bottom"]
                            }
                          >
                            <div className={styles["bottom-bottom-container"]}>
                            <div className={styles["bottom-bottom-title"]}>
                                Did you find this review helpful?
                              </div>
                              <div className={styles["bottom-bottom-container-button"]}>
                                <button>♥️</button>
                                <button>💔</button>
                            </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                      </>
                    )
                      
                  })}
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    ></ShopLayout>
  );
};

export default ShopReview;
