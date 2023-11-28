import styled from 'styled-components/native';

import { Spacer } from './spacer';
import { Typography } from './typography';

export const PasswordInputBox = (props) => {
  return (
    <>
      <Wrapper>
        <PasswordInput
          autoFocus
          value={props.value}
          onChangeText={props.onChangeText}
          caretHidden
          keyboardType="number-pad"
          maxLength={4}
        />
        {[0, 1, 2, 3].map((item) => (
          <InputWrapper
            key={item}
            item={item}
            errorMessage={props.errorMessage}
          >
            {props.value.length > item && (
              <Circle errorMessage={props.errorMessage} />
            )}
          </InputWrapper>
        ))}
      </Wrapper>
      {props.errorMessage && (
        <>
          <Spacer space={12} />
          <ErrorWrapper>
            <Typography fontSize={12} color="red">
              {props.errorMessage}
            </Typography>
          </ErrorWrapper>
        </>
      )}
    </>
  );
};

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  padding-left: 24px;
  padding-right: 24px;
`;

const PasswordInput = styled.TextInput`
  position: absolute;
  width: 20px;
  height: 20px;
  opacity: 0;
`;

const InputWrapper = styled.View`
  flex: 1;
  height: 100px;
  justify-content: center;
  align-items: center;
  margin-right: ${(props) => (props.item !== 3 ? 12 : 0)}px;
  border-bottom-width: 2px;
  border-color: ${(props) => (props.errorMessage ? 'red' : 'black')};
`;

const Circle = styled.View`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: ${(props) => (props.errorMessage ? 'red' : 'black')};
`;

const ErrorWrapper = styled.View`
  flex-direction: row;
  padding-left: 24px;
  padding-right: 24px;
`;
