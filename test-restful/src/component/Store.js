import { makeAutoObservable } from "mobx";
import axios from "axios";

const url = "http://34.124.220.187";

class Store {
  posts = [];

  constructor() {
    makeAutoObservable(this);
  }

  loadAllTask() {
    axios.get(url).then((response) => {
      this.posts = response.data;
      console.log(response);
    });
  }

  createTask(newtask) {
    axios.post(url, { task: newtask }).then((response) => {
      this.posts.push(response.data);
      console.log(response);
    });
  }
  deleteTask(id) {
    axios.delete(`${url}/${id}`).then(() => {
      this.loadAllTask();
    });
  }

  updateTask(id, newtask) {
    axios.put(`${url}/${id}`, { task: newtask.task }).then(() => {
      this.loadAllTask();
    });
  }
  checkTask(id) {
    axios.put(`${url}/${id}/toggle`).then(() => {
      this.loadAllTask();
    });
  }
}

export const store = new Store();

// fetch("http://34.124.220.187", { method: "GET" })
// .then((response) => response.json())
// .then((resjson) => {
//   console.log(resjson);
//   this.posts = resjson;
// });

//const [dataArray, setDataArray] = useState([]);
// useEffect(() => {
//     fetch("https://jsonplaceholder.typicode.com/posts",{method:'GET'})
//     .then((response) => response.json())
//     .then((json) => {
//       console.log(json);
//       setDataArray(json);
//     });
// }, []);
