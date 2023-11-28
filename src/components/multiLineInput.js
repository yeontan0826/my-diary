import { useState } from 'react';
import { TextInput } from 'react-native';
import styled from 'styled-components/native';

export const MultiLineInput = (props) => {
  const [focused, setFocused] = useState(false);

  return (
    <InputWrapper focused={focused}>
      <TextInput
        style={[
          props.style,
          { fontSize: props.fontSize ?? 20, height: props.height ?? 200 },
        ]}
        autoCorrect={false}
        autoCapitalize="none"
        multiline
        value={props.value}
        onChangeText={props.onChangeText}
        placeholder={props.placeholder}
        onFocus={() => {
          setFocused(true);
        }}
        onBlur={() => {
          setFocused(false);
        }}
        onSubmitEditing={props.onSubmitEditing}
      />
    </InputWrapper>
  );
};

const InputWrapper = styled.View`
  align-self: stretch;
  padding: 8px 12px;
  border-radius: 4px;
  border-width: 1px;
  border-color: ${(props) => (props.focused ? 'black' : 'gray')};
`;
