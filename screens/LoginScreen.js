import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from "react-native";

import InputField from "../components/InputField";

export class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
      loading: false
    };
  }

  _handleLogin = () => {
    this.props.navigation.navigate("Main");
  };

  render() {
    return (
      <View style={styles.container}>
        <InputField
          label="Email"
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
        />
        <InputField
          label="Password"
          value={this.state.password}
          secureTextEntry={true}
          onChangeText={password => this.setState({ password })}
        />

        <Text style={{ color: "red", textAlign: "center" }}>
          {this.state.error}
        </Text>

        <TouchableOpacity style={styles.button} onPress={this._handleLogin}>
          {this.state.loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={{ color: "#FFF" }}>LOG IN</Text>
          )}
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
    width: "40%",
    alignItems: "center",
    backgroundColor: "#0057FF",
    borderRadius: 4
  }
});
