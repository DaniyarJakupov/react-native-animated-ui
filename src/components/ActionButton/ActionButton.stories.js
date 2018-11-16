/* @flow */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';

import CenterView from '../../../storybook/stories/CenterView';
import ActionButton from './ActionButton';
// import HorizontalFAB from './HorizontalFAB';

/* Button */
const ActionButtonStory = storiesOf('ActionButton', module);
ActionButtonStory.addDecorator(getStory => <CenterView>{getStory()}</CenterView>);
ActionButtonStory.addDecorator(withKnobs);
ActionButtonStory.add('default', () => {
  return (
    <ActionButton color="rgb(24,214,255)" fabColor="#9439FF" onPress={action('clicked-button')} />
    // <HorizontalFAB />
  );
});

export default ActionButtonStory;
