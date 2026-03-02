import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../core/room.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html'
})
export class RoomsComponent implements OnInit {

  rooms: any[] = [];

  constructor(private roomService: RoomService) {}

  ngOnInit(): void {
    this.roomService.getRooms().subscribe({
      next: (data) => {
        this.rooms = data;
      },
      error: () => {
        alert('Failed to load rooms');
      }
    });
  }
}