import React from 'react';
import Spinner from './Spinner';

const create = (showOn, children) => ({ showOn, children });

export const Option = ({ showOn, children, component: C }) => create(showOn, C ? <C /> : children);

export const Error = props => {
  if (!props.returnAction) return create('error', <div className="alert alert-danger">{props.msg}</div>);

  const child = (
    <div>
      <div className="alert alert-danger">{props.msg}</div>
      {
        props.returnAction ? (
          <button className="btn btn-danger" onClick={props.returnAction}>
            {props.returnMessage ? props.returnMessage : 'Return'}
          </button>
        ) : ''
      }
    </div>
  );
  return create('error', child);
};

export const Success = props => {
  if (!props.returnAction) return create('success', <div className="alert alert-success">{props.msg}</div>);

  const child = (
    <div>
      <div className="alert alert-success">{props.msg}</div>
      <button className="btn btn-success" onClick={props.returnAction}>
        {props.returnMessage ? props.returnMessage : 'Return'}
      </button>
    </div>
  );
  return create('success', child);
};

export const Waiting = ({ children }) => {
  if (children) return create('waiting', children);

  const child = (
    <div>
      <h3>We are processing your request</h3>
      <Spinner />
    </div>
  );
  return create('waiting', child);
};

export const Default = ({ children }) => create('default', children);

export const Handler = props => {
  let toDisplay;
  props.children.forEach(child => {
    const { showOn, children } = child.type(child.props);
    if (showOn === props.status) toDisplay = children;
  });
  return toDisplay || '';
};

export const Hide = ({ HideOn, status, children }) => {
  if (Array.isArray(HideOn)) {
    if (HideOn.indexOf(status) > -1) return '';
    return children;
  }

  if (HideOn === status) return '';
  return children;
};

export const HideOnWaiting = ({ status, children }) => {
  if (status === 'waiting') return '';
  return children;
};
