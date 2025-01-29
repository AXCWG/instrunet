import {Navbar} from "./App";
import {useEffect, useState} from "react";
import {fetchUrl} from "./Singletons";
import Akkarin from './Assets/Transparent_Akkarin.png'

function Home() {
    const [loading, setLoading] = useState(true);
    const [login, setLogin] = useState({
        loggedIn: false,
        uuid: "",
        username: "",
        email: "",
    });
    const [avatar, setAvatar] = useState(null)

    useEffect(() => {
        async function f() {
            let res = await fetch(fetchUrl + "userapi", {
                credentials: "include",
            })
            setLoading(false)
            if (res.ok) {
                let json = await res.json();
                setLogin({
                    loggedIn: true,
                    uuid: json.uuid,
                    username: json.username,
                    email: json.email,
                })
            } else {
                window.location.href = "/login"

            }


        }

        f()

    }, [])
    useEffect(() => {
        async function f() {
            setAvatar(await (await fetch(fetchUrl + "avatar?uuid=" + login.uuid)).arrayBuffer())
        }

        if (login.loggedIn) {

            f()
        }
    }, [login]);
    return (<>
        <Navbar username={login.username} isFixed={false}/>
        <div className={"container mt-5"}>
            <div className={"row"}>
                <div className={"col-md-6"}>
                    <div style={{textAlign: "center", userSelect: "none"}} >
                        <img
                            className={" img-fluid rounded rounded-circle w-auto h-auto overflow-hidden  border-1 border-secondary-subtle border"}
                            src={avatar ? avatar.byteLength === 0 ? Akkarin : avatar : Akkarin}/>
                        <div className={"display-6 mt-3"}>{login.username}</div>
                        <div className={"mt-3"}>{login.email ? login.email : "未设置邮箱"}</div>

                    </div>


                </div>
                <div className={"col-md-6"}>

                </div>
            </div>
        </div>
    </>)
}

export default Home