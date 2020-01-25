import React from 'react';
import PropTypes from 'prop-types';
import Request from './Request';
import Debug from 'debug';
const debug = new Debug("simple-swagger-ui:operations");


function Operation({
    host, basePath, schemes, parameters,
    path, method, summary, description, operationId, tags, produces, consumes, security
}) {
    debug("parameters: ", parameters);

    return (
        <div className="operation">
            <h3 className="">{summary}</h3>
            <div className="description">{description}</div>
            <div className="description">
                <span className="path">{operationId}</span>
                {tags && tags.map((tag, idx)=>(
                    <span className="tag" key={idx}>{tag}</span>
                ))}
            </div>
            <Request
                method={method}
                path={path}
                security={security}
                host={host}
                basePath={basePath}
                schemes={schemes}
                produces={produces}
                consumes={consumes}
                parameters={parameters}
            />
        </div>
    );
};


Operation.propTypes = {
    host: PropTypes.string.isRequired,
    basePath: PropTypes.string.isRequired,
    schemes: PropTypes.array.isRequired,

    path: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    operationId: PropTypes.string.isRequired,
    tags: PropTypes.array.isRequired,
    produces: PropTypes.array,
    consumes: PropTypes.array,
    security: PropTypes.object,
};

export default Operation;


