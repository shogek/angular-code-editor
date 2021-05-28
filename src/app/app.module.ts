import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditorTabService } from './services/editor-tab/editor-tab.service';
import { UserFileService } from './services/user-file/user-file.service';
import { FileExplorer, FileExplorerTree, FileExplorerTreeItem } from './sidebar';
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
    FileExplorer,
    FileExplorerTree,
    FileExplorerTreeItem,
    StatusBarComponent,
    StatusBarRowComponent,
    SafeHtmlPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    UserFileService,
    EditorTabService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
