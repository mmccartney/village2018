import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';

const X = require('./X.png');
const O = require('./O.png');

const imgs = { X, O };

export function Row({ style, children }) {
    const row = { flexDirection: 'row' };
    return <View style={style ? [ row, style ] : row}>{children}</View>;
}

export function Button({ children, ...props }) {
    return <TouchableOpacity activeOpacity={1} {...props}>{children}</TouchableOpacity>;
}

export class PlayerDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            player: props.player,
        };
    }

    componentWillReceiveProps(props) {
        if (props.player !== this.props.player) {
            this.setState({ player: props.player });
        }
    }

    onPress = () => {
        if (this.state.player === 'B') {
            this.setState({ player: 'A' });
            this.props.onPress('A');
        } else {
            this.setState({ player: 'B' });
            this.props.onPress('B');
        }
    }

    render() {
        const text = { fontSize: 36 };
        const selected = { flex: 1, justifyContent: 'center', backgroundColor: 'green', color: 'white' };
        const other = { flex: 1, justifyContent: 'center', backgroundColor: '#777', color: 'black' };

        const playerA = (this.state.player !== 'B' ? selected : other);
        const playerB = (this.state.player === 'B' ? selected : other);

        return (
            <Button onPress={this.onPress}>
                <Row style={{ marginTop: 20 }}>
                    <Text style={[ text, playerA ]}>Player A</Text>
                    <Text style={[ text, playerB ]}>Player B</Text>
                </Row>
            </Button>
        );
    }
}

export class Square extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.value,
        };
    }

    id() {
        const { left, right, top, bottom, center } = this.props;
        return ((top && 'top') || (bottom && 'bottom') || (center && 'center'))
            + ((left && 'Left') || (right && 'Right') || '');
    }

    componentWillReceiveProps(props) {
        if (props.value !== this.props.value) {
            this.setState({ value: props.value });
        }
    }

    onPress = () => {
        if (this.props.player === 'B') {
        // if (this.state.value === 'X') {
            this.setState({ value: 'O' });
            this.props.onPress(this.id(), 'O');
        } else {
            this.setState({ value: 'X' });
            this.props.onPress(this.id(), 'X');
        }
    }

    render() {
        var { left, right, top, bottom, center } = this.props;
        if (center) {
            if (left || right) {
                top = true;
                bottom = true;
            } else if (top || bottom) {
                left = true;
                right = true;
            } else {
                top = true;
                left = true;
                right = true;
                bottom = true;
            }
        }

        const style = {
            borderColor: '#0ff',
            height: 100,
            width: 100,
        };

        const borderSize = 10;

        if (right) {
            style.borderLeftWidth = borderSize;
        }
        if (top) {
            style.borderBottomWidth = borderSize;
        }
        if (left) {
            style.borderRightWidth = borderSize;
        }
        if (bottom) {
            style.borderTopWidth = borderSize;
        }

        // <Image resizeMode="contain" style={{ width: 75, height: 75, alignSelf: 'center' }} source={imgs[this.state.value]} />

        return (
            <Button style={style} onPress={this.onPress}>
                <Text style={{ alignSelf: 'center', color: 'blue', fontSize: 72 }}>{this.state.value}</Text>
            </Button>
        );
    }
}
