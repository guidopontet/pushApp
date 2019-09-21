import { Injectable } from '@angular/core';
import { OneSignal, OSNotification } from '@ionic-native/onesignal/ngx';

@Injectable({
  providedIn: 'root'
})
export class PushService {

  messages: any[] = [{
    title: 'Titulo',
    body: 'Cuerpo del mensaje',
    date: new Date(),
  }];

  constructor(private oneSignal: OneSignal) { }

  initConfiguration() {
    this.oneSignal.startInit('50d39620-0cc7-4a70-bff8-0ca08954aae0', '289491499609');

    this.oneSignal.inFocusDisplaying( this.oneSignal.OSInFocusDisplayOption.Notification );

    this.oneSignal.handleNotificationReceived().subscribe((notification) => {
      this.notificationReceived(notification);
    });

    this.oneSignal.handleNotificationOpened().subscribe((notification) => {
      // do something when a notification is opened
      console.log('Notificación abierta', notification);
    });

    this.oneSignal.endInit();
  }

  notificationReceived(notification: OSNotification) {
    const payload = notification.payload;
    const existMessage = this.messages.find(m => m.notificationId === payload.notificationID);

    if (!existMessage) {
      this.messages.unshift( payload );
    }
  }
}
