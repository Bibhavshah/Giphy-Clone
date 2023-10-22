import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import Trending from './components/Trending';
import Header from './components/Header';
import FilteredGifs from './components/FilteredGifs';
import axios from 'axios';
import { ThemeProvider, useTheme } from './store/ThemeContext';

const apiUrl = 'https://api.giphy.com/v1/gifs';

function App() {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchStart, setSearchStart] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [offsetSearchData, setOffsetSearchData] = useState(0);
  const [searchLoading, setSearchLoading] = useState(false);

  const searchGifs = async () => {
    if (searchQuery) {
      try {
        const response = await axios.get(
          `${apiUrl}/search?api_key=${process.env.EXPO_PUBLIC_GIPHY_API_KEY}&q=${searchQuery}&limit=10&offset=${offsetSearchData}`
        );
        setOffsetSearchData(offsetSearchData + 10);
        setSearchData([...searchData, ...response.data.data]);
        setSearchLoading(false);
      } catch (error) {
        console.error('Error searching GIFs', error);
      }
    }
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.primaryBackground,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Header
        searchStart={searchStart}
        setSearchStart={setSearchStart}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchGifs={searchGifs}
      />
      {!searchStart ? (
        <Trending />
      ) : (
        <FilteredGifs
          searchQuery={searchQuery}
          searchData={searchData}
          searchLoading={searchLoading}
          searchGifs={searchGifs}
        />
      )}
      <StatusBar style="auto" />
    </View>
  );
}

export default AppWrapper = () => {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
};
