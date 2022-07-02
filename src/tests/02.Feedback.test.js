import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux  from './helpers/renderWithRouterAndRedux'
import userEvent from '@testing-library/user-event';
import App from '../App'
 
describe('Desenvolva testes para a pagina de feedbacks', () => {
    test('Verifique se a pagina feedback possue as informaçoẽs corretas', () => {
        const INITIAL_STATE = {
            player: {
                name: 'nada',
                email: 'nada',
            }
          };
          
       const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE);
       
       history.push('/feedback')
       expect(history.location.pathname).toBe('/feedback')
 
       const inputImg = screen.getByTestId('header-profile-picture')
       const inputUser = screen.getByTestId('header-player-name')
       const placar = screen.getByTestId('header-score')
       const inputPlayAgain = screen.getByRole('button', {name: /Play again/i});
       const inputRank  = screen.getByRole('button', {name: /ranking/i});
       const feedbackText = screen.getByTestId('feedback-text')
       const assertionsInput = screen.getByTestId('feedback-total-score')
       const scoretotal = screen.getByTestId('feedback-total-question')

       expect(assertionsInput).toBeInTheDocument()
       expect(scoretotal).toBeInTheDocument()
       expect(feedbackText).toBeInTheDocument()
       expect(inputImg).toBeInTheDocument()
       expect(inputUser).toBeInTheDocument()
       expect(placar).toBeInTheDocument()
       expect(inputPlayAgain).toBeInTheDocument()
       expect(inputRank).toBeInTheDocument()
       expect(history.location.pathname).toBe('/feedback');
   })
 
   test('Teste se a msg Caparece nad tela ao finalizar as perguntas ', () => {
    const INITIAL_STATE = {
        name: 'nada',
        email: 'nada',
        assertions: 2,
      };
       
       const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE )
       history.push('./feedback')
       expect(history.location.pathname).toBe('/feedback')
       const feedbackText = screen.getByTestId('feedback-text')
       expect(feedbackText).toHaveTextContent('Could be better...')
   })
   
   test('Se apertar o button play again é redrecionado para a pag home', () => {
    const INITIAL_STATE = {
        name: 'nada',
        email: 'nada',
        assertions: 3,
      };
      
       const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE)
       history.push('./feedback')
 
       const inputPlayAgain = screen.getByRole('button', {name: /Play again/i})
       expect(inputPlayAgain).toBeInTheDocument()
       userEvent.click(inputPlayAgain)

       expect(history.location.pathname).toBe('/')
   })
 
   test('Se apertai o button rank é redrecionado para a pag ranking', () => {
    const INITIAL_STATE = {
        name: 'nada',
        email: 'nada',
        assertions: 3,
      };
      
       const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE)
       history.push('./feedback')
       expect(history.location.pathname).toBe('/feedback')
 
       const inputPlayAgain = screen.getByRole('button', {name: /ranking/i})
       userEvent.click(inputPlayAgain)

       expect(history.location.pathname).toBe('/ranking')
   })
})
