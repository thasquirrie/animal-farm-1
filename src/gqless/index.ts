import { createReactClient } from "@gqless/react";
import { createClient, QueryFetcher } from "gqless";
import { createLogger } from "@gqless/logger";
import nookies from "nookies";

import {
  GeneratedSchema,
  generatedSchema,
  scalarsEnumsHash,
  SchemaObjectTypes,
  SchemaObjectTypesNames,
} from "./schema.generated";
import { createGqlessNextClient } from "../../lib/gqless-next";

export const { withGqless, useQuery } = createGqlessNextClient((ctx) => {
  const url = process.env.NEXT_PUBLIC_GRAPHQL_URI || "";
  const cookies = nookies.get(ctx);
  let headers: { [key: string]: string} = {
    "Content-Type": "application/json",
  };
  if (cookies?.token) {
    headers["Authorization"] = `Bearer ${cookies.token}`;
  }
  const queryFetcher: QueryFetcher = async function (query, variables) {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({
        query,
        variables,
      }),
      mode: "cors",
    });

    const json = await response.json();

    return json;
  };

  const client = createClient<
    GeneratedSchema,
    SchemaObjectTypesNames,
    SchemaObjectTypes
  >({
    schema: generatedSchema,
    scalarsEnumsHash,
    queryFetcher,
  });

  createLogger(client).start();

  const react = createReactClient<GeneratedSchema>(client, {
    defaults: {
      // Set this flag as "true" if your usage involves React Suspense
      // Keep in mind that you can overwrite it in a per-hook basis
      suspense: false,
      
      // Set this flag based on your needs
      staleWhileRevalidate: false,
    },
  });

  return { client, react };
});

export * from "./schema.generated";
