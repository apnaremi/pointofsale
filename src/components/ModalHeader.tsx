import * as React from 'react';
import {Text} from './index';
import {StyleSheet, View} from 'react-native';
import {scale} from 'react-native-size-matters';
import AppColors from '../theme/appColors';

export type IProps = {
  title: string;
};

//{'Dine in details'}

const ModalHeader = (props: IProps) => (
  <React.Fragment>
    <Text numberOfLines={1} style={styles.titleText}>
      {props.title}
    </Text>
    <View style={styles.lineView} />
  </React.Fragment>
);

const styles = StyleSheet.create({
  titleText: {
    fontSize: scale(10),
    color: AppColors.dark,
    fontWeight: 'bold',
    width: '80%',
    textAlign: 'left',
    marginBottom: 15,
  },
  lineView: {
    width: '100%',
    borderColor: AppColors.dark,
    borderBottomWidth: 1,
    opacity: 0.1,
  },
});

export default ModalHeader;
