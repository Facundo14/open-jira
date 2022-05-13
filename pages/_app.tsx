import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { CssBaseline, ThemeProvider } from '@mui/material';

import { UIPovider } from '../context/ui';
import { EntriesPovider } from '../context/entries';

import { darkTheme, lightTheme } from '../themes';

import { SnackbarProvider } from 'notistack';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider maxSnack={3}>
      <EntriesPovider>
        <UIPovider>
          <ThemeProvider  theme={ darkTheme } >
            <CssBaseline />
            <Component {...pageProps} />  
          </ThemeProvider>
        </UIPovider>
      </EntriesPovider>
    </SnackbarProvider>
  )
}

export default MyApp
