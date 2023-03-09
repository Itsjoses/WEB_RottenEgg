import { gql } from "@apollo/client";

export const CREATE_USER = gql`
    mutation createUser($first_name: String!, $last_name: String!, $password: String!, $email: String!, $phone_number: String!) {
        createUser(input:{first_name: $first_name,last_name:$last_name,password:$password,email:$email,phone_number:$phone_number}) {
            id
            first_name
            last_name
            email
            password
            phone_number
        }
    }
`

export const LOGIN = gql`
    mutation checkLogin($email: String!, $password: String!) {
        login(email:$email,password:$password){
            id
        }
    }
`