import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../component/Header';
import { addQuestions } from '../redux/actions';
import { getQuestions } from '../services/GetApi';
import '../css/Game.css';

class Game extends React.Component {
  state = {
    novoArray1: [],
    correctAnswer: '',
    index: 0,
    isAnswered: '',
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
    // const tokenValid = 0;
    this.shuffleAnswers();
  }

   shuffleAnswers = () => {
     const { questionResults } = this.props;
     //  questionResults.map((objeto) => this.setState({ correct: objeto.correct_answer}));
     const novoArray = questionResults.map((object) => ({
       category: object.category,
       question: object.question,
       answers: [object.correct_answer, ...object.incorrect_answers],
     }));

     this.setState({
       novoArray1: [...novoArray],
       correctAnswer: novoArray.map((answer) => answer.answers[0]),
     });
     return novoArray;
   }

   handleClickNext = () => {
     const num = 4;
     this.setState((previous) => {
       if (previous.index === num) {
         this.setState({ index: 0 });
       } else {
         this.setState({ index: previous.index + 1 });
       }
     });
   }

    handleClickAnswer = ({ target }) => {
      console.log(target);
      this.setState({ isAnswered: true });

      const buttons = document.querySelectorAll('.button-answers');
      console.log(buttons);
      buttons.forEach((button) => {
        if (button.id === 'incorrect') {
          button.style = 'border: 3px solid red';
        } else {
          button.style = 'border: 3px solid rgb(6, 240, 15)';
        }
      });
    }

    render() {
      const { novoArray1, correctAnswer, index, isAnswered } = this.state;
      const cardQuestion = novoArray1.map((question) => (
        <div key={ question.category } className="container">
          <p
            key={ question.category }
            className="container-text"
            data-testid="question-category"
          >
           Categoria:
            { question.category }
          </p>
          <p
            key={ question.question }
            className="container-text"
            data-testid="question-text"
          >
           Pergunta:
            { question.question }
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
                  >
                    { answer }
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
                  >
                    { answer }
                  </button>
                )
              //  Pesquisa: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
            )).sort(() => [Math.random() - '0.5'])}
          </div>
        </div>
      ));
      return (
        <div>
          <Header />
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
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  questionResults: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps)(Game);
