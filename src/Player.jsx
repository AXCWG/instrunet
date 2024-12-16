import H5AudioPlayer from "react-h5-audio-player";
import 'react-h5-audio-player/lib/styles.css';
import {baseUrl, fetchUrl, Kind} from "./Singletons";

const urlParams = new URLSearchParams(window.location.search);

let param = urlParams.get('play');
let fetchInfo =
    await fetch(baseUrl + "getSingle?id=" + param)
let info = urlParams.get('play') === null ? {} : await fetchInfo.json()

function Player() {
    console.log(info)
    return (
        <div style={{marginTop: "5rem"}} className={"container"}>
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