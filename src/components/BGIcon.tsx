import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { BORDER_RADIUS, SPACING } from "../theme/theme";
import CustomIcon from "./CustomIcon";

interface BGIconProps {
  name: string;
  color: string;
  size: number;
  bgColor: string;
}

const BGIcon: React.FC<BGIconProps> = ({ name, color, size, bgColor }) => {
  return (
    <View style={[styles.iconBg, { backgroundColor: bgColor }]}>
      <CustomIcon name={name} color={color} size={size} />
    </View>
  );
};

const styles = StyleSheet.create({
  iconBg: {
    height: SPACING.space_30,
    width: SPACING.space_30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: BORDER_RADIUS.radius_8,
  },
});

export default BGIcon;
