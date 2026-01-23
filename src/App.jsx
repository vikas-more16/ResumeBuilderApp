import React, { useEffect } from 'react';
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';
import FileViewer from 'react-native-file-viewer';
import { Provider } from 'react-redux';
import store from './redux/store';
import RootNavigation from './Navigation/RootNavigation';

export default function App() {
  useEffect(() => {
    async function setupNotifications() {
      await notifee.requestPermission();

      await notifee.createChannel({
        id: 'downloads',
        name: 'Downloads',
        importance: AndroidImportance.HIGH,
      });
    }

    setupNotifications();

    const unsubscribe = notifee.onForegroundEvent(({ type, detail }) => {
      if (type === EventType.PRESS) {
        const filePath = detail.notification?.data?.filePath;
        if (filePath) {
          FileViewer.open(filePath).catch(console.log);
        }
      }
    });

    return unsubscribe;
  }, []);

  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
}
