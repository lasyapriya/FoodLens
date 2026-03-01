import {
  View,
  Text,
  StyleSheet,
  Switch,
  Pressable,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function SettingsScreen() {
  const router = useRouter();

  // UI-only states
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [personalization, setPersonalization] = useState(true);

  return (
    <LinearGradient
      colors={
        darkMode
          ? ["#020617", "#0F172A", "#020617"]
          : ["#E6F4FE", "#F8FAFC", "#E6F4FE"]
      }
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={[
            styles.title,
            !darkMode && { color: "#020617" },
          ]}
        >
          Settings
        </Text>

        {/* Appearance */}
        <Text
          style={[
            styles.sectionTitle,
            !darkMode && { color: "#0284C7" },
          ]}
        >
          Appearance
        </Text>

        <SettingRow
          icon="moon-outline"
          label="Dark Mode"
          value={darkMode}
          onToggle={setDarkMode}
          darkMode={darkMode}
        />

        {/* Preferences */}
        <Text
          style={[
            styles.sectionTitle,
            !darkMode && { color: "#0284C7" },
          ]}
        >
          Preferences
        </Text>

        <SettingRow
          icon="notifications-outline"
          label="Notifications"
          value={notifications}
          onToggle={setNotifications}
          darkMode={darkMode}
        />

        <SettingRow
          icon="heart-outline"
          label="Health Personalization"
          value={personalization}
          onToggle={setPersonalization}
          darkMode={darkMode}
        />

        {/* Info */}
        <Text
          style={[
            styles.sectionTitle,
            !darkMode && { color: "#0284C7" },
          ]}
        >
          Information
        </Text>

        <InfoRow
          icon="shield-checkmark-outline"
          text="Your data is processed securely and used only for analysis."
          darkMode={darkMode}
        />

        <InfoRow
          icon="analytics-outline"
          text="Ingredient analysis is based on scientific references."
          darkMode={darkMode}
        />

        {/* Logout */}
        <Pressable
          style={[
            styles.logoutButton,
            !darkMode && { borderColor: "#0284C7" },
          ]}
          onPress={() => router.replace("/")}
        >
          <Ionicons name="log-out-outline" size={20} color="#EF4444" />
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      </ScrollView>
    </LinearGradient>
  );
}

/* ---------- Reusable Components ---------- */

function SettingRow({
  icon,
  label,
  value,
  onToggle,
  darkMode,
}: any) {
  return (
    <View
      style={[
        styles.settingRow,
        !darkMode && { backgroundColor: "#F8FAFC" },
      ]}
    >
      <View style={styles.rowLeft}>
        <Ionicons
          name={icon}
          size={22}
          color={darkMode ? "#38BDF8" : "#0284C7"}
        />
        <Text
          style={[
            styles.settingLabel,
            !darkMode && { color: "#020617" },
          ]}
        >
          {label}
        </Text>
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ true: "#38BDF8" }}
      />
    </View>
  );
}

function InfoRow({ icon, text, darkMode }: any) {
  return (
    <View style={styles.infoRow}>
      <Ionicons
        name={icon}
        size={20}
        color={darkMode ? "#94A3B8" : "#0284C7"}
      />
      <Text
        style={[
          styles.infoText,
          !darkMode && { color: "#020617" },
        ]}
      >
        {text}
      </Text>
    </View>
  );
}

/* ---------- Styles ---------- */

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    padding: 24,
    paddingBottom: 40,
  },
  title: {
    color: "#E0F2FE",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
  },
  sectionTitle: {
    color: "#38BDF8",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 10,
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#020617",
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#1E293B",
    marginBottom: 10,
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  settingLabel: {
    color: "#E5E7EB",
    fontSize: 15,
    fontWeight: "500",
  },
  infoRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 10,
  },
  infoText: {
    color: "#CBD5E1",
    fontSize: 14,
    lineHeight: 20,
  },
  logoutButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    paddingVertical: 14,
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: "#EF4444",
  },
  logoutText: {
    color: "#EF4444",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 8,
  },
});
