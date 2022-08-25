import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import * as baseStyle from 'utils/styles';

const styles = StyleSheet.create({
  header: baseStyle.header,
  headerText: baseStyle.headerText,
});

interface HeaderProps {
  readonly content: string;
}

export const Header: React.FC<HeaderProps> = (props) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{props.content}</Text>
    </View>
  );
};
