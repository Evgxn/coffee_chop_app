import { create } from "zustand";
import { produce } from "immer";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CoffeeData from "../data/CoffeeData";
import BeansData from "../data/BeansData";

export const useStore = create(
  persist(
    (set) => ({
      CoffeeList: CoffeeData,
      BeanList: BeansData,
      CartPrice: 0,
      FavoritesList: [],
      CartList: [],
      OrderHistorylist: [],
      addToCart: (cartItem: any) =>
        set(
          produce((state) => {
            let found = false;
            let size = false;

            state.CartList.find((cartListItem: any, cartListIndex: number) => {
              if (cartListItem.id == cartItem.id) {
                found = true;
                cartListItem.prices.find((priceItem: any) => {
                  if (priceItem.size == cartItem.prices[0].size) {
                    size = true;
                    priceItem.quantity++;
                  }
                });
                if (size == false) {
                  state.CartList[cartListIndex].prices.push(cartItem.prices[0]);
                }
                cartListItem.prices.sort((a: any, b: any) => {
                  if (a.size > b.size) {
                    return -1;
                  }
                  if (a.size < b.size) {
                    return 1;
                  }
                  return 0;
                });
              }
            });
            if (found == false) {
              state.CartList.push(cartItem);
            }
            //console.log(state.CartList.length);
          })
        ),
      calculateCartPrice: () =>
        set(
          produce((state) => {
            let totalPrice = 0;

            state.CartList.find((cartListItem: any, index: number) => {
              let tempPrice = 0;
              cartListItem.prices.find((priceItem: any, index: number) => {
                tempPrice =
                  tempPrice + parseFloat(priceItem.price) * priceItem.quantity;
              });
              cartListItem.ItemPrice = tempPrice.toFixed(2).toString();

              totalPrice = totalPrice + tempPrice;
            });

            state.CartPrice = totalPrice.toFixed(2).toString();
          })
        ),
      addToFavoriteList: (type: string, id: string) =>
        set(
          produce((state) => {
            const list = type === "Coffee" ? state.CoffeeList : state.BeanList;

            list.find((item: any) => {
              if (item.id == id && item.favourite == false) {
                item.favourite = true;
                state.FavoritesList.unshift(item);
              }
            });
            console.log(state.FavoritesList.length);
          })
        ),
      deleteFromFavoriteList: (type: string, id: string) =>
        set(
          produce((state) => {
            const list = type === "Coffee" ? state.CoffeeList : state.BeanList;

            state.FavoritesList.find((favItem: any, index: number) => {
              list.find((item: any) => {
                if (
                  item.id == id &&
                  item.favourite == true &&
                  favItem.id == id
                ) {
                  item.favourite = false;
                  state.FavoritesList.splice(index, 1);
                }
              });
            });

            console.log(state.FavoritesList.length);
          })
        ),
      incrementCartItemQuantity: (id: string, size: string) =>
        set(
          produce((state) => {
            state.CartList.find((cartItem: any, index: number) => {
              if (cartItem.id == id) {
                cartItem.prices.find((priceItem: any) => {
                  if (priceItem.size == size) {
                    priceItem.quantity++;
                  }
                });
              }
            });
          })
        ),
      decrementCartItemQuantity: (id: string, size: string) =>
        set(
          produce((state) => {
            for (let i = 0; i < state.CartList.length; i++) {
              if (state.CartList[i].id == id) {
                for (let j = 0; j < state.CartList[i].prices.length; j++) {
                  if (state.CartList[i].prices[j].size == size) {
                    if (state.CartList[i].prices.length > 1) {
                      if (state.CartList[i].prices[j].quantity > 1) {
                        state.CartList[i].prices[j].quantity--;
                      } else {
                        state.CartList[i].prices.splice(j, 1);
                      }
                    } else {
                      if (state.CartList[i].prices[j].quantity > 1) {
                        state.CartList[i].prices[j].quantity--;
                      } else {
                        state.CartList.splice(i, 1);
                      }
                    }
                    break;
                  }
                }
              }
            }
          })
        ),
      addToOrderHistoryListFromCart: () =>
        set(
          produce((state) => {
            let temp = state.CartList.reduce(
              (accumulator: number, currentValue: any) =>
                accumulator + parseFloat(currentValue.ItemPrice),
              0
            );
            if (state.OrderHistoryList.length > 0) {
              state.OrderHistoryList.unshift({
                OrderDate:
                  new Date().toDateString() +
                  " " +
                  new Date().toLocaleTimeString(),
                CartList: state.CartList,
                CartListPrice: temp.toFixed(2).toString(),
              });
            } else {
              state.OrderHistoryList.push({
                OrderDate:
                  new Date().toDateString() +
                  " " +
                  new Date().toLocaleTimeString(),
                CartList: state.CartList,
                CartListPrice: temp.toFixed(2).toString(),
              });
            }
            state.CartList = [];
          })
        ),
    }),
    {
      name: "coffee-app",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
