import React, {useState, useEffect, useRef} from 'react';
import {Animated, View, Dimensions} from 'react-native';
import {lightblue} from '../assets/color/color';

const {height, width} = Dimensions.get('window');

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const BackroundBubble = () => {
  const [openBubleTop, setOpenBubleTop] = useState(true);
  const [openTopRight, setOpenTopRight] = useState(true);
  const [openBottomLeft, setOpenBottomLeft] = useState(true);
  const [openBubleBottom, setOpenBubleBottom] = useState(true);
  useEffect(() => {
    if (Math.random() >= 0.5) {
      setOpenBubleTop(false);
    }

    if (Math.random() >= 0.5) {
      setOpenTopRight(false);
    }

    if (Math.random() >= 0.5) {
      setOpenBottomLeft(false);
    }

    if (Math.random() >= 0.5) {
      setOpenBubleBottom(false);
    }
  }, []);

  return (
    <>
      {openBubleTop ? <BubleTop /> : <></>}
      {openTopRight ? <TopRight /> : <></>}
      {openBottomLeft ? <BottomLeft /> : <></>}
      {openBubleBottom ? <BubleBottom /> : <></>}
    </>
  );
};

const TopRight = () => {
  const heightAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    changeHeight();
  }, []);
  const changeHeight = () => {
    // Menghasilkan angka acak antara 100 dan 500
    var randomNumber = getRandomNumber(1000, 1500);
    var toValue = getRandomNumber(height / 5, height / 3);

    Animated.timing(heightAnim, {
      toValue: toValue,
      duration: 1000,
      useNativeDriver: false,
    }).start(() => {
      setTimeout(() => {
        changeHeight();
      }, randomNumber);
    });
  };

  return (
    <Animated.View
      style={{
        width: '70%',
        position: 'absolute',
        height: heightAnim,
        backgroundColor: lightblue[200],
        right: 0,
        top: 0,
        borderBottomLeftRadius: height / 2,
      }}
    />
  );
};

const BottomLeft = () => {
  const heightAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    changeHeight();
  }, []);

  const changeHeight = () => {
    // Menghasilkan angka acak antara 100 dan 500
    var randomNumber = getRandomNumber(1000, 1500);
    var toValue = getRandomNumber(height / 5, height / 3);

    Animated.timing(heightAnim, {
      toValue: toValue,
      duration: 1000,
      useNativeDriver: false,
    }).start(() => {
      setTimeout(() => {
        changeHeight();
      }, randomNumber);
    });
  };
  return (
    <Animated.View
      style={{
        width: '70%',
        position: 'absolute',
        height: heightAnim,
        backgroundColor: lightblue[200],
        left: 0,
        bottom: 0,
        borderTopRightRadius: height / 2,
      }}
    />
  );
};
const BubleBottom = () => {
  const heightAnim = useRef(new Animated.Value(0)).current;
  const widthAnim = useRef(new Animated.Value(0)).current;
  const bottomAnim = useRef(new Animated.Value(0)).current;
  const rightAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    changeWidth();
    changeBottom();
    changeRight();
    changeHeight();
  }, []);

  const changeHeight = () => {
    // Menghasilkan angka acak antara 100 dan 500
    var randomNumber = getRandomNumber(2000, 3000);
    var toValue = getRandomNumber(height / 5, height / 3);

    Animated.timing(heightAnim, {
      toValue: toValue,
      duration: 1000,
      useNativeDriver: false,
    }).start(() => {
      setTimeout(() => {
        changeHeight();
      }, randomNumber);
    });
  };

  const changeWidth = () => {
    // Menghasilkan angka acak antara 100 dan 500
    var randomNumber = getRandomNumber(2000, 3000);
    var toValue = getRandomNumber(height / 5, height / 3);

    Animated.timing(widthAnim, {
      toValue: toValue,
      duration: 1000,
      useNativeDriver: false,
    }).start(() => {
      setTimeout(() => {
        changeWidth();
      }, randomNumber);
    });
  };

  const changeBottom = () => {
    // Menghasilkan angka acak antara 100 dan 500
    var randomNumber = getRandomNumber(2000, 3000);
    var toValue = getRandomNumber(0, height / 2);

    Animated.timing(bottomAnim, {
      toValue: toValue,
      duration: 1000,
      useNativeDriver: false,
    }).start(() => {
      setTimeout(() => {
        changeBottom();
      }, randomNumber);
    });
  };

  const changeRight = () => {
    // Menghasilkan angka acak antara 100 dan 500
    var randomNumber = getRandomNumber(2000, 3000);
    var toValue = getRandomNumber(0, width / 2);

    Animated.timing(rightAnim, {
      toValue: toValue,
      duration: 1000,
      useNativeDriver: false,
    }).start(() => {
      setTimeout(() => {
        changeRight();
      }, randomNumber);
    });
  };

  return (
    <Animated.View
      style={{
        width: widthAnim,
        position: 'absolute',
        height: heightAnim,
        backgroundColor: lightblue[200],
        right: rightAnim,
        bottom: bottomAnim,
        borderRadius: height / 2,
      }}
    />
  );
};

const BubleTop = () => {
  const heightAnim = useRef(new Animated.Value(0)).current;
  const widthAnim = useRef(new Animated.Value(0)).current;
  const topAnim = useRef(new Animated.Value(0)).current;
  const rightAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    changeWidth();
    changeTop();
    changeLeft();
    changeHeight();
  }, []);

  const changeHeight = () => {
    // Menghasilkan angka acak antara 100 dan 500
    var randomNumber = getRandomNumber(2000, 3000);
    var toValue = getRandomNumber(height / 5, height / 3);

    Animated.timing(heightAnim, {
      toValue: toValue,
      duration: 1000,
      useNativeDriver: false,
    }).start(() => {
      setTimeout(() => {
        changeHeight();
      }, randomNumber);
    });
  };

  const changeWidth = () => {
    // Menghasilkan angka acak antara 100 dan 500
    var randomNumber = getRandomNumber(2000, 3000);
    var toValue = getRandomNumber(height / 5, height / 3);

    Animated.timing(widthAnim, {
      toValue: toValue,
      duration: 1000,
      useNativeDriver: false,
    }).start(() => {
      setTimeout(() => {
        changeWidth();
      }, randomNumber);
    });
  };

  const changeTop = () => {
    // Menghasilkan angka acak antara 100 dan 500
    var randomNumber = getRandomNumber(2000, 3000);
    var toValue = getRandomNumber(0, height / 2);

    Animated.timing(topAnim, {
      toValue: toValue,
      duration: 1000,
      useNativeDriver: false,
    }).start(() => {
      setTimeout(() => {
        changeTop();
      }, randomNumber);
    });
  };

  const changeLeft = () => {
    // Menghasilkan angka acak antara 100 dan 500
    var randomNumber = getRandomNumber(2000, 3000);
    var toValue = getRandomNumber(0, width / 2);

    Animated.timing(rightAnim, {
      toValue: toValue,
      duration: 1000,
      useNativeDriver: false,
    }).start(() => {
      setTimeout(() => {
        changeLeft();
      }, randomNumber);
    });
  };

  return (
    <Animated.View
      style={{
        width: widthAnim,
        position: 'absolute',
        height: heightAnim,
        backgroundColor: lightblue[200],
        left: rightAnim,
        top: topAnim,
        borderRadius: height / 2,
      }}
    />
  );
};

export default BackroundBubble;
