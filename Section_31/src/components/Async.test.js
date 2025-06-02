import Async from "./Async"
import { render, screen } from "@testing-library/react"

describe('Async component', () => {
    test('renders posts if request succeeds', async () => {
        // Arrange
        window.fetch = jest.fn();
        window.fetch.mockResolvedValueOnce({
            json: async () => [{ id: 'p1', title: 'First post' }]
        });
        render(<Async />)

        // Act

        // Assert
        const listItemsElements = await screen.findAllByRole('listitem', {}, { timeout: 1000 });
        expect(listItemsElements).not.toHaveLength(0);
    })
})