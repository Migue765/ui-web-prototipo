import { Component, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar';
import { TimerComponent } from './components/timer/timer';
import { StatsCardComponent, StatData } from './components/stats-card/stats-card';
import { StatisticsComponent } from './components/statistics/statistics';
import { TasksComponent } from './components/tasks/tasks';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SidebarComponent,
    TimerComponent,
    StatsCardComponent,
    StatisticsComponent,
    TasksComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {
  @ViewChild(SidebarComponent) sidebar!: SidebarComponent;

  title = signal('Focus');

  // Control de navegación
  currentPage = signal<'focus' | 'statistics' | 'tasks'>('focus');

  // Quick stats data
  quickStats: StatData[] = [
    {
      type: 'completed',
      title: 'Ciclos Completados',
      value: '8',
      icon: '🔄',
      color: 'var(--accent-orange)'
    },
    {
      type: 'time',
      title: 'Tiempo Enfocado',
      value: '3h 20m',
      icon: '🕐',
      color: '#4A90E2'
    },
    {
      type: 'tasks',
      title: 'Tareas Completadas',
      value: '12',
      icon: '✓',
      color: '#7ED321'
    }
  ];

  // Today's progress data
  todayProgress = {
    dailyGoal: 60, // minutes
    completed: 40, // minutes
    percentage: 67
  };

  // Recent tasks
  recentTasks = [
    {
      id: '1',
      title: 'Revisar emails',
      completed: true,
      icon: '✅'
    },
    {
      id: '2',
      title: 'Llamada con cliente',
      completed: true,
      icon: '✅'
    },
    {
      id: '3',
      title: 'Completar informe',
      completed: false,
      icon: '🔄'
    }
  ];

  // Quick action buttons
  quickActions = [
    {
      icon: '➕',
      label: 'Nueva Sesión',
      action: 'new-session'
    },
    {
      icon: '🔊',
      label: 'Ruido Blanco',
      action: 'white-noise'
    },
    {
      icon: '📊',
      label: 'Estadísticas',
      action: 'statistics'
    }
  ];

  onTimerComplete(): void {
    console.log('¡Timer completado!');
    // Aquí puedes agregar lógica para manejar la finalización del timer
  }

  onTimerStateChange(state: string): void {
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

  // Métodos de navegación
  navigateToFocus(): void {
    this.currentPage.set('focus');
    if (this.sidebar) {
      this.sidebar.setActiveRoute('focus');
    }
  }

  navigateToStatistics(): void {
    this.currentPage.set('statistics');
    if (this.sidebar) {
      this.sidebar.setActiveRoute('statistics');
    }
  }

  navigateToTasks(): void {
    this.currentPage.set('tasks');
    if (this.sidebar) {
      this.sidebar.setActiveRoute('tasks');
    }
  }

  onNavigationChange(route: string): void {
    console.log('Navigation to:', route);
    switch (route) {
      case 'focus':
        this.navigateToFocus();
        break;
      case 'statistics':
        this.navigateToStatistics();
        break;
      case 'tasks':
        this.navigateToTasks();
        break;
      case 'settings':
        // Placeholder para página de configuración
        console.log('Página de configuración no implementada aún');
        break;
      default:
        this.navigateToFocus();
    }
  }
}