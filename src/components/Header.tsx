import React, {useCallback} from 'react';
import {Appbar, IconButton} from 'react-native-paper';
import * as navigationActions from '../navigation/actions';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import AppColors from '../theme/appColors';
import APPMetrics from '../utils/metrics';

type Props = {
  title?: string;
  onClose?: Function;
  style?: StyleProp<ViewStyle>;
  hideBackButton?: boolean;
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
      {!props.hideBackButton ? (
        <IconButton icon={'close'} size={35} onPress={onPressIcon} />
      ) : null}
      <Appbar.Content titleStyle={styles.title} title={props.title} />
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    backgroundColor: AppColors.transparent,
  },
  title: {
    fontSize: APPMetrics.titleFontSize,
  },
});

export default React.memo(Header);
