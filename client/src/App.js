import React from "react";
import { useQuery, useMutation, gql } from "@apollo/client";

const GET_TODOS = gql`
  query {
    todos {
      id
      title
      detail
    }
  }
`;

const ADD_TODO = gql`
  mutation AddTodo($title: String!, $detail: String!) {
    addTodo(title: $title, detail: $detail) {
      id
      title
      detail
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_TODOS);
  const [addTodo] = useMutation(ADD_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  const handleAddTodo = () => {
    addTodo({
      variables: {
        title: "hoge",
        detail: "hogehogehoge",
      },
    });
  };

  return (
    <div>
      <button onClick={handleAddTodo}>Add Todo</button>
      <ul>
        {data.todos.map(({ id, title, detail }) => (
          <li key={id}>
            <h2>{title}</h2>
            <p>{detail}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
