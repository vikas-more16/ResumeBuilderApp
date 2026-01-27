import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

// ✅ Configure once
GoogleSignin.configure({
  webClientId:
    '910861147857-3rfqk9n5j0l3pamkb3h16me5f43jtbkj.apps.googleusercontent.com',
});

// ---------- EMAIL / PASSWORD ----------

export const firebaseRegister = (email, password) =>
  auth().createUserWithEmailAndPassword(email, password);

export const firebaseLogin = (email, password) =>
  auth().signInWithEmailAndPassword(email, password);

// ---------- GOOGLE LOGIN (FIXED) ----------

export const firebaseGoogleLogin = async () => {
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

  const userInfo = await GoogleSignin.signIn();

  if (!userInfo.data.idToken) {
    throw new Error('NO_ID_TOKEN_FROM_GOOGLE');
  }

  const googleCredential = auth.GoogleAuthProvider.credential(
    userInfo.data.idToken,
  );
  return auth().signInWithCredential(googleCredential);
};

// ---------- TOKEN ----------

export const getFirebaseToken = async () => {
  const user = auth().currentUser;
  if (!user) throw new Error('No Firebase user');
  return user.getIdToken(true);
};
