import {Dimensions} from 'react-native';

function makeId(length) {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

function responsiveFontSize(numbers = 1) {
  // let defaultWidth = 400;
  let defaultWidth = 200;
  let thisDimensions = Dimensions.get('window').width;
  if (thisDimensions >= defaultWidth) {
    return numbers;
  }

  let calculate = (thisDimensions / defaultWidth) * 100;
  return (numbers * calculate) / 100;
}

export {makeId, responsiveFontSize};
