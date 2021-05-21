import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { User } from 'src/app/core/model/user';
import { UserService } from 'src/app/core/service/user.service';
import { Util } from 'src/app/core/util/util';

@Component({
  selector: 'app-user',
  templateUrl: 'user.component.html',
  styleUrls: ['user.component.sass']
})
export class UserComponent implements OnInit {
  private users: User[] = [];
  public usersAux: User[] = [];
  public searchInput = new FormControl('');
  
  constructor(private userService: UserService, private util: Util) { }

  ngOnInit() {
    this.load();
  }

  async load() {
    try {
      this.util.loading();
      this.users = await this.userService.findAll().toPromise() as User[];
      this.usersAux = [... this.users] ;

      this.util.cancelLoading();
    } catch (error) {
      this.util.handleError(error);
    }
  }

  /**
  * Search in the array
  */
  public search(){
    this.usersAux = this.util.filterArrWithString(this.users, this.searchInput.value);
  }
}
