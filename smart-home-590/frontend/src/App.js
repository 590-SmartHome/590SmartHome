import React, { useEffect } from 'react';
import {HashRouter as Router, Route, Routes} from "react-router-dom";
import axios from 'axios';
import Home from './pages/home.js'
import Login from './pages/login.js'
import Layout from './pages/layout.js';
import Landing from './pages/landing.js';
import Settings from './pages/settings.js';

function App() {

  return (
    <Router>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path="login" element={<Login />} />
        <Route path="home" element={<Home />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  </Router>
  );
}

export default App;
