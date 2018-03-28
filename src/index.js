import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, Animated, View, Text } from 'react-native';
import PropTypes from 'prop-types';

const HEIGHT = 25;

export default class Component extends React.PureComponent {
  static propTypes = {
    group: PropTypes.array.isRequired,
    selected: PropTypes.string,
    labelColor: PropTypes.string,
    labelFontFamily: PropTypes.string,
    labelFontSize: PropTypes.number,
    radioColor: PropTypes.string,
    onPress: PropTypes.func.isRequired
  };

  static defaultProps = {
    labelColor: 'gray',
    radioColor: 'gray'
  };

  constructor(props) {
    super(props);

    this.state = {
      start: null
    };

    this.animationValue = {
      width: new Animated.Value(0),
      opacity: new Animated.Value(0)
    };
  }

  render() {
    return <View>{this.props.group.map(radio => this._renderRadioGroup(radio))}</View>;
  }

  _renderRadioGroup(radio) {
    return (
      <TouchableWithoutFeedback key={radio.id} onPress={() => this._onpressTeste(radio.id)}>
        <View style={styles.container}>
          <View style={[styles.viewRadio, { borderColor: this.props.radioColor }]}>
            {this.props.selected === radio.id && (
              <Animated.View
                style={[
                  styles.viewAnimation,
                  {
                    height: this.animationValue.width,
                    width: this.animationValue.width,
                    opacity: this.animationValue.opacity,
                    backgroundColor: this.props.radioColor
                  }
                ]}
              />
            )}
          </View>

          <View style={styles.viewLabel}>
            <Text style={[styles.label, { color: this.props.labelColor }]}>{radio.label}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  _onpressTeste(id) {
    this.props.onPress(id);
  }

  componentDidMount() {
    this.animationValue.width.setValue(0);
    this.animationValue.opacity.setValue(0);
    this.setState({ start: 'xxxxx' });

    Animated.timing(this.animationValue.opacity, {
      toValue: 1,
      duration: 600
    }).start();

    Animated.timing(this.animationValue.width, {
      toValue: HEIGHT - 8,
      duration: 200
    }).start();
  }

  _onPress(id) {
    if (this.props.selected !== id) {
      this.animationValue.width.setValue(0);
      this.animationValue.opacity.setValue(0);
      this.setState({ start: 'xxxxx' });

      Animated.timing(this.animationValue.opacity, {
        toValue: 1,
        duration: 600
      }).start();

      Animated.timing(this.animationValue.width, {
        toValue: HEIGHT - 8,
        duration: 200
      }).start();
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 7
  },
  viewRadio: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    height: HEIGHT,
    width: HEIGHT,
    borderRadius: HEIGHT / 2,
    borderWidth: 2
  },
  viewAnimation: {
    borderRadius: (HEIGHT - 8) / 2
  },
  viewLabel: {
    justifyContent: 'center',
    marginLeft: 5,
    height: HEIGHT
  },
  label: {
    backgroundColor: 'transparent',
    fontSize: 20
  }
});
