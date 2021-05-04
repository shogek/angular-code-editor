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
import { SidebarFileTreeComponent } from './sidebar/sidebar-file-tree/container/sidebar-file-tree.component';
import { SidebarFileTreeListComponent } from './sidebar/sidebar-file-tree/component/sidebar-file-tree-list.component';
import { FolderComponent } from './sidebar/sidebar-file-tree/component/folder/folder.component';

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
    SidebarFileTreeComponent,
    SidebarFileTreeListComponent,
    FolderComponent,
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
