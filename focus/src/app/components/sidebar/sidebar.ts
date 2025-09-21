import { Component, EventEmitter, Output } from '@angular/core';
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
  @Output() navigationChange = new EventEmitter<string>();

  menuItems: MenuItem[] = [
    {
      icon: '🏠',
      label: 'Inicio',
      route: 'focus',
      active: true
    },
    {
      icon: '📊',
      label: 'Estadísticas',
      route: 'statistics'
    },
    {
      icon: '📋',
      label: 'Tareas',
      route: 'tasks'
    },
    {
      icon: '⚙️',
      label: 'Configuración',
      route: 'settings'
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

    // Emit navigation event
    this.navigationChange.emit(item.route);
  }

  // Método público para actualizar el estado activo desde el componente padre
  setActiveRoute(route: string): void {
    this.menuItems.forEach(item => {
      item.active = item.route === route;
    });
  }
}