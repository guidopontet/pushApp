import { Injectable } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal/ngx';

@Injectable({
  providedIn: 'root'
})
export class PushService {

  constructor(private oneSignal: OneSignal) { }

  initConfiguration() {
    this.oneSignal.startInit('50d39620-0cc7-4a70-bff8-0ca08954aae0', '289491499609');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

    this.oneSignal.handleNotificationReceived().subscribe((notification) => {
      // do something when notification is received
      console.log(`Notificación recibida`, notification);
    });

    this.oneSignal.handleNotificationOpened().subscribe((notification) => {
      // do something when a notification is opened
      console.log('Notificación abierta', notification);
    });

    this.oneSignal.endInit();
  }
}
