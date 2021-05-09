import React, {useCallback} from 'react';
import {Appbar, IconButton, Text} from 'react-native-paper';
import * as navigationActions from '../navigation/actions';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import AppColors from '../theme/appColors';

type Props = {
  title?: string;
  onClose?: Function;
  style?: StyleProp<ViewStyle>;
  showBackIcon?: boolean;
};

function Header(props: Props) {
  const onPressIcon = useCallback(() => {
    if (props.onClose) {
      props.onClose();
    } else {
      navigationActions.goBack();
    }
  }, []);

  return (
    <Appbar.Header
      dark={false}
      style={props.style ? props.style : styles.headerContainer}>
      <IconButton icon={'close'} size={35} onPress={onPressIcon} />
      <Text style={styles.title}>{props.title}</Text>
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: AppColors.transparent,
  },

  title: {fontSize: 30, letterSpacing: -0.7, marginLeft: 20},
});

export default React.memo(Header);
