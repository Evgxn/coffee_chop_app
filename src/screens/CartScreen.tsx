import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../theme/theme";
import { useStore } from "../store/store";

const CartScreen = () => {
  const cartList = useStore((state: any) => state.CartList);
  console.log("cartList=", cartList.length);

  return (
    <View style={styles.container}>
      <Text>Cart</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default CartScreen;
