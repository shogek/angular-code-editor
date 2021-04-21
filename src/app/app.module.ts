import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditorNumberColumnComponent } from './editor-number-column/editor-number-column.component';
import { EditorTabItemComponent } from './editor-tabs/component/editor-tab-item.component';
import { EditorTabsComponent } from './editor-tabs/container/editor-tabs.component';
import { EditorWindowScreenComponent } from './editor-window/component/editor-window-screen.component';
import { EditorWindowComponent } from './editor-window/container/editor-window.component';
import { UserFileService } from './services/user-file.service';

@NgModule({
  declarations: [
    AppComponent,
    EditorWindowComponent,
    EditorWindowScreenComponent,
    EditorNumberColumnComponent,
    EditorTabsComponent,
    EditorTabItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [UserFileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
