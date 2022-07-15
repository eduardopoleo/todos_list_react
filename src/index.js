import * as React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter , Route, Routes } from "react-router-dom";
import Lists from './components/lists'
import List from './components/list'
import SignUp from './components/signUp'
import { AuthProvider } from "./contexts/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter >
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Lists />} />
            <Route path="sign_up" element={<SignUp/>}/>
            <Route path="/lists" element={<Lists />}>
              <Route path=":listId" element={<List />}>
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter >
  </React.StrictMode>
);