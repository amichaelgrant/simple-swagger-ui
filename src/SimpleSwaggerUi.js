import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Debug from 'debug';
import Operations from './Operations';
import Operation from './Operation';
import Info from './Info';
import './SimpleSwaggerUi.css';
const debug = new Debug("simple-swagger-ui:index");

localStorage.Debug = localStorage.debug = localStorage.DEBUG = "simple-swagger-ui:*";

function SimpleSwaggerUi({dom_id, spec, url}) {

    const[specData, setSpecData] = useState({});
    const[selectedOperation, setSelectedOperation] = useState(null);

    useEffect(()=>{
        if(url){
            axios.get(url)
            .then((response)=>{
                console.log("response: ", response);
                setSpecData(response.data);
            });
        }else if(spec){
            setSpecData(spec);
        };
    }, [0]);

    const{
        basePath, definitions, externalDocs, host, info, paths, schemes, securityDefinitions, swagger, tags,
    } = specData;
    const{title, description, version, contact, license} = info || {};
    

    const operations = [];
    if(paths){
        Object.keys(paths).forEach((path)=>{
            // console.log("path: ", path, paths[path]);
            Object.keys(paths[path]).forEach(method=>{
                operations.push({method, path, ...(paths[path][method])});
            });
        });
    };
    console.log("selectedOperation: ", selectedOperation);
    console.log("operations: ", operations);

    return (
        <div className="simple-swagger-ui">
        <div className="columns">
            <div className="lister">
                <Operations 
                    version={version}
                    operations={operations}
                    onClick={(operation)=>{
                        setSelectedOperation(operation);
                    }}
                />
            </div>
            <div className="viewer">
                <Info
                    title={title}
                    description={description}
                    version={version}
                    contact={contact}
                    license={license}
                    basePath={basePath}
                    schemes={schemes}
                    host={host}
                />
                {selectedOperation && (
                    <Operation 
                        {...selectedOperation}
                        host={host}
                        basePath={basePath}
                        schemes={schemes}
                    />
                )}
            </div>
        </div>
        </div>
    );
};

SimpleSwaggerUi.propTypes = {
    dom_id: PropTypes.string.isRequired,
    spec: PropTypes.object.isRequired,
    url: PropTypes.string.isRequired,
    requestInterceptor: PropTypes.func,
    responseInterceptor: PropTypes.func,
};

export default SimpleSwaggerUi;
