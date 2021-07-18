import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  ActivityBarComponent,
  FileExplorerComponent,
  FileExplorerTreeComponent,
  FileExplorerTreeItemComponent,
} from './sidebar';
import {
  EditorLineNumbersComponent,
  EditorTabListComponent,
  EditorTabListItemComponent,
  EditorTabsComponent,
  EditorWindowComponent,
  EditorWindowScreenComponent,
  WelcomeWindowComponent,
  WelcomeWindowScreenComponent,
} from './main-screen';
import { StatusBarComponent, StatusBarRowComponent } from './status-bar';
import { SafeHtmlPipe } from './main-screen/editor-window/component/safe-html.pipe';
import { EditorTabService, EditorThemeService, IconService, StatusBarService, UserFileService } from './services';
import { CommandPaletteComponent, ContextMenuComponent } from './common';
import { DomEventsService } from './services/dom-events/dom-events.service';

@NgModule({
  declarations: [
    AppComponent,
    EditorWindowComponent,
    EditorWindowScreenComponent,
    EditorTabsComponent,
    EditorTabListComponent,
    EditorTabListItemComponent,
    EditorLineNumbersComponent,
    WelcomeWindowComponent,
    WelcomeWindowScreenComponent,
    FileExplorerComponent,
    FileExplorerTreeComponent,
    FileExplorerTreeItemComponent,
    StatusBarComponent,
    StatusBarRowComponent,
    SafeHtmlPipe,
    ContextMenuComponent,
    CommandPaletteComponent,
    ActivityBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    UserFileService,
    EditorTabService,
    StatusBarService,
    EditorThemeService,
    DomEventsService,
    IconService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
