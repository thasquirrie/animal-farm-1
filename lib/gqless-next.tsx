import React from "react";
import { GQlessClient } from "gqless";
import { ReactClient } from "@gqless/react";
import { NextPage, NextPageContext } from "next";

const isServer = typeof window === "undefined";

export interface BasicSchema {
  query: object;
  mutation: object;
  subscription: object;
}

export type CreateGqlessClientsFunction<Schema extends BasicSchema> = (
  ctx?: NextPageContext
) => GqlessClients<Schema>;

export interface GqlessClients<Schema extends BasicSchema> {
  client: GQlessClient<Schema>;
  react: ReactClient<Schema>;
}

export function createGqlessNextClient<Schema extends BasicSchema>(
  createGqlessClients: CreateGqlessClientsFunction<Schema>
) {
  let browserGqlessClients: GqlessClients<Schema> | undefined;

  const getGqlessClients: (req?: NextPageContext) => GqlessClients<Schema> = (
    ctx
  ) => {
    if (isServer) {
      if (!ctx?.req) throw new Error("`req` is required server-side");
      return createGqlessClients(ctx);
    } else {
      if (!browserGqlessClients) browserGqlessClients = createGqlessClients();
      return browserGqlessClients;
    }
  };

  const GqlessContext = React.createContext<GqlessClients<Schema> | null>(null);

  function withGqless<PageProps = {}>(Page: NextPage<PageProps>) {
    const PageWithGqless: NextPage<{
      gqlessClients?: GqlessClients<Schema> | undefined;
      cacheSnapshot?: string | undefined;
      userProps: PageProps;
    }> = ({ gqlessClients, cacheSnapshot, userProps }) => {
      gqlessClients = gqlessClients || getGqlessClients();
      gqlessClients.react.useHydrateCache({ cacheSnapshot });
      return (
        <GqlessContext.Provider value={gqlessClients}>
          <Page {...userProps} />
        </GqlessContext.Provider>
      );
    };
    PageWithGqless.getInitialProps = async (ctx) => {
      const userProps = Page.getInitialProps
        ? await Page.getInitialProps(ctx)
        : ({} as PageProps);
      const gqlessClients = getGqlessClients(ctx);
      const rendered = await gqlessClients.react.prepareReactRender(
        <PageWithGqless gqlessClients={gqlessClients} userProps={userProps} />
      );
      (gqlessClients as any).toJSON = () => undefined; // prevent value from being serialized & sent to browser
      const cacheSnapshot = isServer ? rendered.cacheSnapshot : undefined;
      return { userProps, gqlessClients, cacheSnapshot };
    };
    return PageWithGqless;
  }

  function useQuery(...args: Parameters<ReactClient<Schema>["useQuery"]>) {
    const clients = React.useContext(GqlessContext);
    if (!clients) throw new Error("GqlessContext has not been provided");
    return clients.react.useQuery(...args);
  }

  return { getGqlessClients, GqlessContext, withGqless, useQuery };
}
