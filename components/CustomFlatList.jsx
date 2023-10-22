import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Text,
  Share,
  ActivityIndicator,
  Modal,
  Alert,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import moment from 'moment';

const numColumns = 2;

const CustomFlatList = ({ data, fetchGifs, loading }) => {
  const [selectedGif, setSelectedGif] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleGifPress = (gif) => {
    setSelectedGif(gif);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setSelectedGif(null);
    setIsModalVisible(false);
  };

  const gifUrl = selectedGif ? selectedGif.images.fixed_height.url : '';
  const handleDownload = async () => {
    let date = moment().format('YYYYMMDDhhmmss');
    let fileUri = FileSystem.documentDirectory + `${date}.gif`;
    try {
      const res = await FileSystem.downloadAsync(gifUrl, fileUri);
      saveFile(res.uri);
      Alert.alert("Success", "Image saved to Download folder");
    } catch (err) {
      console.log('FS Err: ', err);
    }
  };

  const saveFile = async (fileUri) => {
    const { status } = await MediaLibrary.getPermissionsAsync();

    if (status === "granted") {
      try {
        const asset = await MediaLibrary.createAssetAsync(fileUri);
        const album = await MediaLibrary.getAlbumAsync('Download');
        if (album == null) {
          await MediaLibrary.createAlbumAsync('Download', asset, false);
        } else {
          await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
        }
      } catch (err) {
        console.log("Save err: ", err);
      }
    } else if (status === "undetermined" || status === "limited") {
      const { status: newStatus } = await MediaLibrary.requestPermissionsAsync();
      if (newStatus === "granted") {
        saveFile(fileUri);
      } else {
        alert("Please allow permissions to download");
      }
    } else {
      alert("Please allow permissions to download");
    }
  }

  const shareGif = async () => {
    if (selectedGif) {
      try {
        const message = `Check out this GIF: ${selectedGif.images.fixed_height.url}`;
        await Share.share({
          title: 'Share GIF',
          message: message,
        });
      } catch (error) {
        console.error('Error sharing GIF', error);
      }
    }
  };

  const renderItem = ({ item }) => (
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={() => handleGifPress(item)}>
        <Image
          source={{ uri: item.images.fixed_height.url }}
          style={{ flex: 1, aspectRatio: 1 }}
        />
      </TouchableOpacity>
    </View>
  );

  const renderFooter = () => {
    return loading ? (
      <ActivityIndicator size="large" color="#0000ff" style={{ margin: 16 }} />
    ) : null;
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.slug}
        numColumns={numColumns}
        onEndReached={fetchGifs}
        // onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
      />
      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.7)',
          }}
        >
          <View
            style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}
          >
            <View style={{ flexDirection: 'row-reverse', marginBottom: 5 }}>
              <TouchableOpacity onPress={closeModal} style={{}}>
                <AntDesign name="closesquare" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <Image
              source={{
                uri: selectedGif ? selectedGif.images.fixed_height.url : '',
              }}
              style={{ width: 200, height: 200 }}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}
            >
              <TouchableOpacity onPress={handleDownload} style={styles.button}>
                <AntDesign name="download" size={24} color="white" />
                <Text style={styles.buttonText}>Download</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={shareGif} style={styles.button}>
                <Entypo name="share" size={24} color="white" />
                <Text style={styles.buttonText}>Share</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CustomFlatList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  button: {
    backgroundColor: 'grey',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    marginLeft: 5,
  },
});
