import { Component } from '@angular/core';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html'
})
export class ReservationsComponent {

  searchValue = '';
  selectedGuest: any = null;

  // Hardcoded demo guests
  guests = [
    {
      fullName: 'John Silva',
      email: 'john@gmail.com',
      contactNumber: '0771234567',
      gender: 'Male'
    },
    {
      fullName: 'Nimali Perera',
      email: 'nimali@gmail.com',
      contactNumber: '0779876543',
      gender: 'Female'
    }
  ];

  searchGuest() {

    this.selectedGuest = this.guests.find(g =>
      g.contactNumber === this.searchValue ||
      g.email === this.searchValue
    );

    if (!this.selectedGuest) {
      alert('Guest not found. Please add guest from Guest Management.');
    }
  }
}