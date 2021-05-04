import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import CompanyLogo from '../assets/images/companyLogo.svg';

function LogoContainer() {
  return (
    <View style={styles.logoContainer}>
      <CompanyLogo width={'50%'} height={'50%'} />
    </View>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 2,
  },
});

export default LogoContainer;
