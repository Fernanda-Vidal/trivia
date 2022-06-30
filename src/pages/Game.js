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
  }

  async componentDidMount() {
    const token = localStorage.getItem('token');
    await getQuestions(token).then((resp) => {
      const { dispatch } = this.props;
      dispatch(addQuestions(resp));
    });
    this.shuffleAnswers();
  }

   shuffleAnswers = () => {
     const { questionResults } = this.props;
     //  questionResults.map((objeto) => this.setState({ correct: objeto.correct_answer}));
     const novoArray = questionResults.map((object) => ({
       category: object.category,
       question: object.question,
       answer: [object.correct_answer, ...object.incorrect_answers],
     }));
     /* for (let i = novoArray.length - 1; i > 0; i -= 1) {
       const j = Math.floor(Math.random() * (i + 1));
       [novoArray[i], novoArray[j]] = [novoArray[j], novoArray[i]];
      } */

     /* const answerArray = questionResults.map((object) => ([
       object.correct_answer, ...object.incorrect_answers,
     ])); */

     this.setState({
       novoArray1: [...novoArray],
       correctAnswer: novoArray.map((answer) => answer.answer[0]),
     });
     const { novoArray1, correctAnswer } = this.state;
     console.log(novoArray1);
     console.log(correctAnswer);

     return novoArray;
   }

   render() {
     const { novoArray1 /* , answer */ } = this.state;
     return (
       <div>
         <Header />
         { novoArray1.map((x) => (
           <div key={ x.category } className="container">
             <p key={ x.category } className="container-text">
               {`Categoria: ${x.category}` }
             </p>
             <p key={ x.question } className="container-text">
               { `Pergunta: ${x.question}` }
             </p>
             <div>
               {x.answer.map((y) => (
                 <p key={ y } className="container-text">
                   { y }
                 </p>))}
             </div>
           </div>
         )) }
       </div>
     );
   }
}

const mapStateToProps = (state) => ({
  questionResults: state.questionsReducer.questions.results,
});

Game.propTypes = {
  dispatch: PropTypes.func.isRequired,
  questionResults: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default connect(mapStateToProps)(Game);
