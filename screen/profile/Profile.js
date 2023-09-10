import {
  View,
  Text,
  Animated,
  StyleSheet,
  Switch,
  Dimensions,
} from 'react-native';
import React, {useRef, useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {lightblue, red} from '../../assets/color/color';
import {Image} from 'react-native';
import {imageDummy1} from '../../assets/image/imageDummy';
import {useNavigation} from '@react-navigation/native';

const Profile = () => {
  const navigation = useNavigation();

  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  const fadeAnim2 = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  const fadeAnim3 = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  const fadeAnim4 = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  const fadeAnim5 = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  const fadeAnim6 = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  const slideAnimContainer = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  const slideAnimContainer2 = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  const slideAnimContainer3 = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    const anim = {
      array: {
        array: {
          array: {
            array: {
              array: {
                array: {
                  type: 'slide',
                  anim: slideAnimContainer,
                  array: {
                    type: 'slide',
                    anim: slideAnimContainer2,
                    array: {
                      type: 'slide',
                      anim: slideAnimContainer3,
                      array: false,
                    },
                  },
                },
                anim: fadeAnim6,
              },
              anim: fadeAnim5,
            },

            anim: fadeAnim4,
          },

          anim: fadeAnim3,
        },

        anim: fadeAnim2,
      },

      anim: fadeAnim,
    };

    const runAnim = ({
      data,
      toValue = 1,
      duration = 500,
      toValue2 = -Dimensions.get('screen').width,
    }) => {
      if (data.type && data.type === 'slide') {
        Animated.timing(data.anim, {
          toValue: toValue2,
          duration: duration,
          useNativeDriver: false,
        }).start(cb => {
          if (cb.finished && data.array) {
            runAnim({data: data.array, toValue, duration, toValue2});
          }
        });
      } else {
        Animated.timing(data.anim, {
          toValue: toValue,
          duration: duration,
          useNativeDriver: false,
        }).start(cb => {
          if (cb.finished && data.array) {
            runAnim({data: data.array, toValue, duration, toValue2});
          }
        });
      }
    };

    navigation.addListener('blur', () => {
      runAnim({
        data: anim,
        toValue: 0,
        duration: 0,
        toValue2: Dimensions.get('screen').width,
      });
    });

    navigation.addListener('focus', cb => {
      runAnim({data: anim, toValue: 1});
    });
  }, [
    fadeAnim,
    fadeAnim2,
    fadeAnim3,
    fadeAnim4,
    fadeAnim5,
    fadeAnim6,
    slideAnimContainer,
    navigation,
  ]);

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View
      style={{
        flex: 1,
      }}>
      <View
        style={{
          flexDirection: 'row',
          // alignItems: 'center',
          paddingVertical: 15,
          backgroundColor: lightblue[700],
          borderRadius: 10,
        }}>
        <Animated.View
          style={{
            opacity: fadeAnim,
          }}>
          <TouchableOpacity
            style={{
              alignItems: 'center',
            }}
            onPress={() => {
              navigation.goBack();
            }}>
            <Icon color={lightblue[100]} name="arrow-left" size={30} />
          </TouchableOpacity>
        </Animated.View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
          }}>
          <Animated.View
            style={{
              opacity: fadeAnim,
            }}>
            <Image
              source={{
                uri: imageDummy1,
              }}
              height={100}
              width={100}
              borderRadius={50}
              style={{
                borderColor: lightblue[300],
                borderWidth: 2,
              }}
            />
          </Animated.View>
          <Animated.View
            style={{
              opacity: fadeAnim2,
            }}>
            <Text
              style={{
                color: lightblue[100],
                fontWeight: 'bold',
                fontSize: 30,
              }}>
              Name User
            </Text>
          </Animated.View>

          <Animated.View
            style={{
              opacity: fadeAnim3,
            }}>
            <Text
              style={{
                color: lightblue[200],
                fontWeight: 'bold',
                fontSize: 15,
              }}>
              +62 855-2435-1474
            </Text>
          </Animated.View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '50%',
              marginVertical: 2,
            }}>
            <Animated.View
              style={{
                opacity: fadeAnim4, // Bind opacity to animated value
              }}>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                }}>
                <Icon color={lightblue[100]} name="phone" size={30} />
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: lightblue[100],
                  }}>
                  Audio
                </Text>
              </TouchableOpacity>
            </Animated.View>

            <Animated.View
              style={{
                opacity: fadeAnim5, // Bind opacity to animated value
              }}>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                }}>
                <Icon color={lightblue[100]} name="video" size={30} />
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: lightblue[100],
                  }}>
                  Video
                </Text>
              </TouchableOpacity>
            </Animated.View>

            <Animated.View
              style={{
                opacity: fadeAnim6, // Bind opacity to animated value
              }}>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                }}>
                <Icon color={lightblue[100]} name="magnify" size={30} />
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: lightblue[100],
                  }}>
                  Search
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>

        <Animated.View
          style={{
            opacity: fadeAnim,
          }}>
          <TouchableOpacity>
            <Icon color={lightblue[100]} name="dots-vertical" size={30} />
          </TouchableOpacity>
        </Animated.View>
      </View>
      <Animated.View
        style={{
          transform: [{translateX: slideAnimContainer}],
          opacity: fadeAnim6,
        }}>
        <View style={styles.container2}>
          <Text style={[styles.mcm, styles.bioText]}>User Bio</Text>
        </View>
      </Animated.View>

      <Animated.View style={{transform: [{translateX: slideAnimContainer2}]}}>
        <View style={styles.container2}>
          <View style={styles.subContainer2}>
            <Text style={styles.media}>Media</Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              toggleSwitch();
            }}
            style={{
              ...styles.subContainer2,
              justifyContent: 'center',
            }}>
            <Text style={styles.mcm}>
              <Icon name="bell" size={20} /> Mute Notification
            </Text>
            <Switch
              trackColor={{false: lightblue[50], true: lightblue[300]}}
              thumbColor={isEnabled ? lightblue[500] : lightblue[400]}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => {
                toggleSwitch();
              }}
              value={isEnabled}
              style={{
                position: 'absolute',
                right: 0,
              }}
            />
          </TouchableOpacity>
          <View style={styles.subContainer2}>
            <Text style={styles.mcm}>
              <Icon name="music-note" size={20} /> Custom Notification
            </Text>
          </View>
          <View style={styles.subContainer2}>
            <Text style={styles.mcm}>
              <Icon name="image" size={20} /> Media Visibility
            </Text>
          </View>
        </View>
      </Animated.View>

      <Animated.View
        style={{
          transform: [{translateX: slideAnimContainer3}],
        }}>
        <View style={[styles.container2]}>
          <View style={styles.subContainer2}>
            <Text style={[styles.mcm, styles.throuble_user]}>
              <Icon name="block-helper" size={20} /> Block Name User
            </Text>
          </View>
          <View style={styles.subContainer2}>
            <Text style={[styles.mcm, styles.throuble_user]}>
              <Icon name="thumb-down" size={20} /> Report Name user
            </Text>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container2: {
    backgroundColor: lightblue[700],
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    right: -Dimensions.get('screen').width,
  },
  subContainer2: {
    paddingVertical: 5,
  },
  media: {
    color: lightblue[200],
    fontSize: 15,
    fontWeight: '600',
  },
  mcm: {
    color: lightblue[100],
    fontSize: 20,
    fontWeight: '600',
  },

  bioText: {
    fontWeight: '500',
  },
  throuble_user: {
    color: red[300],
    fontWeight: 'bold',
  },
});

export default Profile;
