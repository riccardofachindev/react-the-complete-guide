import { render, screen } from '@testing-library/react'
import Greeting from "./Greeting"
import userEvent from '@testing-library/user-event'

describe('Greeting component', () => {
    test('renders hello on screen', () => {
        render(<Greeting />);

        const helloElement = screen.getByText('Hello!')

        expect(helloElement).toBeInTheDocument();
    })

    test('renders Its good to see you on screen if the button was NOT clicked', () => {
        render(<Greeting />);

        const paragraphElement = screen.getByText('good to see you', { exact: false });

        expect(paragraphElement).toBeInTheDocument();
    })

    test('renders changed if the button was clicked', async () => {
        // Arrange
        render(<Greeting />);

        // Act
        const buttonElement = screen.getByRole('button');
        await userEvent.click(buttonElement);

        // Assert
        const outputElement = screen.getByText('Changed!')
        expect(outputElement).toBeInTheDocument();
    })

    test('does NOT render "good to see you" if the button was clicked', async () => {
        // Arrange
        render(<Greeting />);

        // Act
        const buttonElement = screen.getByRole('button');
        await userEvent.click(buttonElement);

        // Assert
        const outputElement = screen.queryByText('good to see you', { exact: false });
        expect(outputElement).toBeNull();
    })
})