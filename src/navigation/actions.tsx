import NavigationService from './Root';

export function goBack() {
  NavigationService.goBack();
}

export function navigateToLogin(params?: object) {
  NavigationService.replace('LoginScreen', params);
}

export function navigateToHome(params?: object) {
  NavigationService.reset('HomeScreen', params);
}

export function navigateToCustomer(params?: object) {
  NavigationService.navigate('CustomerScreen', params);
}
