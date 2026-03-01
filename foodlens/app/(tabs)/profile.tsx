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

export default function ProfileScreen() {
  const [isEditing, setIsEditing] = useState(false);

  /* Dummy stored user data */
  const [age, setAge] = useState("22");
  const [gender, setGender] =
    useState<"Male" | "Female" | "Other">("Female");
  const [pregnant, setPregnant] = useState<"Yes" | "No">("No");
  const [healthIssue, setHealthIssue] = useState("Diabetes");
  const [customIssue, setCustomIssue] = useState("");

  return (
    <LinearGradient
      colors={["#020617", "#0F172A", "#020617"]}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Ionicons name="person-circle-outline" size={90} color="#38BDF8" />
          <Text style={styles.title}>Profile</Text>

          <Pressable
            style={styles.editButton}
            onPress={() => setIsEditing(!isEditing)}
          >
            <Ionicons
              name={isEditing ? "save-outline" : "create-outline"}
              size={18}
              color="#E0F2FE"
            />
            <Text style={styles.editText}>
              {isEditing ? "Save" : "Edit"}
            </Text>
          </Pressable>
        </View>

        {/* VIEW MODE */}
        {!isEditing && (
          <View style={styles.summaryCard}>
            <SummaryItem label="Age" value={age} />
            <SummaryItem label="Gender" value={gender} />

            {gender === "Female" && (
              <SummaryItem label="Pregnant" value={pregnant} />
            )}

            <SummaryItem label="Health Issue" value={healthIssue} />

            {healthIssue === "Other" && customIssue !== "" && (
              <SummaryItem label="Custom Issue" value={customIssue} />
            )}
          </View>
        )}

        {/* EDIT MODE */}
        {isEditing && (
          <View style={styles.content}>
            <ProfileField
              label="Age"
              value={age}
              onChange={setAge}
              keyboardType="numeric"
            />

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

            {gender === "Female" && (
              <>
                <Text style={styles.label}>Pregnant</Text>
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

            <Text style={styles.label}>Health Issue</Text>
            <View style={styles.dropdown}>
              {HEALTH_ISSUES.map((issue) => (
                <Pressable key={issue} onPress={() => setHealthIssue(issue)}>
                  <Text
                    style={[
                      styles.dropdownItem,
                      healthIssue === issue && styles.dropdownActive,
                    ]}
                  >
                    {issue}
                  </Text>
                </Pressable>
              ))}
            </View>

            {healthIssue === "Other" && (
              <ProfileField
                label="Custom Issue"
                value={customIssue}
                onChange={setCustomIssue}
              />
            )}
          </View>
        )}
      </ScrollView>
    </LinearGradient>
  );
}

/* ---------- Reusable Components ---------- */

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.summaryRow}>
      <Text style={styles.summaryLabel}>{label}</Text>
      <Text style={styles.summaryValue}>{value}</Text>
    </View>
  );
}

function ProfileField({
  label,
  value,
  onChange,
  keyboardType,
}: any) {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        keyboardType={keyboardType}
        onChangeText={onChange}
        style={styles.input}
      />
    </>
  );
}

/* ---------- Styles ---------- */

const styles = StyleSheet.create({
  container: { flex: 1 },

  header: {
    alignItems: "center",
    paddingTop: 30,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#1E293B",
  },
  title: {
    color: "#E0F2FE",
    fontSize: 22,
    fontWeight: "700",
    marginTop: 6,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    backgroundColor: "#0284C7",
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editText: {
    color: "#E0F2FE",
    fontWeight: "600",
    marginLeft: 6,
  },

  /* Summary View */
  summaryCard: {
    backgroundColor: "#020617",
    margin: 24,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1E293B",
  },
  summaryRow: {
    marginBottom: 14,
  },
  summaryLabel: {
    color: "#93C5FD",
    fontSize: 13,
  },
  summaryValue: {
    color: "#E0F2FE",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 2,
  },

  /* Edit Mode */
  content: {
    padding: 24,
  },
  label: {
    color: "#CBD5E1",
    fontSize: 14,
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    backgroundColor: "#020617",
    borderWidth: 1,
    borderColor: "#1E293B",
    borderRadius: 12,
    padding: 14,
    color: "#E5E7EB",
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
  dropdownActive: {
    color: "#38BDF8",
    fontWeight: "700",
  },
});
