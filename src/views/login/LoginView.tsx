import React, {useCallback, useEffect} from 'react';
import {Keyboard, View} from 'react-native';
import {Button, PasswordInput, FormInput} from '../../components';
import {Formik} from 'formik';
import {useTranslation} from 'react-i18next';
import APPStyles from '../../theme/styles';
import {EMAIL_PATTERN, USER_DEV} from '../../utils/constants';
import SplashScreen from 'react-native-splash-screen';
import {navigateToPwsRecovery} from '../../navigation/actions';

type Props = {
  requestLogin: Function;
};

export default function LoginView(props: Props) {
  const {t} = useTranslation();

  const userNameRef = React.createRef<any>();
  const passwordRef = React.createRef<any>();

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const validateForm = useCallback(values => {
    const errors = {} as any;

    if (!values.userName) {
      errors.userName = t('enter_email');
    }
    if (!values.password) {
      errors.password = t('enter_password');
    }

    if (values.userName && !EMAIL_PATTERN.test(values.userName)) {
      errors.userName = t('invalid_email');
    }

    return errors;
  }, []);

  const onSubmitUserName = useCallback(() => {
    if (passwordRef.current) {
      passwordRef.current.focus();
    }
  }, [passwordRef]);

  const onSubmitForm = useCallback(values => {
    Keyboard.dismiss();
    if (values.userName && values.password) {
      props.requestLogin({
        username: values.userName.trim(),
        password: values.password.trim(),
      });
    }
  }, []);

  const onPressForgetPassword = useCallback(() => navigateToPwsRecovery(), []);

  return (
    <View style={APPStyles.viewContainer}>
      <Formik
        validate={validateForm}
        validateOnChange={true}
        initialValues={{
          userName: __DEV__ ? USER_DEV : '',
          password: __DEV__ ?  '123456' : '', // 'Melbourne@3030' : '',
        }}
        onSubmit={onSubmitForm}>
        {({handleChange, handleBlur, handleSubmit, values, errors}) => (
          <View>
            <FormInput
              onChangeText={handleChange('userName')}
              onBlur={handleBlur('userName')}
              value={values.userName}
              placeholder={t('email')}
              returnKeyType="next"
              ref={userNameRef}
              keyboardType={'email-address'}
              onSubmitEditing={onSubmitUserName}
              invalidLabel={errors.userName}
              iconName={'envelope'}
            />
            <PasswordInput
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              placeholder={t('password')}
              returnKeyType="done"
              ref={passwordRef}
              onSubmitEditing={handleSubmit}
              invalidLabel={errors.password}
              iconName={'lock'}
            />
            <Button mode={'contained'} onPress={handleSubmit}>
              {t('login')}
            </Button>
          </View>
        )}
      </Formik>
      <Button uppercase={false} onPress={onPressForgetPassword}>
        {t('forget_password')}
      </Button>
    </View>
  );
}
