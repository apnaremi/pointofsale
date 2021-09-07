import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, FormInput, ModalHeader, Text} from '../../components';
import {Formik} from 'formik';
import {useTranslation} from 'react-i18next';
import * as navigationActions from '../../navigation/actions';
import APPStyles from '../../theme/styles';
import {EMAIL_PATTERN} from '../../utils/constants';
import {appLog} from '../../utils/helpers';
import {Title} from 'react-native-paper';
import {IUser} from '../../config/models/data';
import {moderateScale, scale} from 'react-native-size-matters';
import _ from 'lodash';
import APPMetrics from '../../utils/metrics';
// @ts-ignore
import SearchableDropdown from 'react-native-searchable-dropdown';
import AppColors from '../../theme/appColors';

type Props = {
  onSubmitForm: Function;
  route?: any;
};

export default function CustomerView(props: Props) {
  const [selectedCustomer, setSelectedCustomer] = useState<any>({});
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

    props.onSubmitForm(data, true);
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
      <ModalHeader title={'Customer details'} />
      <Formik
        enableReinitialize
        validate={validateForm}
        validateOnChange={true}
        initialValues={initialData}
        onSubmit={onSubmitForm}>
        {({handleSubmit, errors, handleBlur, handleChange, values}) => (
          <View style={APPStyles.formContainer}>
            <View style={styles.InputContainer}>
              <Text numberOfLines={1} style={styles.LabelText}>
                {'Existing Customer?'}
              </Text>
              <SearchableDropdown
                onItemSelect={(item: any) => {
                  setSelectedCustomer(item);
                  props.onSubmitForm(item, false);
                }}
                containerStyle={{width: '69%', padding: moderateScale(10)}}
                itemStyle={{
                  padding: 10,
                  marginTop: 2,
                  borderColor: '#bbb',
                  borderWidth: 1,
                }}
                itemTextStyle={{color: '#222'}}
                itemsContainerStyle={{maxHeight: 300}}
                items={props.route.params.customersArray}
                defaultIndex={2}
                resetValue={false}
                textInputProps={{
                  disableFullscreenUI: true,
                  autoFocus: true,
                  placeholder: !_.isEmpty(selectedCustomer)
                    ? selectedCustomer.name
                    : t('select_customer'),
                  style: {
                    paddingVertical: moderateScale(5),
                    paddingHorizontal: moderateScale(5),
                    borderWidth: 1,
                    borderColor: '#bbb',
                    borderRadius: 5,
                    fontSize: APPMetrics.normalFontSize,
                  },
                }}
                listProps={{
                  nestedScrollEnabled: true,
                }}
              />
            </View>
            <Text numberOfLines={1} style={styles.SubTitleText}>
              {'Customer Name only for this order'}
            </Text>

            <View style={styles.InputContainer}>
              <Text numberOfLines={1} style={styles.LabelText}>
                {'Name'}
              </Text>
              <FormInput
                style={styles.InputStyle}
                onChangeText={handleChange('firstName')}
                onBlur={handleBlur('firstName')}
                value={values.firstName}
                returnKeyType="next"
                ref={firstNameRef}
                onSubmitEditing={onSubmitFirstName}
                invalidLabel={errors.firstName}
                iconName={'user'}
              />
            </View>
            <View style={styles.InputContainer}>
              <Text numberOfLines={1} style={styles.LabelText}>
                {'Phone Number'}
              </Text>
              <FormInput
                style={styles.InputStyle}
                onChangeText={handleChange('mobile')}
                onBlur={handleBlur('mobile')}
                value={values.mobile}
                keyboardType={'numeric'}
                returnKeyType="next"
                ref={phoneRef}
                onSubmitEditing={onSubmitPhone}
                invalidLabel={errors.mobile}
                iconName={'phone'}
              />
            </View>
            <View style={styles.InputContainer}>
              <Text numberOfLines={1} style={styles.LabelText}>
                {'Email'}
              </Text>
              <FormInput
                style={styles.InputStyle}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType={'email-address'}
                returnKeyType="next"
                ref={emailRef}
                onSubmitEditing={onSubmitEmail}
                invalidLabel={errors.email}
                iconName={'envelope'}
              />
            </View>
            <View style={styles.InputContainer}>
              <Text numberOfLines={1} style={styles.LabelText}>
                {t('street_address')}
              </Text>
              <FormInput
                style={styles.InputStyle}
                onChangeText={handleChange('streetAddress')}
                onBlur={handleBlur('streetAddress')}
                value={values.streetAddress}
                returnKeyType="next"
                ref={streetAddressRef}
                onSubmitEditing={onSubmitStreetAddress}
                invalidLabel={errors.streetAddress}
                iconName={'direction'}
              />
            </View>
            <View style={styles.InputContainer}>
              <Text numberOfLines={1} style={styles.LabelText}>
                {t('city')}
              </Text>
              <FormInput
                style={styles.InputStyle}
                onChangeText={handleChange('city')}
                onBlur={handleBlur('city')}
                value={values.city}
                returnKeyType="next"
                ref={cityRef}
                onSubmitEditing={onSubmitCity}
                invalidLabel={errors.city}
                iconName={'location-pin'}
              />
            </View>
            <View style={styles.InputContainer}>
              <Text numberOfLines={1} style={styles.LabelText}>
                {t('state')}
              </Text>
              <FormInput
                style={styles.InputStyle}
                onChangeText={handleChange('state')}
                onBlur={handleBlur('state')}
                value={values.state}
                returnKeyType="next"
                ref={stateRef}
                onSubmitEditing={onSubmitState}
                invalidLabel={errors.state}
                iconName={'location-pin'}
              />
            </View>
            <View style={styles.InputContainer}>
              <Text numberOfLines={1} style={styles.LabelText}>
                {t('zipCode')}
              </Text>
              <FormInput
                style={styles.InputStyle}
                onChangeText={handleChange('zipCode')}
                onBlur={handleBlur('zipCode')}
                value={values.zipCode}
                returnKeyType="next"
                ref={zipCodeRef}
                onSubmitEditing={onSubmitZipCode}
                invalidLabel={errors.zipCode}
                iconName={'location-pin'}
              />
            </View>
            <View style={styles.InputContainer}>
              <Text numberOfLines={1} style={styles.LabelText}>
                {t('country')}
              </Text>
              <FormInput
                style={styles.InputStyle}
                onChangeText={handleChange('country')}
                onBlur={handleBlur('country')}
                value={values.country}
                returnKeyType="done"
                ref={countryRef}
                onSubmitEditing={onSubmitCountry}
                invalidLabel={errors.country}
                iconName={'location-pin'}
              />
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <Button mode={'contained'} onPress={handleSubmit}>
                {t('save')}
              </Button>
              <Button mode={'contained'} onPress={goBack}>
                {t('cancel')}
              </Button>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  LabelText: {
    fontSize: scale(8),
    color: AppColors.dark_gray_text,
    fontWeight: 'bold',
    width: '40%',
  },
  SubTitleText: {
    fontSize: scale(8),
    fontWeight: 'bold',
    textAlign: 'right',
    width: '80%',
  },
  InputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  InputStyle: {width: '60%', height: scale(23)},
});
