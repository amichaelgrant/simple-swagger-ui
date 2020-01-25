import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Debug from 'debug';
const debug = new Debug("simple-swagger-ui:operations");



function Operations({operations, version, onClick}) {

    const[items, setItems] = useState(operations);

    const onClicked = (operation ) => {
        return ()=>{
            onClick(operation);
        };
    };

    const onSearch = (value) => {
        debug("search: ", value);
        const filtered = operations.filter(op=>{
            if(op.summary.includes(value) ||
            (op.description.includes(value)) || 
            (op.method.includes(value))) return op;
        });
        setItems(filtered);
    };

    debug("items: ", items);

    return (
        <div className="operations">
            <div className="header">
                <input className="input" placeholder="Type to search" 
                    onChange={(evt)=>{
                        onSearch(evt.target.value);
                    }}/>
                <div className="description">Swagger {version}</div>
            </div>
            <div className="content">
                {operations && (
                    <ul className="operation-list">
                        {operations.map((operation, index)=>{
                            const {method, path, summary, description, tags} = operation;
                            return(
                                <li key={index} className="operation-item" onClick={onClicked(operation)}>
                                    <div className="summary">{summary}</div>
                                    <div className="description">{description}</div>
                                    <div className="">
                                        <span className="method">{method}</span>
                                        <span className="path">{path}</span>
                                        {tags && (
                                            <span>
                                                {tags.map((tag, idx)=>(
                                                    <span className="tag" key={idx}>
                                                        {tag}
                                                    </span>
                                                ))}
                                            </span>
                                        )}
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </div>
    );
};



Operations.propTypes = {
    version: PropTypes.string,
    operations: PropTypes.array,
    onClick: PropTypes.func
};
  

export default Operations;


