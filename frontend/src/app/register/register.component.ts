import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RegisterService } from '../services/register.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  Roles: any = ['User', 'Livreur'];
  constructor(
    private _fb: FormBuilder,
    private _registerService: RegisterService,
    // private _dialogRef: MatDialogRef<RegisterComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.registerForm = this._fb.group({
      name: '',
      email: '',
      phone: '',
      password: '',
      role: ''
    })
  }
  ngOnInit(): void {
    // this.registerForm.patchValue(this.data)
  }

  onRegisterSubmit() {
    if (this.registerForm.valid) {

      this._registerService.register(this.registerForm.value).subscribe({
        next: (val: any) => {
          this._coreService.openSnackBar('User added successfully!', 'done')
          // this._dialogRef.close(true);
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

