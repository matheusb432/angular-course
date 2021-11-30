import { ServerData } from "./../model/server-data";
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";

@Component({
  selector: "app-cockpit",
  templateUrl: "./cockpit.component.html",
  styleUrls: ["./cockpit.component.css"],
})
export class CockpitComponent implements OnInit {
  @Input() serverElements = [];

  @Output()
  serverCreated = new EventEmitter<ServerData>();

  // TODO can also name an alias for output event but usually bad practice to do so
  @Output("bpCreated")
  blueprintCreated = new EventEmitter<ServerData>();

  // TODO fetching a local reference with ViewChild({local reference name})
  @ViewChild("serverContent", { static: true })
  serverContent: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  onAddServer(nameInput: HTMLInputElement) {
    this.serverCreated.emit({
      serverName: nameInput.value,
      serverContent: this.serverContent.nativeElement.value,
    });
  }

  onAddBlueprint(nameInput: HTMLInputElement) {
    this.blueprintCreated.emit({
      serverName: nameInput.value,
      serverContent: this.serverContent.nativeElement.value,
    });
  }
}
