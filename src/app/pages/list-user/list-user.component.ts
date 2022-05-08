import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {

  constructor(private userService:UserService,
    private toastr: ToastrService) { }
  users:any=[]
  ngOnInit(): void {
    this.getUsers()
 
  }
  deleteUser(id){
    this.userService.deleteUser(id).subscribe(res=>{
      this.toastr.success('utilistaeur a été suprimé avec succès', 'Notification');

    })
 
    
  }
  getUsers(){
    this.userService.getUsers().subscribe(res=>{
      this.users=res
      console.log(this.users);
      
    })
  }

}
