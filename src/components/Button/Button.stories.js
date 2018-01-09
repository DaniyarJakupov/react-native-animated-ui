/* @flow */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';

import CenterView from '../../../storybook/stories/CenterView';
import Button from '.';

/* Button */
const ButtonStory = storiesOf('Button', module);
ButtonStory.addDecorator(getStory => <CenterView>{getStory()}</CenterView>);
ButtonStory.addDecorator(withKnobs);
ButtonStory.add('default', () => {
  return <Button text="Press" color="cornflowerblue" onPress={action('clicked-button')} />;
});

export default ButtonStory;
