import React, {useCallback, useState} from 'react';
import {View} from 'react-native';
import {Button, FormInput} from '../../components';
import {Formik} from 'formik';
import {useTranslation} from 'react-i18next';
import * as navigationActions from '../../navigation/actions';
import APPStyles from '../../theme/styles';
import {EMAIL_PATTERN} from '../../utils/constants';
import {appLog} from '../../utils/helpers';
import {Title} from 'react-native-paper';
import {IUser} from '../../config/models/data';

type Props = {
  onSubmitForm: Function;
};

export default function CustomerView(props: Props) {
  const [initialData, setInitialData] = useState({
    firstName: '',
    mobile: '',
    email: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  } as IUser);
  const {t} = useTranslation();
  const emailRef = React.createRef<any>();
  const firstNameRef = React.createRef<any>();
  const streetAddressRef = React.createRef<any>();
  const phoneRef = React.createRef<any>();
  const cityRef = React.createRef<any>();
  const stateRef = React.createRef<any>();
  const zipCodeRef = React.createRef<any>();
  const countryRef = React.createRef<any>();

  const validateForm = useCallback(values => {
    const errors = {} as any;

    if (!values.firstName) {
      errors.firstName = t('required_field');
    }

    if (!values.mobile) {
      errors.mobile = t('required_field');
    }

    if (!values.email) {
      errors.email = t('required_field');
    }

    if (!EMAIL_PATTERN.test(values.email)) {
      errors.email = t('invalid_email');
    }

    return errors;
  }, []);

  const onSubmitForm = (values: IUser) => {
    let data = {
      invoiceCustomerAddresses: [
        {
          addressType: 0,
          streetAddress: values.streetAddress,
          city: values.city,
          state: values.state,
          postCode: values.zipCode,
          country: values.country,
        },
      ],
      isUseAsBilling: true,
      saveForFuture: false,
      phoneNumber: values.mobile,
      email: values.email,
      firstName: values.firstName,
      customerBillingName: values.firstName,
    };

    props.onSubmitForm(data);
  };

  const onSubmitFirstName = useCallback(() => {
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
    if (streetAddressRef.current) {
      streetAddressRef.current.focus();
    }
  }, [streetAddressRef]);

  const onSubmitStreetAddress = useCallback(() => {
    if (cityRef.current) {
      cityRef.current.focus();
    }
  }, [cityRef]);

  const onSubmitCity = useCallback(() => {
    if (stateRef.current) {
      stateRef.current.focus();
    }
  }, [stateRef]);

  const onSubmitState = useCallback(() => {
    if (zipCodeRef.current) {
      zipCodeRef.current.focus();
    }
  }, [zipCodeRef]);

  const onSubmitZipCode = useCallback(() => {
    if (countryRef.current) {
      countryRef.current.focus();
    }
  }, [countryRef]);

  const onSubmitCountry = useCallback(() => {}, []);

  const goBack = useCallback(() => {
    navigationActions.goBack();
  }, []);

  return (
    <View style={[APPStyles.modalContainer, {width: '60%'}]}>
      <Title>{t('Customer Information')}</Title>
      <Formik
        enableReinitialize
        validate={validateForm}
        validateOnChange={true}
        initialValues={initialData}
        onSubmit={onSubmitForm}>
        {({handleSubmit, errors, handleBlur, handleChange, values}) => (
          <View style={APPStyles.formContainer}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
              }}>
              <View style={{width: '48%'}}>
                <FormInput
                  onChangeText={handleChange('firstName')}
                  onBlur={handleBlur('firstName')}
                  value={values.firstName}
                  placeholder={t('name')}
                  returnKeyType="next"
                  ref={firstNameRef}
                  onSubmitEditing={onSubmitFirstName}
                  invalidLabel={errors.firstName}
                  iconName={'user'}
                />
                <FormInput
                  onChangeText={handleChange('mobile')}
                  onBlur={handleBlur('mobile')}
                  value={values.mobile}
                  keyboardType={'numeric'}
                  placeholder={t('phone')}
                  returnKeyType="next"
                  ref={phoneRef}
                  onSubmitEditing={onSubmitPhone}
                  invalidLabel={errors.mobile}
                  iconName={'phone'}
                />
                <FormInput
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  keyboardType={'email-address'}
                  placeholder={t('email')}
                  returnKeyType="next"
                  ref={emailRef}
                  onSubmitEditing={onSubmitEmail}
                  invalidLabel={errors.email}
                  iconName={'envelope'}
                />

                <FormInput
                  onChangeText={handleChange('streetAddress')}
                  onBlur={handleBlur('streetAddress')}
                  value={values.streetAddress}
                  placeholder={t('street_address')}
                  returnKeyType="next"
                  ref={streetAddressRef}
                  onSubmitEditing={onSubmitStreetAddress}
                  invalidLabel={errors.streetAddress}
                  iconName={'direction'}
                />
              </View>
              <View style={{width: '48%'}}>
                <FormInput
                  onChangeText={handleChange('city')}
                  onBlur={handleBlur('city')}
                  value={values.city}
                  placeholder={t('city')}
                  returnKeyType="next"
                  ref={cityRef}
                  onSubmitEditing={onSubmitCity}
                  invalidLabel={errors.city}
                  iconName={'location-pin'}
                />

                <FormInput
                  onChangeText={handleChange('state')}
                  onBlur={handleBlur('state')}
                  value={values.state}
                  placeholder={t('state')}
                  returnKeyType="next"
                  ref={stateRef}
                  onSubmitEditing={onSubmitState}
                  invalidLabel={errors.state}
                  iconName={'location-pin'}
                />

                <FormInput
                  onChangeText={handleChange('zipCode')}
                  onBlur={handleBlur('zipCode')}
                  value={values.zipCode}
                  placeholder={t('zipCode')}
                  returnKeyType="next"
                  ref={zipCodeRef}
                  onSubmitEditing={onSubmitZipCode}
                  invalidLabel={errors.zipCode}
                  iconName={'location-pin'}
                />

                <FormInput
                  onChangeText={handleChange('country')}
                  onBlur={handleBlur('country')}
                  value={values.country}
                  placeholder={t('country')}
                  returnKeyType="done"
                  ref={countryRef}
                  onSubmitEditing={onSubmitCountry}
                  invalidLabel={errors.country}
                  iconName={'location-pin'}
                />
              </View>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <Button
                mode={'contained'}
                onPress={handleSubmit}
                style={APPStyles.commonButton}>
                {t('save')}
              </Button>
              <Button
                mode={'contained'}
                onPress={goBack}
                style={APPStyles.commonButton}>
                {t('cancel')}
              </Button>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
}
