
import {
  fireEvent,
  render,
  screen
} from '@testing-library/react';
import UserList from '.';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import * as ResizeObserverModule from 'resize-observer-polyfill';

(window as any).ResizeObserver = ResizeObserverModule.default;

const mockUser = [
  {
    avatar_url: 'url image',
    login: 'test user',
    id: 'id-test'
  }
]

const navigateMock = jest.fn()

jest.mock('react-router-dom', () => {
  return ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => jest.fn(),
    useNavigate: () => navigateMock
  }
  )
})

const getUsersMock = jest.fn().mockImplementation(() => Promise.resolve(mockUser))
jest.mock('../../../services/config/context', () => ({
  useRepositoryIoc: jest.fn().mockReturnValue({
    container: {
      get: jest.fn().mockReturnValue({
        getUser: jest.fn().mockImplementation(() => Promise.resolve(mockUser[0])),
        getUsers: () => getUsersMock()
      })
    }
  })
}))


describe('Tests in UserList component', () => {
  const setup = () => {
    return render(
      <BrowserRouter>
        <UserList />
      </BrowserRouter>
    );
  };

  test('Should render the component', async () => {
    const {asFragment} = setup();
    
    await act(() => Promise.resolve())
    expect(asFragment()).toMatchSnapshot();
  });

  test('Should render if no charge list', async () => {
    getUsersMock.mockReturnValue(null)
    setup();
    
    await act(() => Promise.resolve())
    expect(screen.getByText('No hay usuarios en base a tu busqueda...')).toMatchSnapshot();
  });

  test('Should search value', async () => {
    setup();

    const buttSearch = screen.getByTestId('search');

    fireEvent.change(screen.getByPlaceholderText('Buscar'), {target: { value: 'user test' }});

    fireEvent.click(buttSearch);
    await act(() => Promise.resolve())

    expect(navigateMock).toHaveBeenCalled();
  });
});


