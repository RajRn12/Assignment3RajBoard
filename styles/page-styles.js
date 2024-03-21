/**
 * File   -  page-styles.js
 * Author - Raj Rai
 */
import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'orange',
        alignItems: 'center',
        justifyContent: 'center'
    },

    topView: {
        flexDirection: 'row',
    },
    title: {
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 7,
    },
    guide: {
        width: 20,
        height: 20,
        marginLeft: 5,
        marginTop: 3
    },

    secondView: {
        backgroundColor: 'white',
        borderWidth: 5,
        borderRadius: 10,
        borderStyle: 'dashed',
        paddingLeft: 150,
        paddingRight: 150,
        marginBottom: 50,
        borderBlockColor: 'red',
    },
    sampleView: {
        marginTop: 10,
        marginBottom:10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems:'center'
    },

    recordPress: {
        backgroundColor: 'cyan',
        borderBlockColor: 'black',
        borderStyle: 'solid',
        height: 30,
        width: 150,
        justifyContent: 'center',
        borderWidth: 2,
        borderRadius: 7,
        marginBottom: 10,
    },
    recordText: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 15,
    },
    ThirdView: {
        backgroundColor: 'white',
        borderWidth: 5,
        borderRadius: 10,
        borderStyle: 'dashed',
        paddingLeft: 150,
        paddingRight: 150,
        marginBottom: 160,
        borderBlockColor: 'red',
    },

    button: {
        backgroundColor: 'lightgreen',
        borderBlockColor: 'black',
        borderStyle: 'solid',
        width: 100,
        height: 35,
        borderWidth: 2,
        borderRadius: 7,
        padding: 2,
        marginTop: 5,
        marginRight: 220,
    },
    buttonText: {
        fontSize: 24,
    },
    item: {
        marginTop: 24,
        padding: 30,
        backgroundColor: 'pink',
        fontSize: 24
    }
});
export default styles;