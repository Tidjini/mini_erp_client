const prodConfig = {
  apiKey: "AIzaSyC8exYdtTd_laZ6UiKONHkN0JNCgZykw2k",
  authDomain: "infratask-93adc.firebaseapp.com",
  projectId: "infratask-93adc",
  storageBucket: "infratask-93adc.appspot.com",
  messagingSenderId: "117272357319",
  appId: "1:117272357319:web:8f8da4260b2948ae4a91e2",
};

// const devConfig = {
//   apiKey: "AIzaSyC8exYdtTd_laZ6UiKONHkN0JNCgZykw2k",
//   authDomain: "infratask-93adc.firebaseapp.com",
//   projectId: "infratask-93adc",
//   storageBucket: "infratask-93adc.appspot.com",
//   messagingSenderId: "117272357319",
//   appId: "1:117272357319:web:8f8da4260b2948ae4a91e2",
// };

const devConfig = {
  apiKey: "AIzaSyC8exYdtTd_laZ6UiKONHkN0JNCgZykw2k",
  authDomain: "infratask-93adc.firebaseapp.com",
  projectId: "infratask-93adc",
  storageBucket: "infratask-93adc.appspot.com",
  messagingSenderId: "117272357319",
  appId: "1:117272357319:web:565fb54c0ceb87854a91e2",
};
const firebaseConfig =
  process.env.NODE_ENV === "production" ? prodConfig : devConfig;

export default firebaseConfig;
