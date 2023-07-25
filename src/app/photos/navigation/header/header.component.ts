import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  @Output() data = new EventEmitter<any>();
  @Output() toggle = new EventEmitter<any>();

  isDarkEnable=false
  ngOnInit(): void {
    this.isDarkEnable=JSON.parse(localStorage.getItem("theme")+'')
    this.data.emit(this.isDarkEnable);

    }
  changeTheme(){
    this.isDarkEnable = this.isDarkEnable ? false : true;
    this.data.emit(this.isDarkEnable);
    console.log(this.isDarkEnable);
    localStorage.setItem("theme",JSON.stringify(this.isDarkEnable))
  }
  sidetoggle(){
    this.toggle.emit()
  }

  logout(){
  if(confirm("Do you really want to logout")){
    localStorage.clear()
    location.replace('http://localhost:4200/?status=logout')
  }

  }
}
