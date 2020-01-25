import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Debug from 'debug';
import Parameters from './Parameters';
const debug = new Debug("simple-swagger-ui:request");

function JSONStringify(o){
    return JSON.stringify(o, (key, value)=>{
        debug("key ", key, value);
        if(typeof value === 'object') return value;
        else return `${key} : ${value}`;
    }, 8);
};

function Request({
    host, method, path, basePath, schemes, security, produces, consumes, 
    requestInterceptor, responseInterceptor, parameters
}) {

    const[status, setStatus] = useState(null);
    const[scheme, setScheme] = useState(schemes && schemes[0]);
    const[body, setBody] = useState("");
    const[params, setParams] = useState({});
    const[contentType, setContentType] = useState(consumes && consumes[0]);
    const[acceptType, setAcceptType] = useState(produces && produces[0]);
    const[response, setResponse] = useState(null);
    const[error, setError] = useState(null);

    const onRequest = () => {
        const url = `${scheme}://${host}${basePath}${path}`;
        const req = {
            url,
            method,
            params,
            headers: {
                'User-Agent': 'simple-swagger-ui/1.0',
                'content-type': contentType,
                'accept': acceptType
            },
            timeout: 3000,
            withCredentials: true,
            responseType: "json"
        };
        if(body) req.data = body;
        if(requestInterceptor && 
            typeof requestInterceptor=== "function"){
            req.transformRequest = requestInterceptor;
        };
        if(responseInterceptor && 
            typeof responseInterceptor === "function"){
            req.transformResponse = responseInterceptor;
        };
        console.log("req: ", req);
        axios(req)
        .then((response)=>{
            debug("response", response);
            setResponse(response);
        })
        .catch((error)=>{
            setError(error);
        });
    };

    const onChanged = (name, required) => {
        return(evt)=>{
            params[name] = evt.target.value;
            debug("onChanged: ", name, evt.target.value);
            setParams(params);
        };
    };

    const processResponse = (response) => {
        return JSON.stringify(response);
    };
    
    return (
        <div className="request">
            <ul className="request-inline">
                <li>
                    <span className="method">{method}</span>
                </li>
                <li>
                    <span className="path">{path}</span>
                </li>
                {status && (
                    <li>
                        <span className="status">{status}</span>
                    </li>
                )}
                {consumes && consumes.length && (
                    <li>
                        <select 
                            onChange={(evt)=>{
                                setContentType(evt.target.value)
                            }}>
                            {consumes.map((consume, idx)=>(
                                <option value={consume} key={idx}>
                                    {consume}
                                </option>
                            ))}
                        </select>
                    </li>
                )}
                <li>
                    <button onClick={(onRequest)}>
                        Run
                    </button>
                </li>
            </ul>
            <div className="request-content">
                <Parameters parameters={parameters}/>
            </div>
            <div className="response-error">
                {JSONStringify(error)}          
            </div>
            <div className="response-content">
                {processResponse(response)}          
            </div>
        </div>
    );
};


// Request.propTypes = {
//   host: PropTypes.string,
//   basePath: PropTypes.string,
//   schemes: PropTypes.array,
// };

export default Request;


