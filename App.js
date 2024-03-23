/**
 * File     -   App.js 
 * Author   -   Raj Rai
 * Credit   -   Raj Rai, Stepehen Graham, rgbacolorpicker.com
 * Date     -   N/A
 **/

import { Pressable, StyleSheet, Text, Button, View, FlatList, Image, Alert} from 'react-native';
import { useEffect, useState } from 'react';
import { Audio } from 'expo-av';
import guide from './images/question.jpg';
import addIcon from './images/addMore.png';
import styles from './styles/page-styles';

export default function App() {

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

    const playSound = async (num) => {
        try {
            if (soundList[num].music != null) {
                console.log('Playing Sound', soundList[num].name);
                await soundList[num].music.playAsync();
                let playA = { ...soundList }
                playA[num].play = true;
                setSoundList(playA)
            }
        } catch (e) {
            console.log(e)
        };
     }

    const stopSound = async (num) => {
        if (soundList[num].music != null) {
            console.log('Stopped Sound', soundList[num].name)
            await soundList[num].music.stopAsync();
            let playA = { ...soundList }
            playA[num].play = false;
            setSoundList(playA)
        }
    }
    // unload a sound
    const unloadSound = async () => {
        let x = 0;
        while (x < soundList.length) {
            if (soundList[x].music != null) {
                await soundList[x].music.unloadAsync();
            }
            console.log("unloaded")
            x++

        }
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

    useEffect(() => {
        return soundList.music ? () => {
            soundList.music.unloadAsync();
            }
            : undefined;
    }, [soundList.music])

    // Info
    const showGuide = (num) => {
        if (num == 1) {
            Alert.alert("Info:",
                "Press a Box to play Sound - color brightens up. Press it Again To Stop Sound to Start from Beginning - Color becomes dimmer. Sounds are always Repeated.")
        }
        if (num == 2) {
            Alert.alert("Info:",
                "Colorless Box means No Sound was Recorded to It. Press any Box to Record Sound to them but Permission to use Microphone must be given first. Colored Box means there is recorded sound for play. Dimmed color means Stopped and Brightened color means Playing. Long Pressing the Box will delete the Box (unless it was already there) and its recording. You can press Plus Icon to Add More Boxes for Recording. ")
        }
    }

    const [recording, setRecording] = useState(null);
    const [recordingUri, setRecordingUri] = useState(null);
    const [playback, setPlayback] = useState(null);
    const [permissionsResponse, requestPermission] = Audio.usePermissions();

    const startRecording = async () => {
        try {
            // request permission to use the mic
            if (permissionsResponse.status !== 'granted') {
                console.log('Requesting permissions.');
                await requestPermission();
            }
            console.log('Permission is ', permissionsResponse.status);

            // set some device specific values
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            console.log('Starting recording...');
            setRecordLabelColor("red");
            const { recording } = await Audio.Recording.createAsync(
                Audio.RecordingOptionsPresets.HIGH_QUALITY
            );
            setRecording(recording);
            console.log('...recording');
        }
        catch (errorEvent) {
            console.error('Failed to startRecording(): ', errorEvent);
        }
    }

    const stopRecording = async () => {
        try {
            // stop the actual recording
            await recording.stopAndUnloadAsync();

            setRecordLabelColor("");

            // save the recorded object location
            const uri = recording.getURI();
            setRecordingUri(uri);

            // forget the recording object
            setRecording(undefined);

            // log the result
            console.log('Recording stopped and stored at ', uri);
        }
        catch (errorEvent) {
            console.error('Failed to stopRecording(): ', errorEvent);
        }
    }

    const playRecording = async () => {
        const { sound } = await Audio.Sound.createAsync({
            uri: recordingUri,
        });
        setPlayback(sound);
        await sound.replayAsync();
        console.log('Playing recorded sound from ', recordingUri);
    }

    // This effect hook will make sure the app stops recording when it ends
    useEffect(() => {
        return recording
            ? recording.stopAndUnloadAsync()
            : undefined;
    }, []);

    // label for unrecorded box
    // color for record label
    const [recordLabel, setRecordLabel] = useState("startRecord");
    const [recordLabelColor, setRecordLabelColor] = useState("green")

    function test() {
        if (recordLabel == "startRecord") {
            setRecordLabelColor("green")
            setRecordLabel("stopRecord")
        }
        if (recordLabel == "stopRecord") {
            setRecordLabelColor("red")
            setRecordLabel(null)
        }
        if (recordLabel == null) { 
            setRecordLabelColor('blue')
        }
    }
    return (
        <View style={styles.container}>
           
                <View style={styles.topView}>
                    <Text style={styles.title}> Audio Samples</Text>
                    <Pressable style={{ width: 20 }} onPress={() => showGuide(1)}><Image source={guide} style={styles.guide} /></Pressable>
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

            <View style={styles.topView}>
                <Text style={styles.titleTwo}> Recordings </Text>
                <Pressable style={{ width: 20 }} onPress={() => showGuide(2)}><Image source={guide} style={styles.guide} /></Pressable>
            </View>

            <View style={styles.ThirdView}>
                <View style={styles.sampleView}>
                    <Pressable style={styles.button} onPress={() => test() }  ><Text style={[styles.buttonText, { color: recordLabelColor }]}> {(recordLabel == "startRecord") ? "Record" : (recordLabel == "stopRecord") ? "Stop" : null} </Text></Pressable>
                    <Pressable style={styles.button} />
                    <Pressable style={styles.button} />
{/*                 <Pressable style={{ width: 20 }} onPress={() => showGuide(1)}><Image source={addIcon} style={styles.guide} /></Pressable>*/}
                 </View>
            </View>
    
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