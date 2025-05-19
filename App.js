import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import GuíasScreen from './src/screens/GuíasScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import PantallaDeteccionPlagas from './src/screens/PantallaDeteccionPlagas';
import PantallaSiembraInteligente from './src/screens/PantallaSiembraInteligente';
import PantallaCuidadoSuelo from './src/screens/PantallaCuidadoSuelo';
import PantallaRiegoEficiente from './src/screens/PantallaRiegoEficiente';
import PantallaCosechaSostenible from './src/screens/PantallaCosechaSostenible';
import PantallaPlanCosecha from './src/screens/PantallaPlanCosecha';
import PantallaAjustarPlanCosecha from './src/screens/PantallaAjustarPlanCosecha';

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
          name="Profile"
          component={ProfileScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="DeteccionPlagas"
          component={PantallaDeteccionPlagas}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SiembraInteligente"
          component={PantallaSiembraInteligente}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CuidadoSuelo"
          component={PantallaCuidadoSuelo}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="RiegoEficiente"
          component={PantallaRiegoEficiente}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CosechaSostenible"
          component={PantallaCosechaSostenible}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PlanCosecha"
          component={PantallaPlanCosecha}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AjustarPlanCosecha"
          component={PantallaAjustarPlanCosecha}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}