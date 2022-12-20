import { StrictMode } from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Visualization from "./visualization/Visualization";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Visualization />
  </StrictMode>,
  rootElement
);
