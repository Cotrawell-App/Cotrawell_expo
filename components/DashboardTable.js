import React from "react";
import { View, Text, ScrollView, StyleSheet, FlatList } from "react-native";

const tableData = [
  {
    traveller: "Group Channel",
    from: "Chennai",
    to: "Madurai",
    status: "Delivered",
    connection: "Open",
  },
  {
    traveller: "Group Channel",
    from: "Chennai",
    to: "Madurai",
    status: "Delivered",
    connection: "Open",
  },
  // Add other rows as needed...
];

const DashboardTable = () => {
  const renderRow = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.traveller}</Text>
      <Text style={styles.cell}>{item.from}</Text>
      <Text style={styles.cell}>{item.to}</Text>
      <Text
        style={[styles.cell, styles.status, styles[item.status.toLowerCase()]]}
      >
        {item.status}
      </Text>
      <Text style={[styles.cell, styles.bold]}>{item.connection}</Text>
    </View>
  );

  return (
    <ScrollView horizontal style={styles.container}>
      <View>
        <View style={styles.header}>
          <Text style={styles.headerCell}>Traveller</Text>
          <Text style={styles.headerCell}>From</Text>
          <Text style={styles.headerCell}>To</Text>
          <Text style={styles.headerCell}>Status</Text>
          <Text style={styles.headerCell}>Connection</Text>
        </View>

        <FlatList
          data={tableData}
          renderItem={renderRow}
          keyExtractor={(_, index) => index.toString()}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginVertical: 8,
  },
  header: {
    flexDirection: "row",
    backgroundColor: "#d5d1de",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    backgroundColor: "#f7f7f7",
  },
  rowEven: {
    backgroundColor: "#e0e0e0",
  },
  cell: {
    flex: 1,
    minWidth: 150,
    padding: 10,
    textAlign: "left",
    fontSize: 14,
    color: "#333",
  },
  headerCell: {
    flex: 1,
    minWidth: 150,
    padding: 10,
    fontWeight: "bold",
    textAlign: "left",
    backgroundColor: "#d5d1de",
    fontSize: 14,
  },
  status: {
    textTransform: "capitalize",
  },
  bold: {
    fontWeight: "bold",
  },
  delivered: {
    color: "green",
  },
  // Add more status-specific styles here...
  "@media (max-width: 768px)": {
    cell: {
      fontSize: 12,
      padding: 8,
    },
    headerCell: {
      fontSize: 12,
      padding: 8,
    },
  },
  "@media (max-width: 480px)": {
    cell: {
      fontSize: 10,
      padding: 6,
    },
    headerCell: {
      fontSize: 10,
      padding: 6,
    },
  },
});

export default DashboardTable;
