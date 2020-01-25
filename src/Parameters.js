import React from 'react';
import PropTypes from 'prop-types';
import Debug from 'debug';
const debug = new Debug("simple-swagger-ui:info");


const Field = (name, type, required) => {
    return(
        <input/>
    );
};

function Parameters({parameters, onSubmit}) {
    
    return (
        <div className="parameters">
            {parameters && (
                <table>
                    <tbody>
                        {parameters.map((parameter, idx)=> {
                            const {
                                name, required, type, format, description, minimum, maximum,
                                minItems, maxItems, uniqueItems, items
                            } = parameter;
                            return (
                                <tr>
                                    <td>
                                        {name}
                                        <div className="description">{description}</div>
                                    </td>
                                    <td><Field/></td>
                                    <td>{type}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
        </div>
    );
};


export default Parameters;


