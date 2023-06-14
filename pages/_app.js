import Head from "next/head";
import React from "react";
import { atom, useAtom } from 'jotai'
import "../styles/globals.css";
import "../styles/react-table.css";
import "../styles/interface.css";
import "../styles/nightLightMode.css";
import '../styles/react-tabs.css';
import '../styles/font.css';

export const tabi = atom(0);
export const dat = atom(10);
export const filt = atom('');
function MyApp({ Component, pageProps }) {

  return (
    <>
      <Head lang="en">
        <title>root@crystal.hair</title>
		<link rel="icon" href="/favicon.ico" />
      </Head>
        <div id="main">
          <Component {...pageProps} />
        </div>
    </>
  );
}

export default MyApp;
