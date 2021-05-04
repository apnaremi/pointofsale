import React, {useCallback, useEffect} from 'react';
import {View} from 'react-native';
import {appLog} from '../../utils/helpers';
import {Formik} from 'formik';
import APPStyles from '../../theme/styles';
import {Button, FormInput, PasswordInput} from '../../components';
import {useTranslation} from 'react-i18next';
import AppColors from '../../theme/appColors';
import {Title} from 'react-native-paper';

type Props = {
  onLogin: Function;
};

export default function HomeView(props: Props) {
  appLog('props', props);
  const {t} = useTranslation();

  return (
    <View style={{flex: 1.5, flexDirection: 'row', margin: 20}}>
      <View
        style={{
          flex: 0.15,
          borderWidth: 1,
          backgroundColor: AppColors.secondary,
          margin: 5,
        }}
      />
      <View
        style={{
          flex: 2.5,
        }}>
        <View
          style={{
            flex: 0.4,
            borderWidth: 1,
            borderColor: AppColors.primary,
            margin: 5,
          }}
        />
        <View
          style={{
            flex: 1,
            margin: 5,
            flexDirection: 'row',
          }}>
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: AppColors.primary,
              margin: 5,
            }}
          />
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: AppColors.primary,
              margin: 5,
            }}
          />
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: AppColors.primary,
              margin: 5,
            }}
          />
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: AppColors.primary,
              margin: 5,
            }}
          />
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: AppColors.primary,
              margin: 5,
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            margin: 5,
            flexDirection: 'row',
          }}>
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: AppColors.primary,
              margin: 5,
            }}
          />
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: AppColors.primary,
              margin: 5,
            }}
          />
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: AppColors.primary,
              margin: 5,
            }}
          />
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: AppColors.primary,
              margin: 5,
            }}
          />
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: AppColors.primary,
              margin: 5,
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            margin: 5,
            flexDirection: 'row',
          }}>
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: AppColors.primary,
              margin: 5,
            }}
          />
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: AppColors.primary,
              margin: 5,
            }}
          />
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: AppColors.primary,
              margin: 5,
            }}
          />
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: AppColors.primary,
              margin: 5,
            }}
          />
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: AppColors.primary,
              margin: 5,
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            margin: 5,
            flexDirection: 'row',
          }}>
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: AppColors.primary,
              margin: 5,
            }}
          />
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: AppColors.primary,
              margin: 5,
            }}
          />
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: AppColors.primary,
              margin: 5,
            }}
          />
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: AppColors.primary,
              margin: 5,
            }}
          />
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: AppColors.primary,
              margin: 5,
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            margin: 5,
            flexDirection: 'row',
          }}>
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: AppColors.primary,
              margin: 5,
            }}
          />
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: AppColors.primary,
              margin: 5,
            }}
          />
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: AppColors.primary,
              margin: 5,
            }}
          />
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: AppColors.primary,
              margin: 5,
            }}
          />
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: AppColors.primary,
              margin: 5,
            }}
          />
        </View>
      </View>

      <View style={{flex: 0.8, marginLeft: 20}}>
        <Formik
          validateOnChange={true}
          initialValues={{
            userName: '',
            userAddress: '',
          }}>
          {({handleChange, handleBlur, handleSubmit, values, errors}) => (
            <View style={{height: '100%', justifyContent: 'space-between'}}>
              <View>
                <Title>Shopping Cart</Title>
                <FormInput
                  onChangeText={handleChange('userName')}
                  onBlur={handleBlur('userName')}
                  value={values.userName}
                  placeholder={t('Customer ID').toUpperCase()}
                  returnKeyType="next"
                  keyboardType={'email-address'}
                  invalidLabel={errors.userName}
                  iconName={'envelope'}
                />
                <FormInput
                  onChangeText={handleChange('userName')}
                  onBlur={handleBlur('userName')}
                  value={values.userName}
                  placeholder={t('Customer Name').toUpperCase()}
                  returnKeyType="next"
                  keyboardType={'email-address'}
                  invalidLabel={errors.userName}
                  iconName={'envelope'}
                />
                <FormInput
                  onChangeText={handleChange('userName')}
                  onBlur={handleBlur('userName')}
                  value={values.userName}
                  placeholder={t('Address').toUpperCase()}
                  returnKeyType="next"
                  keyboardType={'email-address'}
                  invalidLabel={errors.userName}
                  iconName={'envelope'}
                />
              </View>
              <Button mode={'contained'} onPress={handleSubmit}>
                {t('send')}
              </Button>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
}
