import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import DisplayData from "./DisplayData";


function App() {
  const client = new ApolloClient({
    link: new HttpLink({ uri: "http://localhost:4000/graphql" }),
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <div>
        <h1>List of Users</h1>
        <DisplayData/>
      </div>
    </ApolloProvider>
  );
}

export default App;
