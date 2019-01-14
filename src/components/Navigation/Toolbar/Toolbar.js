import React from 'react';

import Logo from '../../Logo/Logo';
import classes from './Toolbar.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <div>MENU</div>
    <div className={classes.Logo}>
      <Logo />
      {/* <Logo height="80%" /> */}
    </div>
    <NavigationItems>
      ...
    </NavigationItems>
  </header>
);

export default toolbar;