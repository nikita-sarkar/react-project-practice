import data from "./data";
import React, { useState } from 'react';
import "./styles.css";

export default function Accordion() {

    const [selected, setSelected] = useState(null);
    const [enableMultiSelection, setEnableMultiSelection] = useState(false);
    const [multiple, setMultiple] = useState([]);

    function handleSingleSelection(getCurrentId)
    {
        setSelected(getCurrentId === selected ? null : getCurrentId);
    }

    function handleMultiSelection(getCurrentId)
    {
        let copyMultiple = [...multiple];
        const findIndexCurrentId = copyMultiple.indexOf(getCurrentId);

        if(findIndexCurrentId == -1)
            copyMultiple.push(getCurrentId);
        else
            copyMultiple.splice(findIndexCurrentId,1);

        setMultiple(copyMultiple);
        console.log(copyMultiple);
    }


    return (
        <div className="wrapper">
            <button onClick={()=>setEnableMultiSelection(!enableMultiSelection)}>
                Enable Multi Selection
            </button>
            <div className="accordion">
                {
                        data && data.length > 0 ?
                        (data.map((dataItem) =>
                        (<div className="item">
                            <div onClick={enableMultiSelection ? 
                            ()=>handleMultiSelection(dataItem.id):
                            ()=>handleSingleSelection(dataItem.id)} className="title">
                                <div>
                                    <h3>{dataItem.question}</h3>
                                    <span>+</span>
                                </div>
                                {
                                enableMultiSelection ?
                            multiple.indexOf(dataItem.id) !== -1 && (<div className="content">{dataItem.answer}</div>)
                        : selected === dataItem.id && (<div className="content">{dataItem.answer}</div>)}
                            </div>
                        </div>)))
                        : (<div>No data found!</div>)}
            </div>
        </div>
    )
}
