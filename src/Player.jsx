import H5AudioPlayer from "react-h5-audio-player";
import 'react-h5-audio-player/lib/styles.css';
import {baseUrl, fetchUrl, Kind} from "./Singletons";
import sampleImg from "./SampleImg.png";

const urlParams = new URLSearchParams(window.location.search);

let param = urlParams.get('play');
let fetchInfo =
    await fetch(baseUrl + "getSingle?id=" + param)
let info = urlParams.get('play') === null ? {} : await fetchInfo.json()

function Player() {
    console.log(info)

    const cover = info.albumcover === null ? sampleImg : URL.createObjectURL(new Blob([Uint8Array.from(info.albumcover.data).buffer]));
    return (
        <div style={{marginTop: "5rem"}} className={"container"}>

            <div style={{
                borderWidth: ".5px",
                borderColor: "black",
                borderStyle: "solid",
                maxWidth: "500px",

                backgroundSize: "contain"
            }} className={"mb-3 mx-auto "}>
                <img src={cover} alt="cover" width="100%"/>
            </div>
            <H5AudioPlayer src={fetchUrl + param} autoplay="autoplay"
                           header={info.song_name + " - " + info.album_name + " - " + info.artist + " - " + Kind[info.kind]}></H5AudioPlayer>
            <button className={"btn btn-light w-100 mt-2 "}
                    style={{borderStyle: "solid", borderColor: "gray", borderWidth: "thin"}} onClick={() => {
                window.location.href = fetchUrl + param;
            }}>下载
            </button>
        </div>
    )
}

export default Player;