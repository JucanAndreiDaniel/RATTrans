import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";

import { View } from "../components/Themed";
import { RootTabScreenProps } from "../types";

export default function TramScreen({ navigation }: RootTabScreenProps<"Tram">) {
  const trams = [
    { id: "1", param: 1106 },
    { id: "2", param: 1126 },
    { id: "6a", param: 2686 },
    { id: "6b", param: 2706 },
    { id: "7a", param: 1556 },
    { id: "7b", param: 1557 },
    { id: "8", param: 1558 },
    { id: "9", param: 2406 },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.topbar}/>
      {trams.map((tram,index) => {
        return (
          <Button
            mode="contained-tonal"
            key={index}
            style={styles.button}
            labelStyle={styles.label}
            buttonColor="#deac2e"
            onPress={() => {
              navigation.navigate("Detalii", {
                param: tram.param,
              });
            }}
            textColor="black"
          >
            {tram.id}
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
  topbar: {
    marginVertical: 30,
    height: 1,
    width: "90%",
  },
  button: {
    margin: 8,
    width: 100,
    height: 100,
    justifyContent: "center",
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
