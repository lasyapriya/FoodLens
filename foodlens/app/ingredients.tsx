import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter, useLocalSearchParams } from "expo-router";
import { analyzeIngredients } from "../utils/analyzeIngredients";
import { useEffect, useState } from "react";

/* ---------- Types ---------- */
type Ingredient = {
  name: string;
  risk: "Safe" | "Caution" | "Avoid";
  reason: string;
};

/* ---------- Screen ---------- */
export default function IngredientsScreen() {
  const router = useRouter();

  const { ingredients } = useLocalSearchParams();

  const [data, setData] = useState<Ingredient[]>([]);

  useEffect(() => {
    const run = async () => {
      const result = await analyzeIngredients(ingredients as string);
      setData(result);
    };

    run();
  }, []);

  return (
    <LinearGradient
      colors={["#020617", "#0F172A", "#020617"]}
      style={styles.container}
    >
      <Text style={styles.title}>Ingredient Breakdown</Text>
      <Text style={styles.subtitle}>
        Scientific explanation of detected ingredients
      </Text>

      <ScrollView contentContainerStyle={styles.list}>
        {data.map((item, index) => (
          <IngredientCard key={index} ingredient={item} />
        ))}
      </ScrollView>

      {/* Final Result Button */}
      <Pressable
        style={styles.finalButton}
        onPress={() => router.push("/result")}
      >
        <Text style={styles.finalButtonText}>View Final Result</Text>
      </Pressable>
    </LinearGradient>
  );
}

/* ---------- Ingredient Card ---------- */
function IngredientCard({ ingredient }: { ingredient: Ingredient }) {
  const [expanded, setExpanded] = useState(false);

  const riskColor =
    ingredient.risk === "Safe"
      ? "#22C55E"
      : ingredient.risk === "Caution"
      ? "#FACC15"
      : "#EF4444";

  return (
    <Pressable
      style={styles.card}
      onPress={() => setExpanded(!expanded)}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.ingredientName}>{ingredient.name}</Text>

        <View style={[styles.riskBadge, { backgroundColor: riskColor }]}>
          <Text style={styles.riskText}>{ingredient.risk}</Text>
        </View>
      </View>

      {expanded && (
        <Text style={styles.reasonText}>{ingredient.reason}</Text>
      )}

      <Ionicons
        name={expanded ? "chevron-up" : "chevron-down"}
        size={20}
        color="#94A3B8"
        style={styles.chevron}
      />
    </Pressable>
  );
}

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    color: "#E0F2FE",
    fontSize: 22,
    fontWeight: "700",
    marginTop: 20,
  },
  subtitle: {
    color: "#93C5FD",
    fontSize: 14,
    marginTop: 6,
    marginBottom: 20,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#020617",
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#1E293B",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ingredientName: {
    color: "#E5E7EB",
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
    marginRight: 10,
  },
  riskBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  riskText: {
    color: "#020617",
    fontWeight: "700",
    fontSize: 12,
  },
  reasonText: {
    color: "#CBD5E1",
    fontSize: 14,
    lineHeight: 22,
    marginTop: 12,
  },
  chevron: {
    alignSelf: "center",
    marginTop: 8,
  },
  finalButton: {
    backgroundColor: "#0284C7",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 10,
  },
  finalButtonText: {
    color: "#E0F2FE",
    fontSize: 16,
    fontWeight: "700",
  },
});
