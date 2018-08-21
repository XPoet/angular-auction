import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {FooterComponent} from './components/footer/footer.component';
import {SearchComponent} from './components/search/search.component';
import {CarouselComponent} from './components/carousel/carousel.component';
import {ProductComponent} from './components/product/product.component';
import {StarsComponent} from './components/stars/stars.component';
import {ProductDetailComponent} from './components/product-detail/product-detail.component';
import {HomeComponent} from './components/home/home.component';
import {RouterModule, Routes} from '@angular/router';
import {ProductService} from './services/product.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {FilterPipe} from './pipes/filter.pipe';
import {WebsocketComponent} from './components/websocket/websocket.component';
import {WebSocketService} from './services/web-socket.service';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';

const routeConfig: Routes = [
  {path: '', component: HomeComponent},
  {path: 'product/:productId', component: ProductDetailComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SearchComponent,
    CarouselComponent,
    ProductComponent,
    StarsComponent,
    ProductDetailComponent,
    HomeComponent,
    FilterPipe,
    WebsocketComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routeConfig)
  ],
  providers: [
    ProductService,
    WebSocketService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
    ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
