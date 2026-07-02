import { Request, Response } from 'express';
import { payoutsService } from './service';

export const list = async (req: Request, res: Response) => {
  const data = await payoutsService.list(req.query);
  res.json({ success: true, data });
};

export const getById = async (req: Request, res: Response) => {
  try {
    const data = await payoutsService.getById((req.params.id as string));
    res.json({ success: true, data });
  } catch(e: any) {
    res.status(404).json({ success: false, message: e.message });
  }
};

export const update = async (req: Request, res: Response) => {
  const data = await payoutsService.update((req.params.id as string), req.body);
  res.json({ success: true, data });
};

export const remove = async (req: Request, res: Response) => {
  await payoutsService.remove((req.params.id as string));
  res.json({ success: true, message: 'Deleted' });
};
