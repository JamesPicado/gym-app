import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useTheme } from "../../src/theme/useTheme";

export default function RegisterScreen() {
  const { colors } = useTheme();
  const router = useRouter();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Crear cuenta</Text>

      <TextInput
        placeholder="Nombre"
        placeholderTextColor="#9ca3af"
        style={[styles.input, { color: colors.text }]}
      />

      <TextInput
        placeholder="Email"
        placeholderTextColor="#9ca3af"
        style={[styles.input, { color: colors.text }]}
      />

      <TextInput
        placeholder="Contraseña"
        placeholderTextColor="#9ca3af"
        secureTextEntry
        style={[styles.input, { color: colors.text }]}
      />

      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Registrarme</Text>
      </Pressable>

      <Pressable onPress={() => router.back()}>
        <Text style={{ color: "#3b82f6", marginTop: 16 }}>
          Volver al login
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#374151",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 8,
    marginTop: 12,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },
});
