import {Navbar} from "./App";
import './App.css'
import Buffer from 'Buffer'

const baseUrl = "http://localhost:8080";

const queryParams = new URLSearchParams(window.location.search);
const p = queryParams.get("p");
var got_data = await (await fetch(baseUrl + "/search_api", {
    method: "POST",
    body: JSON.stringify({searchStr: p}), headers: {'Content-Type': 'application/json'}
})).json()

function Search() {
    function base64ToArrayBuffer(base64) {
        const binaryString = atob(base64);

        const encoder = new TextEncoder();
        const binaryArray = encoder.encode(binaryString);

        return binaryArray.buffer;
    }

    return (
        <>
            <Navbar/>
            <div className="container" style={{marginTop: "5rem"}}>

                <div className={"display-1"}>
                    搜索结果：{p === "" ? "全部" : p}
                </div>
                <div className={"mt-5"}>
                    {
                        got_data.map((data) => {
                            console.log(data.uuid)
                            return (

                                <div className={"card"} style={{width: "100%"}} onClick={async (e) => {
                                    var res = await fetch(baseUrl + "/fetch", {
                                        method: "POST",
                                        body: JSON.stringify({
                                            "uuid": data.uuid,
                                        }),
                                        headers: {'Content-Type': 'application/json'}
                                    })
                                    var file = await res.json()
                                    var ab = base64ToArrayBuffer(file.data)
                                    var blob = new Blob([ab])
                                    // window.location.href = URL.createObjectURL(blob)
                                    var objurl = URL.createObjectURL(blob)
                                    window.open(URL.createObjectURL(blob))
                                    const link = document.createElement('a');
                                    link.href = objurl;
                                    document.body.appendChild(link);
                                    link.click();
                                    document.body.removeChild(link);
                                    console.log(blob)


                                }}>
                                    <div className={"card-body"}>
                                        <div className={"display-6"}>
                                            {data.song_name}

                                        </div>
                                    </div>
                                    <div className={"card-footer"}>
                                        {data.artist} - {data.album_name}
                                    </div>
                                </div>


                            )
                        })


                    }
                </div>


            </div>
        </>

    )
}

export default Search;