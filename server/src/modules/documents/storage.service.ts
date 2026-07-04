import { storageService as globalStorageService } from "../../shared/services/StorageService";

export interface IStorageService {
  uploadFile(file: Express.Multer.File): Promise<string>;
  deleteFile(fileUrl: string): Promise<void>;
}

export class AppStorageAdapter implements IStorageService {
  async uploadFile(file: Express.Multer.File): Promise<string> {
    const fs = require('fs');
    const buffer = fs.readFileSync(file.path);
    return await globalStorageService.uploadFile(buffer, file.originalname, file.mimetype);
  }

  async deleteFile(fileUrl: string): Promise<void> {
    // S3 delete not implemented in demo yet, mock it
    console.log(`[Storage] Requested to delete ${fileUrl}`);
  }
}

export const storageService = new AppStorageAdapter();
