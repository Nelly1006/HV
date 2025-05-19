import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

export default function PantallaSiembraInteligente({ navigation }) {
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
        <Text style={styles.headerTitle}>Siembra Inteligente</Text>
        <View style={styles.placeholder} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Animatable.View animation="fadeInDown" duration={800}>
          <Text style={styles.introText}>
            ¡Optimiza tu siembra con recomendaciones inteligentes!
          </Text>
        </Animatable.View>
        <Animatable.View animation="fadeInUp" duration={800} style={styles.calendarContainer}>
          <Text style={styles.sectionTitle}>Calendario de Siembra - Mayo 2025</Text>
          <View style={styles.calendarItem}>
            <Text style={styles.calendarText}>🌱 Maíz: Ideal para sembrar este mes.</Text>
            <Text style={styles.calendarSubText}>Requiere suelo bien drenado y riego constante.</Text>
          </View>
          <View style={styles.calendarItem}>
            <Text style={styles.calendarText}>🥕 Zanahoria: Buena época para iniciar.</Text>
            <Text style={styles.calendarSubText}>Prefiere temperaturas frescas y suelo suelto.</Text>
          </View>
          <View style={styles.calendarItem}>
            <Text style={styles.calendarText}>🍅 Tomate: Siembra en zonas cálidas.</Text>
            <Text style={styles.calendarSubText}>Necesita exposición al sol y soporte para crecer.</Text>
          </View>
        </Animatable.View>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => alert('Funcionalidad en desarrollo: Ver más recomendaciones')}
        >
          <LinearGradient
            colors={['#4CAF50', '#81C784']}
            style={styles.actionButtonGradient}
          >
            <Text style={styles.actionButtonText}>Ver Más Recomendaciones</Text>
          </LinearGradient>
        </TouchableOpacity>
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
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  placeholder: {
    width: 24,
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  introText: {
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  calendarContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 15,
    width: '100%',
    marginBottom: 20,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
    textAlign: 'center',
  },
  calendarItem: {
    marginBottom: 15,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#F1F8E9',
  },
  calendarText: {
    fontSize: 16,
    color: '#388E3C',
    fontWeight: 'bold',
  },
  calendarSubText: {
    fontSize: 14,
    color: '#6D4C41',
    marginTop: 5,
  },
  actionButton: {
    borderRadius: 25,
    overflow: 'hidden',
    width: '70%',
    marginVertical: 10,
  },
  actionButtonGradient: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});