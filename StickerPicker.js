import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const StickerPicker = ({ onSelectSticker }) => {
  const stickers = ["😀", "🎉", "🚀", "❤️", "🐶", "🍕"]; // Daftar stiker emoji sederhana

  return (
    <View style={styles.container}>
      {stickers.map((sticker) => (
        <TouchableOpacity
          key={sticker}
          onPress={() => onSelectSticker(sticker)}
          style={styles.sticker}
        >
          <Text style={styles.stickerText}>{sticker}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#f0f0f0",
  },
  sticker: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#fff",
  },
  stickerText: {
    fontSize: 24,
  },
});

export default StickerPicker;
