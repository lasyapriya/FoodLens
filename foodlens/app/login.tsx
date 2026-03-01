import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={["#020617", "#0F172A", "#020617"]}
      style={styles.container}
    >
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#94A3B8"
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#94A3B8"
        secureTextEntry
        style={styles.input}
      />

    <Pressable
  style={styles.primaryButton}
  onPress={() => router.replace("/scan")}
>
  <Text style={styles.primaryText}>Login</Text>
</Pressable>



      <Pressable onPress={() => router.push("/signup")}>
        <Text style={styles.linkText}>
          Don’t have an account? Sign up
        </Text>
      </Pressable>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  title: {
    color: "#E0F2FE",
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#020617",
    borderWidth: 1,
    borderColor: "#1E293B",
    borderRadius: 12,
    padding: 14,
    color: "#E5E7EB",
    marginBottom: 16,
  },
  primaryButton: {
    backgroundColor: "#0284C7",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 10,
  },
  primaryText: {
    color: "#E0F2FE",
    fontSize: 16,
    fontWeight: "700",
  },
  linkText: {
    color: "#38BDF8",
    marginTop: 20,
    textAlign: "center",
  },
});
