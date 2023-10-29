import {View, Text, TextInput, TextInputProps} from 'react-native';
import React, {useRef} from 'react';
// import { TextInput } from 'react-native-gesture-handler'

const Input = (props: TextInputProps) => {
  let inputRef: React.RefObject<TextInput> | null = null;
  inputRef = useRef<TextInput>(null);

  return (
    <TextInput
      {...props}
      ref={props.refs || inputRef}
      onPressIn={() => {
        // if (props.refs) {
        //   props.refs.current.focus();
        // } else {
        //   inputRef.current.focus();
        // }
      }}
    />
  );
};

export default Input;
