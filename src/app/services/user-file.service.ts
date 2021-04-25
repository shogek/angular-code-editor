import { Injectable } from "@angular/core";
import { UserFile } from "../models/user-file.model";
import { MOCK_USER_FILES } from "../mock-user-files";

@Injectable()
export class UserFileService {
  private files = MOCK_USER_FILES;

  public getAll(): UserFile[] {
    return this.files;
  }

  public remove(fileId: string): void {
    this.files = this.files.filter(file => file.id !== fileId);
  }
}