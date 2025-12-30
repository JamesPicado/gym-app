import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useTheme } from "../../src/theme/useTheme";
import { useAuth } from "../(auth)/AuthContext";

export default function ProfileScreen() {
  const { mode, colors, toggleTheme } = useTheme();
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace("/(auth)/login");
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.text, { color: colors.text }]}>
        Tema actual: {mode}
      </Text>

      <Pressable onPress={toggleTheme} style={styles.button}>
        <Text style={styles.buttonText}>Cambiar tema</Text>
      </Pressable>

      <Pressable onPress={handleLogout} style={[styles.button, styles.logout]}>
        <Text style={styles.buttonText}>Cerrar sesión</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "#2563eb",
    borderRadius: 8,
    marginTop: 12,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "600",
  },
  logout: {
    backgroundColor: "#ef4444",
  },
});
