import { Provider } from "react-redux";
import AppLayout from "../components/layouts/AppLayout";
import { store } from "../components/redux/store";
import "../styles/globals.css";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </Provider>
  );
}

export default MyApp;
