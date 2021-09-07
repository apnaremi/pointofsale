import React from 'react';
import AppColors from '../theme/appColors';
import {StyleSheet, View} from 'react-native';
import {HelperText} from 'react-native-paper';
import {TextInput} from 'react-native';
// @ts-ignore
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import APPMetrics from '../utils/metrics';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';

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
        <View style={{margin: scale(5)}}>
          <View
            style={
              inputProps.invalidLabel
                ? styles.inputContainerError
                : styles.inputContainerNormal
            }>
            <SimpleLineIcons
              // @ts-ignore
              name={inputProps.iconName}
              size={scale(12)}
              color={
                inputProps.editable
                  ? AppColors.secondary
                  : AppColors.gray_normal
              }
            />
            <TextInput
              disableFullscreenUI={true}
              ref={ref}
              // underlineColor={AppColors.gray_normal}
              // theme={{colors: {background: AppColors.transparent}}}
              style={styles.textInput}
              // error={!!inputProps.invalidLabel}
              placeholderTextColor={AppColors.gray_normal}
              {...inputProps}
            />
          </View>
          {inputProps.invalidLabel ? (
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
          ) : null}
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
    borderWidth: 1,
    borderRadius: 5,
    borderColor: AppColors.event_warning_normal,
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  inputContainerNormal: {
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: AppColors.gray_normal,
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  textInput: {
    flex: 1,
    marginLeft: scale(10),
    fontSize: APPMetrics.normalFontSize,
    padding: scale(2),
  },
});

export default FormInput;
