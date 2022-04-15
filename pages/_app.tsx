import { ThemeProvider, extendTheme } from '@chakra-ui/react';
import { StoreProvider } from 'easy-peasy';
import { Layout } from '../components/layout';
import 'reset-css';
import store from '../store';
import '../styles/globals.css';

const theme = extendTheme({
  colors: {
    gray: {
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
  },
  components: {
    Button: {
      variants: {
        link: {
          ':focus': {
            outline: 'none',
            boxShadow: 'none',
          },
        },
      },
    },
  },
});

const MyApp = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <StoreProvider store={store}>
        {Component.authPage ? (
          <Component {...pageProps} />
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </StoreProvider>
    </ThemeProvider>
  );
};

export default MyApp;
