import axios from "axios"

export const GetCurrentUser = async(profile: any) => {
    await axios.post(
        "http://localhost:8080/query",
        {
          query: `
            query getCurrentUser($id: String!)
            {
              GetUser(id : $id){
                first_name
              }
            }
          `,
          variables:{
            id: profile
          }
        }
      ) 
} 

export const GetCurrentShop = async (profile:any) => await axios.post(
        "http://localhost:8080/query",
        {
          query: `
          query GetCurrentShop($id: String!){
            Shopget(id:$id){
              id
          ShopName
          ShopEmail
          ShopPassword
          
        }
      }
          `,
          variables:{
            id: profile
          }
        }
      );
