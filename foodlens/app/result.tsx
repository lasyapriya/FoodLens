import { View, Text, StyleSheet, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { calculateHealthScore } from "../utils/healthScore";

export default function ResultScreen() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={["#020617", "#0F172A", "#020617"]}
      style={styles.container}
    >
      <Ionicons name="alert-circle" size={90} color="#FACC15" />

      <Text style={styles.verdict}>CAUTION</Text>
      <Text style={styles.confidence}>Confidence: 82%</Text>

      <Text style={styles.reason}>
        This product contains ingredients like added sugar, palm oil, and
        monosodium glutamate which may have health implications if consumed
        frequently.
      </Text>

      <Text style={[styles.verdict,{color:score.color}]}>
{score.rating}
</Text>

<Text style={styles.reason}>
{score.message}
</Text>

      <Pressable
        style={styles.backButton}
        onPress={() => router.replace("/")}
      >
        <Text style={styles.backText}>Go to Home</Text>
      </Pressable>
    </LinearGradient>
  );
}

const score = calculateHealthScore(data);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  verdict: {
    color: "#FACC15",
    fontSize: 32,
    fontWeight: "800",
    marginTop: 20,
  },
  confidence: {
    color: "#93C5FD",
    fontSize: 16,
    marginTop: 6,
  },
  reason: {
    color: "#CBD5E1",
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
    marginTop: 20,
  },
  backButton: {
    marginTop: 30,
    backgroundColor: "#0284C7",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  backText: {
    color: "#E0F2FE",
    fontSize: 16,
    fontWeight: "700",
  },
});
