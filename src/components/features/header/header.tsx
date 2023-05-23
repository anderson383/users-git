import styles from './header.module.scss';
import {useNavigate} from 'react-router-dom'
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
