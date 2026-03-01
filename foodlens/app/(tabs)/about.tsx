import { View, Text, StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function AboutScreen() {
  return (
    <LinearGradient
      colors={["#020617", "#0F172A", "#020617"]}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* App Icon */}
        <Ionicons
          name="information-circle-outline"
          size={90}
          color="#38BDF8"
          style={{ alignSelf: "center", marginBottom: 20 }}
        />

        {/* Title */}
        <Text style={styles.title}>About FoodLens</Text>

        {/* Description */}
        <Text style={styles.text}>
          FoodLens is a smart food-label analysis application designed to help
          consumers understand what they are really eating. By decoding complex
          ingredient names and additives, the app provides clear and
          science-backed insights into packaged food products.
        </Text>

        {/* Section */}
        <Text style={styles.sectionTitle}>Why FoodLens?</Text>
        <Text style={styles.text}>
          Most existing food apps provide only generic health scores. FoodLens
          goes deeper by analyzing individual ingredients, their potential
          health effects, and suitability based on a user’s personal health
          profile.
        </Text>

        {/* Section */}
        <Text style={styles.sectionTitle}>Key Highlights</Text>

        <View style={styles.bulletRow}>
          <Ionicons name="checkmark-circle-outline" size={20} color="#22C55E" />
          <Text style={styles.bulletText}>
            Ingredient-level health analysis
          </Text>
        </View>

        <View style={styles.bulletRow}>
          <Ionicons name="checkmark-circle-outline" size={20} color="#22C55E" />
          <Text style={styles.bulletText}>
            Personalized insights based on health conditions
          </Text>
        </View>

        <View style={styles.bulletRow}>
          <Ionicons name="checkmark-circle-outline" size={20} color="#22C55E" />
          <Text style={styles.bulletText}>
            Clear Safe / Caution / Avoid classification
          </Text>
        </View>

        <View style={styles.bulletRow}>
          <Ionicons name="checkmark-circle-outline" size={20} color="#22C55E" />
          <Text style={styles.bulletText}>
            User-friendly and explainable results
          </Text>
        </View>

        {/* Section */}
        <Text style={styles.sectionTitle}>Disclaimer</Text>
        <Text style={styles.text}>
          FoodLens is intended for informational purposes only. It does not
          replace professional medical advice. Users are encouraged to consult
          healthcare professionals for medical concerns.
        </Text>

        {/* Footer */}
        <Text style={styles.footer}>
          Version 1.0 • Final Year Project
        </Text>
      </ScrollView>
    </LinearGradient>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 24,
    paddingBottom: 40,
  },
  title: {
    color: "#E0F2FE",
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    color: "#38BDF8",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 8,
  },
  text: {
    color: "#CBD5E1",
    fontSize: 14,
    lineHeight: 22,
  },
  bulletRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  bulletText: {
    color: "#CBD5E1",
    fontSize: 14,
    marginLeft: 10,
  },
  footer: {
    color: "#94A3B8",
    fontSize: 12,
    textAlign: "center",
    marginTop: 30,
  },
});
