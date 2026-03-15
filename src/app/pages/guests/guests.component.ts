import { Component } from '@angular/core';
import { GuestService } from '../../core/guest.service';

@Component({
  selector: 'app-guests',
  templateUrl: './guests.component.html'
})
export class GuestsComponent {

  searchValue = '';

  selectedGuest: any = null;

  showCreateForm = false;

  constructor(private guestService: GuestService) {}

  // ======================
  // Search Guest
  // ======================
  searchGuest() {

    if (!this.searchValue) {
      alert('Enter phone number or email');
      return;
    }

    this.showCreateForm = false;

    this.guestService.searchGuest(this.searchValue)
      .subscribe({

        next: (data) => {

          this.selectedGuest = data;

        },

        error: () => {

          alert('Guest not found');

          this.selectedGuest = null;

        }

      });

  }

  // ======================
  // Open Create Guest Form
  // ======================
  openCreateGuest() {

    this.selectedGuest = {
      fullName: '',
      email: '',
      contactNumber: '',
      gender: '',
      address: '',
      dateOfBirth: ''
    };

    this.showCreateForm = true;

  }

  // ======================
  // Save Guest
  // ======================
  saveGuest() {

    if (this.showCreateForm) {

      // CREATE
      this.guestService.createGuest(this.selectedGuest)
        .subscribe(() => {

          alert('Guest created successfully');

          this.resetForm();

        });

    } else {

      // UPDATE
      this.guestService.updateGuest(this.selectedGuest.id, this.selectedGuest)
        .subscribe(() => {

          alert('Guest updated successfully');

        });

    }

  }

  // ======================
  // Reset Form
  // ======================
  resetForm() {

    this.selectedGuest = null;

    this.searchValue = '';

    this.showCreateForm = false;

  }

}