import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: [
    {
      "https://together-pangolin-86.hasura.app/v1/graphql": {
        headers: {
          "x-hasura-admin-secret":
            "7lQAMFpyeVollj1jalVlpTTBQn7m7odbfSP6w29fHqIJY6b0C7g4K0cyFhG9AyYj",
        },
      },
    },
  ],
  documents: ["src/**/*.tsx"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./gql/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
