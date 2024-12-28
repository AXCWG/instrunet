import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Search from "./Search";
import Player from "./Player";


function Tutorial() {
    return  (
        <>
            <div className="container">
                <h1 className={"display-1"}>正在建设中</h1>
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
        <Route path={"/ncm_how_to_get_id"} element={<Tutorial/>}/>
    </Routes>
</BrowserRouter>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
