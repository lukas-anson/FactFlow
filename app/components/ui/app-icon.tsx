import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BrandColors } from '@/constants/theme';

type AppIconProps = {
  size?: number;
};

export function AppIcon({ size = 80 }: AppIconProps) {
  const borderRadius = size * 0.25;
  const iconSize = size * 0.4;
  
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <LinearGradient
        colors={BrandColors.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.gradient, { width: size, height: size, borderRadius }]}>
        <View style={styles.iconContent}>
          {/* Star/Sparkle icon */}
          <Ionicons name="star" size={iconSize} color={BrandColors.text.light} />
          {/* Small circle below left */}
          <View style={[styles.circle, { bottom: -size * 0.1, left: -size * 0.15 }]} />
          {/* Small plus above right */}
          <View style={[styles.plusContainer, { top: -size * 0.15, right: -size * 0.15 }]}>
            <View style={[styles.plusLine, styles.plusHorizontal]} />
            <View style={[styles.plusLine, styles.plusVertical]} />
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  gradient: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContent: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: BrandColors.text.light,
  },
  plusContainer: {
    position: 'absolute',
    width: 12,
    height: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusLine: {
    position: 'absolute',
    backgroundColor: BrandColors.text.light,
  },
  plusHorizontal: {
    width: 10,
    height: 2,
  },
  plusVertical: {
    width: 2,
    height: 10,
  },
});

