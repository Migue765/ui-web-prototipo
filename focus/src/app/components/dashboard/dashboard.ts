import { Component, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar';
import { TimerComponent, TimerState } from '../timer/timer';
import { StatsCardComponent, StatData } from '../stats-card/stats-card';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    SidebarComponent,
    TimerComponent,
    StatsCardComponent
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {
  @ViewChild(SidebarComponent) sidebar!: SidebarComponent;

  // Quick stats data
  quickStats: StatData[] = [
    {
      type: 'completed',
      title: 'Ciclos Completados',
      value: '8',
      icon: 'assets/images/statistics/reload-home.png',
      color: 'var(--accent-orange)'
    },
    {
      type: 'time',
      title: 'Tiempo Enfocado',
      value: '3h 20m',
      icon: 'assets/images/statistics/clock-home.png',
      color: '#4A90E2'
    },
    {
      type: 'tasks',
      title: 'Tareas Completadas',
      value: '12',
      icon: 'assets/images/statistics/check-home.png',
      color: '#7ED321'
    }
  ];

  // Today's progress data
  todayProgress = {
    dailyGoal: 6, // hours
    completed: 4, // hours
    percentage: 67
  };

  // Recent tasks
  recentTasks = [
    {
      id: '1',
      title: 'Revisar emails',
      completed: true,
      icon: 'assets/images/statistics/completado.png'
    },
    {
      id: '2',
      title: 'Llamada con cliente',
      completed: true,
      icon: 'assets/images/statistics/completado.png'
    },
    {
      id: '3',
      title: 'Completar informe',
      completed: false,
      icon: 'assets/images/statistics/en curso.png'
    }
  ];

  // Quick action buttons
  quickActions = [
    {
      icon: 'assets/images/statistics/new-sesion-icon.png',
      label: 'Nueva Sesión',
      action: 'new-session'
    },
    {
      icon: 'assets/images/statistics/ruido-blanco-icon.png',
      label: 'Ruido Blanco',
      action: 'white-noise'
    },
    {
      icon: 'assets/images/statistics/estadistica-icon.png',
      label: 'Estadísticas',
      action: 'statistics'
    }
  ];

  constructor(private router: Router) { }

  onTimerComplete(): void {
    console.log('¡Timer completado!');
    // Aquí puedes agregar lógica para manejar la finalización del timer
  }

  onTimerStateChange(state: TimerState): void {
    console.log('Timer state changed:', state);
  }

  onQuickAction(action: string): void {
    console.log('Quick action:', action);
    switch (action) {
      case 'new-session':
        // Lógica para nueva sesión
        break;
      case 'white-noise':
        // Lógica para ruido blanco
        break;
      case 'statistics':
        this.navigateToStatistics();
        break;
    }
  }

  // Navigation methods
  navigateToStatistics(): void {
    if (this.sidebar) {
      this.sidebar.setActiveRoute('statistics');
    }
  }

  onNavigationChange(route: string): void {
    console.log('Navigation to:', route);
    switch (route) {
      case 'focus':
        // Already on focus page
        break;
      case 'statistics':
        this.router.navigate(['/statistics']);
        break;
      case 'tasks':
        this.router.navigate(['/tasks']);
        break;
      case 'settings':
        this.router.navigate(['/settings']);
        break;
      default:
      // Stay on current page
    }
  }

  isImageIcon(icon: string): boolean {
    return icon.includes('.png') || icon.includes('.jpg') || icon.includes('.jpeg') || icon.includes('.svg');
  }
}
