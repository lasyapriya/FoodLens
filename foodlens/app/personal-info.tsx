import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const HEALTH_ISSUES = [
  "None",
  "Diabetes",
  "High Blood Pressure",
  "Heart Disease",
  "Food Allergies",
  "Asthma",
  "Other",
];

export default function PersonalInfoScreen() {
  const router = useRouter();

  const [age, setAge] = useState("");
  const [gender, setGender] =
    useState<"Male" | "Female" | "Other" | null>(null);
  const [pregnant, setPregnant] = useState<"Yes" | "No" | null>(null);

  const [healthIssue, setHealthIssue] = useState("Select health issue");
  const [customIssue, setCustomIssue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <LinearGradient
      colors={["#020617", "#0F172A", "#020617"]}
      style={styles.container}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
      >
        {/* 🔒 Sticky Header */}
        <View style={styles.stickyHeader}>
          <Text style={styles.title}>Personal Health Info</Text>
          <Text style={styles.subtitle}>
            This helps us give personalized food insights
          </Text>
        </View>

        {/* Scrollable Content */}
        <View style={styles.content}>
          {/* Age */}
          <TextInput
            placeholder="Age"
            placeholderTextColor="#94A3B8"
            keyboardType="numeric"
            value={age}
            onChangeText={setAge}
            style={styles.input}
          />

          {/* Gender */}
          <Text style={styles.label}>Gender</Text>
          <View style={styles.row}>
            {["Male", "Female", "Other"].map((g) => (
              <Pressable
                key={g}
                style={[
                  styles.choiceButton,
                  gender === g && styles.choiceActive,
                ]}
                onPress={() => setGender(g as any)}
              >
                <Text style={styles.choiceText}>{g}</Text>
              </Pressable>
            ))}
          </View>

          {/* Pregnancy */}
          {gender === "Female" && (
            <>
              <Text style={styles.label}>Are you pregnant?</Text>
              <View style={styles.row}>
                {["Yes", "No"].map((p) => (
                  <Pressable
                    key={p}
                    style={[
                      styles.choiceButton,
                      pregnant === p && styles.choiceActive,
                    ]}
                    onPress={() => setPregnant(p as any)}
                  >
                    <Text style={styles.choiceText}>{p}</Text>
                  </Pressable>
                ))}
              </View>
            </>
          )}

          {/* Health Issues */}
          <Text style={styles.label}>Health Issues</Text>

          <Pressable
            style={styles.dropdownHeader}
            onPress={() => setShowDropdown(!showDropdown)}
          >
            <Text style={styles.dropdownHeaderText}>{healthIssue}</Text>
            <Ionicons
              name={showDropdown ? "chevron-up" : "chevron-down"}
              size={20}
              color="#38BDF8"
            />
          </Pressable>

          {showDropdown && (
            <View style={styles.dropdown}>
              {HEALTH_ISSUES.map((issue) => (
                <Pressable
                  key={issue}
                  onPress={() => {
                    setHealthIssue(issue);
                    setShowDropdown(false);
                  }}
                >
                  <Text style={styles.dropdownItem}>{issue}</Text>
                </Pressable>
              ))}
            </View>
          )}

          {/* Custom Issue */}
          {healthIssue === "Other" && (
            <TextInput
              placeholder="Enter your health issue"
              placeholderTextColor="#94A3B8"
              value={customIssue}
              onChangeText={setCustomIssue}
              style={styles.input}
            />
          )}

          {/* Continue */}
          <Pressable
            style={styles.primaryButton}
            onPress={() => router.replace("/scan")}
          >
            <Text style={styles.primaryText}>Continue</Text>
          </Pressable>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  /* Sticky Header */
  stickyHeader: {
    backgroundColor: "#020617",
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#1E293B",
  },
  title: {
    color: "#E0F2FE",
    fontSize: 26,
    fontWeight: "700",
  },
  subtitle: {
    color: "#93C5FD",
    fontSize: 14,
    marginTop: 4,
  },

  /* Content */
  content: {
    padding: 24,
    paddingBottom: 40,
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
  label: {
    color: "#CBD5E1",
    fontSize: 14,
    marginBottom: 6,
    marginTop: 10,
  },
  row: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },
  choiceButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#38BDF8",
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: "center",
  },
  choiceActive: {
    backgroundColor: "#0284C7",
  },
  choiceText: {
    color: "#E0F2FE",
    fontWeight: "600",
  },
  dropdownHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#020617",
    borderWidth: 1,
    borderColor: "#1E293B",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  dropdownHeaderText: {
    color: "#E5E7EB",
    fontSize: 14,
  },
  dropdown: {
    backgroundColor: "#020617",
    borderWidth: 1,
    borderColor: "#1E293B",
    borderRadius: 12,
    marginBottom: 16,
  },
  dropdownItem: {
    padding: 12,
    color: "#CBD5E1",
    borderBottomWidth: 1,
    borderBottomColor: "#1E293B",
  },
  primaryButton: {
    backgroundColor: "#0284C7",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 20,
  },
  primaryText: {
    color: "#E0F2FE",
    fontSize: 16,
    fontWeight: "700",
  },
});
