import React, { useState } from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { View, Text, StyleSheet } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

const languages = [
  { title: 'Vietnamese'},
  { title: 'English' },
  { title: 'Spanish' },
  { title: 'French' },
  { title: 'German' },
  { title: 'Chinese' },
  { title: 'Japanese' },
  { title: 'Korean' },
  { title: 'Russian' },
];

export default function LanguageSelector() {
    const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  return (
    <SelectDropdown
      data={languages}
      defaultValue={selectedLanguage}
      onSelect={(selectedItem) => {
        setSelectedLanguage(selectedItem);
        console.log('Selected Language:', selectedItem.title);
      }}
      renderButtonText={(selectedItem) => selectedItem.title}
      renderButton={(selectedItem, isOpened) => (
        <View style={styles.dropdownButtonStyle}>
          <Text style={styles.dropdownButtonTxtStyle}>
            {(selectedItem && selectedItem.title) || 'Select Language'}
          </Text>
          <Text style={styles.dropdownButtonArrowStyle}>{isOpened ? '▲' : '▼'}</Text>
        </View>
      )}
      renderItem={(item, index, isSelected) => (
        <View
          style={{
            ...styles.dropdownItemStyle,
            ...(isSelected && { backgroundColor: '#D2D9DF' }),
          }}
        >
          <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
        </View>
      )}
      showsVerticalScrollIndicator={false}
      dropdownStyle={styles.dropdownMenuStyle}
    />
  );
}

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    width: 140,
    height: 30,
    backgroundColor: 'transparent',
    // borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: wp(5),
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownButtonArrowStyle: {
    fontSize: wp(5),
    // marginLeft: 4,
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: wp(5),
    fontWeight: '500',
    color: '#151E26',
  },
});
