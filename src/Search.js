import {Navbar} from "./App";
import './App.css'

const baseUrl = "http://localhost:8080";

const queryParams = new URLSearchParams(window.location.search);
const p = queryParams.get("p");
var got_data = await (await fetch(baseUrl + "/search_api", {
    method: "POST",
    body: JSON.stringify({searchStr: p}), headers: {'Content-Type': 'application/json'}
})).json()

function Search() {

    return (
        <>
            <Navbar/>
            <div className="container" style={{marginTop: "5rem"}}>

                <div className={"display-1"}>
                    搜索结果：{p === "" ? "全部" : p}
                </div>
                <div  className={"mt-5"}>
                    {
                        got_data.map((data) => {
                            return (

                                    <div className={"card"} style={{width: "100%"}}>
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