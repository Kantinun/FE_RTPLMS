import { Icon } from "@rneui/themed";
import { StyleSheet, Pressable, View, Text } from "react-native";
import { colors } from "../config/colors";

export const FloatingPaginateBtn = ({
  style={},
  previousBtnOpacity = 1,
  isDisableNextBtn=false,
  isDisablePrevBtn=false,
  currentPage,
  setCurrentPage,
}) => {
  return (
    <View style={style}>
      <Pressable
        style={[{ ...styles.previousBtn, opacity: previousBtnOpacity }, (currentPage <= 1 || isDisablePrevBtn) && {borderColor: 'grey'}]}
        onPress={() => {
          if(currentPage > 1) setCurrentPage(currentPage - 1);
        }}
        disabled={(currentPage < 0 || isDisablePrevBtn) ? true: false}
      >
        <Text style={[styles.previousText, (currentPage <= 1 || isDisablePrevBtn) && {color: 'grey'}]}>Previous</Text>
      </Pressable>
      
      <Pressable
        style={[styles.nextBtn, isDisableNextBtn && { borderColor: 'grey', backgroundColor: 'grey'}]}
        onPress={() => {
          setCurrentPage(currentPage + 1);
        }}
        disabled={isDisableNextBtn}
      >
        <Text style={[styles.nextText]}>
          Next
          <Icon
            name="arrow-right"
            size={15}
            type="simple-line-icon"
            color={colors.white}
            backgroundColor={isDisableNextBtn ? 'grey' : colors.primaryDark}
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
