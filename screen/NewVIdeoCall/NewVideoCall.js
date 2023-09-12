import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  RTCPeerConnection,
  mediaDevices,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  RTCIceCandidate,
} from 'react-native-webrtc';
import {lightblue} from '../../assets/color/color';
import {db} from '../VideoCall/utilities/firebase';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';

let mediaConstraints = {
  audio: true,
  video: {
    frameRate: 30,
    facingMode: 'user',
  },
};

const servers = {
  iceServers: [
    {
      urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
    },
  ],
  iceCandidatePoolSize: 10,
};

const pc = new RTCPeerConnection(servers);
let localStream = null;
let remoteStream = null;

const NewVideoCall = () => {
  const [stateLocalMediaStream, setStateLocalMediaStream] = useState(false);
  const [stateRemoteMediaStream, setStateRemoteMediaStream] = useState(false);

  const [callButton, setCallButton] = useState(true);
  const [answerButton, setAnswerButton] = useState(true);
  const [webcamButton, setWebcamButton] = useState(false);
  const [hangupButton, setHangupButton] = useState(true);

  const [callInput, setCallInput] = useState('');
  const startWebCam = async () => {
    localStream = await mediaDevices.getDisplayMedia({
      video: true,
      audio: true,
    });
    remoteStream = new MediaStream();

    // Push tracks from local stream to peer connection
    localStream.getTracks().forEach(track => {
      pc.addTrack(track, localStream);
    });

    // Pull tracks from remote stream, add to video stream
    pc.addEventListener('track', event => {
      event.streams[0].getTracks().forEach(track => {
        remoteStream.addTrack(track);
      });
    });

    setStateLocalMediaStream(localStream);
    setStateRemoteMediaStream(remoteStream);

    setCallButton(false);
    setAnswerButton(false);
    setWebcamButton(true);
  };

  const createCallOffer = async () => {
    // Reference Firestore collections for signaling
    const callDoc = db.collection('calls').doc();
    const offerCandidates = callDoc.collection('offerCandidates');
    const answerCandidates = callDoc.collection('answerCandidates');

    setCallInput(callDoc.id);

    // Get candidates for caller, save to db
    pc.addEventListener('icecandidate', event => {
      event.candidate && offerCandidates.add(event.candidate.toJSON());
    });

    // Create offer
    const offerDescription = await pc.createOffer();
    await pc.setLocalDescription(offerDescription);

    const offer = {
      sdp: offerDescription.sdp,
      type: offerDescription.type,
    };

    await callDoc.set({offer});

    // Listen for remote answer
    callDoc.onSnapshot(snapshot => {
      const data = snapshot.data();
      if (!pc.currentRemoteDescription && data?.answer) {
        const answerDescription = new RTCSessionDescription(data.answer);
        pc.setRemoteDescription(answerDescription);
      }
    });

    // When answered, add candidate to peer connection
    answerCandidates.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          const candidate = new RTCIceCandidate(change.doc.data());
          pc.addIceCandidate(candidate);
        }
      });
    });

    setHangupButton(false);
  };

  // 3. Answer the call with the unique ID
  const answer = async () => {
    const callId = callInput;
    const callDoc = db.collection('calls').doc(callId);
    const answerCandidates = callDoc.collection('answerCandidates');
    const offerCandidates = callDoc.collection('offerCandidates');

    pc.onicecandidate = event => {
      event.candidate && answerCandidates.add(event.candidate.toJSON());
    };

    const callData = (await callDoc.get()).data();

    const offerDescription = callData.offer;
    await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));

    const answerDescription = await pc.createAnswer();
    await pc.setLocalDescription(answerDescription);

    const answer = {
      type: answerDescription.type,
      sdp: answerDescription.sdp,
    };

    await callDoc.update({answer});

    offerCandidates.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          let data = change.doc.data();
          pc.addIceCandidate(new RTCIceCandidate(data));
        }
      });
    });
  };

  return (
    <View
      style={{
        flex: 1,
      }}>
      {stateLocalMediaStream ? (
        <View
          style={{
            flex: 1,
            backgroundColor: lightblue[200],
          }}>
          <RTCView
            style={{
              flex: 1,
            }}
            mirror={true}
            // objectFit={'cover'}
            streamURL={stateLocalMediaStream.toURL()}
            zOrder={0}
          />
        </View>
      ) : (
        <></>
      )}
      {stateRemoteMediaStream ? (
        <View
          style={{
            flex: 1,
            backgroundColor: lightblue[200],
          }}>
          <RTCView
            style={{
              flex: 1,
            }}
            mirror={true}
            objectFit={'cover'}
            streamURL={stateRemoteMediaStream.toURL()}
            zOrder={0}
          />
        </View>
      ) : (
        <></>
      )}

      <View
        style={{
          alignItems: 'center',
          marginTop: 5,
        }}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={{
            padding: 10,
            backgroundColor: lightblue[900],
          }}
          onPress={() => startWebCam()}>
          <Text
            style={{
              color: lightblue[100],
            }}>
            Start Camera
          </Text>
        </TouchableOpacity>

        <View
          style={{
            marginVertical: 5,
          }}
        />
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
          }}>
          Create a new Call
        </Text>
        <TouchableOpacity
          activeOpacity={0.5}
          style={{
            padding: 10,
            backgroundColor: lightblue[900],
          }}
          onPress={() => createCallOffer()}>
          <Text
            style={{
              color: lightblue[100],
            }}>
            Create Call (Offer)
          </Text>
        </TouchableOpacity>
        <View
          style={{
            marginVertical: 5,
          }}
        />
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
          }}>
          Join a Call
        </Text>
        <TextInput
          onChangeText={e => setCallInput(e)}
          style={{
            borderColor: lightblue[800],
            padding: 10,
            fontSize: 20,
            borderWidth: 1,
            width: '50%',
          }}
          value={callInput}
        />
        <TouchableOpacity
          activeOpacity={0.5}
          style={{
            padding: 10,
            backgroundColor: lightblue[900],
          }}
          onPress={() => answer()}>
          <Text
            style={{
              color: lightblue[100],
            }}>
            Answer
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NewVideoCall;
