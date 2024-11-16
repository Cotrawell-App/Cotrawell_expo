import { StyleSheet, Text, View } from "react-native";
import React from "react";
import dashboardScreen from "../Style/dashboardScreen";
import DashboardHeader from "../components/DashboardHeader";
import DashboardTable from "../components/DashboardTable";

const DashboardScreen = () => {
  return (
    <View>
      <DashboardHeader />
      <DashboardTable />
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({});
