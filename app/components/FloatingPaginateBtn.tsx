import { Icon } from "@rneui/themed";
import { useRef, useState } from "react";
import { StyleSheet, Pressable, View, Text } from "react-native";
import Animated from "react-native-reanimated";
import { colors } from "../config/colors";

export const FloatingPaginateBtn = ({previousBtnOpacity, currentPage, setCurrentPage}) => {
    const [previousBtnOpacityState, setPreviousBtnOpacityState] = useState(previousBtnOpacity || 1);
    const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
    return (
        <View style={styles.paginate}>
            <Pressable style={[styles.previousBtn, {opacity: previousBtnOpacityState}]} onPress={() => {setCurrentPage(currentPage - 1)}}><Text style={styles.previousText}>Previous</Text></Pressable>
            <Pressable style={styles.nextBtn} onPress={() => {setCurrentPage(currentPage + 1)}}><Text style={styles.nextText}>Next<Icon name="arrow-right" size={15} type="simple-line-icon" color={colors.white} style={{marginLeft: 5}}/></Text></Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    paginate: {
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'flex-end',
        width: '55%',
        gap: 10,
      },
    previousBtn: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: colors.white,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: colors.primary
    },
    nextBtn: {
        paddingVertical: 5,
        paddingHorizontal: 15,
        backgroundColor: colors.primaryDark,
        borderRadius: 100,
    },
    previousText: {
        fontSize: 20,
        color: colors.primary
    },
    nextText: {
        fontSize: 20,
        color: colors.white
    },
    floatingBtn: {
        position: 'absolute',
        bottom: 15,
        right: 100,
    }
})