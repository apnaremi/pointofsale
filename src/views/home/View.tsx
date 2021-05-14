/* eslint-disable react-native/no-inline-styles */
import React, {useCallback} from 'react';
import {View} from 'react-native';
import {appLog} from '../../utils/helpers';
import {Button} from '../../components';
import {useTranslation} from 'react-i18next';
import AppColors from '../../theme/appColors';
import * as navigationActions from '../../navigation/actions';

type Props = {
  onLogin: Function;
};

export default function HomeView(props: Props) {
  appLog('props', props);
  const {t} = useTranslation();

  const goToCustomer = useCallback(() => {
    navigationActions.navigateToCustomer();
  }, []);

  return (
    <View style={{flex: 1.5, flexDirection: 'row', margin: 20, marginLeft: 0}}>
      <View
        style={{
          flex: 0.15,
          borderWidth: 1,
          borderColor: AppColors.primary,
          margin: 5,
        }}
      />
      <View
        style={{
          flex: 2.5,
        }}>
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
        <View style={{height: '100%', justifyContent: 'space-between'}}>
          <View>
            <Button mode={'contained'} onPress={goToCustomer}>
              {t('customer')}
            </Button>
          </View>
          <Button mode={'contained'}>{t('send')}</Button>
        </View>
      </View>
    </View>
  );
}
