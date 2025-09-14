import { useQuery } from "@apollo/client/react";
import { gql } from "@apollo/client";

const QUERY_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      name
      age
      username
      nationality
    }
  }
`;
const DisplayData = () => {
  const { data, loading, error } = useQuery(QUERY_ALL_USERS);

  console.log(data);
  if (loading) {
    return <h1>Data is loading ...</h1>;
  }
  if (error) {
    console.log(error);
  }
  return (
    <div>
      {data.users.map((ele) => (
        <div>
          <h3>Name : {ele.name}</h3>
          <h3>Age : {ele.age}</h3>
          <h3>Username: {ele.username}</h3>
          <h3>Nationality: {ele.nationality}</h3>
        </div>
      ))}
    </div>
  );
};

export default DisplayData;
