import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Toast } from '../model/Toast';
import { ToastService } from '../service/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
})
export class ToastComponent implements OnDestroy {
  public toast: Toast = new Toast(true);

  private $subscriptions: Subscription;

  constructor(private toaster: ToastService) {
    this.$subscriptions = this.toaster.$toastState.subscribe(
      (toastModel: Toast) => {
        this.toast = toastModel;
      }
    );
  }

  close(): void {
    this.toast.visible = false;
  }

  ngOnDestroy(): void {
    this.$subscriptions.unsubscribe();
  }
}
