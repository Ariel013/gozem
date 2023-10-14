import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { CoreService } from '../core/core.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  response: { message: string, name: string, email: string } = {
    message: '',
    name: '',
    email: '',
  };

  constructor(
    private _fb: FormBuilder,
    private _loginService: LoginService,
    private router: Router,
    private _coreService: CoreService
  ) {
    this.loginForm = this._fb.group({
      email: '',
      password: '',
    })
  }
  ngOnInit(): void {
  }

  onLoginSubmit() {
    if (this.loginForm.valid) {

      this._loginService.login(this.loginForm.value).subscribe({
        next: (response: any) => {
          this.response = response;
          // console.log(response)

          // Stockage du token dans le Local Storage
          localStorage.setItem('token', response.token);

          // Recupération du role de l'utilisateur
          this._loginService.getUserRole().subscribe({
            next: (role: string) => {
              // Redirection de l'utilisateur
              if (role === 'admin') {
                this.router.navigate(['/dashboard']);
              } else if (role === 'livreur') {
                this.router.navigate(['/livreur'])
              } else if (role === 'user') {
                this.router.navigate(['/index'])
              } else {
                alert ('Role inconnu')
              }
            },
            error: (error) => {
              console.error(error);
              // Gérer l'erreur lors de la récupération du rôle
              alert('Erreur lors de la récupération du rôle.');
            }
          })

          this._coreService.openSnackBar('User logged successfully!', 'done')

          // Après une connexion réussie, redirection de l'utilisateur vers la page d'accueil.
          // this.router.navigate(['/index']);
        },
        error: (err: any) => {
          console.error(err);
          if (err.error && err.error.message) {
            // Afficher le message d'erreur renvoyé par le serveur
            alert(err.error.message);
          } else {
            // Gestion d'erreur générique
            alert('Une erreur s\'est produite lors de la connexion.');
          }
        }
      });
    }
  }

}