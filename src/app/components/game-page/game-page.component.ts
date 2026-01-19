import { ChangeDetectionStrategy, Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { ModalComponent } from '../../shared';
import { GameService } from '../../services';
import { GridComponent } from '../grid/grid.component';
import { ControlPanelComponent } from '../control-panel/control-panel.component';

@Component({
  standalone: true,
  imports: [GridComponent, ControlPanelComponent, ModalComponent],
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GamePageComponent {
  public readonly game = inject(GameService)

  public readonly showRules = signal(false)

  @ViewChild('gridAnchor')
  public gridAnchor!: ElementRef<HTMLDivElement>

  public onStartGame(): void {
    requestAnimationFrame(() => {
      this.gridAnchor.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    })
  }
}
