import React, { useEffect } from "react";
import { Checkbox } from "antd";

export default function CheckBox(props) {
    const setAnnotatingImages = props.setAnnotatingImages;
    const setSelectedResults = props.setSelectedResults;
    const setCheckboxArray = props.setCheckboxArray;
    const checkboxArray = props.checkboxArray;
    const selectedResults = props.selectedResults;
    const keyValue = props.keyValue;
    const val = props.val;
    const key = props.key;

    const onChange = (e) => {
        const selectedValue = isNaN(parseInt(keyValue)) ? keyValue : val
        if (e.target.checked) {
            console.log("Checked: ", selectedValue)
            setSelectedResults([...selectedResults, selectedValue]);
            const newArr = [...checkboxArray]
            checkboxArray[key] = true;
            setCheckboxArray(newArr);
        } 
        if (!e.target.checked){
            console.log("Unchecked: ", selectedValue)
            setSelectedResults(selectedResults.filter(item => item !== selectedValue));
            const newArr = [...checkboxArray]
            checkboxArray[key] = false;

            setCheckboxArray(newArr);
        }
    }

    useEffect(() => {
        console.log("Key: ", key);
        setAnnotatingImages(false);
    }, [])

    return (
        <div style={{ marginBottom: 5 }}>
            <Checkbox checked={checkboxArray[key]} key={key} onChange={onChange}>{isNaN(parseInt(keyValue)) ? keyValue : parseInt(keyValue) + 1} : {val} </Checkbox>
        </div>
    );
}
