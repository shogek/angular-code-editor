import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  ActivityBarComponent,
  EmptyFileExplorerComponent,
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
import { KeyboardShortcutsService } from './services/keyboard-shortcuts/keyboard-shortcuts.service';
import { UploadFilesShortcutComponent } from './main-screen/upload-files-shortcut/upload-files-shortcut.component';

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
    EmptyFileExplorerComponent,
    FileExplorerComponent,
    FileExplorerTreeComponent,
    FileExplorerTreeItemComponent,
    StatusBarComponent,
    StatusBarRowComponent,
    SafeHtmlPipe,
    ContextMenuComponent,
    CommandPaletteComponent,
    ActivityBarComponent,
    UploadFilesShortcutComponent,
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
    KeyboardShortcutsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
