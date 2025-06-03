import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Alert, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height } = Dimensions.get('window');

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateInput = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return false;
    }
    if (!email.includes('@')) {
      Alert.alert('Error', 'Por favor, ingresa un correo válido.');
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateInput()) return;
    setLoading(true);
    try {
      const response = await axios.post('http://192.168.137.15:5000/api/auth/login', { email, password });
       
      await AsyncStorage.setItem('token', response.data.token); // Guardar token
      Alert.alert('Éxito', response.data.message || '¡Has iniciado sesión en Hidrovida!');
      navigation.navigate('Guías');
    } catch (err) {
      Alert.alert('Error', err.response?.data?.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  const handleGuestAccess = () => {
    Alert.alert('Acceso de Invitado', 'Estás entrando como invitado. Algunas funciones estarán limitadas.');
    navigation.navigate('Guías');
  };

  const handleRegister = async () => {
  try {
    console.log('Intentando registrar:', { email, password }); // Añade este log para depurar
    const response = await axios.post('http://192.168.137.15:5000/api/auth/login', { email, password });
    Alert.alert('Éxito', 'Usuario registrado');
    navigation.navigate('Guías');
  } catch (err) {
    console.log('Error en registro:', err.response?.data); // Añade este log para depurar
    Alert.alert('Error', err.response?.data?.message || 'Error al registrarse');
  }
};

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>
      <View style={styles.content}>
        <Text style={styles.title}>Hidrovida - Iniciar Sesión</Text>

        {/* Sección de Planes */}
        <View style={styles.plansSection}>
          <Text style={styles.sectionTitle}>Planes de Hidrovida</Text>
          <Text style={styles.planText}>
            - <Text style={styles.planHighlight}>Gratis</Text>: Acceso básico a guías y detección de plagas (limitado).
          </Text>
          <Text style={styles.planText}>
            - <Text style={styles.planHighlight}>Premium Mensual</Text>: $30 MXN/mes - Acceso completo a guías, detección avanzada de plagas y soporte prioritario.
          </Text>
          <Text style={styles.planText}>
            - <Text style={styles.planHighlight}>Premium Anual</Text>: $300 MXN/año (aproximado) - Ahorra un 16% frente al plan mensual.
          </Text>
          <TouchableOpacity onPress={handleGuestAccess} style={styles.guestButton}>
            <Text style={styles.guestText}>Entrar como Invitado</Text>
          </TouchableOpacity>
        </View>

        {/* Formulario de Inicio de Sesión */}
        <TextInput
          style={styles.input}
          placeholder="Correo Electrónico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#999"
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#999"
        />
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.loginButton}
          disabled={loading}
        >
          <LinearGradient colors={['#1A3C34', '#4CAF50']} style={styles.gradient}>
            <Text style={styles.buttonText}>{loading ? 'Cargando...' : 'Iniciar Sesión'}</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleRegister}
          style={styles.registerButton}
          disabled={loading}
        >
          <LinearGradient colors={['#4CAF50', '#1A3C34']} style={styles.gradient}>
            <Text style={styles.buttonText}>{loading ? 'Cargando...' : 'Registrarse'}</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Alert.alert('Opción', 'Función de "Olvidé mi contraseña" en desarrollo')}>
          <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>

        {/* Sección de Configuraciones */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Configuraciones</Text>
          <View style={styles.settingRow}>
            <Text style={styles.settingText}>Activar Notificaciones</Text>
            <Switch
              trackColor={{ false: '#767577', true: '#4CAF50' }}
              thumbColor={notificationsEnabled ? '#FFFFFF' : '#F4F3F4'}
              onValueChange={setNotificationsEnabled}
              value={notificationsEnabled}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 10,
  },
  backText: {
    fontSize: 24,
    color: '#1A3C34',
    fontWeight: '600',
  },
  content: {
    alignItems: 'center',
    padding: 25,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    color: '#1A3C34',
    marginBottom: 20,
    textAlign: 'center',
  },
  plansSection: {
    marginBottom: 25,
    width: '100%',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A3C34',
    marginBottom: 10,
    textAlign: 'center',
  },
  planText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 5,
  },
  planHighlight: {
    fontWeight: '700',
    color: '#4CAF50',
  },
  guestButton: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#E0E0E0',
  },
  guestText: {
    fontSize: 14,
    color: '#1A3C34',
    fontWeight: '600',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
    elevation: 2,
  },
  loginButton: {
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 20,
  },
  registerButton: {
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 10,
  },
  gradient: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  forgotText: {
    marginTop: 15,
    fontSize: 14,
    color: '#4CAF50',
    textDecorationLine: 'underline',
  },
  settingsSection: {
    marginTop: 25,
    width: '100%',
    alignItems: 'center',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 10,
  },
  settingText: {
    fontSize: 16,
    color: '#333',
  },
});