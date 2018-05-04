/* @flow */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { withKnobs } from '@storybook/addon-knobs';

import SwipeDeck from '.';

/* SwipeDeck */
const SwipeDeckStory = storiesOf('SwipeDeck', module);
SwipeDeckStory.addDecorator(withKnobs);
SwipeDeckStory.add('default', () => {
  return <SwipeDeck />;
});

export default SwipeDeckStory;
