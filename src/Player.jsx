import H5AudioPlayer from "react-h5-audio-player";
import 'react-h5-audio-player/lib/styles.css';
import {baseUrl, fetchUrl, Kind} from "./Singletons";
import sampleImg from "./SampleImg.png";
import {Navbar} from "./App";

const urlParams = new URLSearchParams(window.location.search);

let param = urlParams.get('play');
let fetchInfo =
    await fetch(baseUrl + "getSingle?id=" + param)
let info = urlParams.get('play') === null ? {} : await fetchInfo.json()

function Player() {
    const cover = info.albumcover === null ? sampleImg : URL.createObjectURL(new Blob([Uint8Array.from(info.albumcover.data).buffer]));
    return (
        <>
            <div className="">
                <Navbar isFixed={false}/>
                <div className={"container"} >
                    <div className={"row"}>
                        <div className={"col-xl-6 mt-4"}>
                            <div style={{
                                borderWidth: ".5px",
                                borderColor: "black",
                                borderStyle: "solid",
                                maxWidth: "500px",

                                backgroundSize: "contain"
                            }} className={"mx-auto "}>
                                <img src={cover} alt="cover" width="100%"/>

                            </div>
                            <div id={"no-card"} className={"card mx-auto mb-3 rounded-top-0"} style={{maxWidth: "500px"}}>
                                <div className={"card-body"}>
                                    <div className={"h6"}>
                                        {info.song_name}
                                    </div>
                                    <div>
                                        {info.album_name} - {info.artist}
                                    </div>
                                    <div>
                                        {Kind[info.kind]}
                                    </div>

                                </div>
                            </div>

                            <H5AudioPlayer src={fetchUrl + param} autoplay="autoplay" className={"mx-auto mb-3"}
                                           style={{maxWidth: "500px"}}
                            ></H5AudioPlayer>
                            <button className={"btn btn-light w-100 d-block mx-auto mb-3"}
                                    style={{
                                        borderStyle: "solid",
                                        borderColor: "gray",
                                        borderWidth: "thin",
                                        maxWidth: "500px"
                                    }}
                                    onClick={() => {
                                        window.location.href = fetchUrl + param;
                                    }}>下载
                            </button>
                        </div>
                        <div className={"col-xl-6 p-4"}>
                            <div style={{width:'100%', height: '100%', borderRadius: ".5rem", borderColor: "gray", borderWidth: ".3px", borderStyle: "solid"}} className={"bg-light p-5"} >
                                歌词功能正在开发中
                            </div>
                        </div>

                    </div>

                </div>
            </div>

        </>

    )
}

export default Player;