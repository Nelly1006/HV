import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

const { height, width } = Dimensions.get('window');

export default function ProfileScreen({ navigation, route }) {
  const { isLoggedIn, setIsLoggedIn } = route.params;
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(false);

  const activities = [
    { id: '1', action: 'Detectaste plagas', date: '13 May 2025' },
    { id: '2', action: 'Leíste "Siembra Inteligente"', date: '12 May 2025' },
    { id: '3', action: 'Detectaste plagas', date: '11 May 2025' },
  ];

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigation.navigate('Guías');
  };

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
        <Text style={styles.headerTitle}>Perfil</Text>
        <View style={styles.placeholder} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Animatable.View animation="fadeInDown" duration={800} style={styles.userSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>👤</Text>
          </View>
          <Text style={styles.userName}>{isLoggedIn ? 'Usuario HV' : 'Invitado'}</Text>
        </Animatable.View>
        <Animatable.View animation="fadeInUp" duration={800} delay={200} style={styles.section}>
          <Text style={styles.sectionTitle}>Actividad Reciente</Text>
          {activities.map((activity) => (
            <Animatable.View
              key={activity.id}
              animation="fadeInUp"
              duration={800}
              delay={parseInt(activity.id) * 200}
              style={styles.activityCard}
            >
              <Text style={styles.activityText}>{activity.action}</Text>
              <Text style={styles.activityDate}>{activity.date}</Text>
            </Animatable.View>
          ))}
        </Animatable.View>
        <Animatable.View animation="fadeInUp" duration={800} delay={800} style={styles.section}>
          <Text style={styles.sectionTitle}>Ajustes</Text>
          <View style={styles.settingsCard}>
            <Text style={styles.settingsText}>Notificaciones</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#B0BEC5', true: '#4CAF50' }}
              thumbColor={'#FFFFFF'}
            />
          </View>
          {isLoggedIn && (
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <LinearGradient
                colors={['#4CAF50', '#81C784']}
                style={styles.logoutButtonGradient}
              >
                <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
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
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  placeholder: {
    width: 24, // Balances layout
  },
  scrollContent: {
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  userSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 50,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    marginBottom: 10,
  },
  avatarText: {
    fontSize: 40,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 15,
    textAlign: 'center',
    textShadowColor: 'rgba(76, 175, 80, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  activityCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    marginHorizontal: 10,
    elevation: 4,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activityText: {
    fontSize: 16,
    color: '#424242',
  },
  activityDate: {
    fontSize: 14,
    color: '#4CAF50',
  },
  settingsCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    marginHorizontal: 10,
    elevation: 4,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingsText: {
    fontSize: 16,
    color: '#424242',
  },
  logoutButton: {
    borderRadius: 25,
    overflow: 'hidden',
    marginHorizontal: 20,
    marginTop: 10,
  },
  logoutButtonGradient: {
    paddingVertical: 15,
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