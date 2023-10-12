import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  usersForm: FormGroup;

  constructor(private _fb: FormBuilder, private _usersService: UsersService, private _dialogRef: DialogRef<AddUserComponent> ) {
    this.usersForm = this._fb.group({
      name: '',
      email: '',
      phone: '',
      password: ''
    })
  }

  onFormSubmit() {
    if (this.usersForm.valid) {
      this._usersService.addUser(this.usersForm.value).subscribe({
        next: (val: any) => {
          alert('User added successfully');
          this._dialogRef.close();
        },
        error: (err: any) => {
          console.error(err);
          if (err.error && err.error.message) {
            // Affichez le message d'erreur renvoyé par le serveur
            alert(err.error.message);
          } else {
            // Gestion d'erreur générique
            alert('Une erreur s\'est produite lors de l\'ajout de l\'utilisateur.');
          }
        }
      });
    }
  }
  
}
