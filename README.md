# react-native-animated-ui
Animated UI components for react-native

## Prerequisites
This library is bootstrapped with React Native CLI. You have to install CLI locally: [instructions](https://facebook.github.io/react-native/docs/getting-started.html#installing-dependencies).

## Usage
1. Install library from npm
```
yarn add react-native-animated-ui
```

2. Link native code for react-native-svg
```
react-native link react-native-svg
```
If you get an error `Command 'link' unrecognized`, delete node_modules folder and install dependencies again:
```
rm -rf node_modules
yarn
```

3. `react-native link` adds all targets to the ios target, we need to fix it:

    ![Guide](https://i.imgur.com/FqQIbew.png)

    * 4.1. Open .xcodeproj of your project in Xcode
    * 4.2. Click on your main project file (the one that represents the .xcodeproj) select Build Phases
    * 4.3. Remove the libRNSVG-tvOS.a file from Link Binary With Libraries under Build Phases.
    * 4.4. Don't close Xcode yet, go to `step 5`

4. Now you can import components & utils to your react-native app:
```javascript
import { Button, ActionButton } from '@citydropz/citydropz-ui';
```

## Props

| Prop              | Type       | Default | Note                                                                                                       |
| ----------------- | ---------- | ------- | ---------------------------------------------------------------------------------------------------------- |
| `explostion`       | `bool`     |    false     | Add explosion effect to the Button



## Credits

- 