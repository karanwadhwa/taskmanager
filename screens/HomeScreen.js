import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  ActivityIndicator,
  YellowBox
} from "react-native";
import firebase from "firebase";
import { DrawerActions } from "react-navigation";
import Feather from "@expo/vector-icons/Feather";

import TaskCard from "../components/TaskCard";
import InputField from "../components/InputField";

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
          onPress={() => {
            firebase.auth().signOut();
            navigation.navigate("Auth");
          }}
        >
          <Feather name="power" size={24} />
        </TouchableOpacity>
      </View>
    )
  });

  constructor(props) {
    super(props);
    this.state = {
      tasks: {},
      loading: true,
      newTask: {
        name: "",
        body: ""
      }
    };
  }

  componentDidMount() {
    //https://github.com/facebook/react-native/issues/12981
    YellowBox.ignoreWarnings(["Setting a timer"]);

    const { currentUser } = firebase.auth();

    // fetch all tasks
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/tasks`)
      .on("value", snapshot =>
        this.setState({ tasks: snapshot.val(), loading: false })
      );
  }

  SaveNewTask = () => {
    const { name, body } = this.state.newTask;
    const { currentUser } = firebase.auth();

    !!name && !!body
      ? firebase
          .database()
          .ref(`/users/${currentUser.uid}/tasks`)
          .push({ name, body, timestamp: Date.now(), completed: false })
      : alert("All fields are required.");

    this._closeNewTaskModal();
    this.setState({
      newTask: {
        name: "",
        body: ""
      }
    });
  };

  DeleteTask = key => {
    const { currentUser } = firebase.auth();
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/tasks/${key}`)
      .remove();
  };

  UpdateTask = (key, updatedData) => {
    const { currentUser } = firebase.auth();
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/tasks/${key}`)
      .set(updatedData);
  };

  _closeNewTaskModal = () => {
    this.props.navigation.setParams({
      newTaskModalVisible: false
    });
  };

  _FlatListData = data =>
    // data recieved from firebase is (collection) an object with individual tasks
    // as separate objects with firebase-defined-id as the key and actual task object as value
    // Object.entries breaks down the collection into an array of arrays with 2 elements each
    // [0] as the key and [1] as value which is then mapped to get an array of objects combining
    // the data and the key value into a single object
    Object.entries(data)
      .map(d => {
        return { ...d[1], key: d[0] };
      })
      .reverse();

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
            <TouchableOpacity style={styles.button} onPress={this.SaveNewTask}>
              <Text style={{ color: "#FFF" }}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  render() {
    return this.state.loading ? (
      <ActivityIndicator
        color="#0057FF"
        size="large"
        style={{ alignSelf: "center", flex: 1 }}
      />
    ) : (
      <View style={styles.container}>
        {this.newTaskModal()}

        {/* render FlatList only if state.tasks is !empty*/}
        {!!this.state.tasks && (
          <FlatList
            /* Since the data fetched from firebase is not an array but an 
            object it needs to be converted into a workable array first */
            data={this._FlatListData(this.state.tasks)}
            renderItem={({ item }) => (
              <TaskCard
                data={item}
                DeleteTask={this.DeleteTask}
                UpdateTask={this.UpdateTask}
              />
            )}
            keyExtractor={item => item.key.toString()}
          />
        )}
      </View>
    );
  }
}

export default HomeScreen;

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
