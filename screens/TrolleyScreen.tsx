import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";

import { View } from "../components/Themed";
import { RootTabScreenProps } from "../types";

export default function TrolleyScreen({
  navigation,
}: RootTabScreenProps<"Trolley">) {
  const trolleys = [
    { id: "11", param: 990 },
    { id: "M11", param: 2786 },
    { id: "13", param: 2826 },
    { id: "14", param: 1006 },
    { id: "M14", param: 2766 },
    { id: "15", param: 989 },
    { id: "16", param: 1206 },
    { id: "17", param: 1086 },
    { id: "18", param: 1166 },
  ];

  return (
    <View style={styles.container}>
      {trolleys.map((trolley) => {
        return (
          <Button
            mode="contained"
            style={styles.button}
            labelStyle={styles.label}
            buttonColor="#672590"
            onPress={() => {
              navigation.navigate("Detalii", {
                param: trolley.param,
              });
            }}
            textColor="black"
          >
            {trolley.id}
          </Button>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    margin: 8,
    width: 100,
    height: 100,
    justifyContent: "center",
  },
  label: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
});
