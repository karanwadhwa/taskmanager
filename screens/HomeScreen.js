import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal
} from "react-native";
import { connect } from "react-redux";
import { DrawerActions } from "react-navigation";
import Feather from "@expo/vector-icons/Feather";

import TaskCard from "../components/TaskCard";
import InputField from "../components/InputField";

import { saveNewTask, deleteTask } from "../store/actions";

export class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Task List",
    headerLeft: (
      <TouchableOpacity
        style={{ paddingLeft: 15 }}
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      >
        <Feather name="menu" size={24} />
      </TouchableOpacity>
    ),
    headerRight: (
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={{ marginHorizontal: 5 }}
          onPress={() => navigation.setParams({ newTaskModalVisible: true })}
        >
          <Feather name="plus" size={24} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ paddingHorizontal: 15 }}
          onPress={() => navigation.navigate("Auth")}
        >
          <Feather name="power" size={24} />
        </TouchableOpacity>
      </View>
    )
  });

  constructor(props) {
    super(props);
    this.state = {
      newTask: {
        name: "",
        body: ""
      }
    };
  }

  _closeNewTaskModal = () => {
    this.props.navigation.setParams({
      newTaskModalVisible: false
    });
  };

  _saveNewTask = () => {
    const { name, body } = this.state.newTask;

    !!name && !!body
      ? this.props.saveNewTask(this.state.newTask)
      : alert("All fields are required.");

    this._closeNewTaskModal();
    this.setState({
      newTask: {
        name: "",
        body: ""
      }
    });
  };

  _handleDelete = timestamp => {
    this.props.deleteTask(timestamp);
  };

  newTaskModal = () => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={this.props.navigation.getParam("newTaskModalVisible")}
      onRequestClose={this._closeNewTaskModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modal}>
          <TouchableOpacity
            onPress={this._closeNewTaskModal}
            style={{ alignItems: "flex-end", padding: 5, margin: 10 }}
          >
            <Feather name="x" size={26} color="#999" />
          </TouchableOpacity>

          <View style={{ margin: 20 }}>
            <InputField
              label="Task Name"
              value={this.state.newTask.name}
              onChangeText={text =>
                this.setState({
                  newTask: { ...this.state.newTask, name: text }
                })
              }
            />
            <InputField
              label="Task Description"
              style={{ height: 150 }}
              multiline={true}
              textAlignVertical="top"
              value={this.state.newTask.body}
              onChangeText={text =>
                this.setState({
                  newTask: { ...this.state.newTask, body: text }
                })
              }
            />
            <TouchableOpacity style={styles.button} onPress={this._saveNewTask}>
              <Text style={{ color: "#FFF" }}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  render() {
    return (
      <View style={styles.container}>
        {this.newTaskModal()}
        <FlatList
          data={this.props.tasks}
          renderItem={({ item }) => (
            <TaskCard data={item} DeleteTask={this.props.deleteTask} />
          )}
          keyExtractor={item => item.timestamp.toString()}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    tasks: state.tasks
  };
};

export default connect(
  mapStateToProps,
  { saveNewTask, deleteTask }
)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2"
  },
  modalContainer: {
    backgroundColor: "rgba(127,127,127,0.8)",
    flex: 1
  },
  modal: {
    height: "70%",
    width: "100%",
    position: "absolute",
    bottom: 0,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  button: {
    paddingHorizontal: 20,
    alignItems: "center",
    paddingVertical: 12,
    backgroundColor: "#0057FF",
    borderRadius: 4
  }
});
