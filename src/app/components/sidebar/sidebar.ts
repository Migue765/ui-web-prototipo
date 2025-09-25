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
      icon: 'assets/images/statistics/inicio-slide.png',
      label: 'Inicio',
      route: 'focus',
      active: true
    },
    {
      icon: 'assets/images/statistics/estadistica-slide.png',
      label: 'Estadísticas',
      route: 'statistics'
    },
    {
      icon: 'assets/images/statistics/task-slide.png',
      label: 'Tareas',
      route: 'tasks'
    },
    {
      icon: 'assets/images/statistics/engrane-slide.png',
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
    console.log('Setting active route to:', route);
    this.menuItems.forEach(item => {
      const wasActive = item.active;
      item.active = item.route === route;
      if (wasActive !== item.active) {
        console.log(`Item ${item.label} (${item.route}) changed from ${wasActive} to ${item.active}`);
      }
    });
    console.log('Current menu items state:', this.menuItems.map(item => ({ label: item.label, route: item.route, active: item.active })));
  }

  isImageIcon(icon: string): boolean {
    return icon.includes('.png') || icon.includes('.jpg') || icon.includes('.jpeg') || icon.includes('.svg');
  }
}