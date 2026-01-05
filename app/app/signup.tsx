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
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomTextInput } from '@/components/ui/text-input';
import { GradientButton } from '@/components/ui/gradient-button';
import { BrandColors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

export default function SignUpScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const validate = () => {
    const newErrors: {
      username?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    if (!username.trim()) {
      newErrors.username = 'Username is required';
    }
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = () => {
    if (validate()) {
      // TODO: Implement actual sign up logic
      console.log('Sign up:', { username, email, password });
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
            <Text style={styles.title}>Create Account</Text>

            {/* Form */}
            <View style={styles.form}>
              <CustomTextInput
                label='Username'
                icon='person-outline'
                placeholder='Username'
                value={username}
                onChangeText={setUsername}
                autoCapitalize='none'
                autoComplete='username'
                error={errors.username}
              />

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
                placeholder='Create a password'
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                showPasswordToggle
                autoComplete='password-new'
                error={errors.password}
              />

              <CustomTextInput
                label='Confirm Password'
                icon='lock-closed-outline'
                placeholder='Confirm your password'
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                showPasswordToggle
                autoComplete='password-new'
                error={errors.confirmPassword}
              />
            </View>

            {/* Terms */}
            <Text style={styles.termsText}>
              By signing up, you agree to our{' '}
              <Text
                style={styles.link}
                onPress={() => Linking.openURL('https://example.com/terms')}
              >
                Terms of Service
              </Text>{' '}
              and{' '}
              <Text
                style={styles.link}
                onPress={() => Linking.openURL('https://example.com/privacy')}
              >
                Privacy Policy
              </Text>
            </Text>

            {/* Create Account Button */}
            <GradientButton
              title='Create Account'
              onPress={handleSignUp}
              icon={
                <Ionicons
                  name='person-add-outline'
                  size={20}
                  color={BrandColors.text.light}
                />
              }
            />

            {/* Sign In Link */}
            <View style={styles.signInContainer}>
              <Text style={styles.signInText}>Already have an account? </Text>
              <Pressable onPress={() => router.push('/signin')}>
                <Text style={styles.signInLink}>Sign In</Text>
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
    marginBottom: 20,
  },
  termsText: {
    fontSize: 14,
    color: BrandColors.text.secondary,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  link: {
    color: BrandColors.primary,
    fontWeight: '500',
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  signInText: {
    fontSize: 16,
    color: BrandColors.text.primary,
  },
  signInLink: {
    fontSize: 16,
    color: BrandColors.primary,
    fontWeight: '600',
  },
});
