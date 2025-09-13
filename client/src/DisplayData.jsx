import { useQuery, gql } from "@apollo/client/react";
import React from "react";

const QUERY_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      name
      age
      username
    }
  }
`;

const DisplayData = () => {
  const { loading, data, error } = useQuery(QUERY_ALL_USERS);
  if (data) {
    console.log(data);
  }
  return <div></div>;
};

export default DisplayData;
