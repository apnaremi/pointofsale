import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text} from '../../../components';
import {Formik} from 'formik';

import {useTranslation} from 'react-i18next';
import PinInput from './PinInput';
import {appLog} from '../../../utils/helpers';
import APPStyles from '../../../theme/styles';
import AppColors from '../../../theme/appColors';
import {Title} from 'react-native-paper';

type Props = {
  onSuccess: Function;
  onCancel?: Function;
  pinToConfirm?: string;
};

export default function PwsRecoveryView(props: Props) {
  const inputRef1 = React.createRef<any>();
  const inputRef2 = React.createRef<any>();
  const inputRef3 = React.createRef<any>();
  const inputRef4 = React.createRef<any>();

  const {t} = useTranslation();

  const validateForm = useCallback(values => {
    const errors = {} as any;
    let errorString = 'error';
    if (!values.input1) {
      errors.input1 = errorString;
    }
    if (!values.input2) {
      errors.input2 = errorString;
    }
    if (!values.input3) {
      errors.input3 = errorString;
    }
    if (!values.input4) {
      errors.input4 = errorString;
    }
    let pin = values.input1 + values.input2 + values.input3 + values.input4;
    if (props.pinToConfirm && props.pinToConfirm !== pin) {
      errors.input1 = errorString;
      errors.input2 = errorString;
      errors.input3 = errorString;
      errors.input4 = errorString;
    }

    return errors;
  }, []);

  //<editor-fold desc="Input1 CallBacks">
  const onSubmitInput1 = useCallback(() => {
    if (inputRef2.current) {
      inputRef2.current.focus();
    }
  }, [inputRef2]);

  const onChangeInput1 = useCallback(
    (setFieldValue: Function) => (event: any) => {
      appLog(event);

      setFieldValue('input1', event);
      if (event.length >= 1) {
        onSubmitInput1();
      }
    },
    [inputRef2],
  );
  //</editor-fold>

  //<editor-fold desc="Input2 CallBacks">
  const onSubmitInput2 = useCallback(() => {
    if (inputRef3.current) {
      inputRef3.current.focus();
    }
  }, [inputRef3]);

  const onChangeInput2 = useCallback(
    (setFieldValue: Function) => (event: any) => {
      setFieldValue('input2', event);
      if (event.length >= 1) {
        onSubmitInput2();
      }
    },
    [inputRef3],
  );
  //</editor-fold>

  //<editor-fold desc="Input3 CallBacks">
  const onSubmitInput3 = useCallback(() => {
    if (inputRef4.current) {
      inputRef4.current.focus();
    }
  }, [inputRef4]);

  const onChangeInput3 = useCallback(
    (setFieldValue: Function) => (event: any) => {
      setFieldValue('input3', event);
      if (event.length >= 1) {
        onSubmitInput3();
      }
    },
    [inputRef4],
  );
  //</editor-fold>

  const onSuccess = useCallback(values => {
    props.onSuccess(values);
  }, []);

  const onCancel = useCallback(() => {
    if (props.onCancel) {
      props.onCancel();
    }
  }, []);

  return (
    <View style={APPStyles.modalContainer}>
      <Title>{props.pinToConfirm ? t('confirmPIN') : t('enterPIN')}</Title>
      <Formik
        initialValues={{input1: '', input2: '', input3: '', input4: ''}}
        validate={validateForm}
        validateOnChange={true}
        onSubmit={onSuccess}>
        {({
          isValid,
          errors,
          handleChange,
          handleSubmit,
          values,
          setFieldValue,
          handleBlur,
        }) => (
          <View style={APPStyles.formContainer}>
            <View style={styles.textInputsContainer}>
              <PinInput
                onBlur={handleBlur('input1')}
                onChangeText={onChangeInput1(setFieldValue)}
                value={values.input1}
                returnKeyType="next"
                ref={inputRef1}
                placeholder={'\u2022'}
                keyboardType={'numeric'}
                invalidLabel={errors.input1}
                onSubmitEditing={onSubmitInput1}
              />
              <PinInput
                onBlur={handleBlur('input2')}
                onChangeText={onChangeInput2(setFieldValue)}
                value={values.input2}
                returnKeyType="next"
                ref={inputRef2}
                placeholder={'\u2022'}
                keyboardType={'numeric'}
                invalidLabel={errors.input2}
                onSubmitEditing={onSubmitInput2}
              />
              <PinInput
                onBlur={handleBlur('input3')}
                onChangeText={onChangeInput3(setFieldValue)}
                value={values.input3}
                returnKeyType="next"
                ref={inputRef3}
                placeholder={'\u2022'}
                keyboardType={'numeric'}
                invalidLabel={errors.input3}
                onSubmitEditing={onSubmitInput3}
              />
              <PinInput
                onBlur={handleBlur('input4')}
                onChangeText={handleChange('input4')}
                value={values.input4}
                returnKeyType="done"
                ref={inputRef4}
                placeholder={'\u2022'}
                keyboardType={'numeric'}
                invalidLabel={errors.input4}
                onSubmitEditing={handleSubmit}
              />
            </View>
            <Text style={styles.errorText}>
              {!isValid
                ? props.pinToConfirm
                  ? t('incorrectPIN')
                  : t('required_field')
                : ''}
            </Text>
            <Button
              color={
                !values.input1 ||
                !values.input2 ||
                !values.input3 ||
                !values.input4
                  ? AppColors.gray_normal
                  : AppColors.primary
              }
              mode={'contained'}
              onPress={handleSubmit}
              style={APPStyles.commonButton}>
              {props.pinToConfirm ? t('confirmPIN') : t('continue')}
            </Button>
            {props.onCancel ? (
              <Button
                mode={'contained'}
                onPress={onCancel}
                style={APPStyles.commonButton}>
                {t('cancel')}
              </Button>
            ) : null}
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  textInputsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  errorText: {
    marginHorizontal: 10,
    marginTop: -20,
    color: AppColors.event_warning_normal,
  },
});
