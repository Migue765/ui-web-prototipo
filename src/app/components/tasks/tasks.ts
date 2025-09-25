import { Component, signal, ViewEncapsulation, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar';

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
    dateText: string;
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
    imports: [CommonModule, FormsModule, SidebarComponent],
    templateUrl: './tasks.html',
    styleUrls: ['./tasks.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TasksComponent {
    @ViewChild(SidebarComponent) sidebar!: SidebarComponent;

    // Término de búsqueda
    searchTerm: string = '';

    // Filtros de tareas
    filters: TaskFilter[] = [
        { id: 'all', label: 'Todas', count: 18, active: true },
        { id: 'pending', label: 'Pendientes', count: 8, active: false },
        { id: 'in-progress', label: 'En curso', count: 6, active: false },
        { id: 'completed', label: 'Hechas', count: 4, active: false }
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
            pomodoros: { completed: 3, total: 5 },
            dueDate: 'Vence: 15 Sep',
            dateText: 'Vence: 15 Sep',
            category: 'Diseño',
            progress: 60
        },
        {
            id: '2',
            title: 'Revisar documentación',
            description: 'Analizar y actualizar la documentación técnica del proyecto anterior.',
            status: 'pending',
            priority: 'medium',
            pomodoros: { completed: 0, total: 3 },
            dueDate: 'Vence: 18 Sep',
            dateText: 'Vence: 18 Sep',
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
            dueDate: 'Vence: 25 Sep',
            dateText: 'Vence: 25 Sep',
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
            dueDate: 'Vence: 20 Sep',
            dateText: 'Vence: 20 Sep',
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
            dueDate: 'Completada: 12 Sep',
            dateText: 'Completada: 12 Sep',
            category: 'Reunión',
            progress: 100
        },
        {
            id: '6',
            title: 'Optimizar base de datos',
            description: 'Mejorar consultas SQL y añadir índices para mejor rendimiento.',
            status: 'completed',
            priority: 'medium',
            pomodoros: { completed: 6, total: 6 },
            dueDate: 'Completada: 10 Sep',
            dateText: 'Completada: 10 Sep',
            category: 'Base de datos',
            progress: 100
        },
        {
            id: '7',
            title: 'Configurar CI/CD',
            description: 'Implementar pipeline de integración y despliegue continuo con GitHub Actions.',
            status: 'in-progress',
            priority: 'high',
            pomodoros: { completed: 2, total: 6 },
            dueDate: 'Vence: 22 Sep',
            dateText: 'Vence: 22 Sep',
            category: 'DevOps',
            progress: 33
        },
        {
            id: '8',
            title: 'Crear dashboard analytics',
            description: 'Desarrollar panel de control con métricas y gráficos en tiempo real.',
            status: 'pending',
            priority: 'medium',
            pomodoros: { completed: 0, total: 8 },
            dueDate: 'Vence: 30 Sep',
            dateText: 'Vence: 30 Sep',
            category: 'Frontend',
            progress: 0
        },
        {
            id: '9',
            title: 'Migrar a microservicios',
            description: 'Refactorizar arquitectura monolítica a microservicios con Docker.',
            status: 'pending',
            priority: 'high',
            pomodoros: { completed: 0, total: 12 },
            dueDate: 'Vence: 5 Oct',
            dateText: 'Vence: 5 Oct',
            category: 'Arquitectura',
            progress: 0
        },
        {
            id: '10',
            title: 'Implementar autenticación 2FA',
            description: 'Agregar autenticación de dos factores para mayor seguridad.',
            status: 'in-progress',
            priority: 'high',
            pomodoros: { completed: 1, total: 4 },
            dueDate: 'Vence: 28 Sep',
            dateText: 'Vence: 28 Sep',
            category: 'Seguridad',
            progress: 25
        },
        {
            id: '11',
            title: 'Optimizar imágenes',
            description: 'Comprimir y optimizar todas las imágenes del sitio web.',
            status: 'completed',
            priority: 'low',
            pomodoros: { completed: 2, total: 2 },
            dueDate: 'Completada: 8 Sep',
            dateText: 'Completada: 8 Sep',
            category: 'Performance',
            progress: 100
        },
        {
            id: '12',
            title: 'Documentar API REST',
            description: 'Crear documentación completa de todos los endpoints con Swagger.',
            status: 'pending',
            priority: 'medium',
            pomodoros: { completed: 0, total: 5 },
            dueDate: 'Vence: 2 Oct',
            dateText: 'Vence: 2 Oct',
            category: 'Documentación',
            progress: 0
        },
        {
            id: '13',
            title: 'Configurar monitoreo',
            description: 'Implementar sistema de monitoreo con Grafana y Prometheus.',
            status: 'in-progress',
            priority: 'medium',
            pomodoros: { completed: 3, total: 7 },
            dueDate: 'Vence: 26 Sep',
            dateText: 'Vence: 26 Sep',
            category: 'DevOps',
            progress: 43
        },
        {
            id: '14',
            title: 'Refactorizar componentes',
            description: 'Mejorar estructura y reutilización de componentes React.',
            status: 'pending',
            priority: 'medium',
            pomodoros: { completed: 0, total: 6 },
            dueDate: 'Vence: 3 Oct',
            dateText: 'Vence: 3 Oct',
            category: 'Frontend',
            progress: 0
        },
        {
            id: '15',
            title: 'Implementar cache Redis',
            description: 'Agregar sistema de cache con Redis para mejorar performance.',
            status: 'in-progress',
            priority: 'high',
            pomodoros: { completed: 2, total: 5 },
            dueDate: 'Vence: 24 Sep',
            dateText: 'Vence: 24 Sep',
            category: 'Backend',
            progress: 40
        },
        {
            id: '16',
            title: 'Audit de seguridad',
            description: 'Realizar auditoría completa de seguridad del sistema.',
            status: 'pending',
            priority: 'high',
            pomodoros: { completed: 0, total: 8 },
            dueDate: 'Vence: 1 Oct',
            dateText: 'Vence: 1 Oct',
            category: 'Seguridad',
            progress: 0
        },
        {
            id: '17',
            title: 'Crear app móvil',
            description: 'Desarrollar aplicación móvil nativa con React Native.',
            status: 'pending',
            priority: 'medium',
            pomodoros: { completed: 0, total: 15 },
            dueDate: 'Vence: 10 Oct',
            dateText: 'Vence: 10 Oct',
            category: 'Mobile',
            progress: 0
        },
        {
            id: '18',
            title: 'Configurar backup automático',
            description: 'Implementar sistema de respaldo automático de base de datos.',
            status: 'completed',
            priority: 'high',
            pomodoros: { completed: 3, total: 3 },
            dueDate: 'Completada: 5 Sep',
            dateText: 'Completada: 5 Sep',
            category: 'DevOps',
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

    constructor(private router: Router) { }

    // Navigation method
    onNavigationChange(route: string): void {
        console.log('Navigation to:', route);
        switch (route) {
            case 'focus':
                this.router.navigate(['/dashboard']);
                break;
            case 'statistics':
                this.router.navigate(['/statistics']);
                break;
            case 'tasks':
                // Already on tasks page
                break;
            case 'settings':
                this.router.navigate(['/settings']);
                break;
            default:
            // Stay on current page
        }
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

    // Métodos para la nueva interfaz
    getStatusClass(status: string): string {
        return status;
    }

    getStatusDotClass(status: string): string {
        return status;
    }

    getStatusBadgeClass(status: string): string {
        return status;
    }

    getStatusText(status: string): string {
        switch (status) {
            case 'pending':
                return 'Pendiente';
            case 'in-progress':
                return 'En curso';
            case 'completed':
                return 'Completada';
            default:
                return '';
        }
    }

    getPomodoroIconClass(status: string): string {
        return `pomodoro-icon ${status}`;
    }

    getPomodoroIconColor(status: string): string {
        switch (status) {
            case 'in-progress':
                return '#F66B0E';
            case 'pending':
                return '#9CA3AF';
            case 'completed':
                return '#22C55E';
            default:
                return '#9CA3AF';
        }
    }

    getCategoryClass(category: string): string {
        return category.toLowerCase().replace(/\s+/g, '-');
    }

    getProgressBarClass(status: string): string {
        return status;
    }

    getProgressPercentage(task: Task): number {
        if (task.pomodoros.total === 0) return 0;
        return (task.pomodoros.completed / task.pomodoros.total) * 100;
    }

    getPlayButtonClass(status: string): string {
        return status;
    }

    getPlayButtonColor(status: string): string {
        switch (status) {
            case 'in-progress':
                return '#F66B0E';
            case 'pending':
                return '#9CA3AF';
            default:
                return '#9CA3AF';
        }
    }

    ngAfterViewInit() {
        // Actualizar el estado activo del sidebar
        if (this.sidebar) {
            this.sidebar.setActiveRoute('tasks');
        }
    }
}
