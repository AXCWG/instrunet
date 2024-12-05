import './App.css'

const baseUrl = "https://andyxie.cn:8200";

const queryParams = new URLSearchParams(window.location.search);
const p = queryParams.get("p");
var got_data = await (await fetch(baseUrl + "/search_api", {
    method: "POST",
    body: JSON.stringify({searchStr: p===null?"":p}), headers: {'Content-Type': 'application/json'}
})).json()

function Search() {
    console.log(p)


    return (
        <>

            <div className="container" style={{marginTop: "5rem"}}>

                <div className={"display-1"}>
                    搜索结果：{p === ""||p===null ? "全部" : p}
                </div>
                <div className={"mt-5"}>
                    {
                        got_data.map((data) => {

                            console.log(data.uuid)
                            if(
                                data.song_name === "Test Song"

                            ){
                                return null
                            }else{
                                return (

                                    <div className={"card"} style={{width: "100%"}} onClick={async (e) => {

                                        const link = document.createElement("a");
                                        link.href = "http://andyxie.cn:8201/"+data.uuid;
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
                                            {data.artist} - {data.album_name}
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