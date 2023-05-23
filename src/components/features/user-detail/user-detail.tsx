
import styles from './user-detail.module.scss'
import useGiHubRepository from "../../../hooks/use-github-repository";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const filterMessage = (value:string | null, message='No tiene') => {
  return value || message
}


const UserDetail = () => {
  const navigate = useNavigate()
  const params = useParams()
  const repository = useGiHubRepository()
  const [user, setUser] = useState(null)

  useEffect(() => {
    (async () => {
      const response = await repository.getUser(params.id)
      setUser(response)
    })()
  }, [])
  
  const exportSaveUser = async () => {
    const response = await repository.saveUser({
      name: user.name,
      jsonData: user
    })
    
    toast.info(response)
    navigate('/')
  }

  return (
    <div className="container">
      <h2>Detalle de usuario</h2>
      {
        user && (
          <>
            <div className={styles.export}>
              <button onClick={exportSaveUser}>Exportar</button>
            </div>
            <div className={styles.card_detail}>
              <div  className={styles.avatar}>
                <div>
                  <img width={300} src={user.avatar_url} alt="" />
                </div>
                <div  className={styles.info}>
                  <b>{user.name}</b>
                  <p>Twitter: {filterMessage(user.twitter_username)}</p>
                  <p>Followers: {filterMessage(user.following)}</p>
                </div>
              </div>
              <div  className={styles.info_company}>
                <h2>Información</h2>
                <p><b>Company:</b>  {filterMessage(user.company)}</p>
                <p><b>Location:</b> {filterMessage(user.location) }</p>
                <p><b>Biografia:</b> {filterMessage(user.bio)}</p>
                <p><b>Email:</b> {filterMessage(user.email)}</p>
              </div>
            </div>
          </>
        )
      }
    </div>
  )
}

export default UserDetail