import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

const { height, width } = Dimensions.get('window');

export default function ConfiguraciónScreen({ navigation, route }) {
  const { isLoggedIn, setIsLoggedIn } = route.params;
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(false);
  const [language, setLanguage] = React.useState('Español');
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigation.navigate('Perfil');
  };

  const containerStyle = isDarkMode
    ? [styles.container, { backgroundColor: '#1A1A1A' }]
    : styles.container;

  const gradientColors = isDarkMode
    ? ['#2E7D32', '#4CAF50', '#263238']
    : ['#66BB6A', '#A5D6A7', '#E0F2E9'];

  const cardStyle = isDarkMode
    ? [styles.card, { backgroundColor: 'rgba(50, 50, 50, 0.85)', borderColor: 'rgba(76, 175, 80, 0.3)' }]
    : styles.card;

  const textColor = isDarkMode ? '#E0E0E0' : '#424242';
  const titleColor = isDarkMode ? '#81C784' : '#66BB6A';

  return (
    <View style={containerStyle}>
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.backgroundGradient}
      />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Configuración</Text>
        <View style={styles.placeholder} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Animatable.View animation="fadeInUp" duration={800} style={cardStyle}>
          <Text style={[styles.cardTitle, { color: titleColor }]}>Estado de Usuario</Text>
          <Text style={[styles.cardText, { color: textColor }]}>
            {isLoggedIn ? 'Conectado como Usuario HV' : 'Invitado'}
          </Text>
        </Animatable.View>
        <Animatable.View animation="fadeInUp" duration={800} delay={200} style={cardStyle}>
          <Text style={[styles.cardTitle, { color: titleColor }]}>Modo Oscuro</Text>
          <Switch
            value={isDarkMode}
            onValueChange={setIsDarkMode}
            trackColor={{ false: '#B0BEC5', true: '#66BB6A' }}
            thumbColor={'#FFFFFF'}
          />
        </Animatable.View>
        <Animatable.View animation="fadeInUp" duration={800} delay={400} style={cardStyle}>
          <Text style={[styles.cardTitle, { color: titleColor }]}>Notificaciones</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: '#B0BEC5', true: '#66BB6A' }}
            thumbColor={'#FFFFFF'}
          />
        </Animatable.View>
        <Animatable.View animation="fadeInUp" duration={800} delay={600} style={cardStyle}>
          <Text style={[styles.cardTitle, { color: titleColor }]}>Idioma</Text>
          <TouchableOpacity onPress={() => setLanguage(language === 'Español' ? 'Inglés' : 'Español')}>
            <Text style={[styles.cardText, { color: textColor }]}>{language}</Text>
          </TouchableOpacity>
        </Animatable.View>
        {isLoggedIn && (
          <Animatable.View animation="fadeInUp" duration={800} delay={800} style={cardStyle}>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <LinearGradient
                colors={['#66BB6A', '#81C784']}
                style={styles.logoutButtonGradient}
              >
                <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animatable.View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F2E9',
  },
  backgroundGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.95,
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
  scrollContent: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 25,
    padding: 20,
    marginBottom: 20,
    width: width * 0.9,
    elevation: 6,
    shadowColor: '#66BB6A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(102, 187, 106, 0.2)',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#66BB6A',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    color: '#424242',
  },
  logoutButton: {
    borderRadius: 25,
    overflow: 'hidden',
    width: '80%',
    alignSelf: 'center',
  },
  logoutButtonGradient: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});