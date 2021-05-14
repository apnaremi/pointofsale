import React from 'react';
import {StyleSheet, View} from 'react-native';
import AppColors from '../theme/appColors';
import {Text} from './index';

function Divider(props: {title: string}) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.fill}>{props.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: AppColors.divider,
    flexDirection: 'row',
    alignItems: 'center',
  },
  fill: {
    flex: 1,
    color: AppColors.primary,
  },
});

export default React.memo(Divider);
