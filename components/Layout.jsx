import Head from 'next/head';
import React from 'react';

export default function Layout({ children }) {
    return (
        <>
            <Head>
                <title>Health Coach</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <main>{children}</main>
        </>
    )
}