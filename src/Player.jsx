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
    const [lyric, setLyric] = useState("");
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
            })).text())


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


                                <div style={{
                                    width: '100%',
                                    overflow: 'scroll',
                                    borderRadius: ".5rem",
                                    borderColor: "gray",
                                    borderWidth: ".3px",
                                    borderStyle: "solid"
                                }} className={"bg-light p-5 "}>
                                    {
                                       parse(lyric.replaceAll("\n", "<br>").replaceAll(new RegExp("\\[[^\\[\\]]*\\]", "g"), ""))
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