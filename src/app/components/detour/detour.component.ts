import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detour',
  templateUrl: './detour.component.html',
  styleUrls: ['./detour.component.css']
})
export class DetourComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log('detour');
    
  }

}
