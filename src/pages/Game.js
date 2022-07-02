import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../component/Header';
import { addAssertations, addQuestions, addScore } from '../redux/actions';
import { getQuestions } from '../services/GetApi';
import '../css/Game.css';

class Game extends React.Component {
  state = {
    countdown: 5,
    novoArray1: [],
    correctAnswer: '',
    index: 0,
    isAnswered: '',
    isDisable: false,
  }

  async componentDidMount() {
    const token = localStorage.getItem('token');
    await getQuestions(token).then((resp) => {
      const { dispatch, history } = this.props;
      dispatch(addQuestions(resp));
      console.log(resp);
      if (resp.response_code !== 0) {
        localStorage.removeItem('token');
        history.push('/');
      }
    });
    // const mil = 1000;
    this.shuffleAnswers();
    this.countdown()
    // Solução na pesquisa: https://pt.wikibooks.org/wiki/JavaScript/Intervalos_de_tempo#:~:text=O%20setInterval&text=A%20sua%20sintaxe%20%C3%A9%3A,segundo%20equivale%20a%201000%20mil%C3%A9simos.
    // setInterval(this.countdown, mil);
  }

  shuffleAnswers = () => {
    const { questionResults } = this.props;
    const novoArray = questionResults.map((object) => ({
      category: object.category,
      question: object.question,
      difficulty: object.difficulty,
      answers: [object.correct_answer, ...object.incorrect_answers],
    }));

    const corrects = novoArray.map((answer) => answer.answers[0]);
    novoArray.map((chave) => chave.answers.sort(() => [Math.random() - '0.5']));

    this.setState({
      novoArray1: [...novoArray],
      correctAnswer: corrects,
    });
  }

  handleClickNext = () => {
    const { history } = this.props;
    const { novoArray1 } = this.state;
    const num = novoArray1.length - 1;
    console.log(num);
    this.setState((previous) => {
      if (previous.index === num) {
        history.push('/feedback');
      } else {
        this.setState({ index: previous.index + 1, countdown: 30 });
      }
    });
  }

  handleClickAnswer = ({ target }) => {
    const buttons = document.querySelectorAll('.button-answers');
    const { index, novoArray1, countdown } = this.state;
    const { dispatch } = this.props;
    const dez = 10;
    const tres = 3;
    this.setState({ isAnswered: true });
    buttons.forEach((button) => {
      if (button.id !== 'correct') {
        button.style = 'border: 3px solid red';
      } else {
        button.style = 'border: 3px solid rgb(6, 240, 15)';
      }
    });
    console.log(novoArray1[index].difficulty);
    console.log(target.id);
    if (target.id === 'correct') {
      if (novoArray1[index].difficulty === 'hard') {
        const score = dez + (countdown * tres);
        dispatch(addScore(score));
        dispatch(addAssertations(1));
      } else if (novoArray1[index].difficulty === 'medium') {
        const score = dez + (countdown * 2);
        dispatch(addScore(score));
        dispatch(addAssertations(1));
      } else {
        const score = dez + (countdown);
        dispatch(addScore(score));
        dispatch(addAssertations(1));
      }
    }
  }

  /* countdown = () => {
    const { countdown } = this.state;
    if (countdown === 0) {
      this.setState({ isDisable: true, isAnswered: true });
    } else {
      this.setState((prev) => ({
        isDisable: false,
        countdown: prev.countdown - 1 }));
    }
  } */
  
  funcTimer() {
    const { countdown, index } = this.state;
    const { history } = this.props;
    const y = 5;
    if (countdown == 0) {
      this.setState((prev) => ({
        isDisable: true,
        index: prev.index + 1,
        countdown: 30,
      }));
    } else if (countdown > 0) {
      this.setState((prev) => ({
        isDisable: false,
        countdown: prev.countdown - 1,
      }));
    } else {
      clearInterval();
    }
    if (index >= y) {
      this.setState({
        index: y,
      });
      history.push('./feedback');
    }
  }

  countdown() {
    const number = 1000;
    const timeOut = setInterval(() => {
      this.funcTimer();
    }, number);
    return timeOut;
  }

  render() {
    const {
      novoArray1,
      correctAnswer, index, isAnswered, isDisable, countdown } = this.state;
    const cardQuestion = novoArray1.map((question) => (
      <div key={ question.category } className="container">
        <p
          key={ question.category }
          className="container-text"
          data-testid="question-category"
        >
          Categoria:
          {question.category}
        </p>
        <p
          key={ question.question }
          className="container-text"
          data-testid="question-text"
        >
          {/* Pergunta: */}
          {question.question}
        </p>
        <div data-testid="answer-options">
          {question.answers.map((answer, i) => (
            (correctAnswer.includes(answer))
              ? (
                <button
                  type="button"
                  key={ i + 1 }
                  id="correct"
                  className="button-answers"
                  data-testid="correct-answer"
                  onClick={ this.handleClickAnswer }
                  disabled={ isDisable }
                >
                  {answer}
                </button>
              )
              : (
                <button
                  type="button"
                  key={ i + 1 }
                  id="incorrect"
                  className="button-answers"
                  data-testid={ `wrong-answer-${i}` }
                  onClick={ this.handleClickAnswer }
                  disabled={ isDisable }
                >
                  {answer}
                </button>
              )
              //  Pesquisa: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
          ))}
        </div>
      </div>
    ));

    return (
      <div>
        <Header />
        {countdown}
        {cardQuestion[index]}
        {(isAnswered)
            && (
              <button
                type="button"
                data-testid="btn-next"
                onClick={ this.handleClickNext }
              >
                Next
              </button>
            )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questionResults: state.questionsReducer.questions.results,
});

Game.propTypes = {
  dispatch: PropTypes.func.isRequired,
  // dispatchScore: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  questionResults: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps)(Game);
