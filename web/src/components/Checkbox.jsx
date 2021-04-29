import React, { useEffect } from "react";
import { Checkbox } from "antd";

export default function CheckBox({setAnnotatingImages, setSelectedResults, setCheckboxArray, checkboxArray, selectedResults, keyValue, val, index}) {

    const onChange = (e) => {
        const selectedValue = isNaN(parseInt(keyValue)) ? keyValue : val
        if (e.target.checked) {
            console.log("Checked: ", selectedValue)
            setSelectedResults([...selectedResults, selectedValue]);
            const newArr = [...checkboxArray]
            newArr[index] = true;
            console.log("New Arr: ", newArr);
            setCheckboxArray(newArr);
        } 
        if (!e.target.checked){
            console.log("Unchecked: ", selectedValue)
            setSelectedResults(selectedResults.filter(item => item !== selectedValue));
            const newArr = [...checkboxArray]
            newArr[index] = false;
            setCheckboxArray(newArr);
        }
    }

    useEffect(() => {
        console.log("Key: ", index);
        console.log(checkboxArray);
        setAnnotatingImages(false);
    }, [])

    return (
        <div style={{ marginBottom: 5 }}>
            <Checkbox 
                checked={checkboxArray[index]} 
                key={index} onChange={onChange}>
                    {isNaN(parseInt(keyValue)) ? keyValue : parseInt(keyValue) + 1} : {val} 
            </Checkbox>
        </div>
    );
}
