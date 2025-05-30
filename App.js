import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import GuíasScreen from './src/screens/GuíasScreen';
import DeteccionPlagas from './src/screens/DeteccionPlagas';
import LoginScreen from './src/screens/LoginScreen';
import CosechaHidropónica from './src/screens/CosechaHidropónica';
import RiegoHidropónico from './src/screens/RiegoHidropónico';
import CultivoLechuga from './src/screens/CultivoLechuga';
import CultivoTomate from './src/screens/CultivoTomate';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Guías"
          component={GuíasScreen}
          options={{
            headerShown: false,
          }}
       
        />
        <Stack.Screen
          name="DeteccionPlagas"
          component={DeteccionPlagas}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CosechaHidropónica"
          component={CosechaHidropónica}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="RiegoHidropónico"
          component={RiegoHidropónico}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CultivoLechuga"
          component={CultivoLechuga}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CultivoTomate"
          component={CultivoTomate}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

