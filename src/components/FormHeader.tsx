import React, {useCallback} from 'react';
import {Appbar, IconButton} from 'react-native-paper';
import * as navigationActions from '../navigation/actions';
import {StyleSheet, View} from 'react-native';
import AppColors from '../theme/appColors';
import APPMetrics from '../utils/metrics';

type Props = {
  title: string;
  onEditPressed: Function;
  isEditMode: boolean;
  hideBackButton?: boolean;
  hideEditButton?: boolean;
};

function FormHeader(props: Props) {
  const onPressIcon = useCallback(() => {
    navigationActions.goBack();
  }, []);

  const onEditPressed = useCallback(() => {
    props.onEditPressed(!props.isEditMode);
  }, []);

  return (
    <Appbar.Header dark={false} style={styles.headerContainer}>
      {!props.hideBackButton ? (
        <Appbar.BackAction
          size={APPMetrics.headerIconSize}
          onPress={onPressIcon}
        />
      ) : null}
      <Appbar.Content titleStyle={styles.title} title={props.title} />
      {!props.hideEditButton ? (
        <IconButton
          size={APPMetrics.headerIconSize}
          onPress={onEditPressed}
          icon={props.isEditMode ? 'pencil-off-outline' : 'pencil-outline'}
        />
      ) : null}
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
