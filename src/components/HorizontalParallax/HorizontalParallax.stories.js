/* @flow */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { withKnobs } from '@storybook/addon-knobs';

import HorizontalParallax from '.';

/* HorizontalParallax */
const HorizontalParallaxStory = storiesOf('HorizontalParallax', module);

HorizontalParallaxStory.addDecorator(withKnobs);
HorizontalParallaxStory.add('', () => {
  return <HorizontalParallax />;
});

export default HorizontalParallaxStory;
