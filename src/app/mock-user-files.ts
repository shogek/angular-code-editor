import { UserFile } from "src/app/models/user-file.model";

const MOCK_USER_FILE_1: UserFile = {
   id: 'id1',
   name: 'user-file.service.ts',
   extension: 'ts',
   contents: `import { Injectable } from "@angular/core";
   import { UserFile } from "../models/user-file.model";
   import { MOCK_USER_FILES } from "../mock-user-files";
   import { BehaviorSubject, Observable } from "rxjs";
   
   @Injectable()
   export class UserFileService {
     private isDummyDataLoaded = false;
     private userFiles$ = new BehaviorSubject<UserFile[]>([]);
     private activeUserFile$ = new BehaviorSubject<UserFile | undefined>(undefined);
   
     public getUserFiles(): Observable<UserFile[]> {
       if (!this.isDummyDataLoaded) {
         this.loadDummyData();
         this.isDummyDataLoaded = true;
       }
   
       return this.userFiles$;
     }
   
     public getActiveFile(): Observable<UserFile | undefined> {
       return this.activeUserFile$;
     }
   
     public setActiveFile(fileId: string): void {
       const userFile = MOCK_USER_FILES.find(x => x.id === fileId);
       this.activeUserFile$.next(userFile);
     }
   
     private loadDummyData() {
       let delayInMs = 100;
       let userFiles: UserFile[] = [];
       
       this.setActiveFile(MOCK_USER_FILES[0].id);
   
       MOCK_USER_FILES.forEach(mockUserFile => {
         setTimeout(
           () => {
             userFiles = [...userFiles, mockUserFile];
             this.userFiles$.next(userFiles)
           },
           delayInMs
         );
         delayInMs += delayInMs;
       });
     }
   }
`
};

const MOCK_USER_FILE_2: UserFile = {
   id: 'id2',
   name: 'app-component.spec.ts',
   extension: 'ts',
   contents: `import { TestBed } from '@angular/core/testing';
   import { RouterTestingModule } from '@angular/router/testing';
   import { AppComponent } from './app.component';
   
   describe('AppComponent', () => {
     beforeEach(async () => {
       await TestBed.configureTestingModule({
         imports: [
           RouterTestingModule
         ],
         declarations: [
           AppComponent
         ],
       }).compileComponents();
     });
   
     it('should create the app', () => {
       const fixture = TestBed.createComponent(AppComponent);
       const app = fixture.componentInstance;
       expect(app).toBeTruthy();
     });
   
     it("should have as title 'code-editor'", () => {
       const fixture = TestBed.createComponent(AppComponent);
       const app = fixture.componentInstance;
       expect(app.title).toEqual('code-editor');
     });
   
     it('should render title', () => {
       const fixture = TestBed.createComponent(AppComponent);
       fixture.detectChanges();
       const compiled = fixture.nativeElement;
       expect(compiled.querySelector('.content span').textContent).toContain('code-editor app is running!');
     });
   });   
`
};

const MOCK_USER_FILE_3: UserFile = {
   id: 'id3',
   name: 'editor-tab-item.component.scss',
   extension: 'scss',
   contents: `.wrapper {
      background-color: var(--editor-tab-bg-color);
      border-style: solid;
      border-width: 1px;
      border-color: var(--editor-tab-border-color);
      color: var(--editor-tab-text-color);
    
      &:hover {
        cursor: pointer;
        background-color: var(--editor-tab-bg-active-color);
      }
    
      &.active {
        background-color: var(--editor-tab-bg-active-color);
        border-bottom-color: var(--editor-tab-bg-active-color);
        border-top-color: var(--editor-tab-border-active-color);
        color: var(--editor-tab-text-active-color);
      }
    
      p {
        margin: 0;
        padding: 0.7rem;
      }
    }
`
};

const MOCK_USER_FILE_4: UserFile = {
   id: 'id4',
   name: 'test.ts',
   extension: 'ts',
   contents: `// This file is required by karma.conf.js and loads recursively all the .spec and framework files

   import 'zone.js/dist/zone-testing';
   import { getTestBed } from '@angular/core/testing';
   import {
     BrowserDynamicTestingModule,
     platformBrowserDynamicTesting
   } from '@angular/platform-browser-dynamic/testing';
   
   declare const require: {
     context(path: string, deep?: boolean, filter?: RegExp): {
       keys(): string[];
       <T>(id: string): T;
     };
   };
   
   // First, initialize the Angular testing environment.
   getTestBed().initTestEnvironment(
     BrowserDynamicTestingModule,
     platformBrowserDynamicTesting()
   );
   // Then we find all the tests.
   const context = require.context('./', true, /\.spec\.ts$/);
   // And load the modules.
   context.keys().map(context);   
`
};

const MOCK_USER_FILE_5: UserFile = {
   id: 'id5',
   name: 'index.html',
   extension: 'html',
   contents: `<!doctype html>
   <html lang="en">
   <head>
     <meta charset="utf-8">
     <title>CodeEditor</title>
     <base href="/">
     <meta name="viewport" content="width=device-width, initial-scale=1">
     <link rel="icon" type="image/x-icon" href="favicon.ico">
   </head>
   <body>
     <app-root></app-root>
   </body>
   </html>   
`
};

const MOCK_USER_FILE_6: UserFile = {
   id: 'id6',
   name: 'HelloWorld6.cs',
   extension: 'cs',
   contents: `namespace HelloWorld6
{
   class Hello6 {         
      static void Main(string[] args)
      {
         System.Console.WriteLine("Hello World6!");
         
         // dynamically load assembly from file Test.dll
         Assembly testAssembly = Assembly.LoadFile(@"c:\Test6.dll");

         // get type of class Calculator from just loaded assembly
         Type calcType = testAssembly.GetType("Test.Calculator");

         // create instance of class Calculator
         object calcInstance = Activator.CreateInstance(calcType);

         // get info about property: public double Number
         PropertyInfo numberPropertyInfo = calcType.GetProperty("Number");

         // get value of property: public double Number
         double value = (double)numberPropertyInfo.GetValue(calcInstance, null);

         // set value of property: public double Number
         numberPropertyInfo.SetValue(calcInstance, 10.0, null);

         // get info about static property: public static double Pi
         PropertyInfo piPropertyInfo = calcType.GetProperty("Pi");
      }
   }
}
`
};

export const MOCK_USER_FILES: UserFile[] = [
   MOCK_USER_FILE_1,
   MOCK_USER_FILE_2,
   MOCK_USER_FILE_3,
   MOCK_USER_FILE_4,
   MOCK_USER_FILE_5,
   MOCK_USER_FILE_6,
];