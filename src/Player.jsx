import H5AudioPlayer from "react-h5-audio-player";
import 'react-h5-audio-player/lib/styles.css';
import {baseUrl, fetchUrl, Kind} from "./Singletons";
import sampleImg from "./SampleImg.png";
import {Navbar} from "./App";
import {useEffect, useState} from "react";
import parse from "html-react-parser";

const urlParams = new URLSearchParams(window.location.search);

let param = urlParams.get('play');
let fetchInfo =
    await fetch(baseUrl + "getSingle?id=" + param)
let info = urlParams.get('play') === null ? {} : await fetchInfo.json()

function Player() {
    const [lyric, setLyric] = useState({ifTrans: true, lyric: "", tlyric: ""});
    const [currentT, setCurrentT] = useState(false);
    useEffect(() => {
        async function f() {
            setLyric(await (await fetch(baseUrl + "lyric", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: info.song_name,
                    artist: info.artist,
                    albumName: info.album_name,
                }),
            })).json())


        }

        f()

    }, [])
    const cover = info.albumcover === null ? sampleImg : URL.createObjectURL(new Blob([Uint8Array.from(info.albumcover.data).buffer]));
    return (
        <>
            <div className="">
                <Navbar isFixed={false}/>
                <div className={"container"}>
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
                            <div id={"no-card"} className={"card mx-auto mb-3 rounded-top-0"}
                                 style={{maxWidth: "500px"}}>
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
                        <div className={" col-xl-6 p-4 "} style={{maxHeight: "93vh"}}>
                            <div className={"lyric-box"}
                                 style={{margin: "auto",  overflow: 'scroll',  display: "flex", flexDirection: "column", maxHeight: "100%"}}>
                                {lyric.ifTrans ?
                                    <select className={"form-select mb-2 lyric-box"} onChange={(e) => {

                                        switch (Number.parseInt(e.target.value)) {
                                            case 0:
                                                setCurrentT(false)
                                                break;
                                            case 1:
                                                setCurrentT(true)
                                                break;
                                            default:
                                                break;
                                        }
                                        console.log(currentT);
                                    }}>
                                        <option value={0}>原文
                                        </option>
                                        <option value={1}>译文
                                        </option>
                                    </select> : null
                                }

                                <div style={{
                                    width: '100%',
                                    overflow: 'scroll',
                                    borderRadius: ".5rem",
                                    borderColor: "gray",
                                    borderWidth: ".3px",
                                    borderStyle: "solid"
                                }} className={"bg-light p-5 "}>
                                    {
                                        currentT ? lyric.tlyric===undefined ? "无" :  parse(lyric.tlyric.replaceAll("\n", "<br>")) : lyric.lyric ===undefined ? "无" :  parse(lyric.lyric.replaceAll("\n", "<br>"))
                                    }
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
            </div>

        </>

    )
}

export default Player;