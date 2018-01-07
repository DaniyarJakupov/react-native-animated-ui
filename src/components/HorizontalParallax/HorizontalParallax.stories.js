/* @flow */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { withKnobs } from '@storybook/addon-knobs';

import HorizontalParallax from '.';

const Images = [
  { image: 'https://i.imgur.com/qFZmyFD.jpg', title: 'Theater' },
  { image: 'https://i.imgur.com/sjFFcOF.jpg', title: 'Nature' },
  { image: 'https://i.imgur.com/m6Z5NAw.jpg', title: 'Bar' },
  { image: 'https://i.imgur.com/PY56L1n.jpg', title: 'Park' }
];

/* HorizontalParallax */
const HorizontalParallaxStory = storiesOf('HorizontalParallax', module);
HorizontalParallaxStory.addDecorator(withKnobs);
HorizontalParallaxStory.add('default', () => {
  return <HorizontalParallax images={Images} />;
});

export default HorizontalParallaxStory;
