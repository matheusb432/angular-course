import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  secretPassword = "shrimp";
  canDisplayDetails = false;
  clicksLogger: string[] = [];

  onDisplayClick() {
    this.toggleDetails();

    this.logClick();
  }

  toggleDetails(): void {
    this.canDisplayDetails = !this.canDisplayDetails;
  }

  logClick() {
    this.clicksLogger.push(
      `canDisplayDetails was set to ${this.canDisplayDetails} at ${new Date(
        Date.now()
      ).toTimeString()}`
    );
  }
}
