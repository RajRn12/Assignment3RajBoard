import { Pressable, StyleSheet, Text, Button, View } from 'react-native';
import { useEffect, useState } from 'react';
import { Audio } from 'expo-av';

export default function App() {
    const [playbackStatus, setPlaybackStatus] = useState("Unloaded");
    const [myPBO, setMyPBO] = useState(null);
    const uri = { uri: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3' };
    const localUri = require('./assets/sfx/sound.wav');

    const [sound, setSound] = useState();
    const [sound_, setSound_] = useState();

    const [soundList, setSoundList] = useState([])

    const loadSoundList = () => {
        loadSound(uri, 0)
        loadSound(localUri, 1)
    }
    const loadSound = async (ur, num) => {
        const { sound } = await Audio.Sound.createAsync(ur);
        let newA = { ...soundList }
        newA[num] = sound;
        setSoundList(newA)
        console.log(soundList[num]);
    }

    async function playSound(num) {
            if (soundList[num] != null) {
           
                console.log('Playing Sound');
                await soundList[num].playAsync();
            }
        
    }

    useEffect(() => {
        loadSoundList()
    }, [soundList.length]);

    return (
        <View style={styles.container}>
            <Button title="Play Sound1" onPress={() => playSound(0)} />
            <Button title="Play Sound2" onPress={() => playSound(1)} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-evenly',

    },
    button: {
        backgroundColor: 'lightgreen',
        borderBlockColor: 'black',
        borderStyle: 'solid',
        borderWidth: 2,
        borderRadius: 7,
        marginBottom: 10,
        padding: 10,
    },
    buttonText: {
        fontSize: 24,
    }
});