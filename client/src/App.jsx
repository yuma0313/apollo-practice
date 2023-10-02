import React from "react";
import { useQuery, useMutation, gql } from "@apollo/client";

const GET_TODOS = gql`
  query todos {
    todos @rest(type: "Todo", path: "todos") {
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

// const UPDATE_TODO = gql`
//   mutation UpdateTodo($id: int!, $title: String!, $detail: String!) {
//     UpdateTodo(id: $id, title: $title, detail: $detail) {
//       id
//       title
//       detail
//     }
//   }
// `;

function App() {
  const { loading, error, data } = useQuery(GET_TODOS);
  const [addTodo] = useMutation(ADD_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });
  // const [updateTodo] = useMutation(UPDATE_TODO, {
  //   refetchQueries: [{ query: GET_TODOS }],
  // });

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

  // const handlerUpdateTodo = (id, title, detail) => {
  //   updateTodo({
  //     variables: {
  //       id,
  //       title: "Updated " + title,
  //       detail: "Updated " + detail,
  //     },
  //   });
  // };

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
