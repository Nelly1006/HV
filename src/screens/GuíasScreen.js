import React, { useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

const { height, width } = Dimensions.get('window');

export default function GuíasScreen({ navigation }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const guides = [
    { id: '1', title: 'Cultivo de Tomate Hidropónico', description: 'Guía para cultivar tomates con DWC.' },
    { id: '2', title: 'Cultivo de Lechuga Hidropónica', description: 'Técnicas NFT para lechuga fresca.' },
    { id: '3', title: 'Riego Hidropónico con Goteo', description: 'Optimiza el riego para pepino.' },
    { id: '4', title: 'Cosecha Hidropónica Sostenible', description: 'Estrategias para espinaca y albahaca.' },
  ];

  const handleLoginPress = () => {
    console.log('Abrir pantalla de inicio de sesión (no implementada)');
    // Aquí podrías navegar a una pantalla de login: navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/cultivo.jpg')}
        style={styles.backgroundImage}
      >
        <LinearGradient
          colors={['rgba(26, 60, 52, 0.8)', 'rgba(76, 175, 80, 0.6)', 'rgba(232, 245, 233, 0.9)']}
          style={styles.overlayGradient}
        />
        <View style={styles.headerContainer}>
          <Animatable.View animation="fadeInDown" duration={1200} style={styles.header}>
            <Text style={styles.headerTitle}>Guías Hidropónicas</Text>
          </Animatable.View>
          <Animatable.View animation="fadeInRight" duration={1200} delay={300}>
            <TouchableOpacity onPress={handleLoginPress} style={styles.userIconContainer}>
              <Text style={styles.userIcon}>👤</Text>
            </TouchableOpacity>
          </Animatable.View>
        </View>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {guides.map((guide) => (
            <Animatable.View
              key={guide.id}
              animation="fadeInUp"
              duration={1000}
              delay={parseInt(guide.id) * 200}
              style={styles.card}
            >
              <TouchableOpacity
                onPress={() => {
                  if (guide.title === 'Cultivo de Tomate Hidropónico') {
                    navigation.navigate('CultivoTomate');
                  } else if (guide.title === 'Cultivo de Lechuga Hidropónica') {
                    navigation.navigate('CultivoLechuga');
                  } else if (guide.title === 'Riego Hidropónico con Goteo') {
                    navigation.navigate('RiegoHidropónico');
                  } else if (guide.title === 'Cosecha Hidropónica Sostenible') {
                    navigation.navigate('CosechaHidropónica');
                  }
                }}
                activeOpacity={0.9}
                style={styles.cardTouchable}
              >
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{guide.title}</Text>
                  <Text style={styles.cardDescription}>{guide.description}</Text>
                </View>
              </TouchableOpacity>
            </Animatable.View>
          ))}
          <Animatable.View animation="zoomIn" duration={1200} delay={1000} style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                console.log('Navegar a DeteccionPlagas (no implementada)');
              }}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#1A3C34', '#4CAF50']}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>Detectar Plagas</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animatable.View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlayGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  header: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 8,
    letterSpacing: 1.5,
  },
  userIconContainer: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    elevation: 5,
  },
  userIcon: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#FFFFFF', // Restauré el fondo blanco puro
    borderRadius: 30,
    marginBottom: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    overflow: 'hidden',
  },
  cardTouchable: {
    padding: 20,
  },
  cardContent: {
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A3C34',
    textAlign: 'center',
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  cardDescription: {
    fontSize: 16,
    color: '#555555',
    textAlign: 'center',
    lineHeight: 24,
    fontStyle: 'italic',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    borderRadius: 35,
    overflow: 'hidden',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  buttonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 50,
    borderRadius: 35,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
});