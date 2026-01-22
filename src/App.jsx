import { Provider } from 'react-redux';
import store from './redux/store';
import RootNavigation from './Navigation/RootNavigation';

export default function App() {
  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
}
