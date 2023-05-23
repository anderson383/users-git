
import {
  fireEvent,
  render,
  screen
} from '@testing-library/react';
import CardUser from '.';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { User } from '@/services/repositories/github.repository';

const mockUser:User = {
  avatar_url: 'url image',
  login: 'test user',
  id: 'id-test'
}

const navigateMock = jest.fn()

jest.mock('react-router-dom', () => {
  return ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => jest.fn(),
    useNavigate: () => navigateMock
  }
  )
})


describe('Tests in Card User component', () => {
  const setup = () => {
    return render(
      <BrowserRouter>
        <CardUser user={mockUser}  />
      </BrowserRouter>
    );
  };

  test('Should render the component', async () => {
    const {asFragment} = setup();
    
    await act(() => Promise.resolve())
    expect(asFragment()).toMatchSnapshot();
  });

  test('Should click card', async () => {
    setup();

    fireEvent.click(screen.getByTestId('card_user'));

    await act(() => Promise.resolve())

    expect(navigateMock).toHaveBeenCalled();
  });
});
