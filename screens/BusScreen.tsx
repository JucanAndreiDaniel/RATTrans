import { ScrollView, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

import { View } from "../components/Themed";
import { RootTabScreenProps } from "../types";

export default function BusScreen({ navigation }: RootTabScreenProps<"Bus">) {
  const autobuze1 = [
    { id: "3", param: 1207 },
    { id: "4B", param: 3586 },
    { id: "5", param: 2246 },
    { id: "21", param: 1146 },
    { id: "23", param: 3066 },
    { id: "28", param: 1226 },
    { id: "32", param: 1546 },
    { id: "33", param: 1046 },
    { id: "33B", param: 2466 },
    { id: "40", param: 886 },
    { id: "46", param: 1406 },
  ];
  const autobuze2 = [
    { id: "E1", param: 1550 },
    { id: "E2", param: 1551 },
    { id: "E3", param: 1552 },
    { id: "E4", param: 1926 },
    { id: "E4B", param: 2486 },
    { id: "E6", param: 1928 },
    { id: "E7", param: 2026 },
    { id: "E8", param: 1547 },
  ];
  const autobuze3 = [
    { id: "M22", param: 2906 },
    { id: "M27", param: 3566 },
    { id: "M29", param: 3086 },
    { id: "M30", param: 1746 },
    { id: "M35", param: 1986 },
    { id: "M36", param: 2006 },
    { id: "M37", param: 3606 },
    { id: "M41", param: 3306 },
    { id: "M42", param: 3307 },
    { id: "M43", param: 2646 },
    { id: "M44", param: 2506 },
    { id: "M45", param: 2606 },
    { id: "M46", param: 3326 },
    { id: "M47", param: 3560 },
    { id: "M48", param: 3406 },
    { id: "M49", param: 3426 },
    { id: "M50", param: 3486 },
    { id: "M51", param: 3466 },
    { id: "M52", param: 3546 },
  ];

  return (
    <ScrollView>
      <View style={styles.container}>
      <View style={styles.topbar}/>
        {autobuze1.map((bus) => {
          return (
            <>
              <Button
                key={bus.id}
                mode="contained-tonal"
                style={styles.button}
                contentStyle={styles.contentStyle}
                labelStyle={styles.label}
                buttonColor="#53867b"
                onPress={() => {
                  navigation.navigate("Detalii", {
                    param: bus.param,
                  });
                }}
                textColor="white"
              >
                {bus.id}
              </Button>
            </>
          );
        })}
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        {autobuze2.map((bus) => {
          return (
            <>
              <Button
                key={bus.id}
                mode="contained-tonal"
                style={styles.button}
                contentStyle={styles.contentStyle}
                labelStyle={styles.label}
                buttonColor="#eb8740"
                onPress={() => {
                  navigation.navigate("Detalii", {
                    param: bus.param,
                  });
                }}
                textColor="white"
              >
                {bus.id}
              </Button>
            </>
          );
        })}
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        {autobuze3.map((bus) => {
          return (
            <>
              <Button
                key={bus.id}
                mode="contained-tonal"
                style={styles.button}
                contentStyle={styles.contentStyle}
                labelStyle={styles.label}
                buttonColor="#3b3f92"
                onPress={() => {
                  navigation.navigate("Detalii", {
                    param: bus.param,
                  });
                }}
                textColor="white"
              >
                {bus.id}
              </Button>
            </>
          );
        })}
      </View>
    </ScrollView>
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
  separator: {
    marginVertical: 30,
    height: 3,
    width: "85%",
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
  contentStyle: {
    width: 100,
    height: 100,
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
