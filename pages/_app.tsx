import { FC } from "react";
import { AppProps } from "next/app";
import PageProvider from "../components/pageProvider";
import "../styles/globals.css";
import "../styles/react-table.css";
import "../styles/interface.css";
import '../styles/react-tabs.css';
import '../styles/font.css';

const App: FC<MUIAppProps> = ({ Component, pageProps }) => (
  <PageProvider >
    <Component {...pageProps} />
  </PageProvider>
);

export default App;
