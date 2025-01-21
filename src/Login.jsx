function Login(){
    return (
        <>
            <div className={"container mt-5"}>
                <div className={"row"}>

                    <div className={"col-2"}></div>
                    <div className={"col-8"}>
                        <div className={"h5"}>伴奏网</div>
                        <div className={"display-2"}>登录</div>
                        <input className={"form-control mt-4"} placeholder={"用户名"}></input>
                        <input className={"form-control mt-4"} placeholder={"密码"} type={"password"}></input>
                        <button className={"btn btn-primary mt-4 w-100"}>登录</button>
                    </div>

                    <div className={"col-2"}></div>
                </div>

            </div>

        </>
    )
}

export default Login;