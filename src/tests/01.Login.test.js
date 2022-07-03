import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux  from './helpers/renderWithRouterAndRedux'
import userEvent from '@testing-library/user-event';
import App from '../App'


describe('1- Crie a pagina de login', () => {

    test('Verificar se a pagina contém o input name, email, play e config / Se o botão esta inicialmente desativado e se ao clicar no play redireciona para a pagina de jogar', () => {
        renderWithRouterAndRedux(<App />)
        const inputEmail = screen.getByTestId('input-gravatar-email')
        const inputName = screen.getByTestId('input-player-name')
        const inputPlay = screen.getByRole('button', {  name: /play/i})
        const inputConfig = screen.getByRole('button', {  name: /configurações/i})
        
        expect(inputConfig).toBeInTheDocument()
        expect(inputEmail).toBeInTheDocument()
        expect(inputName).toBeInTheDocument()
        expect(inputPlay).toBeInTheDocument()
        expect(inputPlay).toBeDisabled()
        userEvent.type(inputEmail, 'validEmail' )
        userEvent.type(inputName, 'validName' )
        expect(inputPlay).toBeEnabled();
        userEvent.click(inputPlay)

        const title = screen.getByTestId('header-player-name')
        expect(title).toBeInTheDocument();

    })

    test('Verifique se ao clicar no botão config leva para tela de configuração', () => {
        renderWithRouterAndRedux(<App />)
        const inputConfig = screen.getByRole('button', {  name: /configurações/i})
        expect(inputConfig).toBeInTheDocument()

        userEvent.click(inputConfig)
        const title = screen.getByTestId('settings-title')
        expect(title).toBeInTheDocument()
    })
})

