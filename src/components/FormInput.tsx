import React from 'react';
import AppColors from '../theme/appColors';
import {StyleSheet, View} from 'react-native';
import {HelperText} from 'react-native-paper';
import {TextInput} from 'react-native';
// @ts-ignore
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import APPMetrics from '../utils/metrics';

const FormInput = React.memo(
  React.forwardRef(
    (
      inputProps: React.ComponentProps<typeof TextInput> & {
        invalidLabel?: string;
        prefix?: string;
        iconName?: string;
        helpLabel?: string;
        label?: string;
        isNumber?: boolean;
        hideWarning?: boolean;
      },
      ref?: React.Ref<any>,
    ) => {
      return (
        <View>
          <View
            style={
              inputProps.invalidLabel
                ? styles.inputContainerError
                : styles.inputContainerNormal
            }>
            <SimpleLineIcons
              // @ts-ignore
              name={inputProps.iconName}
              size={24}
              color={
                inputProps.editable
                  ? AppColors.secondary
                  : AppColors.gray_normal
              }
            />
            <TextInput
              ref={ref}
              // underlineColor={AppColors.gray_normal}
              // theme={{colors: {background: AppColors.transparent}}}
              style={styles.textInput}
              // error={!!inputProps.invalidLabel}
              placeholderTextColor={AppColors.gray_normal}
              {...inputProps}
            />
          </View>
          <HelperText
            style={styles.errorText}
            type="error"
            visible={!!inputProps.invalidLabel}>
            {inputProps.invalidLabel
              ? !inputProps.hideWarning
                ? inputProps.invalidLabel
                : ''
              : inputProps.helpLabel}
          </HelperText>
        </View>
      );
    },
  ),
);

const styles = StyleSheet.create({
  errorText: {
    marginRight: -10,
    marginTop: -2,
    textAlign: 'right',
    fontSize: APPMetrics.smallFontSize,
  },

  inputContainerError: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: AppColors.event_warning_normal,
    flexDirection: 'row',
  },
  inputContainerNormal: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: AppColors.gray_normal,
    flexDirection: 'row',
  },
  textInput: {flex: 1, marginLeft: 20, fontSize: APPMetrics.normalFontSize},
});

export default FormInput;
