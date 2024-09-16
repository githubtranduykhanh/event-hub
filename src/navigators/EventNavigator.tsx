import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { EventDetail, EventScreen } from "~/screens"

const EventNavigator = () => {
    const Stack = createNativeStackNavigator()
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='EventScreen' component={EventScreen}/>
         
      </Stack.Navigator>
    )
}

export default EventNavigator