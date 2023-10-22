import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Text,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { useTheme } from '../../store/ThemeContext';

const Header = ({
  searchStart,
  setSearchStart,
  searchQuery,
  setSearchQuery,
  searchGifs,
}) => {
  const { theme, toggleTheme } = useTheme();

  const onHeaderPress = () => {
    setSearchStart(true);
    searchGifs();
  };

  const handleBackPress = () => {
    setSearchStart(false);
    setSearchQuery('');
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 5,
        }}
      >
        <View style={styles.innerContainer}>
          {searchStart && (
            <Ionicons
              name="arrow-back"
              size={24}
              color="white"
              onPress={handleBackPress}
            />
          )}
          <TouchableOpacity onPress={onHeaderPress}>
            <Image
              style={styles.logo}
              source={
                theme.primaryBackground === 'black'
                  ? require('../../assets/logo.png')
                  : require('../../assets/logo2.png')
              }
              color={theme.text}
            />
          </TouchableOpacity>
        </View>
        <Pressable
          onPress={toggleTheme}
          style=
          {{
            backgroundColor: theme.text,
            padding: 10,
            borderRadius: 5,
          }}
        >
          <Text
            style={{
              color: theme.primaryBackground,
              fontSize: 16,
              fontWeight: 'bold',
            }}>Toggle Theme
          </Text>
        </Pressable>
      </View>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          onChangeText={(text) => setSearchQuery(text)}
          value={searchQuery}
        />
        <EvilIcons
          onPress={onHeaderPress}
          name="search"
          size={26}
          color="white"
          style={styles.searchIcon}
        />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    zIndex: 100,
    paddingTop: 50,
    flexDirection: 'col',
    justifyContent: 'space-between',
    width: '100%',
  },
  innerContainer: {
    flexDirection: 'row',
  },
  logo: {
    width: 100,
    height: 20,
    resizeMode: 'contain',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 10,
    borderColor: 'grey',
    borderWidth: 1,
  },
  searchIcon: {
    color: 'black',
    width: 20,
    height: 20,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
});
