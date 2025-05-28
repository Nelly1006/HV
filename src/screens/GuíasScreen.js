import React, { useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

const { height, width } = Dimensions.get('window');

export default function GuíasScreen({ navigation }) {
  const [isLoggedIn] = useState(false);
  const [scaleValue] = useState(new Animated.Value(1)); // Para animación de escala en botones

  const guides = [
    { id: '1', title: 'Cultivo de Tomate Hidropónico', description: 'Guía con DWC para tomates frescos.', route: 'CultivoTomate' },
    { id: '2', title: 'Cultivo de Lechuga Hidropónica', description: 'Técnicas NFT para lechuga.', route: 'CultivoLechuga' },
    { id: '3', title: 'Riego Hidropónico con Goteo', description: 'Optimización para pepino.', route: 'RiegoHidropónico' },
    { id: '4', title: 'Cosecha Hidropónica Sostenible', description: 'Estrategias para espinaca y albahaca.', route: 'CosechaHidropónica' },
  ];

  // Animación de escala para botones
  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
      friction: 3,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
      friction: 3,
    }).start();
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/cultivo.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(26, 60, 52, 0.6)', 'rgba(76, 175, 80, 0.4)']}
          style={styles.overlayGradient}
        />
        <View style={styles.header}>
          <Animatable.View animation="fadeInRight" duration={1200} delay={400} style={styles.userIconWrapper}>
            <TouchableOpacity
              onPress={() => navigation.navigate('LoginScreen')}
              style={styles.userIconContainer}
              activeOpacity={0.7}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
            >
              <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
                <Text style={styles.userIcon}>👤</Text>
              </Animated.View>
            </TouchableOpacity>
          </Animatable.View>
        </View>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.guidesContainer}>
            {guides.map((guide) => (
              <Animatable.View
                key={guide.id}
                animation="fadeInUp"
                duration={1000}
                delay={parseInt(guide.id) * 200}
                style={styles.card}
              >
                <TouchableOpacity
                  onPress={() => navigation.navigate(guide.route)}
                  style={styles.cardButton}
                  activeOpacity={0.7}
                  onPressIn={handlePressIn}
                  onPressOut={handlePressOut}
                >
                  <LinearGradient
                    colors={['#FFFFFF', '#E6ECE6']}
                    style={styles.cardGradient}
                  >
                    <Text style={styles.cardTitle}>{guide.title}</Text>
                    <Text style={styles.cardDescription}>{guide.description}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </Animatable.View>
            ))}
          </View>
          <View style={styles.actionSection}>
            <Animatable.View animation="pulse" duration={1500} delay={800}>
              <TouchableOpacity
                onPress={() => navigation.navigate('DeteccionPlagas')}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                style={styles.actionButton}
                activeOpacity={0.7}
              >
                <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
                  <LinearGradient
                    colors={['#1A3C34', '#4CAF50']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.buttonGradient}
                  >
                    <Text style={styles.buttonText}>Detectar Plagas</Text>
                  </LinearGradient>
                </Animated.View>
              </TouchableOpacity>
            </Animatable.View>
          </View>
          <View style={styles.footerSpacer} />
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
    ...StyleSheet.absoluteFillObject,
    opacity: 0.75,
  },
  header: {
    padding: 20,
    paddingTop: 40,
    height: 80, // Espacio suficiente para el ícono
    justifyContent: 'flex-end', // Alinea el ícono en la parte superior
  },
  userIconWrapper: {
    position: 'absolute',
    right: 20,
    top: 20, // Ícono en la esquina superior derecha
  },
  userIconContainer: {
    padding: 12,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  userIcon: {
    fontSize: 22,
    color: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 40, // Espacio superior para centrar el contenido
    paddingBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: height,
  },
  guidesContainer: {
    width: '90%',
    alignItems: 'center',
    marginBottom: 30,
  },
  card: {
    width: '100%',
    marginBottom: 20,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  cardButton: {
    borderRadius: 15,
  },
  cardGradient: {
    padding: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A3C34',
    textAlign: 'center',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 15,
    color: '#555',
    textAlign: 'center',
    lineHeight: 22,
  },
  actionSection: {
    alignItems: 'center',
    marginVertical: 25,
  },
  actionButton: {
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  buttonGradient: {
    paddingVertical: 12,
    paddingHorizontal: 40,
    alignItems: 'center',
    borderRadius: 25,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  footerSpacer: {
    height: 60,
  },
});