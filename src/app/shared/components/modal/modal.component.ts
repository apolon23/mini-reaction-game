import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core'

@Component({
  standalone: true,
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  @Output()
  public close = new EventEmitter<void>()

  public onBackdropClick(): void {
    this.close.emit()
  }
}
