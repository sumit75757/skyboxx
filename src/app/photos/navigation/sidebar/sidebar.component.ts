import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent  {

  isDarkEnable: any;
  public doSomething(date: any) {
    console.log('Picked date: ', date);
    this.isDarkEnable = date;
  }
  public togle(side: any) {
    side.toggle()
  }
  navigation:any=[
    {
      title : "Home",
      path:"/",
      icon: "fa fa-home"

    },
    {
      title : "Search",
      path:"/search",
      icon: "fa fa-search"

    }
  ]

}
