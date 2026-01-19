import { ChangeDetectionStrategy, Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { GameService } from '../../services';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrl: './control-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlPanelComponent {
  private readonly fb = inject(FormBuilder)
  public readonly game = inject(GameService)

  public readonly form = this.fb.group({
    time: [null, [Validators.required, Validators.min(100)]],
  })

  @Output()
  public startGame = new EventEmitter<void>()

  public start(): void {
    if (this.form.invalid) return
    const time = this.form.controls.time.value
    if (time === null) return
    this.game.startGame(time)
    this.startGame.emit()
  }
}
