import { gql, useQuery } from "@apollo/client"


export default function Testing(){
    const GET_ALL_USERS= gql`
   query search {
  users{
		first_name
  }
}`

    const {loading,data,error} = useQuery(GET_ALL_USERS)
    if(error) return <div>{error.message}</div>
    if(loading) return <div>Loading . . .</div>
    if(!loading) console.log(data)

    return <h1>{data.users[0].first_name}</h1>
}