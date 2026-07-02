import { Request, Response } from 'express';
import { aiService } from './ai.service';

export const chat = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: 'Message is required' });
    
    const reply = await aiService.chat(message);
    res.json({ reply });
  } catch (error) {
    res.status(500).json({ error: 'Failed to process chat message' });
  }
};

export const premiumAdvisor = async (req: Request, res: Response) => {
  try {
    const recommendation = await aiService.premiumAdvisor(req.body);
    res.json(recommendation);
  } catch (error) {
    res.status(500).json({ error: 'Failed to process premium advisor' });
  }
};

export const policyComparison = async (req: Request, res: Response) => {
  try {
    const { policies } = req.body;
    const comparison = await aiService.policyComparison(policies || []);
    res.json(comparison);
  } catch (error) {
    res.status(500).json({ error: 'Failed to process policy comparison' });
  }
};
