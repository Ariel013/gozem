import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeliveryService } from '../services/delivery.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-add-delivery',
  templateUrl: './add-delivery.component.html',
  styleUrls: ['./add-delivery.component.css']
})
export class AddDeliveryComponent implements OnInit {
  deliveryForm: FormGroup;
  formBuilder: any;

  constructor(private _fb: FormBuilder,
    private _deliveryService: DeliveryService,
    private _dialogRef: MatDialogRef<AddDeliveryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.deliveryForm = this._fb.group({
      pickup_time: ['', Validators.required],
      start_time: ['', Validators.required],
      end_time: ['', Validators.required],
      lat: ['', Validators.required],
      lng: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.deliveryForm.patchValue(this.data)
  }

  onFormSubmit() {
    if (this.deliveryForm.valid) {
      if (this.data) {
        this._deliveryService.updateDelivery(this.data._id, this.deliveryForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Delivery profile updated successfully!', 'done')
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
            if (err.error && err.error.message) {
              // Affichez le message d'erreur renvoyé par le serveur
              alert(err.error.message);
            } else {
              // Gestion d'erreur générique
              alert('Une erreur s\'est produite lors de la modification de la livraison.');
            }
          }
        });

      } else {

        this._deliveryService.addDelivery(this.deliveryForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Delivery added successfully!', 'done')
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
            if (err.error && err.error.message) {
              // Affichez le message d'erreur renvoyé par le serveur
              alert(err.error.message);
            } else {
              // Gestion d'erreur générique
              alert('Une erreur s\'est produite lors de l\'ajout de la livraison.');
            }
          }
        });
      }
    }
  }

}
