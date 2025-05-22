import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

const { height, width } = Dimensions.get('window');

export default function CultivoTomate({ navigation }) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1A3C34', '#4CAF50', '#E8F5E9']}
        style={styles.headerGradient}
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Animatable.View animation="fadeInDown" duration={1200} style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButtonContainer}>
            <Text style={styles.backButton}>←</Text>
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.headerTitle}>Cultivo de Tomate Hidropónico</Text>
          </View>
        </Animatable.View>
        <Animatable.View animation="zoomIn" duration={1200} delay={300} style={styles.imageContainer}>
          <Image
            source={require('../../assets/tomate.jpg')}
            style={styles.image}
            resizeMode="cover"
          />
          <LinearGradient
            colors={['transparent', 'rgba(46, 125, 50, 0.8)']}
            style={styles.imageOverlay}
          />
        </Animatable.View>
        <Animatable.View animation="fadeInUp" duration={1200} delay={600} style={styles.content}>
          <Text style={styles.sectionTitle}>Guía DWC para Tomates</Text>
          <Text style={styles.description}>
            El sistema DWC (Deep Water Culture) sumerge las raíces de los tomates en una solución nutritiva oxigenada. Sigue estos pasos:
          </Text>
          <View style={styles.stepsContainer}>
            <Animatable.View animation="fadeInLeft" duration={800} delay={800}>
              <Text style={styles.step}>
                <Text style={styles.stepNumber}>1. </Text>Preparación: Usa un recipiente con agua y un aerador. Ajusta el pH a 5.5-6.5.
              </Text>
            </Animatable.View>
            <Animatable.View animation="fadeInLeft" duration={800} delay={1000}>
              <Text style={styles.step}>
                <Text style={styles.stepNumber}>2. </Text>Siembra: Coloca plántulas de tomate en cubos de espuma o macetas flotantes.
              </Text>
            </Animatable.View>
            <Animatable.View animation="fadeInLeft" duration={800} delay={1200}>
              <Text style={styles.step}>
                <Text style={styles.stepNumber}>3. </Text>Nutrientes: Agrega una solución hidropónica balanceada (nitrógeno, fósforo, potasio).
              </Text>
            </Animatable.View>
            <Animatable.View animation="fadeInLeft" duration={800} delay={1400}>
              <Text style={styles.step}>
                <Text style={styles.stepNumber}>4. </Text>Mantenimiento: Cambia la solución cada 2 semanas y monitorea la temperatura (18-24°C).
              </Text>
            </Animatable.View>
            <Animatable.View animation="fadeInLeft" duration={800} delay={1600}>
              <Text style={styles.step}>
                <Text style={styles.stepNumber}>5. </Text>Cosecha: Recolecta tomates maduros tras 60-80 días.
              </Text>
            </Animatable.View>
          </View>
          <Animatable.View animation="bounceIn" duration={1200} delay={1800} style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Guías')}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#2E7D32', '#66BB6A']}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>Volver a Guías</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animatable.View>
        </Animatable.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  headerGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: height * 0.35,
    borderBottomLeftRadius: 200,
    borderBottomRightRadius: 200,
    transform: [{ scaleX: 1.2 }],
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: 50,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20,
    marginBottom: 30,
    justifyContent: 'space-between',
  },
  backButtonContainer: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    elevation: 5,
  },
  backButton: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    marginRight: 40,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
    letterSpacing: 1.5,
  },
  imageContainer: {
    marginBottom: 30,
    borderRadius: 30,
    overflow: 'hidden',
    elevation: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    backgroundColor: '#FFFFFF',
  },
  image: {
    width: '100%',
    height: 280,
  },
  imageOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
  },
  content: {
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    paddingVertical: 25,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1A3C34',
    textAlign: 'center',
    marginBottom: 20,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  description: {
    fontSize: 16,
    color: '#555555',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 26,
    fontStyle: 'italic',
    paddingHorizontal: 10,
  },
  stepsContainer: {
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  step: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 18,
    paddingLeft: 15,
    lineHeight: 26,
    backgroundColor: 'rgba(232, 245, 233, 0.5)',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  stepNumber: {
    fontWeight: '700',
    color: '#2E7D32',
    fontSize: 18,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 30,
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