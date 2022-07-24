import * as React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter , Route, Routes } from "react-router-dom";
import Lists from './components/lists'
import List from './components/list'
import SignUp from './components/signUp'
import Login from './components/login'
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/layout";
import PrivateRoute from "./components/PrivateRoute";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter >
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<PrivateRoute><Lists/></PrivateRoute>} />
            <Route path="/sign_up" element={<SignUp/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/lists/:listId" element={<PrivateRoute><List/></PrivateRoute>} />
            <Route path="/lists" element={<PrivateRoute><Lists/></PrivateRoute>}/>
          </Routes>
        </Layout>
      </AuthProvider>
    </BrowserRouter >
  </React.StrictMode>
);