import { Component, ElementRef, ViewChild } from '@angular/core';
import { SingleSpaService } from './services/single-spa.service';
import { ActivatedRoute } from '@angular/router';
import { defer, Observable, shareReplay } from 'rxjs';
import { AppProps } from 'single-spa';


declare let System: any;

const singleSpa$ = defer(() => System.import('single-spa')).pipe(
  shareReplay({ bufferSize: 1, refCount: true }),
);

@Component({
  selector: 'leo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'my-host-app';
  @ViewChild('appContainer', { static: true }) appContainerRef!: ElementRef;
  appName = 'leo-ui';
  mountParcel: AppProps['mountParcel'] | null = null;

  constructor(private singleSpaService: SingleSpaService, private route: ActivatedRoute) { }

  ngOnInit() {
    //this.appName = this.route.snapshot.data.app;
    this.mount();
  }

  mount() {
    this.singleSpaService.mount(this.appName, this.appContainerRef.nativeElement).subscribe();
  }

  unmount(): Observable<unknown> {
    return this.singleSpaService.unmount(this.appName);
  }
}
