import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import LottieView from 'lottie-react-native';

const Loading = () => {

    let animation = React.createRef();
    useEffect(() => {
      animation.current.play();
    }, [])

    return (
        <View 
          style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#FFFFFF'
          }}
        >
          <LottieView 
            ref={animation}
            loop={true}
            style={{
              width: 250,
              height: 250,
              backgroundColor: '#FFFFFF',
            }}
            source={require('../assets/loading.json')}
          />
          <Text 
            style={{
              fontSize: 20,
              fontFamily: 'Poppins_700Bold'
            }}
          >Loading...</Text>
        </View>
    )
};

export default Loading;