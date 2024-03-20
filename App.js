import { Pressable, StyleSheet, Text, Button, View } from 'react-native';
import { useEffect, useState } from 'react';
import { Audio } from 'expo-av';

export default function App() {
    const [playbackStatus, setPlaybackStatus] = useState("Unloaded");
    const [myPBO, setMyPBO] = useState(null);


    // Sounds
    const theme = require('./assets/sfx/theme.mp3');
    const tabla = require('./assets/sfx/TablaBeat.mp3');
    const mambo = require('./assets/sfx/MamboTime.wav');
    const harmonium = require('./assets/sfx/Harmonium.wav');
    const flute = require('./assets/sfx/Flute.wav');
    
    // Sound List
    const [soundList, setSoundList] = useState([])

    const loadSoundList = () => {
        loadSound(theme, 0)
        loadSound(tabla, 1)
        loadSound(mambo, 2)
        loadSound(harmonium, 3)
        loadSound(flute, 4)
      
    }
    const loadSound = async (ur, num) => {
        const { sound } = await Audio.Sound.createAsync(ur);
        let newA = { ...soundList }
        console.log(soundList[num]);
        if (soundList[num] == null){
        newA[num] = sound;
        setSoundList(newA)
        }
        console.log(soundList[num]);
    }
    const [whoPlay, setWhoPlay] = useState(null);


        const playSound = async (num) => {
        try {  
                if(soundList[num] == null){
                    loadSoundList()
                    playSound(num);
                  }
                 if (soundList[num] != null || whoPlay == num || whoPlay == null) {
                        console.log('Playing Sound');
                        await soundList[num].playAsync();
                        setWhoPlay(num)
                  }
                if(num != whoPlay && whoPlay != null && soundList[num] != null){
                    await soundList[whoPlay].stopAsync();
                    console.log('Playing Sound');
                    await soundList[num].playAsync();
                    setWhoPlay(num)
                } 
        } catch (e) {
            console.log(e)
        };
     }

    useEffect(() => {
        loadSoundList()

    }, [soundList.length]);

    return (
        <View style={styles.container}>
            <Button title="Play Theme" onPress={() => playSound(0)} />
            <Button title="Play Tabla" onPress={() => playSound(1)} />
            <Button title="Play Mambo" onPress={() => playSound(2)} />
            <Button title="Play Harmonium" onPress={() => playSound(3)} />
            <Button title="Play Flute" onPress={() => playSound(4)} />
            
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
        marginBottom: 10,
        padding: 10,
    },
    buttonText: {
        fontSize: 24,
    }
});