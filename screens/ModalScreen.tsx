import { StatusBar } from "expo-status-bar";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import { AxiosResponse } from "axios";
import React from "react";
import {
  DataTable,
  Text,
  ActivityIndicator,
  AnimatedFAB,
} from "react-native-paper";

import { View } from "../components/Themed";
import { getData } from "../hooks/getData";

let cheerio = require("react-native-cheerio");
const getTables = (html: AxiosResponse<any, any> | undefined) => {
  const $ = cheerio.load(html?.data);
  const tableElements = $("html body ul table td b");
  return tableElements;
};

export default function ModalScreen({ route }: any) {
  const { param } = route.params;
  const [statieDus, setStatieDus] = React.useState<any>([]);
  const [statieIntors, setStatieIntors] = React.useState<any>([]);
  const [timpDus, setTimpDus] = React.useState<any>([]);
  const [timpIntors, setTimpIntors] = React.useState<any>([]);
  const [linia, setLinia] = React.useState<any>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [isExtended, setIsExtended] = React.useState(true);
  const [refresh, setRefresh] = React.useState(true);

  const emptyArrays = () => {
    setStatieDus([]);
    setStatieIntors([]);
    setTimpDus([]);
    setTimpIntors([]);
    setLinia([]);
  };

  const setStatieTimp = (
    text: string,
    index: number,
    setStatie: React.Dispatch<any>,
    setTimp: React.Dispatch<any>
  ) => {
    if (
      !text.startsWith("Sosire") &&
      text != "Stația" &&
      !text.startsWith("Linia ")
    )
      if (index % 2 == 1) setStatie((statie: any) => [...statie, text]);
      else setTimp((timp: any) => [...timp, text]);
  };

  const onScroll = ({
    nativeEvent,
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;
    setIsExtended(currentScrollPosition <= 0);
  };

  React.useEffect(() => {
    setLoading(true);
    emptyArrays();
    getData(param)
      .then(getTables)
      .then((tables) => {
        let i: number = 0; //count to separate data in different arrays per "Linia "
        tables.each((index: any, table: any) => {
          let text: string = cheerio.load(table).text();
          if (text.startsWith("Linia ")) {
            i++;
            setLinia((linia: any) => [...linia, text]);
          }
          if (i % 2 == 1) {
            setStatieTimp(text, index, setStatieDus, setTimpDus);
          } else {
            setStatieTimp(text, index + 1, setStatieIntors, setTimpIntors);
          }
        });
        setLoading(false);
      });
  }, [refresh]);

  return (
    <>
      <View style={{ height: "100%" }}>
        {loading ? (
          <ActivityIndicator
            animating={true}
            size="large"
            style={styles.loader}
          />
        ) : (
          <>
            <ScrollView onScroll={onScroll}>
              <View style={styles.container}>
                <Text variant="titleLarge">{linia[0]}</Text>
                <DataTable>
                  <DataTable.Header>
                    <DataTable.Title>Stația</DataTable.Title>
                    <DataTable.Title>Sosire</DataTable.Title>
                  </DataTable.Header>
                  {statieDus.map((statie: string, index: number) => {
                    return (
                    <DataTable.Row key={`${statie}+${index}`}>
                        <DataTable.Cell>{statie}</DataTable.Cell>
                        <DataTable.Cell>{timpDus[index]}</DataTable.Cell>
                      </DataTable.Row>
                    );
                  })}
                </DataTable>
                <View
                  style={styles.separator}
                  lightColor="#eee"
                  darkColor="rgba(255,255,255,0.1)"
                />
                <Text variant="titleLarge">{linia[1]}</Text>
                <DataTable>
                  <DataTable.Header>
                    <DataTable.Title>Stația</DataTable.Title>
                    <DataTable.Title>Sosire</DataTable.Title>
                  </DataTable.Header>
                  {statieIntors.map((statie: string, index: number) => {
                    return (
                    <DataTable.Row key={`${statie}+${index}`}>
                        <DataTable.Cell>{statie}</DataTable.Cell>
                        <DataTable.Cell>{timpIntors[index]}</DataTable.Cell>
                      </DataTable.Row>
                    );
                  })}
                </DataTable>
                {/* Use a light status bar on iOS to account for the black space above the modal */}
                <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
              </View>
            </ScrollView>
          </>
        )}
        <AnimatedFAB
          icon="refresh"
          label={"Refresh"}
          extended={isExtended}
          style={styles.fab}
          onPress={() => setRefresh(!refresh)}
        />
      </View>
    </>
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
    width: "90%",
  },
  loader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  fab: {
    bottom: 16,
    right: 16,
    position: "absolute",
  },
});
