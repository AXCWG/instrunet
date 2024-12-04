import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import 'bootstrap-icons/font/bootstrap-icons.css'
import {useState} from "react";

const baseUrl = "http://192.168.1.166:8080";

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
                        <a className="nav-link" href="/singers">歌手</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/application">申请</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>)
}

function App() {
    const [form, setForm] = useState({
        name: "", albumName: "", link: "", file: {}, email: "", artist: ""
    })
    const [loading, setLoading] = useState(false);

    function Prevent(e) {
        e.preventDefault()
    }

    function searchGeneral() {
        window.location.href = "/search?p="+searchParam;
    }

    async function UploadEntry() {

        if (form.name !== "" && form.albumName !== "" && form.file.toString() !== "[object Object]" && form.artist !== "") {
            setLoading(true);
            console.log(form.file.toString())
            const reader = new FileReader();
            reader.readAsDataURL(form.file);
            reader.onload = async () => {
                var prep = {
                    name: form.name, albumName: form.albumName, link: form.link, file: reader.result, email: form.email,artist: form.artist
                }

                var res = await fetch(baseUrl + "/submit", {
                    method: 'POST', body: JSON.stringify(prep), headers: {
                        'Content-Type': 'application/json',
                    }


                }).catch((e) => {
                    console.log(e)
                    setLoading(false);
                })
                if (res !== undefined) {
                    if (!res.ok) {
                        alert("Media type not supported!")
                        setLoading(false);
                    } else {
                        alert("Complete. ")
                        setLoading(false);
                    }
                }

            }
        }

    }
    const [searchParam, setSearchParam] = useState("")
    return (<>
            <Navbar/>
            <div className="container mt-5 ">
                <div style={{height: '80vh', display: "flex", justifyContent: "center", flexDirection: "column"}}>
                    <div className="row">
                        <div className={"display-1 text-lg-center mt-5"}>
                            伴奏网
                        </div>
                        <span className={"text-lg-center "}>免费的伴奏分享网站</span>
                    </div>
                    <div className={"row mt-5 "}>
                        <form className={"d-flex w-100"} onSubmit={Prevent}>
                            <input className={"form-control me-2"} type={"text"} placeholder={"搜索"} onChange={(e)=>{
                                setSearchParam(e.target.value);
                            }} value={searchParam} onKeyDown={(e)=>{
                                if(e.key === "Enter"){
                                    searchGeneral();
                                }
                            }} />
                            <button type="button" className="btn btn-primary" onClick={searchGeneral}><i className={"bi bi-search"}></i>
                            </button>
                        </form>

                    </div>

                </div>
                <div className={"mt-5 text-center"}>或者……</div>
                <div className={"row mt-5"}>
                    <div className={"display-4"}>为社区做一点贡献：</div>
                    <div className={"h5 mt-3 "}>别担心，你只需要提供歌曲的源文件和元数据即可。</div>
                    <div className={"h6"}>不会太久。</div>
                </div>
                <div className={"row mt-5  justify-content-center "} style={{marginBottom: "90px"}}>

                    <form className={" px-0"} style={{width: '80%'}} onSubmit={Prevent}>
                        <div className={"spinner-border"} style={{visibility: loading ? "visible" : "collapse"}}></div>
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
                        }
                        } placeholder={"歌手名"} className={"mb-3 form-control"} value={form.artist}/>
                        <input onChange={(obj) => {
                            setForm({
                                ...form, link: obj.target.value
                            })
                        }} value={form.link} className={" mb-3 form-control"}
                               placeholder={"（如果可能的话）其他音乐元数据刮削网站链接（可选）"} name={"link"}/>
                        <input required={true} onChange={(obj) => {
                            setForm({
                                ...form, file: obj.target.files[0]
                            })
                        }} className={"mb-3 form-control"} type={"file"} name={"file"} accept={"audio/*"}></input>
                        <input onChange={(obj) => {
                            setForm({
                                ...form, email: obj.target.value
                            })
                        }} value={form.email} className={"mb-3 form-control"}
                               placeholder={"邮箱（方便通知何时完毕，可选）"}
                        />

                        <button className={"btn btn-primary mb-3 w-100"} type={"submit"} onClick={UploadEntry}><i
                            className={"bi-upload"}></i> 上传
                        </button>
                    </form>


                </div>

            </div>
        </>
    );
}

export default App;
export {Navbar}
