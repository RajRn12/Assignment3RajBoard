/**
 * File     -   App.js 
 * Author   -   Raj Rai
 * Credit   -   N/A
 * Date     -   N/A
 **/

import { Pressable, StyleSheet, Text, Button, View, FlatList, Image, Alert} from 'react-native';
import { useEffect, useState } from 'react';
import { Audio } from 'expo-av';
import guide from './images/question.jpg';
import styles from './styles/page-styles';

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
    const [soundList, setSoundList] = useState([
        { music: null, id: 0, name: '', play: false},
        { music: null, id: 1, name: '', play: false },
        { music: null, id: 2, name: '', play: false },
        { music: null, id: 3, name: '', play: false },
        { music: null, id: 4, name: '', play: false }
    ])

    const loadSoundList = () => {
        loadSound(theme, 0, 'Theme Music')
        loadSound(tabla, 1, 'Tabla Beat')
        loadSound(mambo, 2, 'Mambo Time')
        loadSound(harmonium, 3, 'Harmonium')
        loadSound(flute, 4, 'Flute')
      
    }

    const loadSound = async (ur, num, name_) => {
        const { sound } = await Audio.Sound.createAsync(ur);
        let newA = { ...soundList }
        console.log(soundList[num].music);
        if (soundList[num].music == null) {
            newA[num].music = sound; newA[num].id = num; newA[num].name = name_;
            setSoundList(newA)
        }
        console.log(soundList[num].music);
    }

    // whoPay is used to stop current playing sound for a new sound 
    const [whoPlay, setWhoPlay] = useState(null);
    const playSound = async (num) => {
        try {
            console.log('Playing Sound', soundList[num].name);
            await soundList[num].music.playAsync();
            let playA= { ...soundList }
            playA[num].play = true;
            setSoundList(playA)

        } catch (e) {
            console.log(e)
        };
     }

    const stopSound = async (num) => {
        console.log('Stopped Sound', soundList[num].name)
        await soundList[num].music.stopAsync();
        let playA = { ...soundList }
        playA[num].play = false;
        setSoundList(playA)
    }
    // unload a sound
    const unloadSound = async () => {
        await myPBO.unloadAsync();
        setPlaybackStatus("Unloaded");
    }

    useEffect(() => {
        loadSoundList()

    }, [soundList.length]);


    // Info
    const showGuide = () => {
        Alert.alert("Info:",
            "Press a Button to play Sound. Press Again To Pause. You can Stop to Start from beginning. You can Repeat Sound")
    }

    const [showRecord, setShowRecord] = useState(true);
    return (
        <View style={styles.container}>
           
                <View style={styles.topView}>
                    <Text style={styles.title}> Audio Samples</Text>
                    <Pressable style={{ width: 20 }} onPress={() => showGuide()}><Image source={guide} style={styles.guide} /></Pressable>
                </View>
           
            <View style={styles.secondView}>
                <View style={styles.sampleView}>
                    <Pressable style={styles.button} onPress={() => (soundList[0].play == false) ? playSound(0) : stopSound(0)}><Text>{soundList[0].name}</Text></Pressable>
                    <Pressable style={styles.button} onPress={() => (soundList[1].play == false) ? playSound(1) : stopSound(1)}><Text>{soundList[1].name}</Text></Pressable>
                    <Pressable style={styles.button} onPress={() => (soundList[2].play == false) ? playSound(2) : stopSound(2)}><Text>{soundList[2].name}</Text></Pressable>
                    <Pressable style={styles.button} onPress={() => (soundList[3].play == false) ? playSound(3) : stopSound(3)}><Text>{soundList[3].name}</Text></Pressable>
                    <Pressable style={styles.button} onPress={() => (soundList[4].play == false) ? playSound(4) : stopSound(4)}><Text>{soundList[4].name}</Text></Pressable>
                </View>
            </View>

            <Pressable
                style={styles.recordPress} onPress={() => (showRecord == true) ? setShowRecord(false) : setShowRecord(true)}>
                <Text style={styles.recordText }> {(showRecord == true) ? "Hide Recordings" : "Show Recordings"}</Text>
            </Pressable>
            {showRecord?
                <View style={styles.ThirdView}>
                    <View style={styles.sampleView}>
                        <Pressable><Text>Play {soundList[0].name}</Text></Pressable>
                    </View>
                </View>
                : null
            }
        </View>
    );
}
