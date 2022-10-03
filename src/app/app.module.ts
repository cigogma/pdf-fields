import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PdfViewerModule } from 'lib/ng2-pdf-viewer/public_api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './pages/index/index.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [AppComponent, IndexComponent],
  imports: [PdfViewerModule, DragDropModule, BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
