import H5AudioPlayer from "react-h5-audio-player";
import 'react-h5-audio-player/lib/styles.css';
import {baseUrl, fetchUrl, Kind, white} from "./Singletons";
import sampleImg from "./SampleImg.png";
import {Navbar} from "./App";
import {useEffect, useState} from "react";
import parse from "html-react-parser";
import {useWorker} from "@koale/useworker";

const urlParams = new URLSearchParams(window.location.search);

let param = urlParams.get('play');

function Player() {

    const [info, setInfo] = useState({
        song_name: "正在加载……",
        album_name: "",
        artist: "",
        kind: null,
        lyric: ""
    });
    const [albumcover, setAlbumcover] = useState({data: null, isloading: true})

    useEffect(() => {

        async function f() {
            let infos = await (await fetch(baseUrl + "getSingle?id=" + param)).json()

            setInfo({
                ...info,
                lyric: (await (await fetch(baseUrl + "lyric", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: infos.song_name,
                        artist: infos.artist,
                        albumName: infos.album_name,
                    }),

                })).text()).replaceAll(new RegExp("\\[[^\\[\\]]*]", "g"), "").trim().replaceAll("\n", "<br>"),
                artist: infos.artist,
                kind: infos.kind,

                song_name: infos.song_name,
                album_name: infos.album_name
            })


            setAlbumcover({

                data: (await (await fetch(baseUrl + 'getSingle?albumcover=true&id=' + param)).json()).albumcover,
                isloading: false
            })

        }

        f()
    }, [])
    const cover = albumcover.isloading ? white : albumcover.data === null ? sampleImg : URL.createObjectURL(new Blob([Uint8Array.from(albumcover.data.data).buffer]));

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
                                 style={{
                                     margin: "auto",
                                     display: "flex",
                                     flexDirection: "column",
                                     maxHeight: "100%"
                                 }}>


                                <div style={{
                                    width: '100%',
                                    overflow: 'scroll',
                                    scrollbarWidth: 'none',
                                    borderRadius: ".5rem",
                                    borderColor: "gray",
                                    borderWidth: ".3px",
                                    borderStyle: "solid"
                                }} className={"bg-light p-5 "}>
                                    {
                                        parse(info.lyric)
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