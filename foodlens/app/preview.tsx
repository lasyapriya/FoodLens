import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function PreviewScreen() {
  const { uri } = useLocalSearchParams<{ uri: string }>();
  const router = useRouter();

  return (
    <LinearGradient
      colors={["#020617", "#0F172A", "#1E3A8A"]}
      style={styles.container}
    >
      <Text style={styles.title}>Preview Image</Text>

      <Image source={{ uri }} style={styles.image} />

      <View style={styles.actions}>
        <Pressable
          style={styles.retakeButton}
          onPress={() => router.back()}
        >
          <Ionicons name="refresh" size={22} color="#38BDF8" />
          <Text style={styles.retakeText}>Retake</Text>
        </Pressable>

        <Pressable
  style={styles.analyzeButton}
  onPress={() => router.push("/ingredients")}
>
  <Ionicons name="scan" size={20} color="#fff" />
  <Text style={styles.analyzeText}>Analyze</Text>
</Pressable>

      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  title: {
    color: "#E0F2FE",
    fontSize: 20,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: "65%",
    borderRadius: 16,
    resizeMode: "contain",
    backgroundColor: "#020617",
  },
  actions: {
    flexDirection: "row",
    marginTop: 30,
    gap: 20,
  },
  retakeButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#38BDF8",
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 30,
  },
  retakeText: {
    color: "#38BDF8",
    fontSize: 16,
    marginLeft: 8,
    fontWeight: "600",
  },
  analyzeButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0284C7",
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 30,
  },
  analyzeText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 8,
    fontWeight: "600",
  },
});
