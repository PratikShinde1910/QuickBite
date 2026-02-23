import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { AppText, AppButton, AppInput } from '../../components';
import { COLORS, SPACING } from '../../theme';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';

export const Signup: React.FC<any> = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { login } = React.useContext(AuthContext);

    const handleSignup = async () => {
        if (!name || !email || !password) {
            setError('Please fill out all fields.');
            return;
        }
        setError('');

        try {
            const response = await api.post('/api/auth/signup', { name, email, password });

            if (response.data && response.data.token) {
                await login(response.data.token, {
                    id: response.data._id,
                    name: response.data.name,
                    email: response.data.email,
                });
                // Context state change will automatically navigate us out of Auth flow
            } else {
                setError('Invalid response from server.');
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Signup failed. Please try again.');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={styles.keyboardView}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View style={styles.header}>
                    <AppText variant="h1" style={styles.title}>Create Account</AppText>
                    <AppText variant="body" color={COLORS.textLight}>
                        Join QuickBite for quick campus pickups.
                    </AppText>
                </View>

                <View style={styles.formContainer}>
                    <AppInput
                        label="Full Name"
                        placeholder="John Doe"
                        icon="person-outline"
                        value={name}
                        onChangeText={setName}
                    />
                    <AppInput
                        label="Email Address"
                        placeholder="student@campus.edu"
                        icon="mail-outline"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <AppInput
                        label="Password"
                        placeholder="••••••••"
                        icon="lock-closed-outline"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                        error={error}
                    />

                    <AppButton
                        title="Create Account"
                        onPress={handleSignup}
                        style={styles.signupButton}
                    />
                </View>

                <View style={styles.footer}>
                    <AppText variant="body" color={COLORS.textLight}>
                        Already have an account?{' '}
                    </AppText>
                    <AppButton
                        title="Sign In"
                        variant="ghost"
                        onPress={() => navigation.goBack()}
                    />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    keyboardView: {
        flex: 1,
        padding: SPACING.l,
        justifyContent: 'center',
    },
    header: {
        marginBottom: SPACING.xl,
        marginTop: SPACING.xl,
    },
    title: {
        marginBottom: SPACING.s,
    },
    formContainer: {
        flex: 1,
    },
    signupButton: {
        marginTop: SPACING.m,
        marginBottom: SPACING.l,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SPACING.xl,
    },
});
