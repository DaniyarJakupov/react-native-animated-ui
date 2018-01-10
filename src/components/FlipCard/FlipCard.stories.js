/* @flow */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';

import CenterView from '../../../storybook/stories/CenterView';
import FlipCard from '.';

/* FlipCard */
const FlipCardStory = storiesOf('FlipCard', module);
FlipCardStory.addDecorator(getStory => <CenterView>{getStory()}</CenterView>);
FlipCardStory.addDecorator(withKnobs);
FlipCardStory.add('default', () => {
  return (
    <FlipCard
      text="This is front side. To flip card, just press"
      backText="Looks good, doesn't it?"
      color="cornflowerblue"
      backColor="rebeccapurple"
      fontSize={20}
    />
  );
});

export default FlipCardStory;
