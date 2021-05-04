import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditorNumberColumnComponent } from './editor-number-column/editor-number-column.component';
import { EditorTabItemComponent } from './editor-tabs/component/editor-tab-item.component';
import { EditorTabsComponent } from './editor-tabs/container/editor-tabs.component';
import { EditorWindowScreenComponent } from './editor-window/component/editor-window-screen.component';
import { EditorWindowComponent } from './editor-window/container/editor-window.component';
import { EditorTabService } from './services/editor-tab/editor-tab.service';
import { UserFileService } from './services/user-file.service';
import { WelcomeWindowComponent } from './welcome-window/container/welcome-window.component';
import { WelcomeWindowScreenComponent } from './welcome-window/component/welcome-window-screen.component';
import { FileExplorer, FileExplorerTree, FileExplorerTreeItem } from './sidebar/file-explorer';

@NgModule({
  declarations: [
    AppComponent,
    EditorWindowComponent,
    EditorWindowScreenComponent,
    EditorNumberColumnComponent,
    EditorTabsComponent,
    EditorTabItemComponent,
    WelcomeWindowComponent,
    WelcomeWindowScreenComponent,
    FileExplorer,
    FileExplorerTree,
    FileExplorerTreeItem,
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
