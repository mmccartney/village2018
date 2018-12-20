import React, { Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView, AsyncStorage } from 'react-native';
import { Row, PlayerDisplay, Square, Button } from './UI';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            player: 'A',
            gameBoard: {
            },
        };
    }

    componentDidMount() {
        AsyncStorage.getItem('state', (err, result) => {
            if (result) { this.setState(JSON.parse(result)); }
        });
    }

    saveState = () => {
        AsyncStorage.setItem('state', JSON.stringify(this.state));
    }

    onPressPlayer = (player) => {
        this.setState({ player }, this.saveState);
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

        this.setState({ gameBoard, player }, this.saveState);
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

              <Button onPress={() => this.setState({ player: 'A', gameBoard: {} }, this.saveState)}>
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
