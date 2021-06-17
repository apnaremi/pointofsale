import React, {useCallback, useRef} from 'react';
import {Keyboard, StyleSheet, View} from 'react-native';
import {Button, FormInput} from '../../../components';
import {Formik, FormikProps} from 'formik';
import {useTranslation} from 'react-i18next';
import APPStyles from '../../../theme/styles';

type Props = {
  onSubmitForm: Function;
  allowEdit: boolean;
};

export interface IPwsUpdate {
  password: string;
  confirmPassword: string;
}

export default function SeatingArrangementItem(props: Props) {
  const passwordRef = React.createRef<any>();
  const confirmPasswordRef = React.createRef<any>();
  const {t} = useTranslation();
  const formRef = useRef<FormikProps<IPwsUpdate>>(null);

  React.useEffect(() => {
    if (formRef.current) {
      formRef.current.resetForm();
    }
  }, [props.allowEdit]);

  const onSubmitPassword = useCallback(() => {
    if (confirmPasswordRef.current) {
      confirmPasswordRef.current.focus();
    }
  }, [confirmPasswordRef]);

  const validateForm = useCallback(values => {
    const errors = {} as any;

    if (!values.password) {
      errors.password = t('newPasswordEmpty');
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = t('confirmNewPasswordEmpty');
    }

    if (values.confirmPassword !== values.password) {
      errors.password = t('notMatchPassword');
      errors.confirmPassword = t('notMatchPassword');
    }

    return errors;
  }, []);

  const onSubmitForm = useCallback(values => {
    Keyboard.dismiss();
    props.onSubmitForm(values);
  }, []);

  return (
    <View style={APPStyles.viewContainerComplete}>
      <Formik
        innerRef={formRef}
        validate={validateForm}
        enableReinitialize={true}
        validateOnChange={true}
        initialValues={{password: '', confirmPassword: ''}}
        onSubmit={onSubmitForm}>
        {({errors, handleChange, handleBlur, handleSubmit, values}) => (
          <View>
            <FormInput
              onChangeText={handleChange('password')}
              onBlur={handleBlur('confirmPassword')}
              value={values.password}
              placeholder={t('new_password')}
              returnKeyType="next"
              ref={passwordRef}
              onSubmitEditing={onSubmitPassword}
              invalidLabel={errors.password}
              iconName={'note'}
              editable={props.allowEdit}
            />
            <FormInput
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
              placeholder={t('confirm_new_password')}
              returnKeyType="done"
              ref={confirmPasswordRef}
              onSubmitEditing={handleSubmit}
              invalidLabel={errors.confirmPassword}
              iconName={'layers'}
              editable={props.allowEdit}
            />

            <Button
              disabled={!props.allowEdit}
              mode={'contained'}
              onPress={handleSubmit}
              style={APPStyles.commonButton}>
              {t('save')}
            </Button>
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    marginTop: 24,
  },
});
