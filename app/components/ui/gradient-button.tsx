import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { BrandColors } from '@/constants/theme';

type GradientButtonProps = {
  title: string;
  onPress: () => void;
  icon?: React.ReactNode;
  style?: ViewStyle;
  disabled?: boolean;
};

export function GradientButton({ title, onPress, icon, style, disabled }: GradientButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        style,
        (pressed || disabled) && styles.buttonPressed,
      ]}>
      <LinearGradient
        colors={BrandColors.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}>
        {icon && <>{icon}</>}
        <Text style={styles.text}>{title}</Text>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    overflow: 'hidden',
    width: '100%',
  },
  buttonPressed: {
    opacity: 0.8,
  },
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    gap: 8,
  },
  text: {
    color: BrandColors.text.light,
    fontSize: 16,
    fontWeight: '600',
  },
});

