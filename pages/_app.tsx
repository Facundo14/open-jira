import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { darkTheme, lightTheme } from '../themes';
import { UIPovider } from '../context/ui';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UIPovider>
      <ThemeProvider  theme={ darkTheme } >
        <CssBaseline />
        <Component {...pageProps} />  
      </ThemeProvider>
    </UIPovider>
  )
}

export default MyApp
