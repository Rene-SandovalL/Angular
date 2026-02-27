import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.html',
  styleUrls: ['./sidebar-menu.scss'],
  imports: [MatExpansionModule, MatIconModule, RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarMenu {
  readonly panelOpenState = signal(false);
}
