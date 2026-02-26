import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.html',
  styleUrl: './sidebar-menu.scss',
  imports: [MatExpansionModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarMenu {
  readonly panelOpenState = signal(false);
}
