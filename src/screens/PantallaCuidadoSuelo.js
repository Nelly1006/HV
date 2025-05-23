import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

export default function PantallaCuidadoSuelo({ navigation }) {
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
        <Text style={styles.headerTitle}>Cuidado del Suelo</Text>
        <View style={styles.placeholder} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Animatable.View animation="fadeInDown" duration={800}>
          <Text style={styles.introText}>
            ¡Mantén tu suelo saludable para cultivos exitosos!
          </Text>
        </Animatable.View>
        <Animatable.View animation="fadeInUp" duration={800} style={styles.tipsContainer}>
          <Text style={styles.sectionTitle}>Consejos para el Cuidado del Suelo</Text>
          <View style={styles.tipItem}>
            <Text style={styles.tipText}>🌱 Análisis del Suelo: Realiza un análisis anual para conocer sus nutrientes.</Text>
            <Text style={styles.tipSubText}>Usa kits de prueba o consulta a un experto local.</Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipText}>♻️ Rotación de Cultivos: Cambia los cultivos cada temporada.</Text>
            <Text style={styles.tipSubText}>Evita el agotamiento de nutrientes específicos.</Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipText}>💧 Riego Controlado: Aplica agua según las necesidades del suelo.</Text>
            <Text style={styles.tipSubText}>Evita el encharcamiento para preservar la estructura.</Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipText}>🌾 Abono Orgánico: Usa compost o estiércol para enriquecer el suelo.</Text>
            <Text style={styles.tipSubText}>Aplica en capas finas para mejores resultados.</Text>
          </View>
        </Animatable.View>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => alert('Funcionalidad en desarrollo: Más consejos')}
        >
          <LinearGradient
            colors={['#4CAF50', '#81C784']}
            style={styles.actionButtonGradient}
          >
            <Text style={styles.actionButtonText}>Más Consejos</Text>
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
  tipsContainer: {
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
  tipItem: {
    marginBottom: 15,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#F1F8E9',
  },
  tipText: {
    fontSize: 16,
    color: '#388E3C',
    fontWeight: 'bold',
  },
  tipSubText: {
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