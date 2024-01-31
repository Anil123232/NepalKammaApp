import {View, Image} from 'react-native';
import React, {useEffect, useRef} from 'react';
import LottieView from 'lottie-react-native';

const Loading = () => {
  const animationRef = useRef<LottieView>(null);

  useEffect(() => {
    // Or set a specific startFrame and endFrame with:
    animationRef.current?.play(5, 50);
  }, []);

  return (
    <View className="flex items-center justify-center h-[100%] bg-white">
      <Image
        source={require('../../../assets/images/NepalKamma.png')}
        style={{width: 300, height: 50}}
      />
      <View>
        <LottieView
          source={require('../../../assets/animation/vj6FO5omqH.json')}
          ref={animationRef}
          style={{width: 500, height: 300}}
        />
      </View>
    </View>
  );
};

export default Loading;
