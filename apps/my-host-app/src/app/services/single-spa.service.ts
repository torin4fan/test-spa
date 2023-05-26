import { Injectable } from '@angular/core';
import { defer, from, Observable, shareReplay, tap } from 'rxjs';
import { mountRootParcel, Parcel, ParcelConfig } from 'single-spa';

const singleSpa$ = defer(() => System.import('single-spa')).pipe(
  shareReplay({ bufferSize: 1, refCount: true }),
);

@Injectable({
  providedIn: 'root'
})
export class SingleSpaService {
  private loadedParcels: {
    [appName: string]: Parcel;
  } = {};

  mount(appName: string, domElement: HTMLElement) {
    return from(System.import<ParcelConfig>(appName)).pipe(
      tap((app: ParcelConfig) => {
        this.loadedParcels[appName] = mountRootParcel(app, {
          domElement
        });
      })
    );
    /*singleSpa$.subscribe(response => {
      console.log(response, 'response');
    })*/
    //from(System.import<ParcelConfig>(appName))
    /*return from(System.import<ParcelConfig>(appName)).pipe(
      tap((app: ParcelConfig) => {
        this.loadedParcels[appName] = mountRootParcel(app, {
          domElement
        });
      })
    );*/
  }

  mount2(appName: string,) {
    return from(System.import<ParcelConfig>(appName))
  }

  unmount(appName: string): Observable<unknown> {
    return from(this.loadedParcels[appName].unmount()).pipe(
      tap(() => delete this.loadedParcels[appName])
    );
  }
}
