import '@/styles/globals.css'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { THEME, ThemeContext } from 'Context/Theme';
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const client = new ApolloClient({
    uri: 'http://localhost:8080/query',
    cache: new InMemoryCache(),
  });



  return(
      <Component {...pageProps} />
  
  ) 
}
