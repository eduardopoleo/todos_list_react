import * as React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter , Route, Routes } from "react-router-dom";
import Lists from './components/lists'
import List from './components/list'
import Login from './components/login'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter >
      <Routes>
        <Route path="/" element={<Lists />} />
          <Route path="users/new" element={<Login/>}/>
          <Route path="lists" elemment={<Lists />}>
            <Route path=":listId" element={<List />}>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter >
  </React.StrictMode>
);