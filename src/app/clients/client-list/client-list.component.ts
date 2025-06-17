import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ClientData, ClientsByParams } from '../../interfaces/clientDTOs';
import { ClientsService } from '../../services/clients.service';
import { ClientCarsComponent } from '../client-cars/client-cars.component';
import { oneFieldFilledValidator } from '../../validators/oneFieldFilledValidator.validator';

@Component({
  selector: 'app-client-list',
  imports: [ClientCarsComponent, ReactiveFormsModule],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css',
})
export class ClientListComponent implements OnInit {
  clientsService = inject(ClientsService);
  pageNumber = 1;
  pageSize = 5;
  clients = signal<ClientData[]>([]);
  filteredClient = signal<ClientsByParams | null>(null);
  selectedClientId?: number;
  fb = inject(FormBuilder);
  searchForm: FormGroup;
  validationError?: string;

  constructor() {
    this.searchForm = this.fb.group({
      searchGroup: this.fb.group(
        {
          name: [''],
          card_number: ['', [Validators.pattern('^[0-9]*$')]],
        },
        {
          validators: [oneFieldFilledValidator('name', 'card_number')],
          updateOn: 'submit',
        }
      ),
    });
  }

  ngOnInit(): void {
    this.fetchClients();
  }

  fetchClients() {
    this.clientsService.getClients(this.pageNumber, this.pageSize).subscribe({
      next: (data) => {
        this.clients.set(data.data);
        this.filteredClient.set(null);
      },
    });
  }

  selectClient(clientId: number) {
    this.selectedClientId = clientId;
  }

  onSearch(): void {
    if (this.searchForm.valid) {
      const payload = {
        ...this.searchForm.value.searchGroup,
      };
      this.clientsService.getClientsByParams(payload).subscribe({
        next: (response) => {
          this.validationError = '';
          this.clients.set([]);
          this.filteredClient.set(response);
        },
        error: (err) => {
          this.validationError = err?.error.error;
        },
      });
    } else {
      this.searchForm.markAllAsTouched();
    }
  }

  reset() {
    this.fetchClients();
    this.validationError = '';
    this.searchForm.reset();
  }

  get searchGroup() {
    return this.searchForm.get('searchGroup') as FormGroup;
  }

  get name() {
    return this.searchGroup.get('name');
  }

  get card_number() {
    return this.searchGroup.get('card_number');
  }
}
