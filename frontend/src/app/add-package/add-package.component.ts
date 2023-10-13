import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PackagesService } from '../services/packages.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-add-package',
  templateUrl: './add-package.component.html',
  styleUrls: ['./add-package.component.css']
})
export class AddPackageComponent implements OnInit{
  packagesForm: FormGroup;
  formBuilder: any;

  constructor(private _fb: FormBuilder,
    private _packagesService: PackagesService,
    private _dialogRef: MatDialogRef<AddPackageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.packagesForm = this._fb.group({
      description: ['', Validators.required],
      weight: ['', Validators.required],
      width: ['', Validators.required],
      height: ['', Validators.required],
      depth: ['', Validators.required],
      from_name: ['', Validators.required],
      from_address: ['', Validators.required],
      from_location: this.formBuilder.group({
        lat: ['', Validators.required],
        lng: ['', Validators.required],
      }),
      to_name: ['', Validators.required],
      to_address: ['', Validators.required],
      to_location: this._fb.group({
        lat: ['', Validators.required],
        lng: ['', Validators.required],
      }),

    })
  }

  ngOnInit(): void {
    this.packagesForm.patchValue(this.data)
  }

  onFormPackageSubmit() {
    if (this.packagesForm.valid) {
      console.log('Données du formulaire à envoyer au backend :', this.packagesForm.value);
      if(this.data) {
        this._packagesService.updatePackage(this.data._id, this.packagesForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Package details updated successfully!', 'done')
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

        this._packagesService.addPackage(this.packagesForm.value).subscribe({
          next: (val: any) => { 
            this._coreService.openSnackBar('Package added successfully!', 'done')
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
