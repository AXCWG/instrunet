import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App, {Navbar} from './App';
import reportWebVitals from './reportWebVitals';
import {HashRouter, Route, Routes} from "react-router-dom";
import Search from "./Search";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <HashRouter>
        <Navbar/>
        <Routes>
            <Route path="/" element={<App />}  />
            <Route path="/search" element={<Search />} />
        </Routes>
    </HashRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
