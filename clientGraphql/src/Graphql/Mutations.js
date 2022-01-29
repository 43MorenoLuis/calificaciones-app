import { gql } from "@apollo/client";

export const SIGN_IN = gql`
mutation login($input: ILogin){
  login (input: $input){
    ok
    user{
      id
      name
    }
    token
  }
}
`