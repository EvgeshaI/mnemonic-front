import {render} from '@testing-library/react';
import {Consonance} from "./Consonance";

describe('Consonance component', () => {
    test('it renders', () => {
        render(<Consonance/>);
        // eslint-disable-next-line no-restricted-globals
        expect(screen.getByText("Начальная форма")).toBeInTheDocument();
    });
})