import { ServerData } from "./model/server-data";
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  serverElements = [
    { type: "server", name: "Test Server", content: "Just a test!" },
  ];

  onAddServer(serverData: ServerData) {
    this.serverElements.push({
      type: "server",
      name: serverData.serverName,
      content: serverData.serverContent,
    });
  }

  onAddBlueprint(blueprintData: ServerData) {
    this.serverElements.push({
      type: "blueprint",
      name: blueprintData.serverName,
      content: blueprintData.serverContent,
    });
  }
}
