import { Component, signal, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Task {
    id: string;
    title: string;
    description: string;
    status: 'pending' | 'in-progress' | 'completed';
    priority: 'low' | 'medium' | 'high';
    pomodoros: {
        completed: number;
        total: number;
    };
    dueDate: string;
    category: string;
    progress: number;
}

export interface TaskFilter {
    id: string;
    label: string;
    count: number;
    active: boolean;
}

@Component({
    selector: 'app-tasks',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './tasks.html',
    styleUrls: ['./tasks.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TasksComponent {
    // Filtros de tareas
    filters: TaskFilter[] = [
        { id: 'all', label: 'Todas', count: 24, active: true },
        { id: 'pending', label: 'Pendientes', count: 12, active: false },
        { id: 'in-progress', label: 'En curso', count: 7, active: false },
        { id: 'completed', label: 'Hechas', count: 5, active: false }
    ];

    // Estado actual del filtro
    currentFilter = signal<string>('all');

    // Lista de tareas
    tasks: Task[] = [
        {
            id: '1',
            title: 'Diseñar interfaz de usuario',
            description: 'Crear mockups y prototipos para la nueva aplicación móvil del cliente.',
            status: 'in-progress',
            priority: 'high',
            pomodoros: { completed: 3, total: 6 },
            dueDate: 'Vence 15 Sep',
            category: 'Diseño',
            progress: 50
        },
        {
            id: '2',
            title: 'Revisar documentación',
            description: 'Analizar y actualizar la documentación técnica del proyecto anterior.',
            status: 'pending',
            priority: 'medium',
            pomodoros: { completed: 0, total: 3 },
            dueDate: 'Vence 18 Sep',
            category: 'Desarrollo',
            progress: 0
        },
        {
            id: '3',
            title: 'Implementar API',
            description: 'Desarrollar endpoints para la gestión de usuarios y autenticación.',
            status: 'pending',
            priority: 'high',
            pomodoros: { completed: 0, total: 8 },
            dueDate: 'Vence 25 Sep',
            category: 'Backend',
            progress: 0
        },
        {
            id: '4',
            title: 'Testing de aplicación',
            description: 'Realizar pruebas unitarias y de integración para el módulo de pagos.',
            status: 'in-progress',
            priority: 'medium',
            pomodoros: { completed: 1, total: 4 },
            dueDate: 'Vence 20 Sep',
            category: 'Testing',
            progress: 25
        },
        {
            id: '5',
            title: 'Reunión con cliente',
            description: 'Presentar avances del proyecto y recopilar feedback del cliente.',
            status: 'completed',
            priority: 'high',
            pomodoros: { completed: 2, total: 2 },
            dueDate: 'Completado 12 Sep',
            category: 'Reunión',
            progress: 100
        },
        {
            id: '6',
            title: 'Optimizar base de datos',
            description: 'Mejorar consultas SQL y añadir índices para mejor rendimiento.',
            status: 'completed',
            priority: 'medium',
            pomodoros: { completed: 5, total: 5 },
            dueDate: 'Completado 10 Sep',
            category: 'Base de datos',
            progress: 100
        }
    ];

    // Tareas filtradas
    get filteredTasks(): Task[] {
        const filter = this.currentFilter();
        if (filter === 'all') {
            return this.tasks;
        }
        return this.tasks.filter(task => {
            switch (filter) {
                case 'pending':
                    return task.status === 'pending';
                case 'in-progress':
                    return task.status === 'in-progress';
                case 'completed':
                    return task.status === 'completed';
                default:
                    return true;
            }
        });
    }

    // Cambiar filtro activo
    onFilterChange(filterId: string): void {
        this.filters.forEach(filter => filter.active = filter.id === filterId);
        this.currentFilter.set(filterId);
    }

    // Obtener clase CSS para el estado de la tarea
    getTaskStatusClass(status: string): string {
        switch (status) {
            case 'pending':
                return 'task-pending';
            case 'in-progress':
                return 'task-in-progress';
            case 'completed':
                return 'task-completed';
            default:
                return '';
        }
    }

    // Obtener clase CSS para la prioridad
    getPriorityClass(priority: string): string {
        switch (priority) {
            case 'high':
                return 'priority-high';
            case 'medium':
                return 'priority-medium';
            case 'low':
                return 'priority-low';
            default:
                return '';
        }
    }

    // Obtener icono para el estado
    getStatusIcon(status: string): string {
        switch (status) {
            case 'pending':
                return '⏳';
            case 'in-progress':
                return '🔄';
            case 'completed':
                return '✅';
            default:
                return '📋';
        }
    }

    // Obtener color para la categoría
    getCategoryColor(category: string): string {
        const colors: { [key: string]: string } = {
            'Diseño': '#F66B0E',
            'Desarrollo': '#4A90E2',
            'Backend': '#205375',
            'Testing': '#7ED321',
            'Reunión': '#9B59B6',
            'Base de datos': '#E67E22'
        };
        return colors[category] || '#95A5A6';
    }

    // Manejar clic en tarea
    onTaskClick(task: Task): void {
        console.log('Task clicked:', task);
        // Aquí puedes agregar lógica para abrir detalles de la tarea
    }

    // Agregar nueva tarea
    onAddTask(): void {
        console.log('Add new task');
        // Aquí puedes agregar lógica para crear nueva tarea
    }
}
