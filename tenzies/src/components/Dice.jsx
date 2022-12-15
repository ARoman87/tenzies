import React from "react"

export default function Dice(props) {
    return (
        <div className="dice" style={{backgroundColor: props.styles && "#59E391"}} onClick={props.handleClick}>
            {props.value}
        </div>
    )
}