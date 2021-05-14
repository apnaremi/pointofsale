/* eslint-disable react-native/no-inline-styles */
import React, {useCallback} from 'react';
import {View} from 'react-native';
import {Chip} from 'react-native-paper';
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

      <View style={{flex: 1, marginLeft: 20}}>
        <View style={{height: '100%', justifyContent: 'space-between'}}>
          <View>
            <View style={{flexDirection: 'row'}}>
              <Chip mode={'outlined'}>Delivery</Chip>
              <Chip selected={true} mode={'outlined'}>
                Take away
              </Chip>
              <Chip mode={'outlined'}>Dine in</Chip>
            </View>
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
