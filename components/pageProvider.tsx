import { ThemeProvider as PreferredThemeProvider } from "next-themes";
import Head from "next/head";
import { FC } from "react";
import ThemeProviders from "./darkMode/themeProvider";

// Client-side cache, shared for the whole session of the user in the browser.
interface PageProviderProps {
  children: React.ReactNode;
}

const PageProvider: FC<PageProviderProps> = ({
  children,
}) => (
  <PreferredThemeProvider>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProviders>{children}</ThemeProviders>
  </PreferredThemeProvider>
);

export default PageProvider;
