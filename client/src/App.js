import {GET_ALL_USERS, GET_ONE_USER} from "./query/user";
import {useMutation, useQuery} from "@apollo/client";
import {CREATE_USER} from "./mutations/user";
import {useEffect, useState} from "react";
import './style.scss'


function App() {
  const {data, loading, error, refetch} = useQuery(GET_ALL_USERS,
      // {pollInterval: 5000}
  );

  const {data: oneUser, loading: loadingOneUser} = useQuery(GET_ONE_USER, {
    variables: { id: 1 }
  });

  if (oneUser) console.log(oneUser);

  const [newUser] = useMutation(CREATE_USER);
  const [username, setUsername] = useState('');
  const [users, setUsers] = useState([]);
  const [age, setAge] = useState(1);

  useEffect(() => {
    if (!loading) {
      setUsers(data.getAllUsers);
    }
  }, [data]);

  const addUser = (e) => {
    e.preventDefault()
    newUser({
      variables: {
        input: {
          username, age
        }
      },
    }).then(({data}) => {
      console.log(data);
      setUsername('');
      setAge(1);
    })
  };

  const getAll = e => {
    e.preventDefault();
    refetch();
  };

  if (loading) {
    return <h1>Loading...</h1>
  }

  return (
      <div className="app">
        <form className="app_form">
          <input className="app_input" value={username} onChange={e => setUsername(e.target.value)} type="text" placeholder={'username'}/>
          <input className='app_input' value={age} onChange={e => setAge(Number(e.target.value))} type="number" placeholder={'age'}/>
          <div className="app_btns">
            <button onClick={(e) => addUser(e)}>Создать</button>
            <button onClick={e => getAll(e)}>Получить</button>
          </div>
        </form>
        <div>
          {users.length !== 0 && users.map(user =>
              <div key={user.id} className="user">{user.id}. {user.username} {user.age}</div>
          )}
        </div>
      </div>
  );
}

export default App;
