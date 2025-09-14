import { useLazyQuery, useQuery } from "@apollo/client/react";
import { gql } from "@apollo/client";
import { useState } from "react";

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

const QUERY_ALL_MOVIES = gql`
  query getAllMovies {
    movies {
      name
      yearOfPublication
      isInTheaters
    }
  }
`;

const GET_MOIVE_BY_NAME = gql`
  query Movie($name: String!) {
    movie(name: $name) {
      id
      name
      yearOfPublication
    }
  }
`;
const DisplayData = () => {
  const [movieSearched, setMovieSearched] = useState("");
  const { data, loading, error } = useQuery(QUERY_ALL_USERS);
  const { data: movieData } = useQuery(QUERY_ALL_MOVIES);
  const [fetchMovie, { data: movieSearchData, error: movieError }] =
    useLazyQuery(GET_MOIVE_BY_NAME);

  if (movieError) {
    console.log(movieError);
  }

  if (loading) {
    return <h1>Data is loading ...</h1>;
  }

  return (
    <div>
      {data?.users?.map((ele) => (
        <div>
          <h3>Name : {ele.name}</h3>
          <h3>Age : {ele.age}</h3>
          <h3>Username: {ele.username}</h3>
          <h3>Nationality: {ele.nationality}</h3>
        </div>
      ))}

      {movieData?.movies?.map((ele) => (
        <div>
          <h3>Movie Name : {ele.name}</h3>
        </div>
      ))}
      <div>
        <input
          type="text"
          placeholder="Interstellar..."
          onChange={(e) => setMovieSearched(e.target.value)}
        />
        <button
          onClick={() => fetchMovie({ variables: { name: movieSearched } })}
        >
          Fetch Data
        </button>
        <div>
          {movieSearchData ? (
            <p>{movieSearchData.movie.name} </p>
          ) : (
            <h3>There was an error fetching data</h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default DisplayData;
