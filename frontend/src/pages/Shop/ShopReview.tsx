import ShopLayout from "./ShopLayout";
import styles from "@/styles/ShopReview.module.css";

const ShopReview = () => {
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
                      <h1>14 Ratings</h1>
                      <p>
                        To rate this seller or report a problem, please use the
                        link provided in the order confirmation email or the
                        order history section located in your account settings.
                      </p>
                    </div>
                    <div className={styles["all-top-content"]}>
                      <div className={styles["all-top-content-all"]}>
                        <div className={styles["top-content-review-left"]}>
                          5 egg
                        </div>
                        <div className={styles["top-content-review-mid"]}>
                          <div
                            className={styles["top-content-review-mid-bar"]}
                          ></div>
                        </div>
                        <div className={styles["top-content-review-right"]}>
                          93%
                        </div>
                      </div>
                      <div className={styles["all-top-content-all"]}>
                        <div className={styles["top-content-review-left"]}>
                          5 egg
                        </div>
                        <div className={styles["top-content-review-mid"]}>
                          <div
                            className={styles["top-content-review-mid-bar"]}
                          ></div>
                        </div>
                        <div className={styles["top-content-review-right"]}>
                          93%
                        </div>
                      </div>

                      <div className={styles["all-top-content-all"]}>
                        <div className={styles["top-content-review-left"]}>
                          5 egg
                        </div>
                        <div className={styles["top-content-review-mid"]}>
                          <div
                            className={styles["top-content-review-mid-bar"]}
                          ></div>
                        </div>
                        <div className={styles["top-content-review-right"]}>
                          93%
                        </div>
                      </div>

                      <div className={styles["all-top-content-all"]}>
                        <div className={styles["top-content-review-left"]}>
                          5 egg
                        </div>
                        <div className={styles["top-content-review-mid"]}>
                          <div
                            className={styles["top-content-review-mid-bar"]}
                          ></div>
                        </div>
                        <div className={styles["top-content-review-right"]}>
                          93%
                        </div>
                      </div>

                      <div className={styles["all-top-content-all"]}>
                        <div className={styles["top-content-review-left"]}>
                          5 egg
                        </div>
                        <div className={styles["top-content-review-mid"]}>
                          <div
                            className={styles["top-content-review-mid-bar"]}
                          ></div>
                        </div>
                        <div className={styles["top-content-review-right"]}>
                          93%
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

                  <div className={styles["Container-review"]}>
                    <div className={styles["Container-review-left"]}>
                      <h4>Vann L.</h4>
                      Ordered on 11/10/2022
                    </div>
                    <div className={styles["Container-review-mid"]}>
                      <div className={styles["Container-review-top"]}>
                        <div className={styles["Container-review-left"]}>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                        </div>
                        <div className={styles["Container-review-right"]}>
                          <h4>I Like It!</h4>
                        </div>
                      </div>
                      <div className={styles["Container-review-bottom"]}>
                        Item arrived fast and was packed just fine no problems.
                        it works great i enjoy it!!! Thanks! Oh yes I would buy
                        from seller again.
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
