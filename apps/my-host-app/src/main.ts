import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { start as singleSpaStart } from 'single-spa';
import { getSingleSpaExtraProviders } from 'single-spa-angular';
import { NgZone } from '@angular/core';

singleSpaStart();

/*
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
*/

const appId = 'container-app';


platformBrowserDynamic(getSingleSpaExtraProviders()).bootstrapModule(AppModule)
  .then(module => {
    NgZone.isInAngularZone = () => {

      // @ts-ignore
      return window.Zone.current._properties[appId] === true;
    };

    const rootZone = module.injector.get(NgZone);

    // @ts-ignore
    rootZone['_inner']._properties[appId] = true;
  })
  .catch(err => console.error(err));
/*
import { registerApplication, start } from 'single-spa';

function loadScript(path: string) {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = path;
    script.addEventListener('load', resolve);
    document.head.appendChild(script);
  });
}

registerApplication({
  name: 'leo-ui',
  app: () =>
    loadScript('http://localhost:4202/main.js').then(() => (window as any)['leo-ui']),
  activeWhen: () => true,
});

start();*/
