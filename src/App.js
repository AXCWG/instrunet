import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import 'bootstrap-icons/font/bootstrap-icons.css'
import {useState} from "react";
import {parseBlob, selectCover} from 'music-metadata'
import {baseUrl, Kind} from "./Singletons";
import {useCookies} from "react-cookie";

// TODO Localizations


function Navbar({isFixed}) {

    return (

        <nav
            className={isFixed ? "navbar fixed-top navbar-expand-sm bg-dark navbar-dark" : "navbar navbar-expand-sm bg-dark navbar-dark"}>
            <div className="container-fluid">
                <a className="navbar-brand" href="/">伴奏网</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapsibleNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavbar">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/">主页</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/search">全部</a>
                        </li>
                        <li className={"nav-item"}>
                            <a className="nav-link" href="/query">处理队列</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="mailto:xiey0@qq.com">联系我</a>
                        </li>
                        <li className={"nav-item"}>
                            <a className="nav-link" href="https://afdian.com/a/re_xiey0">如果喜欢本站，请考虑打赏哦</a>
                        </li>
                        <li className={"nav-item"}>
                            <a className="nav-link" href="https://github.com/AXCWG/instrunet">GitHub</a>
                        </li>


                    </ul>
                    <div className="d-flex">
                        <a className={" text-decoration-none me-3 right-hand"} href={"/login"}>登录</a>
                        <a className={" text-decoration-none me-1 right-hand"} href={"/register"}>注册</a>
                    </div>
                </div>
            </div>
        </nav>)
}

function App() {

    const [cookies, setCookie] = useCookies(['InstruNet'], {doNotParse: true})

    const [form, setForm] = useState({
        name: "",
        albumName: "",
        link: "",
        file: {},
        email: cookies["email"],
        artist: "",
        kind: 0,
        albumCover: ""
    })
    const [ncmForm, setncmForm] = useState({
        id: "",
        email: cookies["email"],
        kind: 0,
    })

    const [loading, setLoading] = useState(false);

    function Prevent(e) {
        e.preventDefault()
    }

    function searchGeneral() {
        window.location.href = "/search?p=" + searchParam;
    }


    async function UploadEntry() {
        if ((form.name === "" || form.name === undefined) || form.file.toString() === "[object Object]") {
            alert("格式不正确")

        } else {
            setLoading(true);
            const reader = new FileReader();
            reader.readAsDataURL(form.file);
            reader.onload = async () => {
                let prep = {
                    name: form.name,
                    albumName: (form.albumName === undefined || form.albumName === "") ? null : form.albumName,
                    link: form.link,
                    file: reader.result,
                    email: form.email,
                    artist: (form.artist === undefined || form.artist === "") ? null : form.artist,
                    kind: form.kind,
                    albumCover: (form.albumCover === undefined || form.albumCover === "") ? null : form.albumCover,


                }

                let res = await fetch(baseUrl + "submit", {
                    method: 'POST', body: JSON.stringify(prep), headers: {
                        'Content-Type': 'application/json',
                    }


                }).catch((e) => {
                    console.log(e)
                    setLoading(false);
                })
                if (res !== undefined) {
                    if (res.status === 500) {
                        setLoading(false);
                        alert("傻逼，重复了。请在盲目上传之前看看库里有没有好么傻逼？")
                    } else {
                        setLoading(false);
                        alert("上传完成，正在分析，将在5-30分钟内在数据库中出现")
                    }
                }

            }
        }

    }

    const [searchParam, setSearchParam] = useState("")


    return (<>
        <Navbar isFixed={true}/>
        <div className="container mt-5 ">
            <div style={{height: '81vh', display: "flex", justifyContent: "center", flexDirection: "column"}}>
                <div className="row">
                    <div className={"display-1 text-lg-center mt-5"} style={{userSelect: "none"}}>
                        伴奏网
                    </div>
                    <span className={"text-lg-center user-select-none "}
                          style={{fontSize: ".9rem"}}>AI支持的，免费无登录的伴奏分享网站</span>
                </div>
                <div className={"row mt-5 "}>
                    <form className={"d-flex w-100"} onSubmit={Prevent}>
                        <input className={"form-control me-2"} type={"text"} placeholder={"搜索"} onChange={(e) => {
                            setSearchParam(e.target.value);
                        }} value={searchParam} onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                searchGeneral();
                            }
                        }}/>
                        <button type="button" className="btn btn-primary" onClick={searchGeneral}><i
                            className={"bi bi-search"}></i>
                        </button>
                    </form>

                </div>

            </div>
            <div
                className={"mt-5 text-center text-secondary text-decoration-underline"}>本站秉持先搜索，后上传的原则<br></br>找不到你想要的？
            </div>
            <div className={"row mt-5"}>
                <div className={"display-4"}>为社区做一点贡献：</div>
                <div className={"h5 mt-3 "}>别担心，你只需要提供歌曲的源文件和元数据即可。</div>
                <div className={"h6"}>不会太久。</div>
                <h6>全程大概5-30分钟左右。</h6>
            </div>
            <div className={"row mt-5  justify-content-center "} style={{marginBottom: "90px"}}>

                <form className={" px-0"} style={{width: '80%'}} onSubmit={Prevent}>
                    <div style={{visibility: loading ? "visible" : "collapse"}}>
                            <span className={"spinner-border"}
                            ></span><span>正在加载</span>

                    </div>

                    <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <a className="nav-link active" data-bs-toggle="tab" href="#file-mode">文件模式</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-bs-toggle="tab" href="#ncm-mode">网易云模式</a>
                        </li>

                    </ul>
                    <div className={"tab-content"}>
                        <div className={"tab-pane  active"} id={"file-mode"}>
                            <div className={"mb-3"} style={{
                                borderWidth: ".5px",
                                borderColor: "black",
                                borderStyle: "solid",
                                width: 200,
                                height: 200,
                                backgroundSize: "contain"
                            }} id={"AlbumCover"}>
                                <input type={"file"}
                                       style={{
                                           height: "100%",
                                           width: "100%",
                                           color: "transparent",
                                           filter: "opacity(0)"
                                       }}
                                       onChange={(e) => {
                                           document.getElementById("AlbumCover").style.backgroundImage = `url(${URL.createObjectURL(e.target.files[0])})`;
                                           const reader = new FileReader();
                                           reader.readAsDataURL(e.target.files[0]);

                                           reader.onload = async () => {
                                               setForm({
                                                   ...form,
                                                   albumCover: reader.result,
                                               })
                                           }

                                       }}/>


                            </div>

                            <input required={true} onChange={(obj) => {
                                parseBlob(obj.target.files[0], {
                                    skipCovers: false,

                                }).then(data => {
                                    const reader = new FileReader();
                                    reader.readAsDataURL(data.common.picture === undefined ? new Blob([]) : new Blob([selectCover(data.common.picture).data.buffer]))
                                    reader.onload = () => {
                                        /** I really don't know what to do here. Sorry for violating React.*/
                                        /** Jan 09 25 I really should use useState. Fuck me. **/
                                        if (data.common.picture !== undefined ) {
                                            let coverBlob = new Blob([selectCover(data.common.picture).data.buffer])
                                            document.getElementById("AlbumCover").style.backgroundImage = `url(${URL.createObjectURL(coverBlob)})`;
                                            setForm({
                                                ...form,
                                                name: data.common.title,
                                                albumName: data.common.album,
                                                artist: data.common.artist === undefined
                                                    ? data.common.albumartist
                                                    : data.common.artist,
                                                file: obj.target.files[0],

                                                albumCover: reader.result,
                                            })
                                        } else {
                                            document.getElementById("AlbumCover").style.backgroundImage = ``;
                                            setForm({
                                                ...form,
                                                name: data.common.title,
                                                albumName: data.common.album,
                                                artist: data.common.artist === undefined
                                                    ? data.common.albumartist
                                                    : data.common.artist,
                                                file: obj.target.files[0],
                                                albumCover: ""
                                            })
                                        }
                                    }


                                })

                            }} className={"mb-3 form-control"} type={"file"} name={"file"} accept={"audio/*"}
                            ></input>
                            <input required={true} value={form.name} onChange={(obj) => {
                                setForm({
                                    ...form, name: obj.target.value,
                                });
                            }} className={" mb-3 form-control"} placeholder={"曲目名"} name={"name"}/>
                            <input onChange={(obj) => {
                                setForm({
                                    ...form, albumName: obj.target.value
                                });
                            }} value={form.albumName} className={"  mb-3 form-control"} placeholder={"所属专辑名"}
                                   name={"albumName"}/>
                            <input onChange={(obj) => {
                                setForm({
                                    ...form, artist: obj.target.value
                                })
                            }} placeholder={"歌手名"} className={"mb-3 form-control"} value={form.artist}/>

                            <input onChange={(obj) => {
                                setForm({
                                    ...form, email: obj.target.value
                                })
                                setCookie("email", obj.target.value, {
                                    sameSite: "strict",
                                })
                            }} value={form.email} className={"mb-3 form-control"}
                                   placeholder={"邮箱（通知何时完毕，可选）"} type="email"
                            />
                            <div className={"row mb-3"}>
                                <div className={"col-lg-2 w-auto"}>
                                    <div style={{display: "flex", justifyContent: "space-between"}}>
                                        <select name={"mode"} onChange={(e) => {
                                            setForm({
                                                ...form, kind: Number.parseInt(e.target.value)
                                            })
                                        }} className={"form-control form-select"} style={{userSelect: "none"}}>
                                            <option value={0}>{Kind["0"]}</option>
                                            <option value={1}>{Kind["1"]}</option>
                                            <option value={3}>{Kind["3"]}</option>
                                            <option value={4}>{Kind["4"]}</option>
                                            <option value={0} disabled={true}>更多正在开发中……</option>

                                        </select>
                                    </div>
                                </div>

                            </div>


                            <button className={"btn btn-primary mb-3 w-100"} type={"submit"} onClick={UploadEntry}
                                    disabled={loading}><i
                                className={"bi-upload"}></i> 上传
                            </button>
                        </div>
                        <div className={"tab-pane"} id={"ncm-mode"}>

                            <input type={"text"} placeholder={"歌曲ID（网易云网页端地址中“id”参数）"}
                                   className={"mb-3 mt-3 form-control "} value={ncmForm.id} onChange={(e) => {
                                setncmForm({
                                    ...ncmForm,
                                    id: e.target.value,

                                })
                            }}/>
                            <a href={"https://www.bilibili.com/video/BV1Buc8eGEmh/?share_source=copy_web&vd_source=fff871e844f34f38697fc936b8301df5&t=49"}>如何寻找？</a>
                            <input onChange={(obj) => {
                                setncmForm({
                                    ...ncmForm,
                                    email: obj.target.value,
                                })
                                setCookie("email", obj.target.value, {
                                    sameSite: "strict",
                                })
                            }} value={ncmForm.email} className={"mb-3 form-control"}
                                   placeholder={"邮箱（通知何时完毕，可选）"} type="email"
                            />
                            <div className={"row mb-3"}>
                                <div className={"col-lg-2 w-auto"}>
                                    <div style={{display: "flex", justifyContent: "space-between"}}>
                                        <select name={"mode"} onChange={(e) => {
                                            setncmForm({
                                                ...ncmForm,
                                                kind: Number.parseInt(e.target.value)
                                            })
                                        }} className={"form-control form-select"} style={{userSelect: "none"}}>
                                            <option value={0}>{Kind["0"]}</option>
                                            <option value={1}>{Kind["1"]}</option>
                                            <option value={3}>{Kind["3"]}</option>
                                            <option value={4}>{Kind["4"]}</option>
                                            <option value={0} disabled={true}>更多正在开发中……</option>

                                        </select>
                                    </div>
                                </div>

                            </div>
                            <button className={"btn btn-primary w-100"} onClick={async (e) => {
                                setLoading(true);
                                e.currentTarget.disabled = true;
                                let res = (await fetch(baseUrl + "ncm/url", {
                                    method: "POST",
                                    body: JSON.stringify({
                                        id: ncmForm.id,
                                        kind: ncmForm.kind,
                                        email: ncmForm.email,
                                    }),
                                    headers: {"Content-Type": "application/json"}
                                }))
                                if (res.ok) {
                                    alert("提交成功")
                                } else {
                                    alert(await res.text())
                                }
                                e.target.disabled = false;

                                setLoading(false);
                            }}>提交
                            </button>
                        </div>


                    </div>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>

                </form>


            </div>

        </div>
    </>);
}

export default App;
export {Navbar}
