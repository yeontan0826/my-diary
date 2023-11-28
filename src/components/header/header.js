import React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import { Spacer } from '../spacer';
import { HeaderTitle } from './headerTitle';
import { HeaderIcon } from './headerIcon';
import { HeaderGroup } from './headerGroup';

export const Header = (props) => {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  return (
    <View style={{ paddingTop: insets.top }}>
      <HeaderContainer width={width}>
        <Spacer horizontal={true} space={12} />
        <Container
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          {props.children}
        </Container>
        <Spacer horizontal={true} space={12} />
      </HeaderContainer>
    </View>
  );
};

Header.Title = HeaderTitle;
Header.Icon = HeaderIcon;
Header.Group = HeaderGroup;

const HeaderContainer = styled.View`
  width: ${(props) => props.width}px;
  height: 56px;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: gray;
`;

const Container = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;
