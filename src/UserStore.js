import { observable, computed } from 'mobx';

class UserStore{

 @observable users = [];
 @observable repos = [];

  @computed get repoCount(){
    return this.repos.length;
 }
}

const store = new UserStore();
export default store;