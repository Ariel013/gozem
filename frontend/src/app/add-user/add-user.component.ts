import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit{
  usersForm: FormGroup;

  constructor(private _fb: FormBuilder,
    private _usersService: UsersService,
    private _dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.usersForm = this._fb.group({
      name: '',
      email: '',
      phone: '',
      password: '',
      role: ''
    })
  }

  ngOnInit(): void {
    this.usersForm.patchValue(this.data)
  }

  onFormSubmit() {
    if (this.usersForm.valid) {
      if(this.data) {
        this._usersService.updateUser(this.data._id, this.usersForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('User profile updated successfully!', 'done')
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
            if (err.error && err.error.message) {
              // Affichez le message d'erreur renvoyé par le serveur
              alert(err.error.message);
            } else {
              // Gestion d'erreur générique
              alert('Une erreur s\'est produite lors de la modification de l\'utilisateur.');
            }
          }
        });

      } else {

        this._usersService.addUser(this.usersForm.value).subscribe({
          next: (val: any) => { 
            this._coreService.openSnackBar('User added successfully!', 'done')
            this._dialogRef.close(true);
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

}
