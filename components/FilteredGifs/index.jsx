import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomFlatList from '../CustomFlatList';
import { useTheme } from '../../store/ThemeContext';

const FilteredGifs = ({
  searchQuery,
  searchData,
  searchLoading,
  searchGifs,
}) => {
  const { theme } = useTheme();
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
        <Text
          style={{
            color: theme.text,
            fontSize: 30,
            fontWeight: 'bold',
            marginLeft: 10,
          }}
        >
          {searchQuery}
        </Text>
      </View>
      <CustomFlatList
        data={searchData}
        loading={searchLoading}
        fetchGifs={searchGifs}
      />
    </View>
  );
};

export default FilteredGifs;
