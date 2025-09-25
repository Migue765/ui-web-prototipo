import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar';

interface StatMetric {
    icon?: string;
    iconImage?: string;
    iconClass: string;
    title: string;
    value: string;
    change: string;
    changeClass: string;
    subtitle?: string;
    color: string;
}

interface ChartData {
    label: string;
    value: number;
}

@Component({
    selector: 'app-statistics',
    standalone: true,
    imports: [CommonModule, SidebarComponent],
    templateUrl: './statistics.html',
    styleUrl: './statistics.scss'
})
export class StatisticsComponent implements AfterViewInit {
    @ViewChild(SidebarComponent) sidebar!: SidebarComponent;

    // Métricas principales del header
    headerMetrics: StatMetric[] = [
        {
            iconImage: 'assets/images/statistics/clock.png',
            iconClass: 'time-icon',
            title: 'Total Tiempo Enfocado',
            value: '45h 32m',
            change: '+12%',
            changeClass: 'positive',
            color: '#F66B0E'
        },
        {
            iconImage: 'assets/images/statistics/reload.png',
            iconClass: 'cycles-icon',
            title: 'Ciclos Completados',
            value: '127',
            change: '+8%',
            changeClass: 'positive',
            color: '#205375'
        },
        {
            iconImage: 'assets/images/statistics/grafica.png',
            iconClass: 'average-icon',
            title: 'Promedio Diario',
            value: '6h 29m',
            change: '-3%',
            changeClass: 'negative',
            color: '#112B3C'
        },
        {
            iconImage: 'assets/images/statistics/fire.png',
            iconClass: 'streak-icon',
            title: 'Racha Actual',
            value: '14 días',
            change: '+1',
            changeClass: 'positive',
            color: '#EAB308'
        }
    ];

    // Datos para el gráfico de barras "Tiempo por Día"
    dailyTimeData: ChartData[] = [
        { label: 'Lun', value: 6.5 },
        { label: 'Mar', value: 7.2 },
        { label: 'Mié', value: 8.1 },
        { label: 'Jue', value: 5.8 },
        { label: 'Vie', value: 7.5 },
        { label: 'Sáb', value: 4.2 },
        { label: 'Dom', value: 3.8 }
    ];

    // Datos para el gráfico circular "Ratio Enfoque/Descanso"
    focusBreakRatio = {
        focus: 76.8,
        break: 23.2
    };

    // Datos para el gráfico de líneas "Tendencias Semanales"
    weeklyTrendsData: ChartData[] = [
        { label: 'Sem 1', value: 32 },
        { label: 'Sem 2', value: 28 },
        { label: 'Sem 3', value: 35 },
        { label: 'Sem 4', value: 42 }
    ];

    // Cards de productividad
    productivityCards = [
        {
            icon: '📅',
            title: 'Día Más Productivo',
            subtitle: 'Esta semana',
            value: '8h 45m',
            detail: 'Miércoles',
            progress: 85,
            color: '#7ED321'
        },
        {
            icon: '🕐',
            title: 'Hora Más Productiva',
            subtitle: 'Promedio semanal',
            value: '95%',
            detail: '10:00 - 11:00',
            progress: 95,
            color: '#4A90E2'
        }
    ];

    // Análisis de tendencias
    analysisPoints = [
        'Miércoles es tu día más productivo con un promedio de 8 horas de enfoque.',
        'Tu mejor horario de productividad es entre las 9:00 AM y 11:30 AM.',
        'Has mejorado un 23% en tiempo de enfoque comparado con el mes anterior.',
        'Completaste el 67% de tus ciclos planificados esta semana.'
    ];

    constructor(private router: Router) { }

    // Método para calcular la altura de las barras del gráfico
    getBarHeight(value: number): number {
        const maxValue = Math.max(...this.dailyTimeData.map(d => d.value));
        return (value / maxValue) * 100;
    }

    // Método para obtener el ángulo del gráfico circular
    getCircleStrokeDasharray(): string {
        const circumference = 2 * Math.PI * 40; // radio de 40 para coincidir con el HTML
        const focus = (this.focusBreakRatio.focus / 100) * circumference;
        const breakTime = circumference - focus;
        return `${focus} ${breakTime}`;
    }

    // Navigation method
    ngAfterViewInit() {
        // Usar setTimeout para asegurar que el ViewChild esté disponible
        setTimeout(() => {
            if (this.sidebar) {
                this.sidebar.setActiveRoute('statistics');
                console.log('Setting active route to statistics');
            } else {
                console.log('Sidebar not available in statistics component');
            }
        }, 0);
    }

    onNavigationChange(route: string): void {
        console.log('Navigation to:', route);
        switch (route) {
            case 'focus':
                this.router.navigate(['/dashboard']);
                break;
            case 'statistics':
                // Already on statistics page
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
}
