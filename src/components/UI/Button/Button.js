import React from 'react';

import classes from './Button.module.css';

const button = (props) => (
  <button 
    classes={[classes.Button, classes[props.btnType]].join(' ')}
    onclick={props.clicked}>{props.children}</button>
)

export default button;