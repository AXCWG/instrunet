function Register() {
    return <>
        <div className={"container mt-5"}>
            <div className={"row"}>

                <div className={"col-2"}></div>
                <div className={"col-8"}>
                    <div className={"h5"}>伴奏网</div>
                    <div className={"display-2"}>注册</div>
                    <form>
                        <input className={"form-control mt-4 "} type={"email"} placeholder={"邮箱（可选）"}></input>
                        <input className={"form-control mt-4"} type={"text"} placeholder={"用户名"}
                               required={true}></input>
                        <input className={"form-control mt-4"} placeholder={"密码"} type={"password"}
                               required={true}></input>
                        <input className={"form-control mt-4"} placeholder={"确认密码"} type={"password"}
                               required={true}></input>
                        <button className={"btn btn-primary mt-4 w-100"}>注册</button>

                    </form>


                </div>

                <div className={"col-2"}></div>
            </div>

        </div>

    </>
}

export default Register;