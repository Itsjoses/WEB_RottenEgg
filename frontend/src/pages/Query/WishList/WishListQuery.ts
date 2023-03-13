import axios from "axios";

export const Follow = async (e:any, profile:any)=> { await axios.post("http://localhost:8080/query", {
        query: `
        mutation Followed($user_id: String!,$wishlist_id:String!){

          createFollow(user_id: $user_id,wishlist_id:$ wishlist_id){
            User{
              id
            }
            WishList{
              id
            }
          }
        }
        `,
        variables: {
          wishlist_id: e,
          user_id: profile,
        },
      });
    }



export const UpdateWishListQuery = async(id:any,name:any,privacy:any) => await axios.post(
      "http://localhost:8080/query",
      {
        query: `
        mutation updateWishList($id: String!,$name: String!,$Privacy: String!){
          UpdateWishList(id: $id,name: $name,Privacy: $Privacy){
              id
            Name
            Privacy               
          }
        }
            `,
        variables: {
          id: id,
          name: name,
          Privacy: privacy,
        },
      }
    );