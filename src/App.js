import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import 'bootstrap-icons/font/bootstrap-icons.css'
import {useState} from "react";
import {parseBlob} from 'music-metadata'
import {baseUrl, Kind} from "./Singletons";

// TODO Localizations



function Navbar() {
    return (<nav className="navbar fixed-top navbar-expand-sm bg-dark navbar-dark">
        <div className="container-fluid">
            <a className="navbar-brand" href="/">伴奏网</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapsibleNavbar">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="collapsibleNavbar">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="/">主页</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/search">全部</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="mailto:xiey0@qq.com">联系我</a>
                    </li>
                    <li className={"nav-item"}>
                        <a className="nav-link" href="https://afdian.com/a/re_xiey0">如果喜欢本站，请考虑打赏哦</a>
                    </li>
                    <li className={"nav-item"}>
                        <a className="nav-link" href="https://github.com/AXCWG/instrunet">Github</a>
                    </li>

                </ul>
            </div>
        </div>
    </nav>)
}

function App() {
    const [form, setForm] = useState({
        name: "", albumName: "", link: "", file: {}, email: "", artist: "", kind: 0
    })
    const [loading, setLoading] = useState(false);

    function Prevent(e) {
        e.preventDefault()
    }

    function searchGeneral() {
        window.location.href = "/search?p=" + searchParam;
    }

    async function UploadEntry() {

        if (form.name !== "" && form.albumName !== "" && form.file.toString() !== "[object Object]" && form.artist !== "") {
            setLoading(true);
            console.log(form.file.toString())
            const reader = new FileReader();
            reader.readAsDataURL(form.file);
            reader.onload = async () => {
                let prep = {
                    name: form.name,
                    albumName: form.albumName,
                    link: form.link,
                    file: reader.result,
                    email: form.email,
                    artist: form.artist,
                    kind: form.kind

                }

                var res = await fetch(baseUrl + "submit", {
                    method: 'POST', body: JSON.stringify(prep), headers: {
                        'Content-Type': 'application/json',
                    }


                }).catch((e) => {
                    console.log(e)
                    setLoading(false);
                })
                if (res !== undefined) {
                    if (!res.ok) {
                        setLoading(false);
                        alert("媒体格式不支持")
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
                    <input required={true} onChange={(obj) => {
                        parseBlob(obj.target.files[0], {
                            skipCovers: true,

                        }).then(data => {
                            setForm({
                                ...form,
                                name: data.common.title,
                                albumName: data.common.album,
                                artist: data.common.albumartist === undefined
                                    ? data.common.artist
                                    : data.common.albumartist,
                                file: obj.target.files[0]
                            })
                        })


                    }} className={"mb-3 form-control"} type={"file"} name={"file"} accept={"audio/*"}
                    ></input>
                    <input required={true} value={form.name} onChange={(obj) => {
                        setForm({
                            ...form, name: obj.target.value,
                        });
                    }} className={" mb-3 form-control"} placeholder={"曲目名"} name={"name"}/>
                    <input required={true} onChange={(obj) => {
                        setForm({
                            ...form, albumName: obj.target.value
                        });
                    }} value={form.albumName} className={"  mb-3 form-control"} placeholder={"所属专辑名"}
                           name={"albumName"}/>
                    <input required={true} onChange={(obj) => {
                        setForm({
                            ...form, artist: obj.target.value
                        })
                    }} placeholder={"歌手名"} className={"mb-3 form-control"} value={form.artist}/>

                    <input onChange={(obj) => {
                        setForm({
                            ...form, email: obj.target.value
                        })
                    }} value={form.email} className={"mb-3 form-control"}
                           placeholder={"邮箱（通知何时完毕，可选）"}
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
                </form>


            </div>

        </div>
    </>);
}

export default App;
export {Navbar}
