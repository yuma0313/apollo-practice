const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Todo {
    id: Int!
    title: String!
    detail: String!
  }

  type Query {
    todos: [Todo!]!
    todo(id: Int!): Todo
  }

  type Mutation {
    addTodo(title: String!, detail: String!): Todo!
    updateTodo(id: Int!, title: String, detail: String): Todo!
    deleteTodo(id: Int!): Boolean!
  }
`;

let todos = [
  {
    id: 1,
    title: "Learn GraphQL",
    detail: "Learn how to use GraphQL and Apollo Server",
  },
  {
    id: 2,
    title: "研修タスクをやる",
    detail: "apolloを使ってGraphQL",
  },
];

const resolvers = {
  Query: {
    todos: () => todos,
    todo: (_, { id }) => todos.find((todo) => todo.id === id),
  },
  Mutation: {
    addTodo: (_, { title, detail }) => {
      const newTodo = { id: todos.length + 1, title, detail };
      todos.push(newTodo);
      return newTodo;
    },
    updateTodo: (_, { id, title, detail }) => {
      const todo = todos.find((todo) => todo.id === id);
      if (!todo) return null;
      if (title !== undefined) todo.title = title;
      if (detail !== undefined) todo.detail = detail;
      return todo;
    },
    deleteTodo: (_, { id }) => {
      const index = todos.findIndex((todo) => todo.id === id);
      if (index === -1) return false;
      todos.splice(index, 1);
      return true;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
