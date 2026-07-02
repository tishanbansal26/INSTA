import { Request, Response } from 'express';
import { invoicesService } from './service';

export const list = async (req: Request, res: Response) => {
  const data = await invoicesService.list(req.query);
  res.json({ success: true, data });
};

export const getById = async (req: Request, res: Response) => {
  try {
    const data = await invoicesService.getById((req.params.id as string));
    res.json({ success: true, data });
  } catch(e: any) {
    res.status(404).json({ success: false, message: e.message });
  }
};

export const update = async (req: Request, res: Response) => {
  const data = await invoicesService.update((req.params.id as string), req.body);
  res.json({ success: true, data });
};

export const remove = async (req: Request, res: Response) => {
  await invoicesService.remove((req.params.id as string));
  res.json({ success: true, message: 'Deleted' });
};
