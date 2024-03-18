import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { Audio } from 'expo-av';

export default function App() {
    const [playbackStatus, setPlaybackStatus] = useState("Unloaded");
    const [myPBO, setMyPBO] = useState(null);
    const uri = { uri: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3' };
    const localUri = require('./assets/sfx/sound.wav');

    // load a sound
    const loadSound = async (uri) => {

        const { sound } = await Audio.Sound.createAsync(localUri);
        setMyPBO(sound);
        setPlaybackStatus("Loaded");
    }
    // play a sound
    const playSound = async () => {
        try {
            await myPBO.playAsync();
            setPlaybackStatus("Playing");
        } catch (e) {
            console.log(e)
        };
    }

    // pause a sound
    const pauseSound = async () => {
        await myPBO.pauseAsync();
        setPlaybackStatus("Paused");
    }

    // stop a sound
    const stopSound = async () => {
        await myPBO.stopAsync();
        setPlaybackStatus("Stopped");
    }
    // unload a sound
    const unloadSound = async () => {
        await myPBO.unloadAsync();
        setPlaybackStatus("Unloaded");
    }

    useEffect(() => {
        loadSound(uri);
        return myPBO
            ? () => {
                unloadSound
                setPlaybackStatus("Unloaded")
            }
            : undefined;

    }, [])

    return (
        <View style={styles.container}>
            <Pressable
                style={styles.button}
                onPress={(playbackStatus == "Playing") ? pauseSound : playSound}
            >
                <Text style={styles.buttonText}>
                    {(playbackStatus == "Playing") ?
                        "Pause"
                        : "Play"
                    }
                </Text>
            </Pressable>
            <Pressable
                style={styles.button}
                onPress={stopSound}
            >
                <Text style={styles.buttonText}>
                    Stop
                </Text>
            </Pressable>
            <Text style={styles.buttonText}>Status: {playbackStatus}</Text>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: 'lightgreen',
        borderBlockColor: 'black',
        borderStyle: 'solid',
        borderWidth: 2,
        borderRadius: 7,
        margin: 10,
        padding: 10,
    },
    buttonText: {
        fontSize: 24,
    }
});