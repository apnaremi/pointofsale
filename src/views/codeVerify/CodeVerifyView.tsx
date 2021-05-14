import React, {useCallback} from 'react';
import {View} from 'react-native';
import {Button, FormInput, Text} from '../../components';
import {Formik} from 'formik';
import {useTranslation} from 'react-i18next';
import APPStyles from '../../theme/styles';

type Props = {
  onSubmitForm: Function;
  onResendCode: Function;
};

export default function CodeVerifyView(props: Props) {
  const userNameRef = React.createRef<any>();

  const {t} = useTranslation();

  const onSubmitForm = useCallback((values, {setFieldError}) => {
    props.onSubmitForm(values, {setFieldError});
  }, []);

  const onResendCode = useCallback(() => {
    props.onResendCode();
  }, []);

  const validateForm = useCallback(values => {
    const errors = {} as any;

    if (!values.verifyCode) {
      errors.verifyCode = t('notEmptyVerifyCode');
    }

    return errors;
  }, []);

  return (
    <View style={APPStyles.viewContainer}>
      <Text>{t('requireVerificationCode')}</Text>
      <Formik
        validate={validateForm}
        validateOnChange={true}
        initialValues={{
          verifyCode: '',
        }}
        onSubmit={onSubmitForm}>
        {({errors, handleBlur, handleChange, handleSubmit, values}) => (
          <View>
            <FormInput
              onChangeText={handleChange('verifyCode')}
              onBlur={handleBlur('verifyCode')}
              value={values.verifyCode}
              keyboardType={'numeric'}
              placeholder={t('verifyCode').toUpperCase()}
              returnKeyType="done"
              ref={userNameRef}
              onSubmitEditing={handleSubmit}
              invalidLabel={errors.verifyCode}
              iconName={'key'}
            />
            <Button mode={'contained'} onPress={handleSubmit}>
              {t('verify')}
            </Button>
          </View>
        )}
      </Formik>
      <Button uppercase={false} onPress={onResendCode}>
        {t('resendQuestion')}
      </Button>
    </View>
  );
}
