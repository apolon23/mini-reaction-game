import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GameService } from '../../services';
import { CellState } from '../../models';

@Component({
  standalone: true,
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridComponent {
  public readonly game = inject(GameService)
  public readonly CellState = CellState
}
