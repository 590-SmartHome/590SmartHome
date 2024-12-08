import React, { useEffect } from 'react';
import {HashRouter as Router, Route, Routes} from "react-router-dom";
import Home from './pages/home.js'
import Layout from './pages/layout.js';
import Landing from './pages/landing.js';
import Settings from './pages/settings.js';

function App() {

  return (
    <Router>
    <Routes>
      <Route path="/" element={<Landing />}/>
      <Route element={<Layout />} >
        <Route path="/home" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  </Router>
  );
}

export default App;
