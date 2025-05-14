import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { globalStyles } from '../styles/globalStyles';

const { height, width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#2E7D32', '#E8F5E9', '#FFFFFF']}
        style={styles.headerWave}
      />
      <View style={styles.content}>
        <Animatable.View animation="fadeInDown" duration={1200} style={styles.logoContainer}>
          <Image
            source={require('../../assets/logo.jpg')}
            style={styles.logo}
            resizeMode="contain"
          />
        </Animatable.View>
        <Animatable.View animation="fadeIn" duration={1200} delay={300} style={styles.textContainer}>
          <Text style={globalStyles.title}>HidroVida</Text>
          <Text style={styles.subtitle}>La nueva forma de crecer</Text>
        </Animatable.View>
        <Animatable.View animation="bounceIn" duration={1200} delay={600} style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonWrapper}>
            <LinearGradient
              colors={['#2E7D32', '#66BB6A']}
              style={styles.button}
            >
              <Text
                style={styles.buttonText}
                onPress={() => navigation.navigate('Guías')}
              >
                ¡COMENZEMOS!
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animatable.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerWave: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: height / 2.5,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    marginBottom: 30,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 10,
  },
  logo: {
    width: 160,
    height: 160,
  },
  textContainer: {
    marginBottom: 60,
  },
  subtitle: {
    fontSize: 24,
    fontStyle: 'italic',
    color: '#2E7D32',
    textAlign: 'center',
    letterSpacing: 2.2,
    fontWeight: '300',
    textShadowColor: 'rgba(46, 125, 50, 0.2)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  buttonContainer: {
    marginTop: 20,
  },
  buttonWrapper: {
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'rgba(46, 125, 50, 0.3)',
    overflow: 'hidden',
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 35,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
});