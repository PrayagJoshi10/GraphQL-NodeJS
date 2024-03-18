var express = require("express");
var { createHandler } = require("graphql-http/lib/use/express");
var { buildSchema } = require("graphql");
var { ruruHTML } = require("ruru/server");

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello(name: String!): String
    age: Int
    weight: Float
    isOver18: Boolean
    hobbies: [String]
    quoteOfTheDay: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: (args) => {
    return `Hello ${args.name}!`;
  },
  age: () => {
    return 23;
  },
  weight: () => {
    return 70.55;
  },
  isOver18: () => {
    return true;
  },
  hobbies: () => {
    return ["running", "swimming", "dancing"];
  },
  quoteOfTheDay: () => {
    return Math.random() < 0.5 ? "Take it easy" : "Salvation lies within";
  },
};

var app = express();

// Create and use the GraphQL handler.
app.all(
  "/graphql",
  createHandler({
    schema: schema,
    rootValue: root,
  })
);

// Serve the GraphiQL IDE.
app.get("/", (_req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" }));
});

// Start the server at port
app.listen(4000);
console.log(`Running a GraphQL API server at http://localhost:4000/graphql
Running a GraphQL API server at http://localhost:4000/graphql?query={hello,age,weight,isOver18,hobbies,quoteOfTheDay}`);
