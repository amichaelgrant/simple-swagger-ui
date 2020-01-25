import React from 'react';
import PropTypes from 'prop-types';
import Debug from 'debug';
const debug = new Debug("simple-swagger-ui:info");


function Info({title, description, version, host, basePath, schemes, contact, license}) {

  return (
    <div className="info">
      <h1 className="title">{title}<span className="version">{version}</span></h1>
      <code className="baseUrl">[ Base URL: {host}{basePath} ]</code>
      <div className="description">{description}</div>
      <div className="schemes">
        {schemes && schemes.map((scheme, idx)=>(
          <span className="tag" key={idx}>{scheme}</span>
        ))}
      </div>
      <div className="contact">{contact && contact.email}</div>
      <div className="license">
        <a href={license && license.url}>{license && license.name}</a>
      </div>
    </div>
  );
};


Info.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  version: PropTypes.string,
  host: PropTypes.string,
  basePath: PropTypes.string,
  schemes: PropTypes.array,
  contact: PropTypes.object,
  license: PropTypes.object
};

export default Info;


