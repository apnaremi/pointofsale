import * as React from 'react';
import ChevronDown from '../assets/icons/ChevronDown.svg';
import {
  TouchableOpacity,
  Text,
  GestureResponderEvent,
  StyleSheet,
} from 'react-native';
import AppColors from '../theme/appColors';
import {scale} from 'react-native-size-matters';
export type IProps = {
  onPress: (event: GestureResponderEvent) => void;
  title: string;
};

export default function DropdownButton(props: IProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={props.onPress}
      style={styles.appButtonContainer}>
      <Text numberOfLines={1} style={styles.appButtonText}>
        {props.title}
      </Text>
      <ChevronDown width={scale(12)} height={scale(6)} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  appButtonContainer: {
    borderRadius: 3,
    paddingVertical: 10,
    marginVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: AppColors.gray_normal,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: scale(180),
  },
  appButtonText: {
    fontSize: scale(8),
    color: AppColors.gray_text,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
