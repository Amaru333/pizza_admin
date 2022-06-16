import { Provider } from "react-redux";
import AppLayout from "../components/layouts/AppLayout";
import { store } from "../components/redux/store";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </Provider>
  );
}

export default MyApp;
