import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageProps,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import GradientBGIcon from "../../GradientBGIcon";
import {
  BORDER_RADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from "../../../theme/theme";
import CustomIcon from "../../CustomIcon";

interface ImageBackgroundInfoProps {
  enableBackHandler: boolean;
  imagelink_portrait: ImageProps;
  type: string;
  id: string;
  favourite: boolean;
  name: string;
  special_ingredient: string;
  ingredients: string;
  average_rating: number;
  ratings_count: string;
  roasted: string;
  backHandler?: any;
  toggleFavourite: any;
}

const ImageBackgroundInfo: React.FC<ImageBackgroundInfoProps> = ({
  enableBackHandler,
  imagelink_portrait,
  type,
  id,
  favourite,
  name,
  special_ingredient,
  ingredients,
  average_rating,
  ratings_count,
  roasted,
  backHandler,
  toggleFavourite,
}) => {
  return (
    <View>
      <ImageBackground
        source={imagelink_portrait}
        style={styles.itemBackgroundImage}
      >
        {enableBackHandler ? (
          <View style={styles.imageHeaderBarContainerWithBack}>
            <TouchableOpacity
              onPress={() => {
                backHandler();
              }}
            >
              <GradientBGIcon
                name="left"
                color={COLORS.primaryLightGreyHex}
                size={FONTSIZE.size_16}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                toggleFavourite(favourite, type, id);
              }}
            >
              <GradientBGIcon
                name="like"
                color={
                  favourite ? COLORS.primaryRedHex : COLORS.primaryLightGreyHex
                }
                size={FONTSIZE.size_16}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.imageHeaderBarContainerWithoutBack}>
            <TouchableOpacity
              onPress={() => {
                toggleFavourite(favourite, type, id);
              }}
            >
              <GradientBGIcon
                name="like"
                color={
                  favourite ? COLORS.primaryRedHex : COLORS.primaryLightGreyHex
                }
                size={FONTSIZE.size_16}
              />
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.imageInfoCounterContainer}>
          <View style={styles.imageInfoInnerContainer}>
            <View style={styles.infoContainerRow}>
              <View>
                <Text style={styles.itemTitleText}>{name}</Text>
                <Text style={styles.itemSubTitleText}>
                  {special_ingredient}
                </Text>
              </View>
              <View style={styles.itemPropertiesContainer}>
                <View style={styles.properFirst}>
                  <CustomIcon
                    name={type == "Bean" ? "bean" : "beans"}
                    size={type == "Bean" ? FONTSIZE.size_18 : FONTSIZE.size_24}
                    color={COLORS.primaryOrangeHex}
                  />
                  <Text
                    style={[
                      styles.propertyTextFirst,
                      {
                        marginTop:
                          type == "Bean"
                            ? SPACING.space_4 + SPACING.space_2
                            : 0,
                      },
                    ]}
                  >
                    {type}
                  </Text>
                </View>
                <View style={styles.properFirst}>
                  <CustomIcon
                    name={type == "Bean" ? "location" : "drop"}
                    size={FONTSIZE.size_16}
                    color={COLORS.primaryOrangeHex}
                  />
                  <Text style={styles.propertyTextLast}>{ingredients}</Text>
                </View>
              </View>
            </View>
            <View style={styles.infoContainerRow}>
              <View style={styles.raitingContainer}>
                <CustomIcon
                  name={"star"}
                  color={COLORS.primaryOrangeHex}
                  size={FONTSIZE.size_20}
                />
                <Text style={styles.raitingText}>{average_rating}</Text>
                <Text style={styles.raitingCountText}>({ratings_count})</Text>
              </View>
              <View style={styles.roastedContainer}>
                <Text style={styles.roastedText}>{roasted}</Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  itemBackgroundImage: {
    width: "100%",
    aspectRatio: 20 / 25,
    justifyContent: "space-between",
  },
  imageHeaderBarContainerWithBack: {
    padding: SPACING.space_30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  imageHeaderBarContainerWithoutBack: {
    padding: SPACING.space_30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  imageInfoCounterContainer: {
    paddingVertical: SPACING.space_24,
    paddingHorizontal: SPACING.space_30,
    backgroundColor: COLORS.primaryBlackRGBA,
    borderTopLeftRadius: BORDER_RADIUS.radius_20 * 2,
    borderTopRightRadius: BORDER_RADIUS.radius_20 * 2,
  },
  imageInfoInnerContainer: {
    justifyContent: "space-between",
    gap: SPACING.space_15,
  },
  infoContainerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemPropertiesContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.space_20,
  },
  itemTitleText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: SPACING.space_24,
    color: COLORS.primaryWhiteHex,
  },
  itemSubTitleText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: SPACING.space_12,
    color: COLORS.primaryWhiteHex,
  },
  properFirst: {
    height: 55,
    width: 55,
    borderRadius: BORDER_RADIUS.radius_15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primaryBlackHex,
  },
  propertyTextFirst: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: SPACING.space_10,
    color: COLORS.primaryWhiteHex,
  },
  propertyTextLast: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: SPACING.space_10,
    color: COLORS.primaryWhiteHex,
    marginTop: SPACING.space_4 + SPACING.space_2,
  },
  raitingContainer: {
    flexDirection: "row",
    gap: SPACING.space_10,
    alignItems: "center",
  },
  raitingText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
  },
  raitingCountText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
    color: COLORS.primaryWhiteHex,
  },
  roastedContainer: {
    height: 55,
    width: 55 * 2 + SPACING.space_20,
    borderRadius: BORDER_RADIUS.radius_15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primaryBlackHex,
  },
  roastedText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_10,
    color: COLORS.primaryWhiteHex,
  },
});

export default ImageBackgroundInfo;
