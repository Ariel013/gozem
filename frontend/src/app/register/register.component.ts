import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { RegisterService } from '../services/register.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgFor } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  roles = [
    { name: 'User', val: 'user' },
    { name: 'Deliver', val: 'livreur' }
  ];
  constructor(
    private _fb: FormBuilder,
    private _registerService: RegisterService,
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
  }

  onRegisterSubmit() {
    if (this.registerForm.valid) {

      this._registerService.register(this.registerForm.value).subscribe({
        next: (val: any) => {
          this._coreService.openSnackBar('Compte crée avec succès!, Veuillez s\'il-vous-plait consulter vos mails pour valider le compte', 'done')
          console.log(this.registerForm.value)

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

