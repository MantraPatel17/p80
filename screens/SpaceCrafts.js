import *as React from 'react'
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Platform,
    StatusBar,
    ImageBackground,
    Image,
    FlatList
} from 'react-native';
import axios from "axios"

export default class SpaceCraftScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            aircrafts: []
        };
    }

    getData = () => {
        axios
            .get("https://ll.thespacedevs.com/2.0.0/config/spacecraft/")
            .then(response => {
                this.setState({ aircrafts: response.data.results })
                    .catch(error => {
                        Alert.alert(error.message)
                    })
            })
    }

    componentDidMount() {
        this.getData()
    }


    renderItem = ({ item }) => {
        return (
            <View style={{
                borderwidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 10,
                elevation: 10,
            }}>
                <Image
                    source={{ uri: item.agency.image_url }}
                    style={{
                        width: "100%",
                        height: 200,
                        marginTop: 15,
                        marginBottom: 15,
                        marginRight: 10
                    }}></Image>
                <Text style={{ fontweight: "bold", fontsize: 20 }}> {item.name} </Text>
                <Text> style={{ color: '#696969' }}{item.agency.name}</Text>
                <Text style={{ color: "#A949A9", marginLeft: 10, marginRight: 10 }}>{item.agency.description}</Text>
            </View>
        )
    }

    keyExtractor = (item, index) => index.toString();

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                < View styles={{
                    flex: 0.25
                }}>
                    <Text>Space crafts</Text>
                </View >
                <View styles={{ flex: 0.75 }}>
                    <FlatList

                        keyExtractor={this.keyExtractor}
                        data={this.state.aircrafts}
                        renderItem={this.renderItem}
                    />
                </View>
            </View >

        )
    }
}