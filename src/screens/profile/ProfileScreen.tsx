import { View, Text, Pressable } from "react-native"
import { useTheme } from "../../context/ThemeContext"

export default function ProfileScreen() {
  const { toggleTheme } = useTheme()

  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-black">
      <Text className="text-black dark:text-white text-xl mb-4">
        Perfil
      </Text>

      <Pressable
        onPress={toggleTheme}
        className="px-4 py-2 bg-gray-800 rounded"
      >
        <Text className="text-white">Cambiar tema</Text>
      </Pressable>
    </View>
  )
}
