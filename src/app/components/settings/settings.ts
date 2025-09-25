import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar';

@Component({
    selector: 'app-settings',
    standalone: true,
    imports: [CommonModule, FormsModule, SidebarComponent],
    templateUrl: './settings.html',
    styleUrl: './settings.scss'
})
export class SettingsComponent implements AfterViewInit {
    @ViewChild(SidebarComponent) sidebar!: SidebarComponent;

    // Sección activa
    activeSection: string = 'general';

    // Configuración de Pomodoro
    focusTime: number = 25;
    shortBreak: number = 5;
    longBreak: number = 15;
    strictMode: boolean = true;

    // Configuración de Notificaciones
    pushNotifications: boolean = true;
    soundAlerts: boolean = true;
    vibration: boolean = false;

    // Configuración de Apariencia
    selectedTheme: string = 'light';

    constructor(private router: Router) { }

    ngAfterViewInit() {
        // Actualizar el estado activo del sidebar
        if (this.sidebar) {
            this.sidebar.setActiveRoute('settings');
        }
    }

    // Navegación del sidebar principal
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
                this.router.navigate(['/tasks']);
                break;
            case 'settings':
                // Ya estamos en la página de configuración
                break;
            default:
                console.log('Ruta no reconocida:', route);
        }
    }

    // Cambiar sección activa
    setActiveSection(section: string): void {
        this.activeSection = section;
        console.log('Sección activa cambiada a:', section);
    }

    // Acciones de configuración
    saveSettings(): void {
        const settings = {
            pomodoro: {
                focusTime: this.focusTime,
                shortBreak: this.shortBreak,
                longBreak: this.longBreak,
                strictMode: this.strictMode
            },
            notifications: {
                pushNotifications: this.pushNotifications,
                soundAlerts: this.soundAlerts,
                vibration: this.vibration
            },
            appearance: {
                theme: this.selectedTheme
            }
        };

        console.log('Guardando configuración:', settings);

        // Aquí iría la lógica para guardar en localStorage o enviar al backend
        localStorage.setItem('focusSettings', JSON.stringify(settings));

        // Mostrar mensaje de éxito (temporalmente con console.log)
        console.log('Configuración guardada exitosamente');

        // TODO: Mostrar notificación toast de éxito
    }

    resetSettings(): void {
        console.log('Restableciendo configuración a valores por defecto');

        // Restablecer valores por defecto
        this.focusTime = 25;
        this.shortBreak = 5;
        this.longBreak = 15;
        this.strictMode = true;
        this.pushNotifications = true;
        this.soundAlerts = true;
        this.vibration = false;
        this.selectedTheme = 'light';

        // Limpiar localStorage
        localStorage.removeItem('focusSettings');

        console.log('Configuración restablecida');
        // TODO: Mostrar notificación toast de restablecimiento
    }

    // Acciones de cuenta
    changePassword(): void {
        console.log('Cambiar contraseña');
        // TODO: Implementar modal o navegación para cambio de contraseña
    }

    logout(): void {
        console.log('Cerrando sesión');

        // Limpiar datos de sesión
        localStorage.removeItem('focusSettings');
        localStorage.removeItem('userSession');

        // Navegar a la página de login
        this.router.navigate(['/login']);
    }

    // Cargar configuración guardada
    private loadSavedSettings(): void {
        const savedSettings = localStorage.getItem('focusSettings');
        if (savedSettings) {
            try {
                const settings = JSON.parse(savedSettings);

                // Cargar configuración de Pomodoro
                if (settings.pomodoro) {
                    this.focusTime = settings.pomodoro.focusTime || 25;
                    this.shortBreak = settings.pomodoro.shortBreak || 5;
                    this.longBreak = settings.pomodoro.longBreak || 15;
                    this.strictMode = settings.pomodoro.strictMode !== undefined ? settings.pomodoro.strictMode : true;
                }

                // Cargar configuración de Notificaciones
                if (settings.notifications) {
                    this.pushNotifications = settings.notifications.pushNotifications !== undefined ? settings.notifications.pushNotifications : true;
                    this.soundAlerts = settings.notifications.soundAlerts !== undefined ? settings.notifications.soundAlerts : true;
                    this.vibration = settings.notifications.vibration !== undefined ? settings.notifications.vibration : false;
                }

                // Cargar configuración de Apariencia
                if (settings.appearance) {
                    this.selectedTheme = settings.appearance.theme || 'light';
                }

                console.log('Configuración cargada desde localStorage:', settings);
            } catch (error) {
                console.error('Error al cargar configuración guardada:', error);
            }
        }
    }

    ngOnInit(): void {
        this.loadSavedSettings();
    }

    // Métodos auxiliares para validación
    private validateTimeRange(value: number, min: number, max: number): number {
        return Math.max(min, Math.min(max, value));
    }

    // Watchers para validar rangos de tiempo
    onFocusTimeChange(): void {
        this.focusTime = this.validateTimeRange(this.focusTime, 15, 60);
    }

    onShortBreakChange(): void {
        this.shortBreak = this.validateTimeRange(this.shortBreak, 3, 15);
    }

    onLongBreakChange(): void {
        this.longBreak = this.validateTimeRange(this.longBreak, 10, 30);
    }
}
