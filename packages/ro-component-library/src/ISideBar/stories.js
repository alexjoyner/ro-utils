import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { ISideBar } from '.';
import { AnimatedSideBar } from '../SideBar/models/classic';
import { HeaderSideBarPageBody } from '../SideBar/models/classic/SideBarPageBody';
import { Button } from '../Button';
import { ISideBarReducer } from './reducer';
import { ISideBarToggle } from './ISideBarToggle';
import { Header } from '../Header';

const TestToggleBtn = props => (
  <Button color="primary" {...props}>Toggle Side Bar</Button>
);
const SideBarBody = props => (
  <div>
    <Header color="dark">
      <ISideBarToggle Button={TestToggleBtn} />
    </Header>
    <HeaderSideBarPageBody {...props}>
      <h1>Test Header Sidebar Story</h1>
    </HeaderSideBarPageBody>
  </div>
);
const store = createStore(combineReducers({
  ISideBarReducer,
}));

storiesOf('Depreciated', module)
  .add('ISidebar', () => (
    <Provider store={store}>
      <ISideBar {...{
        SideBar: AnimatedSideBar,
        Body: SideBarBody,
      }}
      />
    </Provider>
  ));