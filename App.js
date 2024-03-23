/**
 * File     -   App.js 
 * Author   -   Raj Rai
 * Credit   -   Raj Rai
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
        { music: null, id: null, name: '', play: false, bgColor: ''},
        { music: null, id: null, name: '', play: false, bgColor: '' },
        { music: null, id: null, name: '', play: false, bgColor: '' },
        { music: null, id: null, name: '', play: false, bgColor: '' },
        { music: null, id: null, name: '', play: false, bgColor: '' }
    ])
    //let x = 0;
    //const [random, setRandom] = useState(null);
    //const ranNum = () => {
    //    console.log("Hllo")
    //    x = Math.floor(Math.random() * 5);
    //    let i = 0;
    //    while (i < soundList.length) {
    //        if (soundList[x].music == null && random != x) {
    //            setRandom(x);
    //            loadSoundList(x)
    //            chooseColor(x)
    //        }
    //        else {
    //            x = Math.floor(Math.random() * 5);

    //        }
    //        i++
    //    }
    //}
    const loadSoundList = () => {
        loadSound(theme, 0)
        loadSound(tabla, 1)
        loadSound(mambo, 2)
        loadSound(harmonium, 3)
        loadSound(flute, 4) 
    }

    const loadSound = async (ur, num) => {
        const { sound } = await Audio.Sound.createAsync(ur);
        await sound.setIsLoopingAsync(true)
        let newA = { ...soundList }
        if (soundList[num].music == null && soundList[num].id == null) {
            newA[num].music = sound; newA[num].id = num;
            setSoundList(newA)
            chooseColor(num)
        }
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


    // Set BG Colors
    const [dimColors, setDimColors] = useState(['rgba(255, 0, 0, 0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(0, 255, 242, 0.3)', 'rgba(255,255,0,0.3)'])
    function chooseColor(num) {
        if (soundList[num].music != null && soundList[num].bgColor == '') {
            let color = { ...soundList }
            color[num].bgColor = dimColors[num];
            setSoundList(color)
        }
    }

    const [fullColors, setFullColors] = useState(['rgba(255, 0, 0, 1)', 'rgba(0,255,0, 1)', 'rgba(0,0,255, 1)', 'rgba(0, 255, 242, 0.8)', 'rgba(255,255,0, 1)'])
    function lightUp(num) {
        if (soundList[num].music != null && soundList[num].bgColor != '') {
            let color = { ...soundList }
            color[num].bgColor = fullColors[num];
            setSoundList(color)
        }
        if (soundList[num].play == true) {
            let color = { ...soundList }
            color[num].bgColor = dimColors[num];
            setSoundList(color)
        }
    }

    useEffect(() => {
        loadSoundList()
    }, [soundList.length]);


    // Info
    const showGuide = () => {
        Alert.alert("Info:",
            "Press a Button to play Sound. Press Again To Stop to Start from Beginning. Sounds are always Repeated.")
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
                    <Pressable style={[styles.button, effect.glow, { backgroundColor: soundList[0].bgColor }]} onPress={() => { (soundList[0].play == false) ? playSound(0) : stopSound(0); lightUp(0) }} />
                    <Pressable style={[styles.button, effect.glow, { backgroundColor: soundList[1].bgColor }]} onPress={() => { (soundList[1].play == false) ? playSound(1) : stopSound(1); lightUp(1)}} />
                    <Pressable style={[styles.button, effect.glow, { backgroundColor: soundList[2].bgColor }]} onPress={() => { (soundList[2].play == false) ? playSound(2) : stopSound(2); lightUp(2) }} />
                    <Pressable style={[styles.button, effect.glow, { backgroundColor: soundList[3].bgColor }]} onPress={() => { (soundList[3].play == false) ? playSound(3) : stopSound(3); lightUp(3) }} />
                    <Pressable style={[styles.button, effect.glow, { backgroundColor: soundList[4].bgColor }]} onPress={() => { (soundList[4].play == false) ? playSound(4) : stopSound(4); lightUp(4) }} />
                </View>
            </View>

            <Pressable
                style={styles.recordPress} onPress={() => (showRecord == true) ? setShowRecord(false) : setShowRecord(true)}>
                <Text style={styles.recordText }> {(showRecord == true) ? "Hide Recordings" : "Show Recordings"}</Text>
            </Pressable>
            {showRecord?
                <View style={styles.ThirdView}>
                    <View style={styles.sampleView}>
                        <Pressable style={styles.button} />
                        <Pressable style={styles.button} />
                        <Pressable style={styles.button} />
                        <Pressable style={styles.button} />
                        <Pressable style={styles.button} />
                        <Pressable style={styles.button} />
                    </View>
                </View>
                : null
            }
        </View>
    );
}

const effect = StyleSheet.create({
    glow: {
        borderStyle: 'solid',
        opacity: 3,
        borderRadius: 10,
        borderBlockColor: 'gold',
    }
})