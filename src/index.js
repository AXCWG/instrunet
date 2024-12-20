import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Search from "./Search";
import Player from "./Player";
import {fetchUrl, ncmApiUrl} from './Singletons'
import {useCookies} from "react-cookie";

function NcmQRLogin() {
    const [cookies, setCookie] = useCookies(['InstruNet'], {doNotParse: true})
    useEffect(() => {
        fetch(ncmApiUrl + 'login/qr/key?timestamp=' + Date.now()).then(res => {

            if (res.ok) {
                res.json().then(async data => {
                    let key = data.data.unikey
                    let qrimgBase64 = (await ((await fetch(ncmApiUrl + "login/qr/create?key=" + key + "&qrimg=true&timestamp=" + Date.now())).json())).data.qrimg
                    setImg(qrimgBase64)

                    async function Interval() {
                        let res = await (await fetch(ncmApiUrl + "login/qr/check?key=" + key + "&timestamp=" + Date.now())).json()
                        console.log(res)

                    }

                    const timer = setInterval(Interval, 5000)
                })
            }
        })
    }, [])


    const [img, setImg] = useState("");


    return (<>
        <img src={img}/>
    </>)
}

function NcmSMSLogin() {
    const [form, setForm] = useState({
        phone: "",
        captcha: "",
    })

    function getVeriCode() {
        fetch(ncmApiUrl + "captcha/sent?phone=" + form.phone).then(async res => console.log(await res.json()))
    }


    return (<>
        <input type={"tel"} placeholder={"电话号码"} className={"form-control"} value={form.phone} onChange={(e) => {
            setForm({
                ...form,
                phone: e.target.value,
            })
        }}/>
        <input placeholder={"验证码"} value={form.captcha} onChange={(e) => {
            setForm({
                ...form,
                captcha: e.target.value,
            })
        }} type={"number"} className={"form-control"}/>
        <button className={"btn btn-link"} onClick={getVeriCode}>获取验证码</button>
        <button className={"btn btn-primary"} onClick={() => {
            fetch(ncmApiUrl + "login/cellphone?phone=" + form.phone + "&captcha=" + form.captcha).then(async res => {
                console.log(await res.json())
            })
        }}>登录
        </button>
    </>)
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<BrowserRouter>
    <Routes>
        <Route path="/" element={<App/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route path="/player" element={<Player/>}/>
        <Route path="/ncmQRLogin" element={<NcmQRLogin/>}/>
        <Route path={"/ncmSMSLogin"} element={<NcmSMSLogin/>}/>
    </Routes>
</BrowserRouter>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
