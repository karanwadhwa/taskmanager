import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";

import Feather from "@expo/vector-icons/Feather";

const TaskCard = props => {
  const { name, body, timestamp, key, completed } = props.data;
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onLongPress={() =>
        Alert.alert(
          "Delete Task",
          "Are you sure you want to delete this task?",
          [
            { text: "No, Take Me Back!" },
            { text: "Yes", onPress: () => props.DeleteTask(key) }
          ]
        )
      }
    >
      <View style={{ padding: 15 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <Text style={styles.titleText}>{name}</Text>
          <TouchableOpacity
            onPress={() =>
              props.UpdateTask(key, {
                ...props.data,
                completed: !completed
              })
            }
          >
            {completed ? (
              <Feather size={20} name="check-square" color="green" />
            ) : (
              <Feather size={20} name="square" color="gray" />
            )}
          </TouchableOpacity>
        </View>

        <Text style={styles.bodyText}>{body}</Text>
        <Text style={styles.dateText}>
          {new Date(timestamp).toDateString()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default TaskCard;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    marginVertical: 10,
    marginHorizontal: 20
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 20
  },
  bodyText: {
    color: "gray",
    paddingVertical: 15
  },
  dateText: {
    color: "gray",
    alignSelf: "flex-end"
  }
});
