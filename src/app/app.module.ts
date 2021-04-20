import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditorLineComponent } from './editor-line/editor-line.component';
import { EditorNumberColumnComponent } from './editor-number-column/editor-number-column.component';
import { EditorTabItemComponent } from './editor-tabs/component/editor-tab-item.component';
import { EditorTabsComponent } from './editor-tabs/container/editor-tabs.component';
import { EditorScreenComponent } from './editor/component/editor-screen.component';
import { EditorComponent } from './editor/container/editor.component';

@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    EditorScreenComponent,
    EditorLineComponent,
    EditorNumberColumnComponent,
    EditorTabsComponent,
    EditorTabItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
