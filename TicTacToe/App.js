import React, { Component } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { Row, PlayerDisplay, Square } from './UI';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <SafeAreaView style={styles.container}><View>
                <Row>
                    <Square top left />
                    <Square top center />
                    <Square top right />
                </Row>

                <Row>
                    <Square center left />
                    <Square center />
                    <Square center right />
                </Row>

                <Row>
                    <Square bottom left />
                    <Square bottom center />
                    <Square bottom right />
                </Row>

                <PlayerDisplay />
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
