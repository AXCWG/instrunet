import './App.css'
import {useState} from "react";

const baseUrl = "https://andyxie.cn:8200";
const queryParams = new URLSearchParams(window.location.search);
const p = queryParams.get("p");
let got_data = await (await fetch(baseUrl + "/search_api", {
    method: "POST",
    body: JSON.stringify({searchStr: p === null ? "" : p}), headers: {'Content-Type': 'application/json'}
})).json()

const Kind = {
    0: "去和声伴奏",
    1: "和声伴奏",
    2: "人声",
    3: "贝斯",
    4: "鼓",
    5: "其他",
}

function Cards({data}) {
    return (<div className={"col-lg-6 mb-3"} key={data.uuid}>
        <div className={"card"} style={{width: "100%"}} onClick={(e) => {
            const link = document.createElement("a");
            link.href = "https://andyxie.cn:8201/" + data.uuid;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }}>
            <div className={"card-body"}>
                <div className={"display-6"}>
                    {data.song_name}

                </div>
            </div>
            <div className={"card-footer"}>
                {data.artist} - {data.album_name} - {Kind[data.kind]}
            </div>
        </div>
    </div>)
}

function Search() {
    const [selected, setSelected] = useState({
        0: true,
        1: true,
    })
    return (
        <>
            <div className="container" style={{marginTop: "5rem"}}>
                <div className={"display-1"}>
                    搜索结果：{p === "" || p === null ? "全部" : p}
                </div>
                <div className={"row mt-3"}>
                    <div>
                        <input checked={selected["0"]} onChange={(e) => {
                            setSelected({...selected, 0: !selected["0"]});
                        }} type={"checkbox"} id={"0"} className={"form-check-input"}/>
                        <label htmlFor={"0"} style={{userSelect: "none"}}>{Kind["0"]}</label>
                    </div>
                    <div>
                        <input checked={selected["1"]} onChange={(e) => {
                            setSelected({...selected, 1: !selected["1"]});
                        }} type={"checkbox"} id={"1"} className={"form-check-input"}/>
                        <label htmlFor={"1"} style={{userSelect: "none"}}>{Kind["1"]}</label>
                    </div>


                </div>
                <div className={"mt-5 row"}>
                    {
                        got_data.map((data) => {
                            if (
                                data.song_name === "form.name"
                            ) {
                                return null
                            }
                            if (selected["0"] === true) {
                                if (data.kind === 0) {
                                    return (
                                        <Cards data={data}/>
                                    )
                                }

                            }
                            if (selected["1"] === true) {
                                if (data.kind === 1) {
                                    return (
                                        <Cards data={data}/>
                                    )
                                }
                            }
                            return null


                        })


                    }
                </div>


            </div>
        </>

    )
}

export default Search;