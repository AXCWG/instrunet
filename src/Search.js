import './App.css'

const baseUrl = "https://localhost:8080";
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

function Search() {

    console.log(Kind[1])


    return (
        <>
            <div className="container" style={{marginTop: "5rem"}}>

                <div className={"display-1"}>
                    搜索结果：{p === "" || p === null ? "全部" : p}
                </div>
                <div className={"mt-5 row"}>
                    {
                        got_data.map((data) => {
                            if (
                                data.song_name === "form.name"

                            ) {
                                return null
                            } else {
                                return (
                                    <div className={"col-lg-6 mb-3"} key={data.uuid}>
                                        <div className={"card"} style={{width: "100%"}} onClick={(e) => {

                                            const link = document.createElement("a");
                                            link.href = "http://andyxie.cn:8201/" + data.uuid;
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
                                    </div>


                                )
                            }

                        })


                    }
                </div>


            </div>
        </>

    )
}

export default Search;