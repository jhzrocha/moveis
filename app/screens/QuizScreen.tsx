import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

type Difficulty = 'easy' | 'medium' | 'hard';

const questionsData: Record<Difficulty, { question: string; options: string[]; answer: string }[]> = {
  easy: [
    { question: 'Qual é o símbolo químico da água?', options: ['H2O', 'O2', 'CO2'], answer: 'H2O' },
    { question: 'Qual gás respiramos para sobreviver?', options: ['Oxigênio', 'Nitrogênio', 'Hidrogênio'], answer: 'Oxigênio' },
    { question: 'Qual é o estado físico do gelo?', options: ['Líquido', 'Sólido', 'Gasoso'], answer: 'Sólido' },
    { question: 'Qual elemento químico tem o símbolo Na?', options: ['Sódio', 'Nitrogênio', 'Níquel'], answer: 'Sódio' },
    { question: 'Qual é o elemento mais abundante no ar?', options: ['Oxigênio', 'Nitrogênio', 'Hidrogênio'], answer: 'Nitrogênio' },
    { question: 'Qual é o pH neutro?', options: ['7', '5', '10'], answer: '7' },
    { question: 'O que é usado para ferver água mais rápido?', options: ['Aumento de pressão', 'Redução de pressão', 'Mudança de cor'], answer: 'Redução de pressão' },
    { question: 'Qual é a fórmula química do sal de cozinha?', options: ['NaCl', 'KCl', 'CaCl2'], answer: 'NaCl' },
    { question: 'Qual é o símbolo químico do ouro?', options: ['Ag', 'Au', 'Fe'], answer: 'Au' },
    { question: 'Qual é o estado físico do vapor?', options: ['Líquido', 'Sólido', 'Gasoso'], answer: 'Gasoso' },
  ],
  
  medium: [
    { question: 'Qual é a massa molar da água (H2O)?', options: ['18 g/mol', '20 g/mol', '16 g/mol'], answer: '18 g/mol' },
    { question: 'Qual é a fórmula química do gás carbônico?', options: ['CO', 'CO2', 'C2O'], answer: 'CO2' },
    { question: 'Quantos elétrons um átomo de carbono possui na camada de valência?', options: ['4', '2', '6'], answer: '4' },
    { question: 'Qual ácido é encontrado no vinagre?', options: ['Ácido acético', 'Ácido sulfúrico', 'Ácido nítrico'], answer: 'Ácido acético' },
    { question: 'Qual elemento é necessário para a respiração celular?', options: ['Oxigênio', 'Carbono', 'Hidrogênio'], answer: 'Oxigênio' },
    { question: 'Qual é o número atômico do hidrogênio?', options: ['1', '2', '3'], answer: '1' },
    { question: 'Qual é o nome do composto CH4?', options: ['Metano', 'Etano', 'Propano'], answer: 'Metano' },
    { question: 'Qual o estado físico do mercúrio à temperatura ambiente?', options: ['Sólido', 'Líquido', 'Gasoso'], answer: 'Líquido' },
    { question: 'Qual o nome da reação que libera energia térmica?', options: ['Exotérmica', 'Endotérmica', 'Isotérmica'], answer: 'Exotérmica' },
    { question: 'Qual gás é liberado pelas plantas na fotossíntese?', options: ['Oxigênio', 'Carbono', 'Hidrogênio'], answer: 'Oxigênio' },
  ],
  
hard: [
  { question: 'Qual é a fórmula química do ácido sulfúrico?', options: ['H2SO3', 'H2SO4', 'H2S'], answer: 'H2SO4' },
  { question: 'Qual elemento tem a maior eletronegatividade na tabela periódica?', options: ['Oxigênio', 'Flúor', 'Cloro'], answer: 'Flúor' },
  { question: 'Qual é a configuração eletrônica do oxigênio?', options: ['1s² 2s² 2p⁴', '1s² 2s² 2p⁶', '1s² 2s²'], answer: '1s² 2s² 2p⁴' },
  { question: 'O que é uma ligação covalente?', options: ['Compartilhamento de elétrons', 'Transferência de elétrons', 'Interação entre moléculas'], answer: 'Compartilhamento de elétrons' },
  { question: 'Qual é a constante de Avogadro?', options: ['6,022 x 10²³', '1,602 x 10⁻¹⁹', '3,00 x 10⁸'], answer: '6,022 x 10²³' },
  { question: 'O que é um catalisador?', options: ['Aumenta a velocidade da reação', 'Reduz a velocidade da reação', 'Neutraliza reações químicas'], answer: 'Aumenta a velocidade da reação' },
  { question: 'Qual é o número de oxidação do oxigênio em compostos comuns?', options: ['-2', '0', '+1'], answer: '-2' },
  { question: 'Qual é a fórmula química da glicose?', options: ['C6H12O6', 'C6H6', 'CH3OH'], answer: 'C6H12O6' },
  { question: 'Qual ácido está presente no estômago humano?', options: ['Ácido clorídrico', 'Ácido sulfúrico', 'Ácido acético'], answer: 'Ácido clorídrico' },
  { question: 'Como se chama a energia mínima necessária para iniciar uma reação química?', options: ['Energia de ativação', 'Energia livre', 'Energia potencial'], answer: 'Energia de ativação' },
],

};

const QuizScreen = () => {
  const { difficulty = 'easy' } = useLocalSearchParams() as { difficulty: Difficulty };
  const router = useRouter();

  const questions = questionsData[difficulty] || [];
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleAnswer = (selectedOption: string) => {
    setSelectedOption(selectedOption);

    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      } else {
        setQuizFinished(true); // Mostra a tela de resultados
      }
    }, 1000);
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedOption(null);
    setQuizFinished(false);
  };

  return (
    <View style={styles.container}>
      {quizFinished ? (
        // Tela de resultados
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsTitle}>Quiz Finalizado!</Text>
          <Text style={styles.resultsText}>
            Você acertou {score} de {questions.length} perguntas!
          </Text>
          <TouchableOpacity style={styles.restartButton} onPress={handleRestart}>
            <Text style={styles.restartButtonText}>Recomeçar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.homeButton} onPress={() => router.push('/')}>
            <Text style={styles.homeButtonText}>Voltar ao Início</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // Tela de perguntas
        <>
          <Text style={styles.question}>
            {`Pergunta ${currentQuestion + 1}: ${questions[currentQuestion].question}`}
          </Text>
          {questions[currentQuestion].options.map((option: string, index: number) => {
            let buttonStyle = styles.optionButton;

            if (selectedOption) {
              if (option === questions[currentQuestion].answer) {
                buttonStyle = styles.correctButton;
              } else if (option === selectedOption) {
                buttonStyle = styles.wrongButton;
              }
            }

            return (
              <TouchableOpacity
                key={index}
                style={buttonStyle}
                onPress={() => !selectedOption && handleAnswer(option)}
                disabled={!!selectedOption} // Impede novas seleções após a escolha
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            );
          })}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  question: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  optionButton: {
    backgroundColor: '#5353ec',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  correctButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    borderColor: '#FFFFFF',
    borderWidth: 2,
  },
  wrongButton: {
    backgroundColor: '#F44336',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    borderColor: '#FFFFFF',
    borderWidth: 2,
  },
  optionText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  resultsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  resultsText: {
    fontSize: 18,
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  restartButton: {
    backgroundColor: '#5353ec',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  restartButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  homeButton: {
    backgroundColor: '#F44336',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  homeButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default QuizScreen;