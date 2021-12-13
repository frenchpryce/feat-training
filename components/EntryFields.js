import React from "react";
import { StyleSheet, View, TextInput, Platform } from "react-native";
import DropDownPicker from "react-native-custom-dropdown";

const LongField = (props) => {
  return (
    <TextInput
      style={[styles.longfield, { marginTop: props.marginTop, marginBottom: props.marginBottom }]}
      placeholder={props.placeholder}
      onChangeText={props.onChangeText}
      secureTextEntry={props.security}
      keyboardType={props.keyboardType}
      value={props.value}
      autoCapitalize={props.autoCapitalize}
    />
  );
};

const LargeField = (props) => {
  return (
    <TextInput
      style={[styles.largefield, { marginTop: props.marginTop, textAlignVertical: 'top', paddingTop: 20 }]}
      placeholder={props.placeholder}
      onChangeText={props.onChangeText}
      secureTextEntry={props.security}
      value={props.value}
      autoCapitalize={props.autoCapitalize}
    />
  );
};

const ShortField = (props) => {
  return (
    <TextInput
      style={[
        styles.shortfield,
        {
          marginTop: props.marginTop,
          flex: props.flex,
          marginLeft: props.marginLeft,
          marginRight: props.marginRight,
        },
      ]}
      autoCapitalize={props.autoCapitalize}
      keyboardType={props.keyboardType}
      placeholder={props.placeholder}
      onChangeText={props.onChangeText}
      secureTextEntry={props.security}
      value={props.value}
    />
  );
};

const LongDropDown = (props) => {
  return (
    <View
      style={{
        height: "auto",
        width: "auto",
      }}
    >
      <DropDownPicker
        containerStyle={{
          marginTop: props.marginTop,
          height: 50,
          width: "100%",
        }}
        style={{
          backgroundColor: "#FFFFFF",
          borderColor: "#FFFFFF",
          borderBottomColor: "#000000",
        }}
        dropDownStyle={{
          backgroundColor: "#FFFFFF",
        }}
        itemStyle={{
          justifyContent: "flex-start",
        }}
        placeholderStyle={{
          fontFamily: "OpenSans_300Light_Italic",
          fontSize: 16,
          color: "#A6A6A6",
        }}
        labelStyle={{
          fontFamily: "OpenSans_300Light_Italic",
          fontSize: 16,
          color: "#000000",
        }}
        items={props.item}
        defaultValue={props.defaultValue}
        onChangeItem={props.onChangeItem}
        placeholder={props.placeholder}
        dropDownMaxHeight={150}
      />
    </View>
  );
};

const ShortDropDown = (props) => {
  return (
    <View
      style={{
        height: "auto",
        width: "auto",
      }}
    >
      <DropDownPicker
        containerStyle={{
          marginTop: props.marginTop,
          height: 50,
          width: "50%",
        }}
        style={{
          backgroundColor: "#FFFFFF",
          borderColor: "#FFFFFF",
          borderBottomColor: "#000000",
        }}
        dropDownStyle={{
          backgroundColor: "#FFFFFF",
        }}
        itemStyle={{
          justifyContent: "flex-start",
        }}
        placeholderStyle={{
          fontFamily: "OpenSans_300Light_Italic",
          fontSize: 16,
          color: "#A6A6A6",
        }}
        labelStyle={{
          fontFamily: "OpenSans_300Light_Italic",
          fontSize: 16,
          color: "#000000",
        }}
        items={props.item}
        value={props.defaultValue}
        onChangeItem={props.onChangeItem}
        placeholder={props.placeholder}
        dropDownMaxHeight={150}
      />
    </View>
  );
};

export { LongField, ShortField, LongDropDown, ShortDropDown, LargeField };

const styles = StyleSheet.create({
  longfield: {
    backgroundColor: "#FFFFFF",
    height: 50,
    width: "100%",
    borderRadius: 30,
    elevation: 5,
    fontFamily: "OpenSans_300Light_Italic",
    fontSize: 16,
    paddingLeft: 20,
  },
  shortfield: {
    backgroundColor: "#FFFFFF",
    height: 50,
    width: "48%",
    borderRadius: 30,
    elevation: 5,
    fontFamily: "OpenSans_300Light_Italic",
    fontSize: 16,
    paddingLeft: 20,
  },
  largefield: {
    backgroundColor: "#FFFFFF",
    height: 150,
    width: "100%",
    borderRadius: 30,
    elevation: 5,
    fontFamily: "OpenSans_300Light_Italic",
    fontSize: 16,
    paddingLeft: 20,
  },
});
