import React, {useCallback, useEffect} from 'react';
import {Keyboard, View} from 'react-native';
import {Button, PasswordInput, FormInput} from '../../components';
import {Formik} from 'formik';
import {useTranslation} from 'react-i18next';
import APPStyles from '../../theme/styles';
import {EMAIL_PATTERN} from '../../utils/constants';
import SplashScreen from 'react-native-splash-screen';
import * as loginActions from '../../config/redux/actions/loginActions';
import {useDispatch} from 'react-redux';

export default function LoginView() {
  const {t} = useTranslation();
  const dispatch = useDispatch();

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
      dispatch(
        loginActions.requestLogin(
          values.userName.trim(),
          values.password.trim(),
        ),
      );
    }
  }, []);

  return (
    <View style={APPStyles.viewContainer}>
      <Formik
        validate={validateForm}
        validateOnChange={true}
        initialValues={{
          userName: __DEV__ ? 'JaimeL2011@gmail.com' : '',
          password: __DEV__ ? '123456' : '',
        }}
        onSubmit={onSubmitForm}>
        {({handleChange, handleBlur, handleSubmit, values, errors}) => (
          <View>
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
            <Button mode={'contained'} onPress={handleSubmit}>
              {t('login')}
            </Button>
          </View>
        )}
      </Formik>
    </View>
  );
}
