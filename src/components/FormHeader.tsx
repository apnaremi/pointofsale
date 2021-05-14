import React, {useCallback} from 'react';
import {Appbar, ToggleButton} from 'react-native-paper';
import * as navigationActions from '../navigation/actions';
import {StyleSheet, View} from 'react-native';
import AppColors from '../theme/appColors';
import APPMetrics from '../utils/metrics';

type Props = {
  title: string;
  onToggleSwitch: Function;
  switchValue: boolean;
  hideBackButton?: boolean;
};

function FormHeader(props: Props) {
  const onPressIcon = useCallback(() => {
    navigationActions.goBack();
  }, []);

  const onToggleSwitch = useCallback(() => {
    props.onToggleSwitch(!props.switchValue);
  }, []);

  return (
    <Appbar.Header dark={false} style={styles.headerContainer}>
      {!props.hideBackButton ? (
        <Appbar.BackAction size={35} onPress={onPressIcon} />
      ) : null}
      <Appbar.Content titleStyle={styles.title} title={props.title} />
      <View>
        <ToggleButton
          status={!props.switchValue ? 'unchecked' : 'checked'}
          size={35}
          onPress={onToggleSwitch}
          icon={props.switchValue ? 'pencil-box' : 'pencil-box-outline'}
        />
      </View>
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

export default React.memo(FormHeader);
