import * as yup from 'yup';
import { Formik } from 'formik';
import { getParamsUrl } from '../../../helpers/get-params-url';
import { InputText } from '../../ui/atoms/input-text/input-text';
import styles from './header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import {useNavigate} from 'react-router-dom'
const DEFAULT_IMG = 'https://th.bing.com/th/id/OIP.PB3QCTk1kCZZ6ZvvVqpM5gHaHa?pid=ImgDet&rs=1';
const Header = () => {
  const navigate = useNavigate()
 

  return (

    <header className={`${ styles.header_container }`} >
      <div className={`${ styles.header }  container`}>
        <img data-testid="img_butt" onClick={()=> navigate('/')} src='/icons/icon-github.svg' width={50} alt='' />
        <nav className={styles.menu}>
          <h2>Test FrontEnd</h2>
        </nav>
      </div>
    </header>
  );
};

export default Header;
