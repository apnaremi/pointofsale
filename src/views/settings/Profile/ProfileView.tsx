import React, {useCallback, useEffect, useState, useRef} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {FormInput} from '../../../components';
import {Formik, FormikProps} from 'formik';
import {Avatar, IconButton} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import APPStyles from '../../../theme/styles';
import {IUser} from '../../../config/models/data/user';
import AppColors from '../../../theme/appColors';
import ImagePicker from 'react-native-image-crop-picker';
import {appLog} from '../../../utils/helpers';

type Props = {
  onSubmitForm: Function;
  allowEdit: boolean;
  userData: IUser;
};

export const ProfileView = React.forwardRef((props: Props, ref: any) => {
  const {t} = useTranslation();
  const formRef = useRef<FormikProps<IUser>>(null);
  const firstNameRef = React.createRef<any>();
  const lastNameRef = React.createRef<any>();
  const phoneRef = React.createRef<any>();
  const streetRef = React.createRef<any>();

  const [initialData, setInitialData] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
  } as IUser);

  const [avatarURL, setAvatarURL] = useState('');

  useEffect(() => {
    if (props.userData) {
      let data = {...initialData};
      data.firstName = props.userData.firstName;
      data.lastName = props.userData.lastName;
      data.mobile = props.userData.mobile;
      data.email = props.userData.email;
      setInitialData(data);
      setAvatarURL(props.userData.photoUrl);
    }
  }, [props.userData]);

  React.useImperativeHandle(ref, () => ({
    onSubmitFormEx(values: IUser) {
      if (formRef.current) {
        formRef.current.handleSubmit();
      }
    },
  }));

  const onSubmitForm = (values: IUser) => {
    props.onSubmitForm( {
      firstName: values.firstName,
      lastName: values.lastName,
      mobile: values.mobile,
    });
  };

  const validateForm = useCallback(values => {
    const errors = {} as any;

    if (!values.lastName) {
      errors.lastName = t('last_name_required');
    }

    if (!values.firstName) {
      errors.firstName = t('first_name_required');
    }

    if (!values.mobile) {
      errors.mobile = t('phone_required');
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
      ref={ref}
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
        innerRef={formRef}
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
              onChangeText={handleChange('mobile')}
              onBlur={handleBlur('mobile')}
              value={values.mobile}
              keyboardType={'numeric'}
              placeholder={t('phone').toUpperCase()}
              returnKeyType="next"
              ref={phoneRef}
              onSubmitEditing={onSubmitPhone}
              invalidLabel={errors.mobile}
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
});

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
