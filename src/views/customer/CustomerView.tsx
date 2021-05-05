import React, {useCallback} from 'react';
import {View} from 'react-native';
import {Button, FormInput} from '../../components';
import {Formik} from 'formik';
import {useTranslation} from 'react-i18next';
import * as navigationActions from '../../navigation/actions';
import APPStyles from '../../theme/styles';
import {EMAIL_PATTERN} from '../../utils/constants';
import {appLog} from '../../utils/helpers';
import {Title} from 'react-native-paper';

type Props = {
  onLogin: Function;
};

export default function CustomerView(props: Props) {
  appLog('props', props);
  const {t} = useTranslation();
  const emailRef = React.createRef<any>();
  const firstNameRef = React.createRef<any>();
  const lastNameRef = React.createRef<any>();
  const phoneRef = React.createRef<any>();
  const passwordRef = React.createRef<any>();

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

  const onSubmitForm = useCallback(() => {
    navigationActions.goBack();
  }, []);

  const onSubmitFirstName = useCallback(() => {
    if (lastNameRef.current) {
      lastNameRef.current.focus();
    }
  }, [lastNameRef]);

  const onSubmitLlastName = useCallback(() => {
    if (phoneRef.current) {
      phoneRef.current.focus();
    }
  }, [phoneRef]);

  const onSubmitPhone = useCallback(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, [emailRef]);

  const onSubmitEmail = useCallback(() => {
    if (passwordRef.current) {
      passwordRef.current.focus();
    }
  }, [passwordRef]);

  return (
    <View style={APPStyles.modalContainer}>
      <Title>{t('Customer Information')}</Title>
      <Formik
        validate={validateForm}
        validateOnChange={true}
        initialValues={
          {
            typeId: 2,
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            password: '',
            confirmPws: '',
          } as any
        }
        onSubmit={onSubmitForm}>
        {({handleBlur, handleChange, handleSubmit, values}) => (
          <View style={APPStyles.formContainer}>
            <FormInput
              onChangeText={handleChange('firstName')}
              onBlur={handleBlur('firstName')}
              value={values.firstName}
              placeholder={t('first_name').toUpperCase()}
              returnKeyType="next"
              ref={firstNameRef}
              onSubmitEditing={onSubmitFirstName}
              iconName={'user'}
            />
            <FormInput
              onChangeText={handleChange('lastName')}
              onBlur={handleBlur('lastName')}
              value={values.lastName}
              placeholder={t('last_name').toUpperCase()}
              returnKeyType="next"
              ref={lastNameRef}
              onSubmitEditing={onSubmitLlastName}
              iconName={'user'}
            />
            <FormInput
              onChangeText={handleChange('phone')}
              onBlur={handleBlur('phone')}
              value={values.phone}
              keyboardType={'numeric'}
              placeholder={t('phone').toUpperCase()}
              returnKeyType="next"
              ref={phoneRef}
              onSubmitEditing={onSubmitPhone}
              iconName={'phone'}
            />
            <FormInput
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType={'email-address'}
              placeholder={t('email').toUpperCase()}
              returnKeyType="next"
              ref={emailRef}
              onSubmitEditing={onSubmitEmail}
              iconName={'envelope'}
            />
            <Button mode={'contained'} onPress={handleSubmit}>
              {t('add customer')}
            </Button>
          </View>
        )}
      </Formik>
    </View>
  );
}
