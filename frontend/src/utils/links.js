import { Linking } from 'react-native';
import { notify } from './dialog';

export async function openUrl(url, errorTitle = 'Unable to open link') {
  if (!url) return;
  try {
    await Linking.openURL(url);
  } catch (err) {
    notify(errorTitle, url);
  }
}
