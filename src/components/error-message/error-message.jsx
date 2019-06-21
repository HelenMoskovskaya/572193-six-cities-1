import React from 'react';


const ErrorMessage = (props) => {
  const {} = props;
  return <div style={{color: `#ff9000`, fontSize: `25px`}}>
    <p>Ooops... Something went wrong (: </p>
    <p>Please, try again later</p>
  </div>;
};

export default ErrorMessage;

