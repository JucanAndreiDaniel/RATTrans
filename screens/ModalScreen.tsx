import { StatusBar } from "expo-status-bar";
import { Platform, ScrollView, StyleSheet } from "react-native";
import axios, { AxiosResponse } from "axios";
import React from "react";

// import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

export default function ModalScreen({ route }: any) {
  const { param } = route.params;
  const [data, setData] = React.useState<any>([]);

  var cheerio = require("react-native-cheerio");
  const getTables = (html: AxiosResponse<any, any>) => {
    const $ = cheerio.load(html.data);
    const tableElements = $("html body ul table td b");
    return tableElements;
  };
  React.useEffect(() => {
    axios
      .get("http://86.125.113.218:61978/html/timpi/trasee.php?param1=" + param)
      .then(getTables)
      .then((tables) =>
        tables.each((_: any, table: any) => {
          let text: string = cheerio.load(table).text();
          if (!text.startsWith("Sosire") && text != "Stația")
            setData((data: any) => [...data, text]);
          // console.log(text);
        })
      );
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        {data.map((item: any) => {
          return <Text style={styles.title}>{item}</Text>;
        })}

        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />

        {/* Use a light status bar on iOS to account for the black space above the modal */}
        <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
