import React from 'react';
import ErrorList from './ErrorList';

export default props => {
  const errors = props.validation.map(
    ({ func, msg }) => {
      if (!func(props.value)) return msg;
      return null;
    },
  ).filter(d => d);

  return (
    <div>
      <input
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        className={props.className}
        placeholder={props.name}
      />
      <ErrorList messages={errors} />
    </div>
  );
};
