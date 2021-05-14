import React, {useCallback} from 'react';
import {ScrollView, View} from 'react-native';
import {List, TouchableRipple} from 'react-native-paper';
import * as navigationActions from '../../navigation/actions';
import {useTranslation} from 'react-i18next';
import {Header, MainContainer} from '../../components';
import APPStyles from '../../theme/styles';

function Settings() {
  const {t} = useTranslation();

  const IconComponent = useCallback(
    props => <List.Icon {...props} icon="chevron-right" />,
    [],
  );

  const MenuButton = (props: {title: string; onPress?: Function}) => {
    const onPressButton = useCallback(() => {
      if (props.onPress) {
        props.onPress();
      }
    }, []);
    return (
      <TouchableRipple onPress={onPressButton}>
        <List.Item title={props.title} right={IconComponent} />
      </TouchableRipple>
    );
  };

  const navigateToProfile = useCallback(() => {
    navigationActions.navigateToProfileScreen({showBusiness: false});
  }, []);

  return (
    <MainContainer>
      <Header hideBackButton={true} title={'settings'} />
      <ScrollView contentContainerStyle={APPStyles.scrollContentContainer}>
        <View style={APPStyles.viewContainer}>
          <MenuButton title={t('profile')} onPress={navigateToProfile} />
          <MenuButton
            title={t('seating_arrangement')}
            onPress={navigateToProfile}
          />
          <MenuButton title={t('orders')} onPress={navigateToProfile} />
          <MenuButton
            title={t('change_password')}
            onPress={navigateToProfile}
          />
          <MenuButton title={t('add_category')} onPress={navigateToProfile} />
          <MenuButton title={t('qr_code')} onPress={navigateToProfile} />
        </View>
      </ScrollView>
    </MainContainer>
  );
}

export default React.memo(Settings);
