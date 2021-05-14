import React, {useCallback, useEffect, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {FormInput} from '../../../components';
import {Formik} from 'formik';
import {Avatar, IconButton} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import APPStyles from '../../../theme/styles';
import {userType} from '../../../utils/appTypes';
import AppColors from '../../../theme/appColors';
import ImagePicker from 'react-native-image-crop-picker';
import {appLog} from '../../../utils/helpers';

type Props = {
  onSubmitForm: Function;
  allowEdit: boolean;
  dataFromDB: any;
  userData: userType;
};

export default function UserRegisterView(props: Props) {
  const {t} = useTranslation();

  const firstNameRef = React.createRef<any>();
  const lastNameRef = React.createRef<any>();
  const phoneRef = React.createRef<any>();
  const streetRef = React.createRef<any>();

  const [initialData, setInitialData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    street: '',
    suburb: '',
    postcode: '',
    state: '',
  });

  const [avatarURL, setAvatarURL] = useState('');

  useEffect(() => {
    if (props.dataFromDB && props.dataFromDB.personalDetail) {
      let data = {...initialData};
      data.firstName = props.dataFromDB.personalDetail.firstName;
      data.lastName = props.dataFromDB.personalDetail.lastName;
      data.phone = props.dataFromDB.personalDetail.phone;
      data.email = props.dataFromDB.personalDetail.email;

      data.street = props.dataFromDB.address.street;
      data.suburb = props.dataFromDB.address.suburb;
      data.postcode = props.dataFromDB.address.postalCode;
      data.state = props.dataFromDB.address.state;

      setInitialData(data);
      setAvatarURL(props.dataFromDB.personalDetail.imagePath);
    }
  }, [props.dataFromDB]);

  const onSubmitForm = useCallback(
    values => {
      let dataToSave = {...props.dataFromDB};
      dataToSave.personalDetail.firstName = values.firstName;
      dataToSave.personalDetail.lastName = values.lastName;
      dataToSave.personalDetail.phone = values.phone;

      dataToSave.address.street = values.street;
      dataToSave.address.suburb = values.suburb;
      dataToSave.address.postalCode = values.postcode;
      dataToSave.address.state = values.state;

      props.onSubmitForm(dataToSave);
    },
    [props.dataFromDB],
  );

  const validateForm = useCallback(values => {
    const errors = {} as any;

    if (!values.lastName) {
      errors.lastName = t('last_name_required');
    }

    if (!values.firstName) {
      errors.firstName = t('first_name_required');
    }

    if (!values.phone) {
      errors.phone = t('phone_required');
    }
    return errors;
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
    if (streetRef.current) {
      streetRef.current.focus();
    }
  }, [streetRef]);

  const onPressIcon = useCallback(() => {
    Alert.alert(
      '',
      'Select an image from:',
      [
        {
          text: 'Camera',
          onPress: () => {
            ImagePicker.openCamera({
              width: 300,
              height: 400,
              cropping: true,
            }).then(image => {
              setAvatarURL(image.path);
            });
          },
        },
        {
          text: 'Gallery',
          onPress: () => {
            ImagePicker.openPicker({
              width: 300,
              height: 400,
              cropping: true,
            }).then(image => {
              setAvatarURL(image.path);
            });
          },
        },
        {
          text: 'Cancel',
          onPress: () => appLog('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      {cancelable: true},
    );
  }, []);
  return (
    <View
      style={APPStyles.viewContainerComplete}
      pointerEvents={props.allowEdit ? 'auto' : 'none'}>
      <View style={styles.avatarContainer}>
        <Avatar.Image
          style={{backgroundColor: AppColors.primary}}
          size={150}
          source={{
            uri: avatarURL,
          }}
        />
        <IconButton
          style={styles.cameraButton}
          color={
            !props.allowEdit ? AppColors.gray_normal : AppColors.gray_darken_4
          }
          icon={'camera-plus-outline'}
          onPress={onPressIcon}
        />
      </View>
      <Formik
        enableReinitialize={true}
        validate={validateForm}
        validateOnChange={true}
        initialValues={initialData}
        onSubmit={onSubmitForm}>
        {({errors, handleBlur, handleChange, values}) => (
          <View>
            <FormInput
              onChangeText={handleChange('firstName')}
              onBlur={handleBlur('firstName')}
              value={values.firstName}
              placeholder={t('first_name').toUpperCase()}
              returnKeyType="next"
              ref={firstNameRef}
              onSubmitEditing={onSubmitFirstName}
              invalidLabel={errors.firstName}
              iconName={'user'}
              editable={props.allowEdit}
            />
            <FormInput
              onChangeText={handleChange('lastName')}
              onBlur={handleBlur('lastName')}
              value={values.lastName}
              placeholder={t('last_name').toUpperCase()}
              returnKeyType="next"
              ref={lastNameRef}
              onSubmitEditing={onSubmitLlastName}
              invalidLabel={errors.lastName}
              iconName={'user'}
              editable={props.allowEdit}
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
              invalidLabel={errors.phone}
              iconName={'phone'}
              editable={props.allowEdit}
            />
            <FormInput
              value={initialData.email}
              placeholder={t('email').toUpperCase()}
              iconName={'envelope'}
              editable={false}
            />
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  cameraButton: {
    backgroundColor: AppColors.clear,
    position: 'absolute',
    bottom: 25,
    left: '56%',
    borderWidth: 1,
  },
  avatarContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
});
