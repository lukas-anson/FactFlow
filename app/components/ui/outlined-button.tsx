import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { BrandColors } from '@/constants/theme';

type OutlinedButtonProps = {
  title: string;
  onPress: () => void;
  icon?: React.ReactNode;
  style?: ViewStyle;
  disabled?: boolean;
};

export function OutlinedButton({ title, onPress, icon, style, disabled }: OutlinedButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        style,
        (pressed || disabled) && styles.buttonPressed,
      ]}>
      <View style={styles.content}>
        {icon && <>{icon}</>}
        <Text style={styles.text}>{title}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: BrandColors.primary,
    backgroundColor: BrandColors.background.light,
    width: '100%',
  },
  buttonPressed: {
    opacity: 0.7,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    gap: 8,
  },
  text: {
    color: BrandColors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
});

