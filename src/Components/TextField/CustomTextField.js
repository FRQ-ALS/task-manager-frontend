import React from "react";
import './TextField.css'

export default function CustomTextField(props){
    const classes = "textfield "+ props.variant


    return(
        <input onChange={props.onChange} type={props.type} className={classes}></input>
    )
}