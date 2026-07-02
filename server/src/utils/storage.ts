import fs from "fs/promises";
import path from "path";
import { logger } from "./logger";

export interface IStorageService {
  uploadFile(fileBuffer: Buffer, fileName: string, mimeType: string): Promise<string>;
  deleteFile(fileUrl: string): Promise<void>;
}

export class LocalStorageService implements IStorageService {
  private uploadDir = path.join(__dirname, "../../../uploads");

  constructor() {
    this.init();
  }

  private async init() {
    try {
      await fs.mkdir(this.uploadDir, { recursive: true });
    } catch (error) {
      logger.error("Failed to create upload directory", error);
    }
  }

  async uploadFile(fileBuffer: Buffer, fileName: string, _mimeType: string): Promise<string> {
    const uniqueFileName = `${Date.now()}-${fileName}`;
    const filePath = path.join(this.uploadDir, uniqueFileName);
    
    await fs.writeFile(filePath, fileBuffer);
    
    // In production, this would be an S3 or Cloudinary URL
    return `/uploads/${uniqueFileName}`;
  }

  async deleteFile(fileUrl: string): Promise<void> {
    try {
      const fileName = fileUrl.split("/").pop();
      if (!fileName) return;
      const filePath = path.join(this.uploadDir, fileName);
      await fs.unlink(filePath);
    } catch (error) {
      logger.error(`Failed to delete file: ${fileUrl}`, error);
    }
  }
}

// In a real app we could use env.STORAGE_PROVIDER to swap this with S3StorageService
export const storageService: IStorageService = new LocalStorageService();
