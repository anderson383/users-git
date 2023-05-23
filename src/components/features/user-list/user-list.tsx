import  * as yup from 'yup'
import { Formik } from "formik";
import { InputText } from "../../ui/atoms/input-text/input-text";
import { getParamsUrl } from "../../../helpers/get-params-url";
import styles from './user-list.module.scss'
import CardUser from "../../ui/molecules/card-user";
import useGiHubRepository from "../../../hooks/use-github-repository";
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from 'react-router-dom';
import { User } from '@/services/repositories/github.repository';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { optionsChart } from './chart';
// import faker from 'faker';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const initialValues = {search: getParamsUrl('q')};

const searchValidationSchema = yup.object().shape({
  search: yup.string()
  .min(4, 'Tu busqueda debe ser de maximo 4 caracteres')
  .notOneOf(['doublevpartners'], 'La palabra ingresada no está permitida')
  .required('Escribe un valor!')
})


const UserList = () => {
  const query = getParamsUrl('q');
  const navigation = useNavigate()
  const [labels, setLabels] = useState<string[]>([])
  const [follorwers, setFollorwers] = useState<string[]>([])
  const repository = useGiHubRepository()
  const [users, setUsers] = useState<User[]>([])

  const data = useMemo(() => {
    return {
      labels,
      datasets: [
        {
          label: 'Numero de seguidores',
          data: follorwers,
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }
      ],
    };
  }, [labels, follorwers]);

  const searchSubmit = (values:{search:string}) => {
  
    if (values.search) {
      navigation('/?q=' + values.search)
    }
  };

  
  useEffect(() => {
    (async () => {
      const response = await repository.getUsers(query)
      setUsers(response)
    })()
  }, [query])


  useEffect(() => {
    if (users) {
      const mapPromise = users.map(item => (
        async () => await repository.getUser(item.login)
      ))
      Promise.all(mapPromise.map(i => i())).then((values) => {
        let follow:any = []
        let labels:any = []
        values.map((ele:any) => {
          labels.push(ele.login)
          follow.push(ele.followers)
        })
        setLabels(labels)
        setFollorwers(follow)
      })
    }
  }, [users])


  return (
    <div className="container">
      <h1>Listado de usuarios</h1>

      <Formik
        initialValues={initialValues}
        validationSchema={searchValidationSchema}
        onSubmit={searchSubmit}
      >
        {({handleSubmit}) => (
          <form onSubmit={handleSubmit}>
            <div className="">
              <InputText name='search' placeholder='Buscar' search />
            </div>
          </form>
        )}
      </Formik> 
      {
        users ? (
          <>
            <div className="dib">
              <Bar options={optionsChart} data={data} />;
            </div>
            <div className={styles.container_users}>
              {
                users.map((user) => (
                  <CardUser key={user.id} user={user} />
                )) 
              }
            </div>
          </>
        ) : <h2>No hay usuarios en base a tu busqueda...</h2>
      }
    </div>
  )
}

export default UserList;