import React, {useCallback, useEffect} from 'react';
import {Keyboard, View} from 'react-native';
import {Button, PasswordInput, FormInput} from '../../components';
import {Formik} from 'formik';
import {useTranslation} from 'react-i18next';
import * as navigationActions from '../../navigation/actions';
import APPStyles from '../../theme/styles';
import {EMAIL_PATTERN} from '../../utils/constants';
import SplashScreen from 'react-native-splash-screen';
import {appLog} from '../../utils/helpers';

type Props = {
  onLogin: Function;
};

export default function LoginView(props: Props) {
  appLog('props', props);
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

  const onSubmitForm = useCallback(() => {
    Keyboard.dismiss();
    navigationActions.navigateToHome();
  }, []);

  return (
    <View>
      <Formik
        validate={validateForm}
        validateOnChange={true}
        initialValues={{
          userName: __DEV__ ? 'adam@testmail.com' : '',
          password: __DEV__ ? 'Melbourne@3030' : '',
        }}
        onSubmit={onSubmitForm}>
        {({handleChange, handleBlur, handleSubmit, values, errors}) => (
          <View style={APPStyles.formContainer}>
            <FormInput
              onChangeText={handleChange('userName')}
              onBlur={handleBlur('userName')}
              value={values.userName}
              placeholder={t('email').toUpperCase()}
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
              placeholder={t('password').toUpperCase()}
              returnKeyType="done"
              ref={passwordRef}
              onSubmitEditing={handleSubmit}
              invalidLabel={errors.password}
              iconName={'lock'}
            />
            <Button
              mode={'contained'}
              onPress={handleSubmit}
              style={APPStyles.commonButton}>
              {t('login')}
            </Button>
          </View>
        )}
      </Formik>
    </View>
  );
}
