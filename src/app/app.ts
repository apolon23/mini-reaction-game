import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { GamePageComponent } from './components';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [GamePageComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
