import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import 'bootstrap-icons/font/bootstrap-icons.css'

async function UploadEntry(formData) {


    await formData.get("file").arrayBuffer()
}

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
                    <form className={"d-flex w-100"}>
                        <input className={"form-control me-2"} type={"text"} placeholder={"搜索"}/>
                        <button type="button" className="btn btn-primary"><i className={"bi bi-search"}></i></button>
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
                <form className={" px-0"} style={{width: '80%'}} action={UploadEntry}>
                    <input className={" mb-3 form-control"} placeholder={"曲目名"} name={"name"}/>
                    <input className={"  mb-3 form-control"} placeholder={"所属专辑名"} name={"albumName"}/>
                    <input className={" mb-3 form-control"}
                           placeholder={"（如果可能的话）其他音乐元数据刮削网站链接"} name={"link"}/>
                    <input className={"mb-3 form-control"} type={"file"} name={"file"}></input>
                    <button className={"btn btn-primary mb-3 w-100"}><i className={"bi-upload"}></i> 上传</button>
                </form>


            </div>

        </div>
    </>);
}

export default App;
