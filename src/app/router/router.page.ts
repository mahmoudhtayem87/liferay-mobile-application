import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-router',
  templateUrl: './router.page.html',
  styleUrls: ['./router.page.scss'],
})
export class RouterPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  visit(url)
  {
    this.router.navigate([url]);
  }
}
