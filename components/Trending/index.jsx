import { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import axios from 'axios';
import React from 'react';
import CustomFlatList from '../CustomFlatList';
import { useTheme } from '../../store/ThemeContext';

const apiUrl = 'https://api.giphy.com/v1/gifs';

const Trending = () => {
  const { theme } = useTheme();
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchGifs = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/trending?api_key=${process.env.EXPO_PUBLIC_GIPHY_API_KEY}&limit=10&offset=${offset}`
      );
      setOffset(offset + 10);
      setData([...data, ...response.data.data]);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchGifs();
  }, []);

  return (
    <View style={{ flex: 1, width: '100%' }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: theme.primaryBackground,
          paddingVertical: 10,
          marginTop: 10,
        }}
      >
        <Feather name="trending-up" size={30} color={theme.text} />
        <Text
          style={{
            color: theme.text,
            fontSize: 30,
            fontWeight: 'bold',
            marginLeft: 10,
          }}
        >
          Trending
        </Text>
      </View>
      <CustomFlatList data={data} loading={loading} fetchGifs={fetchGifs} />
    </View>
  );
};

export default Trending;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  pageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
    paddingVertical: 10,
    marginTop: 10,
  },
  textView: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
