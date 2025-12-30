import { View, StyleSheet, SafeAreaView, Pressable, Text } from "react-native";
import { Video, ResizeMode } from "expo-av";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function ExerciseVideoScreen() {
  const { url } = useLocalSearchParams<{ url: string }>();
  const router = useRouter();

  const videoUrl = url ? decodeURIComponent(url) : null;

  if (!videoUrl) {
    return (
      <SafeAreaView style={styles.center}>
        <Text>No se pudo cargar el video</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="close" size={26} color="#fff" />
        </Pressable>
        <Text style={styles.headerText}>Video del ejercicio</Text>
      </View>

      {/* VIDEO */}
      <Video
        source={{ uri: videoUrl }}
        style={styles.video}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        shouldPlay
        isLooping={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 12,
  },
  headerText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  video: {
    flex: 1,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
