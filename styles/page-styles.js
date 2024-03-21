/**
 * File   -  page-styles.js
 * Author - Raj Rai
 */
import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'lightblue',
        alignItems: 'center',
        height: 1000,
    },

    topView: {
        flexDirection: 'row',
        marginTop: 35
    },
    title: {
        textShadowColor: 'rgba(255, 0, 0, 0.8)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 10,
        fontWeight: 'bold',
        color:'blue',
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
        backgroundColor: 'lightyellow',
        borderWidth: 5,
        borderRadius: 10,
        borderStyle: 'dashed',
        borderBlockColor: 'black',
        marginBottom: 10,
    },
    sampleView: {
        paddingLeft: 145,
        paddingRight: 145,
        marginBottom: 50,
        flexDirection: 'row',
        width: 350,
        justifyContent:'center',
        marginTop: 20,
        marginBottom: 20,
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
        backgroundColor: 'lightpink',
        borderWidth: 5,
        borderRadius: 10,
        borderStyle: 'dashed',
        borderBlockColor: 'black',
    },
    scrollView: {
        
    },
    button: {
        borderBlockColor: 'black',
        borderStyle: 'solid',
        width: 60,
        height: 50,
        borderWidth: 2,
        borderRadius: 7,
        marginLeft:5,
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