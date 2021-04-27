import React, { useEffect } from "react";
import { Checkbox } from "antd";

export default function CheckBoxList(props) {
    const values = props.values;
    var arr = Object.keys(values).map((key) => [key, values[key]]);
    arr = arr.slice(0,5);
    const setAnnotatingImages = () => props.setAnnotatingImages;

    useEffect(() => {
        setAnnotatingImages(false);
    }, [])

    console.log(arr)
    return (
        <div>
            {arr.slice(0,5).map(function (d) {
                const key = d.toString().substring(0, d.toString().indexOf(",")).toUpperCase();
                const val = d.toString().substring(d.toString().indexOf(",") + 1);
                return ( 
                <div style={{marginBottom: 5}}>
                    <Checkbox>{isNaN(parseInt(key)) ? key: parseInt(key) + 1} : {val} </Checkbox>
                </div>
                )
            })}
        </div>
    );
}