import { View, Text, StyleSheet, Animated } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { useTheme } from "../theme/useTheme";
import { useEffect, useRef } from "react";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type Props = {
  value: number;
  max: number;
};

export function ProgressRing({ value, max }: Props) {
  const { colors, isDark } = useTheme();

  const size = 180;
  const radius = 72;
  const strokeBg = 14;
  const strokeProgress = 16;

  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(value / max, 1);
  const percent = Math.round(progress * 100);

  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progress,
      duration: 900,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const strokeDashoffset = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        {/* Track */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={isDark ? "#1f2933" : "#e5e7eb"}
          strokeWidth={strokeBg}
          fill="none"
        />

        {/* Progress */}
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors.primary}
          strokeWidth={strokeProgress}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>

      {/* Center */}
      <View style={styles.center}>
        <Text style={[styles.value, { color: colors.text }]}>
          {value}/{max}
        </Text>
        <Text style={[styles.label, { color: colors.muted }]}>
          completadas
        </Text>

        <View style={styles.divider} />

        <Text style={[styles.percent, { color: colors.primary }]}>
          {percent}%
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  center: {
    position: "absolute",
    alignItems: "center",
  },
  value: {
    fontSize: 28,
    fontWeight: "800",
  },
  label: {
    fontSize: 13,
    opacity: 0.8,
  },
  divider: {
    width: 28,
    height: 1,
    backgroundColor: "#9ca3af",
    opacity: 0.4,
    marginVertical: 8,
  },
  percent: {
    fontSize: 16,
    fontWeight: "700",
  },
});
