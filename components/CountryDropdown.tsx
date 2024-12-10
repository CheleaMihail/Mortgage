//@ts-nocheck
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { countries } from "countries-list";
import { Picker } from "@react-native-picker/picker";

const CountryDropdown = ({ selectedCountry, setSelectedCountry }) => {
  const [countryList, setCountryList] = useState([]);

  useEffect(() => {
    const countryArray = Object.values(countries).map((country) => ({
      label: country.name,
      value: country.name,
    }));
    setCountryList(countryArray);
  }, []);

  return (
    <View className="gap-2">
      <Text className="font-semibold text-gray-500">Country</Text>
      <View className="w-full border border-gray-300 rounded-md">
        <Picker
          selectedValue={selectedCountry}
          onValueChange={(itemValue) => setSelectedCountry(itemValue)}
        >
          {countryList.map((country, index) => (
            <Picker.Item
              label={country.label}
              value={country.value}
              key={index}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
};

export default CountryDropdown;
