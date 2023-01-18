import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions
} from "react-native";
import Modal from "react-native-modal";
import Carousel from "react-native-snap-carousel";

import PageControl from "react-native-page-control";

const { width } = Dimensions.get("window")

const StepModal: React.FC<{ stepComponents: any }> = ({ stepComponents }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const carouselRef = React.createRef<Carousel>();

    const _renderNextButton = () => {
        const nextIndex = currentPage + 1;
        return (
            <View
                style={{
                    marginRight: 10
                }}
            >
                <TouchableOpacity
                    onPress={() => {
                        setCurrentPage(nextIndex);
                        carouselRef.current?.snapToItem(nextIndex);
                    }}
                >
                    <Text style={{ color: "#60bca5", fontWeight: "bold", fontSize: 14 }}>
                        {" "}
                        Next{" "}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    const _renderFinishButton = () => {
        return (
            <View
                style={{
                    marginRight: 10
                }}
            >
                <TouchableOpacity
                    onPress={() => {
                        setIsVisible(false);
                    }}
                >
                    <Text style={{ color: "#60bca5", fontWeight: "bold", fontSize: 14 }}>
                        {" "}
                        Finish{" "}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    const _renderBackButton = () => {
        const prevIndex = (currentPage === 0)? currentPage : currentPage - 1;
        return (
            <View
                style={{
                    marginLeft: 10
                }}
            >
                <TouchableOpacity
                    disabled={currentPage===0}
                    onPress={() => {
                        setCurrentPage(prevIndex);
                        carouselRef.current?.snapToItem(prevIndex);
                    }}
                >
                    <Text style={{ color: "grey", fontWeight: "bold", fontSize: 14 }}>
                        {" "}
                        Previous{" "}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    const isLastStep = () => {
        return stepComponents.length - 1 === currentPage;
    }

    const changeIndex = (index) => {
        setCurrentPage(index);
    }

    return (
        <View>
            <Modal isVisible={isVisible}>
                <View
                >
                    <View
                        style={{
                            marginTop: 17,
                            backgroundColor: "#ffffff",
                            marginLeft: 10,
                            marginRight: 10,
                            alignItems: "center",
                        }}
                    >
                        <Carousel
                            data={stepComponents}
                            renderItem={({ item }) => item}
                            itemWidth={width / 1.2}
                            sliderWidth={width / 1.2}
                            ref={carouselRef}
                            onSnapToItem={changeIndex}
                            />
                            <PageControl
                            numberOfPages={stepComponents.length}
                            currentPage={currentPage}
                            hidesForSinglePage
                            pageIndicatorTintColor="#d3d3d3"
                            currentPageIndicatorTintColor="#60BCA5"
                            indicatorStyle={{ borderRadius: 7 }}
                            currentIndicatorStyle={{ borderRadius: 5 }}
                            indicatorSize={{ width: 13, height: 13 }}
                            // onPageIndicatorPress={this.onItemTap}
                            />
                            </View>
                            <View
                            style={{ flexDirection: "row", 
                            justifyContent: "space-between", 
                            backgroundColor: "#ffffff",
                            marginLeft: 10,
                            marginRight: 10,}}
                            >
                            {
                             _renderBackButton()
                            }
                            {
                            isLastStep()
                                ? _renderFinishButton()
                                : _renderNextButton()
                            }
                    </View>
                </View>
            </Modal>
        </View>
    );
}
export default StepModal