import React,{ Component } from 'react';
import axios from 'axios';
import {observer} from 'mobx-react';

@observer
class Users extends Component {

componentWillMount(){
     axios.get('https://api.github.com/search/users?q=repos:>42+followers:>1000')
     .then((response)=>{
       this.props.UserStore.users.replace(response.data.items);
       console.log(this.props.UserStore.users);
      })
     .catch((error)=>{
        console.log(error);
      });
  }

 onClick(event){
     axios.get('https://api.github.com/users/'+event.target.name+'/repos')
     .then((response)=>{
          this.props.UserStore.repos.replace(response.data);
   })
   .catch((error)=>{
    console.log(error);
   });
 }

  render() {
    return (
           <div>
             <div className="toMakeItInline">
             <h2>Users</h2>
             <ul>
               {
                  this.props.UserStore.users.map((user,k)=>{
                        return (
                            <li key={k}><a role="button" onClick={this.onClick.bind(this)} name={user.login}>{user.login}</a></li>
                        )
                  })
               }

            </ul>
            </div>
          {  this.props.UserStore.repoCount !==0 ? (
           <div className="toMakeItInline"><h2>Repositories</h2>
           <ul>
              {
                 this.props.UserStore.repos.map((repo,k)=>{
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