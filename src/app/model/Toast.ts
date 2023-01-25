export class Toast {
  public visible: boolean;

  public title = '';
  public message = '';
  public position: ToastPosition;
  public type: ToastType;

  constructor(visible: boolean) {
    this.visible = visible;

    this.type = ToastType.Info;
    this.position = ToastPosition.TopRight;
  }
}

export enum ToastPosition {
  TopRight = 'position-top-right',
  TopLeft = 'position-top-left',
  BottomRight = 'position-bottom-right',
  Center = 'position-center',
}

export enum ToastType {
  Success = 'success',
  Warning = 'warning',
  Danger = 'danger',
  Info = 'info',
  None = 'none',
}
