import { Injectable, ApplicationRef } from '@angular/core';
import { OneSignal, OSNotification, OSNotificationPayload } from '@ionic-native/onesignal/ngx';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class PushService {

  MESSAGES_KEY = 'messages';
  messages: OSNotificationPayload[] = [];

  constructor(
    private oneSignal: OneSignal,
    private storage: Storage,
    private aplicationRef: ApplicationRef
  ) {
    this.loadMessages();
  }

  initConfiguration() {
    this.oneSignal.startInit('50d39620-0cc7-4a70-bff8-0ca08954aae0', '289491499609');

    this.oneSignal.inFocusDisplaying( this.oneSignal.OSInFocusDisplayOption.Notification );

    this.oneSignal.handleNotificationReceived().subscribe((notification) => {
      this.notificationReceived(notification);
    });

    this.oneSignal.handleNotificationOpened().subscribe((notification) => {
      // do something when a notification is opened
    });

    this.oneSignal.endInit();
  }

  notificationReceived(notification: any) {
    const payload = notification.payload;
    const existMessage = this.messages.find(m => m.notificationID === payload.notificationID);

    if (!existMessage) {
      this.messages.unshift( payload );
      this.aplicationRef.tick(); // Update view with new messages
      this.saveMessages();
    }
  }

  saveMessages() {
    this.storage.set( this.MESSAGES_KEY, this.messages );
  }

  async loadMessages() {
    this.messages = await this.storage.get( this.MESSAGES_KEY ) || [];
  }
}
