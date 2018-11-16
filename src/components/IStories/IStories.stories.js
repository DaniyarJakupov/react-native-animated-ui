/* @flow */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { withKnobs } from '@storybook/addon-knobs';

import IStories from './IStories.v1';
import IStoriesV2 from './IStories.v2';
import IStoriesV3 from './IStories.v3';

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
IStoriesStory.add('Version 1', () => {
  return <IStories stories={STORIES} />;
});
IStoriesStory.add('Version 2', () => {
  return <IStoriesV2 stories={STORIES} />;
});
IStoriesStory.add('Version 3', () => {
  return <IStoriesV3 stories={STORIES} />;
});

export default IStoriesStory;
