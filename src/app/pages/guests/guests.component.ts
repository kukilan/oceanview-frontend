import { Component } from '@angular/core';

@Component({
  selector: 'app-guests',
  templateUrl: './guests.component.html'
})
export class GuestsComponent {

  searchValue = '';
  selectedGuest: any = null;
  showCreateForm = false;

  // Hardcoded demo guests
  guests = [
    {
      id: 1,
      fullName: 'John Silva',
      email: 'john@gmail.com',
      contactNumber: '0771234567',
      gender: 'Male',
      address: 'Colombo'
    },
    {
      id: 2,
      fullName: 'Nimali Perera',
      email: 'nimali@gmail.com',
      contactNumber: '0779876543',
      gender: 'Female',
      address: 'Galle'
    }
  ];

  searchGuest() {

    this.showCreateForm = false;

    this.selectedGuest = this.guests.find(g =>
      g.contactNumber === this.searchValue ||
      g.email === this.searchValue
    );

    if (!this.selectedGuest) {
      alert('Guest not found');
    }
  }

  openCreateGuest() {
    this.selectedGuest = {
      fullName: '',
      email: '',
      contactNumber: '',
      gender: '',
      address: ''
    };
    this.showCreateForm = true;
  }

  saveGuest() {
    alert('Guest saved (demo mode)');
    this.showCreateForm = false;
  }
}