import React, {useCallback} from 'react';
import {View} from 'react-native';
import {Button, FormInput} from '../../components';
import {Formik} from 'formik';
import {useTranslation} from 'react-i18next';
import APPStyles from '../../theme/styles';
import {EMAIL_PATTERN, USER_DEV} from '../../utils/constants';

type Props = {
  onSendResetMail: Function;
};

export default function PwsRecoveryView(props: Props) {
  const userNameRef = React.createRef<any>();

  const {t} = useTranslation();

  const onSubmitForm = useCallback((values, {setFieldError}) => {
    props.onSendResetMail(values, {setFieldError});
  }, []);

  const validateForm = useCallback(values => {
    const errors = {} as any;

    if (!values.userName) {
      errors.userName = t('enter_email');
    }

    if (values.userName && !EMAIL_PATTERN.test(values.userName)) {
      errors.userName = t('invalid_email');
    }

    return errors;
  }, []);

  return (
    <View style={APPStyles.viewContainer}>
      <Formik
        validate={validateForm}
        validateOnChange={true}
        initialValues={{
          userName: __DEV__ ? USER_DEV : '',
        }}
        onSubmit={onSubmitForm}>
        {({errors, handleBlur, handleChange, handleSubmit, values}) => (
          <View>
            <FormInput
              onChangeText={handleChange('userName')}
              onBlur={handleBlur('userName')}
              value={values.userName}
              keyboardType={'email-address'}
              placeholder={t('email')}
              returnKeyType="done"
              ref={userNameRef}
              onSubmitEditing={handleSubmit}
              invalidLabel={errors.userName}
              iconName={'envelope'}
            />
            <Button mode={'contained'} onPress={handleSubmit}>
              {t('forget_password')}
            </Button>
          </View>
        )}
      </Formik>
    </View>
  );
}
