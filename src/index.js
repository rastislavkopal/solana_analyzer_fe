import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "App";
// require('dotenv').config()

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

import { VisionUIControllerProvider } from "context";

ReactDOM.render(
  <RecoilRoot>
    <BrowserRouter> 
      <VisionUIControllerProvider>
        <App />
      </VisionUIControllerProvider>
    </BrowserRouter>
   </RecoilRoot>,
  document.getElementById("root")
);
