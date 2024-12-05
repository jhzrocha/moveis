import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';

const HomeScreen = () => {
  const router = useRouter();

  return (
    <ImageBackground
      source={require('./assets/images/CorujaQuimica.webp')} // Substitua pelo caminho da sua imagem
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Bem-vindo ao Quimilab!</Text>
        <Text style={styles.subtitle}>Escolha a dificuldade:</Text>

        <TouchableOpacity
          style={[styles.button, styles.easy]}
          onPress={() => router.push('/screens/QuizScreen?difficulty=easy')}
        >
          <Text style={styles.buttonText}>Fácil</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.medium]}
          onPress={() => router.push('/screens/QuizScreen?difficulty=medium')}
        >
          <Text style={styles.buttonText}>Médio</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.hard]}
          onPress={() => router.push('/screens/QuizScreen?difficulty=hard')}
        >
          <Text style={styles.buttonText}>Difícil</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fundo translúcido para contraste
  },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  subtitle: { fontSize: 18, marginBottom: 20 },
  button: {
    width: '80%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  easy: { backgroundColor: '#4CAF50' },
  medium: { backgroundColor: '#FF9800' },
  hard: { backgroundColor: '#F44336' },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
