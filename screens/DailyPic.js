import *as React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
    SafeAreaView,
    Platform,
    Image,
    StatusBar,
    Linking
} from 'react-native'
import axios from "axios"

export default class DailyPicScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            apod: []
        };
    }

    getAPOD = () => {
        axios
            .get("https://api.nasa.gov/planetary/apod?api_key=DvtLh5S0P1WhboV7m1e7mqUeTMTcsBL7OJ0a4aB1")
            .then(response => {
                this.setState({ apod: response.data })
                    .catch(error => {
                        Alert.alert(error.message)
                    })
            })
    }

    componentDidMount(){
        this.getAPOD()
    }

    render() {
        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.droidSafeArea} />
                <ImageBackground source={require('../assets/space.gif')}
                    style={styles.backgroundImage} >
                <Text style={styles.routetext}> Astronomy picture of the day</Text>
                <Text style={styles.titletext}> {this.state.apod.title} </Text>
                <TouchableOpacity style={styles.listContainer}
                    onPress={() => Linking.openURL(this.state.apod.url).catch(err => console.error("Couldn't load page", err))}
                >
                    <View style={styles.iconContainer}>
                        <Image source={require("../assets/play-video.png")} style={{ width: 200, height: 200 }}></Image>
                    </View>
                </TouchableOpacity>
                <Text style= {styles.explanationText}>{this.state.apod.explanation}</Text>
                </ImageBackground>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    routeText: {
        fontSize: 35,
        fontWeight: "bold",
        color: "white",
        textAlign: 'center',
    },
    titleText: {
        fontSize: 25,
        fontWeight: "bold",
        color: "#ec63ff",
    },
    explanationText: {
        fontSize: 15,
        fontWeight: "bold",
        color: "white",
        marginTop: 10
    },
    listContainer: {
        backgroundColor: 'rgba(52, 52, 52, 0.5)',
        flex: 0.8,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        borderRadius: 10,
        backgroundColor: 'rgba(52, 52, 52, 0.5)'
    },
    iconContainer: {
        justifyContent: "center",
        alignItems: "center",

    }
});