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

    async function playSound(num) {
        if (num == 1) {
            console.log('Loading Sound');
            const { sound } = await Audio.Sound.createAsync(uri)
            setSound(sound);

            console.log('Playing Sound');
            await sound.playAsync();
        }
        if (num == 2) {
            console.log('Loading Sound');
            const { sounds } = await Audio.Sound.createAsync(localUri)
            setSound_(sounds);

            console.log('Playing Sound');
            await sound_.playAsync();
        }
  
    }

    useEffect(() => {
        return sound && sound_ 
            ? () => {
                console.log('Unloading Sound');
                sound.unloadAsync();
                sound_.unloadAsync();
            }
            : undefined;
    }, [sound]);

    return (
        <View style={styles.container}>
            <Button title="Play Sound1" onPress={() => playSound(1)} />
            <Button title="Play Sound2" onPress={() => playSound(2)} />
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