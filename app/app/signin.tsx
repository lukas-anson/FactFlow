import { router } from 'expo-router';
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomTextInput } from '@/components/ui/text-input';
import { GradientButton } from '@/components/ui/gradient-button';
import { BrandColors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = () => {
    if (validate()) {
      // TODO: Implement actual sign in logic
      console.log('Sign in:', { email, password });
      router.push('/(tabs)');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            {/* Back Button */}
            <Pressable onPress={() => router.back()} style={styles.backButton}>
              <Ionicons
                name='arrow-back'
                size={24}
                color={BrandColors.text.primary}
              />
            </Pressable>

            {/* Title */}
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>
              Sign in to continue your learning journey
            </Text>

            {/* Form */}
            <View style={styles.form}>
              <CustomTextInput
                label='Email'
                icon='mail-outline'
                placeholder='you@example.com'
                value={email}
                onChangeText={setEmail}
                keyboardType='email-address'
                autoCapitalize='none'
                autoComplete='email'
                error={errors.email}
              />
              <CustomTextInput
                label='Password'
                icon='lock-closed-outline'
                placeholder='Enter your password'
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                showPasswordToggle
                autoComplete='password'
                error={errors.password}
              />
              {/* TODO: Implement forgot password logic */}
              <Pressable
                onPress={() => console.log('Forgot password')}
                style={styles.forgotPassword}
              >
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </Pressable>
            </View>

            {/* Sign In Button */}
            <GradientButton title='Sign In' onPress={handleSignIn} />

            {/* Sign Up Link */}
            <View style={styles.signUpContainer}>
              <Text style={styles.signUpText}>Don't have an account? </Text>
              <Pressable onPress={() => router.push('/signup')}>
                <Text style={styles.signUpLink}>Sign Up</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.background.gray,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  content: {
    backgroundColor: BrandColors.background.light,
    borderRadius: 20,
    padding: 24,
    marginTop: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 24,
    padding: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: BrandColors.text.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: BrandColors.text.secondary,
    marginBottom: 32,
  },
  form: {
    marginBottom: 24,
  },
  forgotPassword: {
    alignSelf: 'flex-start',
    marginTop: -12,
    marginBottom: 8,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: BrandColors.primary,
    fontWeight: '500',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  signUpText: {
    fontSize: 16,
    color: BrandColors.text.primary,
  },
  signUpLink: {
    fontSize: 16,
    color: BrandColors.primary,
    fontWeight: '600',
  },
});
