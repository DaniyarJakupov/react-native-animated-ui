/* @flow */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';

import CenterView from '../../../storybook/stories/CenterView';
import ActionButton from '.';

/* Button */
const ActionButtonStory = storiesOf('ActionButton', module);
ActionButtonStory.addDecorator(getStory => <CenterView>{getStory()}</CenterView>);
ActionButtonStory.addDecorator(withKnobs);
ActionButtonStory.add('default', () => {
  return <ActionButton text="Press" color="cornflowerblue" onPress={action('clicked-button')} />;
});

export default ActionButtonStory;
