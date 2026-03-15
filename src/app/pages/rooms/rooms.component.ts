import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../core/room.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html'
})
export class RoomsComponent implements OnInit {

  rooms: any[] = [];

  selectedRoom: any = null;

  showCreateForm = false;

  constructor(private roomService: RoomService) {}

  ngOnInit(): void {
    this.loadRooms();
  }

  loadRooms() {

    this.roomService.getRooms().subscribe({
      next: (data) => {
        this.rooms = data;
      },
      error: () => {
        alert('Failed to load rooms');
      }
    });

  }

  selectRoom(room: any) {

    this.selectedRoom = { ...room };

    this.showCreateForm = false;

  }

  openCreateRoom() {

    this.selectedRoom = {
      roomNumber: '',
      singleBeds: 0,
      doubleBeds: 0,
      tripleBeds: 0,
      isAc: false,
      pricePerNight: 0
    };

    this.showCreateForm = true;

  }

  saveRoom() {

    if (this.showCreateForm) {

      this.roomService.createRoom(this.selectedRoom)
        .subscribe(() => {

          alert('Room created successfully');

          this.loadRooms();

          this.selectedRoom = null;

        });

    } else {

      this.roomService.updateRoom(this.selectedRoom.id, this.selectedRoom)
        .subscribe(() => {

          alert('Room updated successfully');

          this.loadRooms();

        });

    }

  }

  deleteRoom() {

    if (!confirm("Delete this room?")) {
      return;
    }

    this.roomService.deleteRoom(this.selectedRoom.id)
      .subscribe(() => {

        alert('Room deleted');

        this.loadRooms();

        this.selectedRoom = null;

      });

  }

  cancelEdit() {

    this.selectedRoom = null;

    this.showCreateForm = false;

  }

}