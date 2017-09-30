import React,{ Component } from 'react';
import axios from 'axios';

class Users extends Component {

  constructor(props){
     super(props);
        this.state={UserList:[],repos:[]};
        this.onClick= this.onClick.bind(this);
 }

componentWillMount(){
     axios.get('https://api.github.com/search/users?q=repos:>42+followers:>1000')
     .then((response)=>{

      let users = response.data.items;
      this.setState({
        UserList: users
     });

   })
   .catch((error)=>{
    console.log(error);
   });
 }

 onClick(event){
     axios.get('https://api.github.com/users/'+event.target.name+'/repos')
     .then((response)=>{
         let reps =response.data;
         this.setState({
              repos: reps
     });
   })
   .catch((error)=>{
    console.log(error);
   });
 }

  render() {
    return (
           <div>

            <ul>
              {
                 this.state.UserList.map((user,k)=>{
                       return (
                           <li key={k}><a role="button" onClick={this.onClick} name={user.login}>{user.login}</a></li>
                       )
                 })
             }

            </ul>
          {  this.state.repos.length !==0 ? (
           <div><h2>Repositories</h2>
           <ul>
              {
                 this.state.repos.map((repo,k)=>{
                       return (
                           <li key={k}>{repo.name}</li>
                       )
                 })
            }

            </ul>
            </div>)
             :
            <p>Please select a user</p>

           }
          </div>

    )
   }
}

export default Users;