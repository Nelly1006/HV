import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

const { height, width } = Dimensions.get('window');

export default function GuíasScreen({ navigation }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const guides = [
    { id: '1', title: 'Siembra Inteligente', description: 'Aprende las mejores técnicas para sembrar.' },
    { id: '2', title: 'Cuidado del Suelo', description: 'Consejos para mantener tu suelo fértil.' },
    { id: '3', title: 'Riego Eficiente', description: 'Optimiza el uso del agua en tus cultivos.' },
    { id: '4', title: 'Cosecha Sostenible', description: 'Estrategias para una cosecha eco-amigable.' },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#4CAF50', '#A5D6A7', '#E8F5E9']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.backgroundGradient}
      />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile', { isLoggedIn, setIsLoggedIn })} style={styles.userIcon}>
          <Text style={styles.iconText}>{isLoggedIn ? '👤' : '🔐'}</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Animatable.View animation="fadeInDown" duration={800} style={styles.section}>
          <Text style={styles.sectionTitle}>Guías</Text>
        </Animatable.View>
        {guides.map((guide) => (
          <Animatable.View
            key={guide.id}
            animation="fadeInUp"
            duration={800}
            delay={parseInt(guide.id) * 200}
            style={styles.card}
          >
            <TouchableOpacity onPress={() => alert(`Abrir ${guide.title}`)}>
              <Text style={styles.cardTitle}>{guide.title}</Text>
              <Text style={styles.cardDescription}>{guide.description}</Text>
            </TouchableOpacity>
          </Animatable.View>
        ))}
        <Animatable.View animation="fadeInUp" duration={800} delay={1000} style={styles.pestSection}>
          <TouchableOpacity
            style={styles.pestButton}
            onPress={() => alert('Iniciar detección de plagas')}
          >
            <LinearGradient
              colors={['#4CAF50', '#81C784']}
              style={styles.pestButtonGradient}
            >
              <Text style={styles.pestButtonText}>Detectar Plagas</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animatable.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
  },
  backgroundGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.9,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  backButton: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  userIcon: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 25,
    padding: 10,
    elevation: 3,
  },
  iconText: {
    fontSize: 20,
    color: '#B0BEC5',
  },
  scrollContent: {
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    marginHorizontal: 10,
    elevation: 5,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(76, 175, 80, 0.1)',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: '#424242',
    lineHeight: 20,
  },
  pestSection: {
    marginTop: 20,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  pestButton: {
    borderRadius: 25,
    overflow: 'hidden',
    width: '70%',
  },
  pestButtonGradient: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
  },
  pestButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});