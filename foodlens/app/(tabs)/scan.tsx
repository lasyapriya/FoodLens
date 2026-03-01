import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  Animated,
} from "react-native";
import { useEffect, useRef } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as ImageManipulator from "expo-image-manipulator";

const { width, height } = Dimensions.get("window");
const FRAME_SIZE = width * 0.7; // Square scan box size

export default function ScanScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const router = useRouter();

  const pulseAnim = useRef(new Animated.Value(1)).current;

  /* Pulse animation for capture button */
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.15,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  /* Request camera permission */
  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission]);

  /* Capture and crop ONLY the square area */
  const takePicture = async () => {
    if (!cameraRef.current) return;

    const photo = await cameraRef.current.takePictureAsync({
      quality: 1,
      skipProcessing: false,
    });

    // Convert screen coordinates to image coordinates
    const scaleX = photo.width / width;
    const scaleY = photo.height / height;

    const scanX = (width - FRAME_SIZE) / 2;
    const scanY = (height - FRAME_SIZE) / 2;

    const crop = {
      originX: scanX * scaleX,
      originY: scanY * scaleY,
      width: FRAME_SIZE * scaleX,
      height: FRAME_SIZE * scaleY,
    };

    const croppedImage = await ImageManipulator.manipulateAsync(
      photo.uri,
      [{ crop }],
      {
        compress: 0.9,
        format: ImageManipulator.SaveFormat.JPEG,
      }
    );

    router.push({
      pathname: "/preview",
      params: { uri: croppedImage.uri },
    } as any);
  };

  if (!permission?.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>
          Camera permission is required to scan food labels
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Camera Preview */}
      <CameraView ref={cameraRef} style={styles.camera} facing="back" />

      {/* Mask Overlay */}
      <View style={styles.maskContainer}>
        <View style={styles.maskTop} />
        <View style={styles.middleRow}>
          <View style={styles.maskSide} />
          <View style={styles.scanBox} />
          <View style={styles.maskSide} />
        </View>
        <View style={styles.maskBottom} />
      </View>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Scan Ingredients</Text>
        <Text style={styles.subtitle}>
          Place the label inside the square
        </Text>
      </View>

      {/* Capture Button */}
      <View style={styles.bottom}>
        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
          <Pressable style={styles.captureButton} onPress={takePicture}>
            <Ionicons name="camera" size={34} color="#fff" />
          </Pressable>
        </Animated.View>
      </View>
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  camera: {
    flex: 1,
  },

  /* Mask styles (PhonePe style) */
  maskContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
  },
  maskTop: {
    height: (height - FRAME_SIZE) / 2,
    backgroundColor: "rgba(2,6,23,0.8)",
  },
  maskBottom: {
    height: (height - FRAME_SIZE) / 2,
    backgroundColor: "rgba(2,6,23,0.8)",
  },
  middleRow: {
    flexDirection: "row",
  },
  maskSide: {
    width: (width - FRAME_SIZE) / 2,
    backgroundColor: "rgba(2,6,23,0.8)",
  },
  scanBox: {
    width: FRAME_SIZE,
    height: FRAME_SIZE,
    borderWidth: 2,
    borderColor: "#38BDF8",
    borderRadius: 16,
  },

  /* Header */
  header: {
    position: "absolute",
    top: 60,
    width: "100%",
    alignItems: "center",
  },
  title: {
    color: "#E0F2FE",
    fontSize: 22,
    fontWeight: "700",
  },
  subtitle: {
    color: "#93C5FD",
    marginTop: 6,
    fontSize: 14,
  },

  /* Capture button */
  bottom: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    alignItems: "center",
  },
  captureButton: {
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: "#0284C7",
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
  },

  /* Permission */
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#020617",
    padding: 20,
  },
  permissionText: {
    color: "#E0F2FE",
    fontSize: 16,
    textAlign: "center",
  },
});
