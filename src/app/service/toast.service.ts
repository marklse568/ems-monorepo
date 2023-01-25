import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Toast, ToastPosition, ToastType } from '../model/Toast';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  $toastState = new BehaviorSubject<Toast>(new Toast(false));

  public show(
    title: string,
    message: string,
    seconds = 5,
    type: ToastType = ToastType.Info,
    position: ToastPosition = ToastPosition.TopRight
  ) {
    const toast = new Toast(true);
    toast.title = title;
    toast.message = message;
    toast.position = position;
    toast.type = type;

    this.$toastState.next(toast);
    setTimeout(() => this.$toastState.next(new Toast(false)), seconds * 1000);
  }
}
