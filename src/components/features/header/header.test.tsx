
import {
  fireEvent,
  render,
  screen
} from '@testing-library/react';
import Header from '.';
import { BrowserRouter } from 'react-router-dom';

describe('Tests in Header component', () => {
  const setup = () => {
    return render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
  };

  test('Should render the component', async () => {
    const {
      asFragment
    } = setup();

    const buttonImage = screen.getByTestId('img_butt');

    fireEvent.click(buttonImage);
    expect(asFragment()).toMatchSnapshot();
  });
});
