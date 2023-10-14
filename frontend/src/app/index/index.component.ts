import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  private socket: any;

  ngOnInit(): void {
    // Etablissement de la connexion avec le serveur express
    this.socket = io('http://localhost:5000')
  }
}
