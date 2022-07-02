import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../component/Header';

class Feedback extends React.Component {
  render() {
    const { score } = this.props;
    return (
      <div>
        <h1>FeedBack</h1>
        <Header />
        <p>{ score }</p>
        <p data-testid="feedback-text">Could be better...</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
});

Feedback.propTypes = {
  score: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
