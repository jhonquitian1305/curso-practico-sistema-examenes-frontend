import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public user = {
    username: '',
    password: '',
    name: '',
    lastname: '',
    email: '',
    phone: ''
  }

  constructor(
    private userService: UserService,
    private snack: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  formSubmit(){
    console.log(this.user);
    if(this.user.username == '' || this.user.username == null){
      this.snack.open("El nombre de usuario es requerido", 'Aceptar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
      return;
    }

    this.userService.addUser(this.user).subscribe({
      next: (data) => {
        console.log(data);
        Swal.fire('Usuario guardado', 'Usuario registrado con éxito en el sistema', 'success');
      },
      error: (err) => {
        this.snack.open(`Ha ocurrido un error en el sistema`, 'Aceptar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
      }   
    });
  }

}
