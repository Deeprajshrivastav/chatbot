import "./App.css";
import React from "react";

import { Route, Routes, BrowserRouter } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Home";
import Layout from "./components/Layout";
import BroadcastMessage from "./components/Brodcast";
import Mybot from "./components/mybot";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={ <Layout><Dashboard /></Layout>} />
          <Route path="/brodcast" element={ <Layout><BroadcastMessage /></Layout>} />
          <Route path="/mybot" element={ <Layout><Mybot /></Layout>} />
        </Routes>
      
      </BrowserRouter>
    </div>
  );
}

export default App;
