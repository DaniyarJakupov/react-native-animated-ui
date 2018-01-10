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
      text="Front"
      backText="Back"
      color="cornflowerblue"
      backColor="rebeccapurple"
    />
  );
});

export default FlipCardStory;
