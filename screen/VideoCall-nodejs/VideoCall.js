import React, {useState, useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import {RTCPeerConnection, RTCView, mediaDevices} from 'react-native-webrtc';
import {lightblue} from '../../assets/color/color';

const VideoCallScreen = () => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [peerConnection, setPeerConnection] = useState(null);

  useEffect(() => {
    // Menginisialisasi local media stream
    const initLocalStream = async () => {
      const stream = await mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setLocalStream(stream);
    };
    initLocalStream();
  }, []);

  useEffect(() => {
    if (localStream) {
      // Menginisialisasi peer connection
      const pc = new RTCPeerConnection();

      // Menambahkan local stream ke peer connection
      localStream.getTracks().forEach(track => pc.addTrack(track, localStream));

      // Mengatur event handler untuk remote tracks
      pc.ontrack = event => {
        if (event.streams && event.streams[0]) {
          setRemoteStream(event.streams[0]);
        }
      };

      setPeerConnection(pc);
    }
  }, [localStream]);

  // Fungsi untuk memulai panggilan
  const startCall = async () => {
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    // Kemudian Anda dapat mengirimkan offer ke mitra Anda melalui Firebase atau metode lainnya
  };

  return (
    <View>
      <Text
        style={{
          color: lightblue[900],
        }}>
        Video Call Screen
      </Text>
      <Text
        style={{
          color: lightblue[900],
        }}>
        Local
      </Text>
      <RTCView
        streamURL={localStream?.toURL()}
        style={{width: 200, height: 150}}
      />
      <Text
        style={{
          color: lightblue[900],
        }}>
        Remote
      </Text>
      <RTCView
        streamURL={remoteStream?.toURL()}
        style={{width: 200, height: 150}}
      />
      <Button title="Start Call" onPress={startCall} />
    </View>
  );
};

export default VideoCallScreen;
