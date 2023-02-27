//@ts-nocheck
import { Injectable } from '@angular/core';
import * as Square from '@square/web-sdk';

function window(): Window | any{
  return window;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private scriptLoaded = false;
  private card: Square.Card;

  get nativeWindow(): Window | any{
    return window();
  }

  constructor() { }

  //square payment
  public async init(
    applicationId: string,
    locationId: string,
    cardRef: string | HTMLElement
  ) {
    if (!this.scriptLoaded) {
      await this.loadScript('https://js.squareup.com/v2/paymentform');
      this.scriptLoaded = true;
    }

    const payments = await Square.payments(applicationId, locationId);
    this.card = await payments.card();

    await this.card.attach(cardRef);
  }

  public async tokenize(): Promise<any> {
    return await this.card.tokenize();
  }

  private loadScript(url: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = url;
      script.onload = () => resolve();
      script.onerror = () => reject();
      document.body.appendChild(script);
    });
  }
  
}
