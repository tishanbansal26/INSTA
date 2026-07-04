import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import fs from 'fs';
import path from 'path';

class StorageService {
  private s3Client: S3Client | null = null;
  private bucketName: string;
  private useLocalFallback: boolean;

  constructor() {
    this.bucketName = process.env.AWS_S3_BUCKET || 'insureflow-documents';
    
    // Check if AWS credentials exist
    if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
      this.s3Client = new S3Client({
        region: process.env.AWS_REGION || 'us-east-1',
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        }
      });
      this.useLocalFallback = false;
      console.log('☁️ StorageService initialized with AWS S3');
    } else {
      this.useLocalFallback = true;
      console.warn('⚠️ AWS credentials missing. StorageService falling back to local file system.');
      
      // Ensure local uploads directory exists
      const uploadDir = path.join(process.cwd(), 'uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
    }
  }

  /**
   * Uploads a file buffer and returns the public URL or file path
   */
  async uploadFile(buffer: Buffer, fileName: string, mimeType: string): Promise<string> {
    const key = `${Date.now()}-${fileName.replace(/\\s+/g, '-')}`;

    if (!this.useLocalFallback && this.s3Client) {
      try {
        const command = new PutObjectCommand({
          Bucket: this.bucketName,
          Key: key,
          Body: buffer,
          ContentType: mimeType,
          ACL: 'public-read' // Assuming public read for simple demo purposes, usually should be private with pre-signed URLs
        });
        
        await this.s3Client.send(command);
        return `https://${this.bucketName}.s3.${process.env.AWS_REGION || 'us-east-1'}.amazonaws.com/${key}`;
      } catch (error) {
        console.error('AWS S3 Upload Error:', error);
        throw new Error('Failed to upload file to cloud storage');
      }
    } else {
      // Local fallback
      const filePath = path.join(process.cwd(), 'uploads', key);
      fs.writeFileSync(filePath, buffer);
      return `/uploads/${key}`; // Returns a local path that would be served statically
    }
  }
}

export const storageService = new StorageService();
