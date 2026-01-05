import { router } from 'expo-router';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppIcon } from '@/components/ui/app-icon';
import { GradientButton } from '@/components/ui/gradient-button';
import { OutlinedButton } from '@/components/ui/outlined-button';
import { BrandColors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* App Icon */}
          <View style={styles.iconContainer}>
            <AppIcon size={100} />
          </View>

          {/* App Name */}
          <Text style={styles.appName}>FactFlow</Text>

          {/* Tagline */}
          <Text style={styles.tagline}>
            Discover fascinating facts that flow through your feed.{'\n'}Learn
            something new every day.
          </Text>

          {/* Features */}
          <View style={styles.featuresContainer}>
            <View style={styles.feature}>
              <View
                style={[
                  styles.featureDot,
                  { backgroundColor: BrandColors.primary },
                ]}
              />
              <Text style={styles.featureText}>Verified information.</Text>
            </View>
            <View style={styles.feature}>
              <View
                style={[
                  styles.featureDot,
                  { backgroundColor: BrandColors.secondary },
                ]}
              />
              <Text style={styles.featureText}>Bite-sized learning.</Text>
            </View>
            <View style={styles.feature}>
              <View
                style={[
                  styles.featureDot,
                  { backgroundColor: BrandColors.primary },
                ]}
              />
              <Text style={styles.featureText}>Endless discovery.</Text>
            </View>
          </View>

          {/* Buttons */}
          <View style={styles.buttonsContainer}>
            <GradientButton
              title='Create Account'
              onPress={() => router.push('/signup')}
              icon={
                <Ionicons
                  name='person-add-outline'
                  size={20}
                  color={BrandColors.text.light}
                />
              }
            />
            <OutlinedButton
              title='Sign In'
              onPress={() => router.push('/signin')}
              icon={
                <Ionicons
                  name='arrow-forward'
                  size={20}
                  color={BrandColors.primary}
                />
              }
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.background.light,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  content: {
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 24,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: BrandColors.text.primary,
    marginBottom: 16,
  },
  tagline: {
    fontSize: 16,
    color: BrandColors.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  featuresContainer: {
    width: '100%',
    marginBottom: 40,
    gap: 16,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  featureText: {
    fontSize: 16,
    color: BrandColors.text.primary,
  },
  buttonsContainer: {
    width: '100%',
    gap: 16,
    marginBottom: 24,
  },
  guestLink: {
    paddingVertical: 8,
  },
  guestLinkText: {
    fontSize: 16,
    color: BrandColors.text.primary,
  },
});
