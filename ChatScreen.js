import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import io from 'socket.io-client';
import ImagePicker from 'react-native-image-picker';
import EmojiSelector from 'react-native-emoji-selector';
import messaging from '@react-native-firebase/messaging';
import StickerPicker from './StickerPicker';

const serverUrl = 'http://192.168.1.44:3000'; // Ganti dengan URL server Anda

const ChatScreen = () => {
  const [socket, setSocket] = useState(null);
  const [userId, setUserId] = useState('');
  const [roomId, setRoomId] = useState('');
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [keyboardOffset, setKeyboardOffset] = useState(0);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showStickerPicker, setShowStickerPicker] = useState(false);
  const [activeUsers, setActiveUsers] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [date, setDate] = useState('');
  const [filteredMessages, setFilteredMessages] = useState([]);

  useEffect(() => {
    const newSocket = io(serverUrl);
    setSocket(newSocket);

    const randomUserId = `User_${Math.floor(Math.random() * 10000)}`;
    setUserId(randomUserId);

    messaging()
      .getToken()
      .then(token => {
        console.log('FCM Token:', token);
        newSocket.emit('set_fcm_token', {userId: randomUserId, token});
      });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('connect', () => {
        console.log('Connected to server');
        socket.emit('user_active', {userId});
      });

      socket.on('user_joined', (roomId, activeUsers) => {
        console.log(`User joined room ${roomId}`);
        setActiveUsers(activeUsers);
      });

      socket.on('user_left', (roomId, activeUsers) => {
        console.log(`User left room ${roomId}`);
        setActiveUsers(activeUsers);
      });

      socket.on('receive_message', (roomId, message) => {
        console.log(`Received message in room ${roomId}`);
        setMessages(prevMessages => [...prevMessages, message]);
      });

      socket.on('receive_reaction', (roomId, messageId, reaction) => {
        console.log(`Received reaction in room ${roomId}`);
        setMessages(prevMessages =>
          prevMessages.map(msg =>
            msg.id === messageId
              ? {...msg, reactions: [...msg.reactions, reaction]}
              : msg,
          ),
        );
      });

      socket.on('receive_read_receipt', (roomId, messageId, userId) => {
        console.log(`Received read receipt in room ${roomId}`);
        setMessages(prevMessages =>
          prevMessages.map(msg =>
            msg.id === messageId
              ? {...msg, readBy: [...msg.readBy, userId]}
              : msg,
          ),
        );
      });

      socket.on('active_users', users => {
        setActiveUsers(users);
      });
    }
  }, [socket]);

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(prev => !prev);
  };

  const toggleStickerPicker = () => {
    setShowStickerPicker(prev => !prev);
  };

  const handleEmojiSelected = emoji => {
    setMessage(prevMessage => prevMessage + emoji);
  };

  const handleSendMessage = () => {
    if (message.trim() === '') return;

    const newMessage = {
      id: new Date().getTime(),
      userId,
      roomId,
      text: message,
      date: new Date().toISOString(),
      readBy: [userId],
      reactions: [],
    };

    socket.emit('send_message', newMessage);
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setMessage('');
  };

  const handleAddReaction = (roomId, messageId, reaction) => {
    const newReaction = {
      userId,
      reaction,
    };

    socket.emit('add_reaction', {roomId, messageId, reaction: newReaction});
    setMessages(prevMessages =>
      prevMessages.map(msg =>
        msg.id === messageId
          ? {...msg, reactions: [...msg.reactions, newReaction]}
          : msg,
      ),
    );
  };

  const handleMarkAsRead = roomId => {
    const unreadMessages = messages.filter(
      msg => msg.roomId === roomId && !msg.readBy.includes(userId),
    );
    unreadMessages.forEach(msg => {
      socket.emit('mark_as_read', {roomId, messageId: msg.id, userId});
      setMessages(prevMessages =>
        prevMessages.map(prevMsg =>
          prevMsg.id === msg.id
            ? {...prevMsg, readBy: [...prevMsg.readBy, userId]}
            : prevMsg,
        ),
      );
    });
  };

  const handleSendImage = () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error:', response.error);
      } else {
        const imageMessage = {
          id: new Date().getTime(),
          userId,
          roomId,
          image: response.data,
          date: new Date().toISOString(),
          readBy: [userId],
          reactions: [],
        };

        socket.emit('send_message', imageMessage);
        setMessages(prevMessages => [...prevMessages, imageMessage]);
      }
    });
  };

  const handleScroll = event => {
    setKeyboardOffset(event.nativeEvent.contentOffset.y);
  };

  const handleSearchMessages = () => {
    socket.emit('search_messages', {roomId, keyword, date});
  };

  useEffect(() => {
    console.log('socket', socket);
    if (socket && socket.on) {
      socket.on('filtered_messages', filteredMessages => {
        setFilteredMessages(filteredMessages);
      });
    }
  }, [socket]);

  const handleSelectSticker = sticker => {
    setMessage(prevMessage => prevMessage + sticker);
    setShowStickerPicker(false);
  };

  console.log(
    'message',
    filteredMessages.length > 0 ? filteredMessages : messages,
  );

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior="padding"
      keyboardVerticalOffset={keyboardOffset}>
      <View style={{padding: 10}}>
        <Text style={{fontWeight: 'bold', color: 'black'}}>Active Users:</Text>
        {activeUsers.map((user, index) => (
          <Text key={index}>{user}</Text>
        ))}
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderTopWidth: 1,
          padding: 10,
        }}>
        <TouchableOpacity onPress={toggleEmojiPicker} style={{marginRight: 10}}>
          <Text>😀</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={toggleStickerPicker}
          style={{marginRight: 10}}>
          <Text>🎉</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSendImage} style={{marginRight: 10}}>
          <Text>📷</Text>
        </TouchableOpacity>
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
          style={{flex: 1, borderWidth: 1, padding: 10}}
        />
        <TouchableOpacity onPress={handleSendMessage} style={{marginLeft: 10}}>
          <Text>Send</Text>
        </TouchableOpacity>
      </View>
      {showEmojiPicker && (
        <EmojiSelector onEmojiSelected={handleEmojiSelected} />
      )}
      {showStickerPicker && (
        <StickerPicker onSelectSticker={handleSelectSticker} />
      )}
      <FlatList
        data={filteredMessages.length > 0 ? filteredMessages : messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => {
          if (item.userId === userId) {
            return (
              <TouchableOpacity onPress={() => handleMarkAsRead(item.roomId)}>
                <View
                  style={{
                    padding: 10,
                    alignSelf: 'flex-end',
                    backgroundColor: 'lightgreen',
                  }}>
                  <Text style={{color: 'black'}}>{item.text}</Text>
                  {item.reactions && item.reactions.length > 0 && (
                    <View style={{flexDirection: 'row', marginTop: 5}}>
                      {item.reactions.map((reaction, index) => (
                        <Text
                          key={index}
                          style={{marginRight: 5, color: 'black'}}
                          onPress={() =>
                            handleAddReaction(
                              item.roomId,
                              item.id,
                              reaction.reaction,
                            )
                          }>
                          {reaction.userId === userId ? 'You' : reaction.userId}{' '}
                          reacted: {reaction.reaction}
                        </Text>
                      ))}
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            );
          } else {
            return (
              <TouchableOpacity onPress={() => handleMarkAsRead(item.roomId)}>
                <View style={{padding: 10, backgroundColor: 'lightblue'}}>
                  <Text style={{color: 'black'}}>{`${item.userId}: `}</Text>
                  <Text>{item.text}</Text>
                  {item.reactions && item.reactions.length > 0 && (
                    <View style={{flexDirection: 'row', marginTop: 5}}>
                      {item.reactions.map((reaction, index) => (
                        <Text
                          key={index}
                          style={{marginRight: 5, color: 'black'}}
                          onPress={() =>
                            handleAddReaction(
                              item.roomId,
                              item.id,
                              reaction.reaction,
                            )
                          }>
                          {reaction.userId === userId ? 'You' : reaction.userId}{' '}
                          reacted: {reaction.reaction}
                        </Text>
                      ))}
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            );
          }
        }}
        onScroll={handleScroll}
      />
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;
