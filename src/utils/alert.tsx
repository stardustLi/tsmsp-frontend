import { Alert } from 'react-native';

export function alertBox(message: string) {
  Alert.alert('警告', message);
}

export function confirmBox(message: string, onConfirm: () => void) {
  const cancelButton = {
    text: '取消',
    onPress: () => {
      /* empty */
    },
  };
  const okButton = {
    text: '确认',
    onPress: onConfirm,
  };

  Alert.alert('提示', message, [cancelButton, okButton]);
}
