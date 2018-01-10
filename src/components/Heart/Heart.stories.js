/* @flow */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';

import CenterView from '../../../storybook/stories/CenterView';
import Heart from '.';

/* Button */
const HeartStory = storiesOf('Heart', module);
HeartStory.addDecorator(getStory => <CenterView>{getStory()}</CenterView>);
HeartStory.addDecorator(withKnobs);
HeartStory.add('default', () => {
  return <Heart color="crimson" onPress={action('clicked-Heart')} />;
});

export default HeartStory;
