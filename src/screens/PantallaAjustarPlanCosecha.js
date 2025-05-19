import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Cambiado a @react-native-picker/picker
import * as Animatable from 'react-native-animatable';

export default function PantallaAjustarPlanCosecha({ navigation }) {
  const [cultivo, setCultivo] = useState('Maíz');
  const [fecha, setFecha] = useState('');
  const [notas, setNotas] = useState('');

  const guardarPlan = () => {
    const plan = { cultivo, fecha, notas };
    alert(`Plan guardado:\nCultivo: ${plan.cultivo}\nFecha: ${plan.fecha}\nNotas: ${plan.notas}`);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInDown" duration={800} style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ajustar Plan de Cosecha</Text>
        <View style={styles.placeholder} />
      </Animatable.View>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Selecciona Cultivo</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={cultivo}
            onValueChange={(itemValue) => setCultivo(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Maíz" value="Maíz" />
            <Picker.Item label="Zanahoria" value="Zanahoria" />
            <Picker.Item label="Tomate" value="Tomate" />
          </Picker>
        </View>
        <Text style={styles.label}>Fecha de Cosecha</Text>
        <TextInput
          style={styles.input}
          value={fecha}
          onChangeText={setFecha}
          placeholder="Ej: 15-05-2025"
          keyboardType="default"
        />
        <Text style={styles.label}>Notas</Text>
        <TextInput
          style={styles.input}
          value={notas}
          onChangeText={setNotas}
          placeholder="Añade instrucciones o detalles"
          multiline
        />
        <TouchableOpacity style={styles.saveButton} onPress={guardarPlan}>
          <Text style={styles.saveButtonText}>Guardar Plan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    fontSize: 24,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#424242',
  },
  placeholder: {
    width: 24,
  },
  formContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    color: '#424242',
    marginBottom: 5,
    fontWeight: '600',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#FAFAFA',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: '#FAFAFA',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});