import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Search from "./Search";
import Player from "./Player";
import Query from "./Query";

function PageNotFound() {
    return (
        <>
            <div className="container">
                <h1 className={"display-1"}>正在建设中或不存在该页面</h1>
            </div>
        </>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<BrowserRouter>
    <Routes>
        <Route path="/" element={<App/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route path="/player" element={<Player/>}/>
        <Route path="/query" element={<Query/>}/>
        <Route path="/404" element={<PageNotFound/>}/>
        <Route path={"*"} element={<Navigate replace to="/404"/>}/>

    </Routes>
</BrowserRouter>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
