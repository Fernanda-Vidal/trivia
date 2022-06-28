import React from 'react';
// import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux  from './helpers/renderWithRouterAndRedux'
import userEvent from '@testing-library/user-event';
import App from '../App'


const validEmail = 'a'
const validName = 'b'

describe('1- Crie a pagina de login', () => {

    test('Verificar se a pagina contem o input name e email', () => {
        renderWithRouterAndRedux(<App />)
        const inputEmail = screen.getByTestId('input-gravatar-email')
        const inputName = screen.getByTestId('input-player-name')
        
        expect(inputEmail).toBeInTheDocument()
        expect(inputName).toBeInTheDocument()

    })
    test('Verifique se o button com text play esta na tela..', () => {
        renderWithRouterAndRedux(<App />)
        const inputButton = screen.getByTestId('btn-play')

        expect(inputButton).toBeDisabled()
        expect(inputButton).toBeInTheDocument()

        const inputEmail = screen.getByTestId('input-gravatar-email')
        const inputName = screen.getByTestId('input-player-name')

        userEvent.type(inputEmail, validEmail )
        userEvent.type(inputName, validName )
        expect(inputButton).toBeEnabled();


    })
})