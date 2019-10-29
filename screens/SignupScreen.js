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

export class SignupScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      error: "",
      loading: false
    };
  }

  _handleSignUp = () => {
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
        <InputField
          label="Confirm Password"
          value={this.state.confirmPassword}
          secureTextEntry={true}
          onChangeText={confirmPassword => this.setState({ confirmPassword })}
        />

        <Text style={{ color: "red", textAlign: "center" }}>
          {this.state.error}
        </Text>

        <TouchableOpacity style={styles.button} onPress={this._handleSignUp}>
          {this.state.loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={{ color: "#FFF" }}>SIGN UP</Text>
          )}
        </TouchableOpacity>

        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Text>Have an account?</Text>
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
    width: "40%",
    alignItems: "center",
    backgroundColor: "#0057FF",
    borderRadius: 4
  }
});
