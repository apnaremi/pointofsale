import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import CompanyLogo from '../assets/images/companyLogo.svg';

function LogoContainer() {
  return (
    <View style={styles.logoContainer}>
      <CompanyLogo width={120} height={120} />
    </View>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 26,
    marginTop: 52,
  },
});

export default LogoContainer;
