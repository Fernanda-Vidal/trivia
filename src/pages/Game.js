import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../component/Header';
import { addQuestions } from '../redux/actions';
import { getQuestions } from '../services/GetApi';

class Game extends React.Component {
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
     // const novoArray = questionResults.map((objeto) => console.log(objeto.category));
     const novoArray = questionResults.map((object) => ([
       object.category,
       object.question,
       object.correct_answer,
       object.incorrect_answers,
     ]));

     for (let i = novoArray.length - 1; i > 0; i -= 1) {
       const j = Math.floor(Math.random() * (i + 1));
       [novoArray[i], novoArray[j]] = [novoArray[j], novoArray[i]];
     }
   }

   render() {
     const { questionResults } = this.props;
     console.log(questionResults);
     return (
       <div>
         <Header />
         {this.shuffleAnswers}
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
