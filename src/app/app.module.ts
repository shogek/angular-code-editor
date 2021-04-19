import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditorLineComponent } from './editor-line/editor-line.component';
import { EditorNumberColumnComponent } from './editor-number-column/editor-number-column.component';
import { EditorScreenComponent } from './editor/component/editor-screen.component';
import { EditorComponent } from './editor/container/editor.component';

@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    EditorScreenComponent,
    EditorLineComponent,
    EditorNumberColumnComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
