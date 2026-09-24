import { Alert, Platform } from 'react-native';

// react-native-web's Alert.alert is a no-op, and this project also ships a web
// build (vercel.json). These helpers make confirmations/errors work on both.

export function notify(title, message) {
  if (Platform.OS === 'web') {
    window.alert(message ? `${title}\n\n${message}` : title);
    return;
  }
  Alert.alert(title, message);
}

/** Resolves true if the user confirms, false if they cancel. */
export function confirm({ title, message, confirmText = 'OK', cancelText = 'Cancel', destructive = false }) {
  if (Platform.OS === 'web') {
    return Promise.resolve(window.confirm(message ? `${title}\n\n${message}` : title));
  }
  return new Promise((resolve) => {
    Alert.alert(
      title,
      message,
      [
        { text: cancelText, style: 'cancel', onPress: () => resolve(false) },
        { text: confirmText, style: destructive ? 'destructive' : 'default', onPress: () => resolve(true) },
      ],
      { cancelable: true, onDismiss: () => resolve(false) }
    );
  });
}
