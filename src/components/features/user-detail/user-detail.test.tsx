
import {
  fireEvent,
  render,
  screen
} from '@testing-library/react';
import UserDetail from '.';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';

const mockUser = {
  name: 'Pepito xd',
  avatar_url: 'url image',
  login: 'test user',
  id: 'id-test',
  twitter_username: '',
  bio: 'biografia',
  location: 'Colombia'
}

const navigateMock = jest.fn()

const saveUserMock = jest.fn().mockImplementation(() => ('Success'))

jest.mock('react-router-dom', () => {
  return ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => jest.fn(),
    useNavigate: () => navigateMock
  }
  )
})

jest.mock('../../../services/config/context', () => ({
  useRepositoryIoc: jest.fn().mockReturnValue({
    container: {
      get: jest.fn().mockReturnValue({
        getUser: jest.fn().mockImplementation(() => Promise.resolve(mockUser)),
        saveUser: (argumnts:any) => saveUserMock(argumnts)
      })
    }
  })
}))

window.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

describe('Tests in Detail component', () => {
  const setup = () => {
    return render(
      <BrowserRouter>
        <UserDetail />
      </BrowserRouter>
    );
  };

  test('Should render the component', async () => {
    const {
      asFragment
    } = setup();
    await act(() => Promise.resolve())
    expect(asFragment()).toMatchSnapshot();
  });

  test('Should click export save user', async () => {

    setup();

    await act(() => Promise.resolve())
    const button = screen.getByText('Exportar')

    fireEvent.click(button)

    expect(saveUserMock).toHaveBeenCalledWith({
      name: mockUser.name,
      jsonData: mockUser
    });
  });
});
