import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ToastAndroid,
  PermissionsAndroid,
} from 'react-native';
import React, {useState} from 'react';
import {
  launchCamera,
  launchImageLibrary,
  MediaType,
  ImagePickerResponse,
} from 'react-native-image-picker';
import RNTextDetector from 'rn-text-detector';
import {FlatList} from 'react-native-gesture-handler';
import {
  responsiveHeight,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';
import AntDesign from 'react-native-vector-icons/AntDesign';

const DocumentVerifyRender = () => {
  const [state, setState] = useState<{
    loading: boolean;
    image: string | null;
    toast: {
      message: string;
      isVisible: boolean;
    };
    textRecognition: [] | null;
  }>({
    loading: false,
    image: null,
    textRecognition: null,
    toast: {
      message: '',
      isVisible: false,
    },
  });

  const requestCamera = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Truventorm Camera Permission',
          message:
            'Truventorm needs access to your camera ' +
            'to set profile picture.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
        launchCamera({mediaType: 'photo'}, onImageSelect);
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  function onPress(type: 'capture' | 'library') {
    setState({...state, loading: true});
    type === 'capture'
      ? requestCamera()
      : launchImageLibrary({mediaType: 'photo'}, onImageSelect);
  }

  async function onImageSelect(response: ImagePickerResponse) {
    console.log('pressed');

    if (
      !response.assets ||
      response.assets.length === 0 ||
      !response.assets[0].uri
    ) {
      setState({...state, loading: false});
      return;
    }
    const file = response.assets[0].uri;
    const textRecognition = await RNTextDetector.detectFromUri(file);
    const INFLIGHT_IT = 'Inflight IT';
    const matchText = textRecognition.findIndex((item: {text: string}) =>
      item.text.match(INFLIGHT_IT),
    );
    setState({
      ...state,
      textRecognition,
      image: file,
      toast: {
        message: matchText > -1 ? 'Good!!' : '',
        isVisible: matchText > -1,
      },
      loading: false,
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Verify Your Document</Text>
        <View>
          <TouchableOpacity
            style={[styles.button, styles.shadow]}
            onPress={() => onPress('capture')}>
            <Text className="text-black">Take Photo</Text>
          </TouchableOpacity>
          <View>
            <TouchableOpacity
              style={[styles.button, styles.shadow]}
              onPress={() => onPress('library')}>
              <Text className="text-black">Pick a Photo</Text>
            </TouchableOpacity>
          </View>
          <View>
            <View style={{alignItems: 'center'}}>
              <Image
                style={[styles.image, styles.shadow]}
                source={{uri: state.image || undefined}}
              />
            </View>
            {!!state.textRecognition &&
              state.textRecognition.map((item: {text: string}, i: number) => (
                <Text key={i} className="text-black">
                  {item.text}
                </Text>
              ))}
          </View>
        </View>
        {/* {state.toast.isVisible &&
            ToastAndroid.showWithGravityAndOffset(
              state.toast.message,
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              25,
              50,
            )} */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 40,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  button: {
    padding: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 5,
    color: 'black',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 200,
    height: 200,
  },
});

const DocumentVerify = ({bottomSheetModalRef}: any) => {
  return (
    <>
      <View className="w-[100%] flex flex-row justify-between px-8 pb-2">
        <View className="flex flex-row items-center justify-center gap-x-2">
          <Text
            className="text-black"
            style={{fontSize: responsiveScreenFontSize(2), fontWeight: 'bold'}}>
            Verify Document
          </Text>
        </View>
        <TouchableOpacity onPress={() => bottomSheetModalRef.current?.close()}>
          <AntDesign name="closecircle" size={20} color="red" className="p-5" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={[
          {
            key: 'form-key',
            component: <DocumentVerifyRender />,
          },
        ]}
        renderItem={({item}) => item.component}
        contentContainerStyle={{
          paddingBottom: responsiveHeight(10),
        }}></FlatList>
    </>
  );
};

export default DocumentVerify;
