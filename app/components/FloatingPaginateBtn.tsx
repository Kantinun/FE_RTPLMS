import { Icon } from "@rneui/themed";
import { StyleSheet, Pressable, View, Text } from "react-native";
import { colors } from "../config/colors";

export const FloatingPaginateBtn = ({
  style={},
  previousBtnOpacity = 1,
  currentPage,
  setCurrentPage,
}) => {
  return (
    <View style={style}>
      <Pressable
        style={{ ...styles.previousBtn, opacity: previousBtnOpacity }}
        onPress={() => {
          setCurrentPage(currentPage - 1);
        }}
      >
        <Text style={styles.previousText}>Previous</Text>
      </Pressable>
      <Pressable
        style={styles.nextBtn}
        onPress={() => {
          setCurrentPage(currentPage + 1);
        }}
      >
        <Text style={styles.nextText}>
          Next
          <Icon
            name="arrow-right"
            size={15}
            type="simple-line-icon"
            color={colors.white}
            style={{ marginLeft: 5 }}
          />
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  previousBtn: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: colors.white,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  nextBtn: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: colors.primaryDark,
    borderRadius: 100,
  },
  previousText: {
    fontSize: 20,
    color: colors.primary,
  },
  nextText: {
    fontSize: 20,
    color: colors.white,
  },
});
