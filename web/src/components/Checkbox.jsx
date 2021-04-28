import React, { useEffect } from "react";
import { Checkbox } from "antd";

export default function CheckBox(props) {
    const setAnnotatingImages = props.setAnnotatingImages;
    const setSelectedResults = props.setSelectedResults;
    const selectedResults = props.selectedResults;
    const keyValue = props.keyValue;
    const val = props.val;

    const onChange = (e) => {
        const selectedValue = isNaN(parseInt(keyValue)) ? keyValue : val
        if (e.target.checked) {
            console.log("Checked: ", selectedValue)
            setSelectedResults([...selectedResults, selectedValue]);
        } 
        if (!e.target.checked){
            console.log("Unchecked: ", selectedValue)
            setSelectedResults(selectedResults.filter(item => item !== selectedValue));
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