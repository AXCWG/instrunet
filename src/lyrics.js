import {useWorker} from "@koale/useworker";
import {useState} from "react";

function Main(){
    const [worker] = useWorker(()=>{
        return "hi"
    })
    console.log(worker());
}

Main()

