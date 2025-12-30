import { Animated, StyleSheet, Platform } from "react-native";
import { useTheme } from "../theme/useTheme";
import { useEffect, useRef } from "react";

export function ProgressCard({ children }: { children: React.ReactNode }) {
  const { colors, isDark } = useTheme();

  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(10)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          opacity,
          transform: [{ translateY }],
        },
        !isDark && styles.lightShadow, // 👈 SOLO LIGHT MODE
      ]}
    >
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
  },

  /* Sombra solo Light Mode */
  lightShadow: Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.08,
      shadowRadius: 12,
    },
    android: {
      elevation: 4,
    },
  }),
});
