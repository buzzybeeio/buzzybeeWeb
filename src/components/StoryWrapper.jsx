import React from 'react';

export default ({ component }) => (typeof component === 'string' ? <div dangerouslySetInnerHTML={{ __html: component }} className="story-wrapper"></div> : <div className="story-wrapper">{component}</div>);
