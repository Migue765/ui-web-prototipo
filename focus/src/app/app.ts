import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar';
import { TimerComponent } from './components/timer/timer';
import { StatsCardComponent, StatData } from './components/stats-card/stats-card';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SidebarComponent,
    TimerComponent,
    StatsCardComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {
  title = signal('Focus');

  // Quick stats data
  quickStats: StatData[] = [
    {
      type: 'completed',
      title: 'Ciclos Completados',
      value: '8',
      icon: '✅',
      color: 'var(--accent-orange)'
    },
    {
      type: 'time',
      title: 'Tiempo Enfocado',
      value: '3h 20m',
      icon: '⏱️',
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
        // Lógica para estadísticas
        break;
    }
  }
}