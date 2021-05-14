import React, {useCallback} from 'react';
import {Appbar, ToggleButton} from 'react-native-paper';
import * as navigationActions from '../navigation/actions';
import {StyleSheet, View} from 'react-native';
import AppColors from '../theme/appColors';

type Props = {
  title: string;
  onToggleSwitch: Function;
  switchValue: boolean;
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
      <Appbar.BackAction size={35} onPress={onPressIcon} />
      <Appbar.Content
        style={styles.content}
        titleStyle={styles.title}
        title={props.title}
      />
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
  content: {alignItems: 'center'},
  title: {
    fontSize: 30,
  },
});

export default React.memo(FormHeader);
