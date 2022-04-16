import * as ReactDOMClient from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import {store} from "./store";
const root = ReactDOMClient.createRoot(document.getElementById("root"));


const app = (
  <Provider store={store}>
    <App/>
  </Provider>
)

root.render(app);
