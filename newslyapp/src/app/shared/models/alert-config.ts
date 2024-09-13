export class AlertConfig {
    message: string; 
    type: AlertType; 
    duration?: number; 
    icon?: string;

    constructor(message: string, type: AlertType, duration?: number, icon?: string ) {
      this.message = message;
      this.type = type;
      this.duration = duration; 
      this.icon = icon || this.getDefaultIcon(type);
    }

    private getDefaultIcon(type: AlertType): string {
        switch (type) {
          case AlertType.Success:
            return 'assets/img/alert/success.png'; 
          case AlertType.Error:
            return 'assets/img/alert/danger.png'; 
          case AlertType.Warning:
            return 'assets/img/alert/warning.png'; 
          case AlertType.Info:
            return 'assets/img/alert/info.png'; 
        }
      }
}
export enum AlertType{
    Success = 'success',
    Error = 'error',
    Warning = 'warning',
    Info = 'info'
}