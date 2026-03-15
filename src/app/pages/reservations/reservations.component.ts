import { Component } from '@angular/core';
import { ReservationService } from '../../core/reservation.service';
import { GuestService } from '../../core/guest.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html'
})
export class ReservationsComponent {

  searchValue = '';

  selectedGuest: any = null;
  selectedRoom: any = null;

  calculation: any = null;

  reservation: any = {
    guestId: null,
    roomId: null,
    checkIn: '',
    checkOut: '',
    totalBill: 0
  };

  availableRooms: any[] = [];

  constructor(
    private guestService: GuestService,
    private reservationService: ReservationService
  ) {}

  // =========================
  // Search Guest
  // =========================
  searchGuest() {

    if (!this.searchValue) {
      alert("Enter email or phone number");
      return;
    }

    this.guestService.searchGuest(this.searchValue).subscribe({

      next: (data) => {

        this.selectedGuest = data;
        this.reservation.guestId = data.id;

      },

      error: () => {
        alert("Guest not found");
      }

    });

  }

  // =========================
  // Check Available Rooms
  // =========================
  checkAvailability() {

    if (!this.reservation.checkIn || !this.reservation.checkOut) {
      alert("Please select check-in and check-out dates");
      return;
    }

    const payload = {
      checkIn: this.reservation.checkIn,
      checkOut: this.reservation.checkOut
    };

    this.reservationService.getAvailableRooms(payload)
      .subscribe(res => {

        this.availableRooms = res;

      });

  }

  // =========================
  // Select Room
  // =========================
  selectRoom(room: any) {

    this.selectedRoom = room;
    this.reservation.roomId = room.id;

    // Automatically calculate bill
    if (this.reservation.checkIn && this.reservation.checkOut) {
      this.calculateBill();
    }

  }

  // =========================
  // Calculate Bill
  // =========================
  calculateBill() {

    if (!this.reservation.roomId) return;

    this.reservationService.calculateReservation(this.reservation)
      .subscribe(res => {

        this.calculation = res;

        this.reservation.totalBill = res.totalAmount;

      });

  }

  // =========================
  // Create Reservation
  // =========================
  createReservation() {

    const confirmReservation = confirm(
      `Confirm reservation for ${this.selectedGuest.fullName}?\n\nTotal: LKR ${this.calculation?.totalAmount}`
    );

    if (!confirmReservation) {
      return;
    }

    this.reservationService.createReservation(this.reservation)
      .subscribe(res => {

        alert("Reservation created successfully");

        this.reservationService.getInvoice(res.id)
          .subscribe(pdf => {

            const file = new Blob([pdf], { type: 'application/pdf' });
            const fileURL = URL.createObjectURL(file);

            window.open(fileURL);

          });

        this.resetForm();

      });

  }

  resetForm() {

    this.searchValue = '';

    this.reservation = {
      guestId: null,
      roomId: null,
      checkIn: '',
      checkOut: '',
      totalBill: 0
    };

    this.selectedGuest = null;
    this.selectedRoom = null;
    this.calculation = null;
    this.availableRooms = [];

  }

}