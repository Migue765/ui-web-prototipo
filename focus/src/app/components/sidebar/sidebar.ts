import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface MenuItem {
  icon: string;
  label: string;
  route: string;
  active?: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class SidebarComponent {
  menuItems: MenuItem[] = [
    {
      icon: '🏠',
      label: 'Inicio',
      route: '/inicio',
      active: true
    },
    {
      icon: '📊',
      label: 'Estadísticas',
      route: '/estadisticas'
    },
    {
      icon: '📋',
      label: 'Tareas',
      route: '/tareas'
    },
    {
      icon: '⚙️',
      label: 'Configuración',
      route: '/configuracion'
    }
  ];

  user = {
    name: 'Jose David',
    role: 'Premium',
    avatar: 'JD'
  };

  onMenuItemClick(item: MenuItem): void {
    // Reset all items
    this.menuItems.forEach(menuItem => menuItem.active = false);
    // Set clicked item as active
    item.active = true;
    console.log('Navigate to:', item.route);
  }
}