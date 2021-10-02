/**
 * @type {import("@gqless/cli").GQlessConfig}
 */
const config = {
  react: true,
  scalarTypes: { DateTime: "string" },
  introspection: {
    endpoint: process.env.NEXT_PUBLIC_GRAPHQL_URI,
    headers: {
      "X-Hasura-Admin-Secret": process.env.HASURA_SECRET,
    },
  },
  destination: "./src/gqless/index.ts",
  subscriptions: false,
  javascriptOutput: false,
};

module.exports = config;
