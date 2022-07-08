import * as React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router-dom";
import Lists from './components/lists'
import List from './components/list'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Lists />} />
          <Route path="lists" elemment={<Lists />}>
            <Route path=":listId" element={<List />}>
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>
);