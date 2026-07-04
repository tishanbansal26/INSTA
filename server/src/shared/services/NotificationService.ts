import { EventEmitter } from 'events';

// Basic provider abstractions (could be swapped for Nodemailer, Twilio, etc.)
class EmailProvider {
  async send(to: string, subject: string, html: string) {
    console.log(`[EMAIL SENT] To: ${to} | Subject: ${subject}`);
    // console.log(`Body: ${html}`);
  }
}

class SMSProvider {
  async send(phone: string, message: string) {
    console.log(`[SMS SENT] To: ${phone} | Message: ${message}`);
  }
}

class WhatsAppProvider {
  async send(phone: string, template: string, params: any) {
    console.log(`[WHATSAPP SENT] To: ${phone} | Template: ${template} | Params: ${JSON.stringify(params)}`);
  }
}

class AppNotificationProvider {
  async push(userId: string, title: string, body: string) {
    // In a real app, this might write to a "Notifications" DB table and trigger a WebSocket
    console.log(`[IN-APP NOTIFICATION] User: ${userId} | Title: ${title} | Body: ${body}`);
  }
}

class NotificationService extends EventEmitter {
  private email = new EmailProvider();
  private sms = new SMSProvider();
  private whatsapp = new WhatsAppProvider();
  private app = new AppNotificationProvider();

  constructor() {
    super();
    this.registerListeners();
  }

  private registerListeners() {
    // Event: Policy Issued
    this.on('policy.issued', async (data: { policyId: string, email: string, phone: string, name: string }) => {
      await this.email.send(
        data.email, 
        'Your Insurance Policy has been Issued', 
        `<p>Dear ${data.name}, your policy ${data.policyId} is now active.</p>`
      );
      await this.sms.send(data.phone, `InsureFlow: Your policy ${data.policyId} is now active.`);
      await this.whatsapp.send(data.phone, 'policy_issued', { policyId: data.policyId, name: data.name });
    });

    // Event: Payment Received
    this.on('payment.received', async (data: { amount: number, email: string, phone: string, name: string, receiptUrl?: string }) => {
      await this.email.send(
        data.email,
        'Payment Receipt - InsureFlow',
        `<p>Dear ${data.name}, we received your payment of ₹${data.amount}. ${data.receiptUrl ? `Receipt: ${data.receiptUrl}` : ''}</p>`
      );
    });

    // Event: Claim Status Updated
    this.on('claim.updated', async (data: { claimId: string, status: string, email: string, phone: string }) => {
      await this.email.send(
        data.email,
        `Update on your Claim ${data.claimId}`,
        `<p>Your claim status has been updated to: ${data.status}</p>`
      );
      await this.sms.send(data.phone, `InsureFlow: Claim ${data.claimId} status updated to ${data.status}`);
    });
  }

  // Helper method to emit events strongly-typed
  public notify(event: 'policy.issued' | 'payment.received' | 'claim.updated', payload: any) {
    this.emit(event, payload);
  }
}

export const notificationService = new NotificationService();
