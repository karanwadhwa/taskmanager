import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Alert } from "react-native";

import InputField from "../components/InputField";

export class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  _handleLogin = () => {
    const defaultUser = {
      username: "karan",
      password: "yapsody"
    };

    this.state.username.toLowerCase() === defaultUser.username &&
    this.state.password === defaultUser.password
      ? this.props.navigation.navigate("Main")
      : Alert.alert(
          "Invalid Credentials",
          'Login with the following default credentials instead:\n\nUsername: "karan"\nPassword: "yapsody"'
        );
  };

  render() {
    return (
      <View style={styles.container}>
        <InputField
          label="Username"
          value={this.state.username}
          onChangeText={username => this.setState({ username })}
        />
        <InputField
          label="Password"
          value={this.state.password}
          secureTextEntry={true}
          onChangeText={password => this.setState({ password })}
        />

        <TouchableOpacity style={styles.button} onPress={this._handleLogin}>
          <Text style={{ color: "#FFF" }}>LOG IN</Text>
        </TouchableOpacity>

        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Text>Don't have an account?</Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Signup")}
          >
            <Text style={{ color: "#0057FF", textDecorationLine: "underline" }}>
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default LoginScreen;

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
