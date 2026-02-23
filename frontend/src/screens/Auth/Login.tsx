import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { AppText, AppButton, AppInput } from '../../components';
import { COLORS, SPACING } from '../../theme';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';

export const Login: React.FC<any> = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { login } = React.useContext(AuthContext);

    const handleLogin = async () => {
        if (!email || !password) {
            setError('Please fill out all fields.');
            return;
        }
        setError('');

        try {
            const response = await api.post('/auth/login', { email, password });

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
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={styles.keyboardView}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View style={styles.header}>
                    <AppText variant="h1" style={styles.title}>Welcome Back</AppText>
                    <AppText variant="body" color={COLORS.textLight}>
                        Sign in to grab your favorite meals fast.
                    </AppText>
                </View>

                <View style={styles.formContainer}>
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
                        title="Forgot Password?"
                        variant="ghost"
                        style={styles.forgotButton}
                    />

                    <AppButton
                        title="Sign In"
                        onPress={handleLogin}
                        style={styles.loginButton}
                    />
                </View>

                <View style={styles.footer}>
                    <AppText variant="body" color={COLORS.textLight}>
                        Don't have an account?{' '}
                    </AppText>
                    <AppButton
                        title="Sign Up"
                        variant="ghost"
                        onPress={() => navigation.navigate('Signup')}
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
    forgotButton: {
        alignSelf: 'flex-end',
        marginBottom: SPACING.xl,
    },
    loginButton: {
        marginBottom: SPACING.l,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SPACING.xl,
    },
});
