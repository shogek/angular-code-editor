import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContextMenuComponent {
  @Input() visible = false;
  @Input() x!: number;
  @Input() y!: number;
  @Input() choices: string[] = [];
  @Output() itemClicked = new EventEmitter<string>();
}