import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Alert } from "react-native";

import InputField from "../components/InputField";

export class SignupScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <InputField label="Full Name" />
        <InputField label="Username" />
        <InputField label="Password" />

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            Alert.alert(
              "Account not created",
              'No account was created. You have been logged in to the default account regardless. Use the following default credentials for future logins:\n\nUsername: "karan"\nPassword: "yapsody"'
            );
            this.props.navigation.navigate("Main");
          }}
        >
          <Text style={{ color: "#FFF" }}>SIGN UP</Text>
        </TouchableOpacity>

        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Text>Don't have an account?</Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Login")}
          >
            <Text style={{ color: "#0057FF", textDecorationLine: "underline" }}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 40
  },
  button: {
    margin: 10,
    paddingHorizontal: 30,
    paddingVertical: 12,
    backgroundColor: "#0057FF",
    borderRadius: 4
  }
});
