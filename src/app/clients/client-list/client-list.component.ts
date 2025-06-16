import { Component, inject, OnInit, signal } from '@angular/core';
import { ClientsService } from '../../services/clients.service';
import { ClientData } from '../../interfaces/clientDTOs';

@Component({
  selector: 'app-client-list',
  imports: [],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css',
})
export class ClientListComponent implements OnInit {
  clientsService = inject(ClientsService);
  pageNumber = 1;
  pageSize = 5;
  clients = signal<ClientData[]>([]);

  ngOnInit(): void {
    this.fetchClients();
  }

  fetchClients() {
    this.clientsService.getClients(this.pageNumber, this.pageSize).subscribe({
      next: (data) => this.clients.set(data.data),
    });
  }
}
