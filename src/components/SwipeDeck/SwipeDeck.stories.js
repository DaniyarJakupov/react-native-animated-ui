/* @flow */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { withKnobs } from '@storybook/addon-knobs';

import SwipeDeck from '.';

const DATA = [
  { id: '1', uri: 'https://i.imgur.com/qFZmyFD.jpg' },
  { id: '2', uri: 'https://i.imgur.com/sjFFcOF.jpg' },
  { id: '3', uri: 'https://i.imgur.com/m6Z5NAw.jpg' },
  { id: '4', uri: 'https://i.imgur.com/PY56L1n.jpg' }
];

/* SwipeDeck */
const SwipeDeckStory = storiesOf('SwipeDeck', module);
SwipeDeckStory.addDecorator(withKnobs);
SwipeDeckStory.add('default', () => {
  return <SwipeDeck data={DATA} />;
});

export default SwipeDeckStory;
