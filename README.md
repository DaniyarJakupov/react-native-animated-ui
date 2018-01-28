# react-native-animated-ui
Animated UI components for react-native

## Get Started

### Installation
1. Install library from npm
```
yarn add react-native-animated-ui
```

2. Link native code 
```
react-native link 
```

### Usage

Start using the components by importing them
```javascript
import { Button, ActionButton } from '@citydropz/citydropz-ui';

<Button />

```


## Components included:

- [x] ActionButton

![ActionButton](https://media.giphy.com/media/xThta0poHUdGihBCbm/giphy.gif)

| Prop              | Type       | Default | Note                                                                                                       |
| ----------------- | ---------- | ------- | ---------------------------------------------------------------------------------------------------------- |
| `text`       | `string`     |         | 
| `color`       | `string`     |         | 
| `onPress`       | `function`     |         | 


- [x] Button
![Button](https://media.giphy.com/media/xThta8fIVfwiTNa3eM/giphy.gif)

| Prop              | Type       | Default | Note                                                                                                       |
| ----------------- | ---------- | ------- | ---------------------------------------------------------------------------------------------------------- |
| `text`       | `string`     |    `Press`     | 
| `color`       | `string`     |    `#333`     | 
| `onPress`       | `function`     |         | 

- [x] FlipCard
![FlipCard](https://media.giphy.com/media/26DNf5QfRsmnHaP96/giphy.gif)

| Prop              | Type       | Default | Note                                                                                                       |
| ----------------- | ---------- | ------- | ---------------------------------------------------------------------------------------------------------- |
| `text`       | `string`     |       | 
| `backText`       | `string`     |       | 
| `fontSize`       | `number`     |   20    | 
| `color`       | `string`     |    `cornflowerblue`     | 
| `backColor`       | `string`     |    `rebeccapurple`     | 

- [x] Heart
![Heart](https://media.giphy.com/media/l4pTsjrBklIE3iZAQ/giphy.gif)

| Prop              | Type       | Default | Note                                                                                                       |
| ----------------- | ---------- | ------- | ---------------------------------------------------------------------------------------------------------- |
| `explostion`       | `boolean`     |  `false`       | 
| `color`       | `string`     |      `crimson`   | 
| `onPress`       | `function`     |         | 


- [x] Icon

![Icon](https://media.giphy.com/media/l4pTf2pUrxEpb78kM/giphy.gif)

| Prop              | Type       | Default | Note                                                                                                       |
| ----------------- | ---------- | ------- | ---------------------------------------------------------------------------------------------------------- |
| `size`       | `number`     |  `30`       | 
| `color`       | `string`     |      `cornflowerblue`   | 
| `svgPath`       | `string`     |    `M44,19.7c0.1,8-7.1,10.7-11.7,14.1c-4.2,3.1-7.8,7.4-8.3,9.2c-0.5-1.8-3.8-6-8.3-9.1C11,30.7,3.9,27.7,4,19.8C4.1,5.3,18.8,2.4,24,14.9C29.2,2.5,43.9,5.2,44,19.7z`     | 
| `viewBox`       | `string`     |     `0 0 48 48`    | 
| `onPress`       | `function`     |         | 


- [x] HorizontalParallax

![HorizontalParallax](https://media.giphy.com/media/xThtaxiq4lBlCN5TC8/giphy.gif)

| Prop              | Type       | Default | Note                                                                                                       |
| ----------------- | ---------- | ------- | ---------------------------------------------------------------------------------------------------------- |
| `images`       | ` Array<{ image: string, title: string }>`     |        | 

## Credits

- [Jason Brown](https://egghead.io/instructors/jason-brown-20a6bf03-254a-428c-9984-dca76cc84f32) 
