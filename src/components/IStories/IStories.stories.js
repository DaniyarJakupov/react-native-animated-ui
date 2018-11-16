/* @flow */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { withKnobs } from '@storybook/addon-knobs';

import IStories from './IStories.v1';

const STORIES = [
  {
    id: '1',
    source: 'https://i.imgur.com/oxIaXP4.jpg',
    user: 'toronto'
  },
  {
    id: '2',
    source: 'https://i.imgur.com/3nVBeSr.jpg',
    user: 'nyc'
  },
  {
    id: '3',
    source: 'https://i.imgur.com/0hM4pMF.jpg',
    user: 'austin'
  }
];

/* IStories */
const IStoriesStory = storiesOf('IStories', module);
IStoriesStory.addDecorator(withKnobs);
IStoriesStory.add('default', () => {
  return <IStories stories={STORIES} />;
});

export default IStoriesStory;
