import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, SafeAreaView, AsyncStorage } from 'react-native';
import { Row, PlayerDisplay, Square, Button } from './UI';

const START = { player: 'A', gameBoard: {} };
const POLL_FREQUENCY = 100;
const SERVER = (Platform.OS === 'android') ? 'http://10.0.2.2:8000/' : 'http://localhost:8000/';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seqNum: 0,
            ...START
        };
    }

    componentDidMount() {
        const ignore = () => {};

        AsyncStorage.getItem('state', (err, result) => {
            if (result) { this.updateState(JSON.parse(result)); }
        });

        setInterval(() => {
            fetch(SERVER, { method: 'GET' }).then(
                response => { 
                    if (response.ok) {
                        response.json().then(this.updateState, ignore);
                    }
                },
                ignore
            );
        }, POLL_FREQUENCY);
    }

    updateState = (state) => {
        if (state.seqNum > this.state.seqNum) {
            this.setState(state);
        }
    }

    saveState = () => {
        const ignore = () => {};
        AsyncStorage.setItem('state', JSON.stringify(this.state));
        fetch(SERVER, { method: 'POST', body: JSON.stringify(this.state) }).then(ignore, ignore);
    }

    onPressPlayer = (player) => {
        this.setState({ player, seqNum: this.state.seqNum+1 }, this.saveState);
    }

    onPressSquare = (square, value) => {
        const gameBoard = { ...this.state.gameBoard };
        gameBoard[square] = value;

        var player;
        if (this.state.player === 'B') {
            player = 'A';
        } else {
            player = 'B';
        }

        this.setState({ gameBoard, player, seqNum: this.state.seqNum+1 }, this.saveState);
    }

    render() {
        const sq = {
            player: this.state.player,
            onPress: this.onPressSquare,
        };

        return (
            <SafeAreaView style={styles.container}><View>
                <Row>
                    <Square top left      value={this.state.gameBoard["topLeft"]}     {...sq} />
                    <Square top center    value={this.state.gameBoard["top"]}         {...sq} />
                    <Square top right     value={this.state.gameBoard["topRight"]}    {...sq} />
                </Row>

                <Row>
                    <Square center left   value={this.state.gameBoard["centerLeft"]}  {...sq} />
                    <Square center        value={this.state.gameBoard["center"]}      {...sq} />
                    <Square center right  value={this.state.gameBoard["centerRight"]} {...sq} />
                </Row>

                <Row>
                    <Square bottom left   value={this.state.gameBoard["bottomLeft"]}  {...sq} />
                    <Square bottom center value={this.state.gameBoard["bottom"]}      {...sq} />
                    <Square bottom right  value={this.state.gameBoard["bottomRight"]} {...sq} />
                </Row>

                <PlayerDisplay player={this.state.player} onPress={this.onPressPlayer} />

                <Button onPress={() => this.setState({ ...START, seqNum: this.state.seqNum+1 }, this.saveState)}>
                    <Text style={{ fontSize: 20, borderWidth: 1, borderColor: '#777', textAlign: 'center' }}>Reset</Text>
                </Button>
            </View></SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});
