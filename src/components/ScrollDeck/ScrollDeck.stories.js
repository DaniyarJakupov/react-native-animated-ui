/* @flow */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { withKnobs } from '@storybook/addon-knobs';

import ScrollDeck from '.';

const DATA = [
  {
    name: 'OnePlus 6T',
    color: '#a9d0b6',
    price: '550 Euro'
  },
  {
    name: 'LG V40',
    color: '#e9bbd1',
    price: '600 Euro'
  },
  {
    name: 'Pixel 3XL',
    color: '#eba65c',
    price: '900 Euro'
  },
  {
    name: 'Note 9',
    color: '#95c3e4',
    price: '750 Eoru'
  },
  {
    name: 'Pixel 3',
    color: '#1c1c1c',
    price: '700 Euro'
  },
  {
    name: 'Galaxy S9',
    color: '#a390bc',
    price: '600 Euro'
  }
];

/* ScrollDeck */
const ScrollDeckStory = storiesOf('ScrollDeck', module);
ScrollDeckStory.addDecorator(withKnobs);
ScrollDeckStory.add('default', () => {
  return <ScrollDeck cards={DATA} />;
});

export default ScrollDeckStory;
