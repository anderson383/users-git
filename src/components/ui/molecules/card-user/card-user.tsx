import { User } from '@/services/repositories/github.repository'
import styles from './card-user.module.scss'
import {useNavigate} from 'react-router-dom'
interface CardUserProps {
  user: User
}
const CardUser:React.FC<CardUserProps> = ({user}) => {
  const navigate = useNavigate()
  return (
    <div data-testid="card_user" onClick={() => navigate('/user/' + user.login)} className={styles.card_user}>
      <div className={styles.image}>
        <img src={user.avatar_url} alt="" />
      </div>
      <div className={styles.info}>
        <p>
          {
            user.login
          }
        </p>
        <span>
          {
            user.id
          }
        </span>
      </div>
    </div>
  )
} 

export default CardUser