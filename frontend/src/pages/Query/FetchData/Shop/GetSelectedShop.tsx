// import axios from "axios";

// export const getDataShop = async (props: usestate) => {
//     const {context} = props
//     const GetCurrentWishList = await axios.post(
//       "http://localhost:8080/query",
//       {
//         query: `
//         query CurrentShop($id: String!){
//           Shopget(id: $id){
//            id
//            ShopName
//            banner
//            Product{
//              id
//              ProductName
//              ProductImage
//              ProductDescription
//              ProductPrice
//            }
//          }
//        }
//             `,
//         variables: {
//           id: "1e3a9b6d-b4ff-4b6d-a92f-ab5f3a0260c8",
//         },
//       }
//     )
//       console.log(GetCurrentWishList.data.data);
//       setshopdetail(GetCurrentWishList.data.data.Shopget.Product)
//       setbanner(GetCurrentWishList.data.data.Shopget.banner)
//       console.log(ShopDetail.banner);
      
// };