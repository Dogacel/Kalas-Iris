import React, { useEffect } from "react";
import { Checkbox } from "antd";

export default function CheckBox(props) {
    const setAnnotatingImages = () => props.setAnnotatingImages;
    const setSelectedResults = () => props.setSelectedResults;
    const keyValue = props.keyValue;
    const val = props.val;

    const onChange = (e) => {
        if (e.target.checked) {
            const selectedValue = isNaN(parseInt(keyValue)) ? keyValue : val
            console.log("SelectedValue: ", selectedValue)
            isNaN(parseInt(keyValue)) ? setSelectedResults(state => [...state, selectedValue]) : setSelectedResults(state => [...state, selectedValue])
        }
    }

    useEffect(() => {
        setAnnotatingImages(false);
    }, [])

    return (
        <div style={{ marginBottom: 5 }}>
            <Checkbox onChange={onChange}>{isNaN(parseInt(keyValue)) ? keyValue : parseInt(keyValue) + 1} : {val} </Checkbox>
        </div>
    );
}