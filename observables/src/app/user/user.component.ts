import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent implements OnInit {
  id: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // TODO ? Angular observables are managed by angular, meaning they will be automatically
    // ? unsubscribed from whenever this component is destroyed
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
    });
  }
}
