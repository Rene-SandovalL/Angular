import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarMenu } from '../../shared/sidebar-menu/sidebar-menu';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, SidebarMenu],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {

}
