import { useState, useEffect } from 'react';
import { 
  Wallet, IndianRupee, CreditCard, Clock, Download, 
  Settings, ArrowRight, Landmark, Smartphone, 
  CheckCircle2, Mail, Loader2
} from 'lucide-react';
import { usePayments, usePaymentMutations } from '@/hooks/usePayments';
import { SkeletonLoader } from '@/components/shared/SkeletonLoader';
import { ErrorState } from '@/components/shared/ErrorState';
import { EmptyState } from '@/components/shared/EmptyState';
import { format } from 'date-fns';

// Add Razorpay to window object
declare global {
  interface Window {
    Razorpay: any;
  }
}

export const MyWallet = () => {
  const [activeTab, setActiveTab] = useState('transactions');
  const { data: paymentsData, isLoading, isError, refetch } = usePayments({ limit: 20 });
  const { data: pendingPayments } = usePayments({ paymentStatus: 'PENDING', limit: 1 });
  const { createOrder, verifyPayment, isCreatingOrder, isVerifying } = usePaymentMutations();

  const nextDue = pendingPayments?.items?.[0];

  // Load Razorpay Script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);

  const handlePayment = async () => {
    if (!nextDue) return;

    try {
      // 1. Create order on our backend
      const orderData = await createOrder({ 
        amount: nextDue.amount, 
        receipt: nextDue.id 
      });

      // 2. Open Razorpay Checkout
      const options = {
        key: 'rzp_test_dummykey123', // Dummy test key for now
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'InsureFlow Pro',
        description: `Premium Payment for ${nextDue.policy?.policyNumber || nextDue.id}`,
        order_id: orderData.id,
        handler: async (response: any) => {
          // 3. Verify payment on our backend
          await verifyPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            paymentId: nextDue.id
          });
        },
        prefill: {
          name: nextDue.policy?.client?.firstName || 'Customer',
          email: 'customer@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#3b82f6' // Primary color
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response: any){
        console.error("Payment failed", response.error);
      });
      rzp.open();
    } catch (error) {
      console.error("Payment initiation failed", error);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text flex items-center gap-2">
            <Wallet className="w-6 h-6 text-primary" /> Finance Center
          </h1>
          <p className="text-text-secondary mt-1">Manage payments, auto-pay, and view receipts.</p>
        </div>
      </div>

      {/* Finance KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-surface border border-border rounded-xl p-5 relative overflow-hidden">
          <span className="text-xs font-medium text-text-secondary block mb-1">Premium Due</span>
          <h3 className="text-xl font-bold text-orange-500">₹15,000</h3>
        </div>
        <div className="bg-surface border border-border rounded-xl p-5 relative overflow-hidden">
          <span className="text-xs font-medium text-text-secondary block mb-1">Premium Paid</span>
          <h3 className="text-xl font-bold text-text">₹45,200</h3>
        </div>
        <div className="bg-surface border border-border rounded-xl p-5 relative overflow-hidden">
          <span className="text-xs font-medium text-text-secondary block mb-1">Refunds</span>
          <h3 className="text-xl font-bold text-text">₹0</h3>
        </div>
        <div className="bg-surface border border-border rounded-xl p-5 relative overflow-hidden">
          <span className="text-xs font-medium text-text-secondary block mb-1">Claim Settlement</span>
          <h3 className="text-xl font-bold text-green-500">₹1,50,000</h3>
        </div>
        <div className="bg-primary/10 border border-primary/20 rounded-xl p-5 relative overflow-hidden">
          <span className="text-xs font-medium text-primary block mb-1">Wallet Balance</span>
          <h3 className="text-xl font-bold text-primary">₹0</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column - Main Action Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-surface border border-border rounded-xl overflow-hidden h-full flex flex-col">
            <div className="flex border-b border-border bg-background/50">
              <button 
                onClick={() => setActiveTab('transactions')}
                className={`px-6 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'transactions' ? 'border-primary text-primary' : 'border-transparent text-text-secondary hover:text-text'}`}
              >
                Transaction History
              </button>
              <button 
                onClick={() => setActiveTab('payment_methods')}
                className={`px-6 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'payment_methods' ? 'border-primary text-primary' : 'border-transparent text-text-secondary hover:text-text'}`}
              >
                Payment Methods
              </button>
            </div>

            <div className="flex-1 p-0 overflow-y-auto bg-background">
              {activeTab === 'transactions' && (
                <div className="animate-in fade-in duration-300">
                  {isLoading ? (
                    <div className="p-6"><SkeletonLoader text="Loading transactions..." /></div>
                  ) : isError ? (
                    <div className="p-6"><ErrorState title="Failed to load payments" onRetry={refetch} /></div>
                  ) : !paymentsData?.items || paymentsData.items.length === 0 ? (
                    <div className="p-6"><EmptyState title="No transactions" description="You have no payment history yet." /></div>
                  ) : (
                    <table className="w-full text-left text-sm">
                      <thead className="bg-surface text-text-secondary border-b border-border">
                        <tr>
                          <th className="px-6 py-4 font-medium">Date</th>
                          <th className="px-6 py-4 font-medium">Description</th>
                          <th className="px-6 py-4 font-medium">Amount</th>
                          <th className="px-6 py-4 font-medium">Status</th>
                          <th className="px-6 py-4 font-medium text-right">Receipt</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {paymentsData.items.map((payment: any) => (
                          <tr key={payment.id} className="hover:bg-surface/50 transition-colors">
                            <td className="px-6 py-4 text-text-secondary">{format(new Date(payment.createdAt), 'dd MMM yyyy')}</td>
                            <td className="px-6 py-4">
                              <p className="font-medium text-text">{payment.paymentMode || 'Payment'}</p>
                              <p className="text-xs text-text-secondary">{payment.policy?.policyNumber || payment.id}</p>
                            </td>
                            <td className="px-6 py-4 font-bold text-text">₹{payment.amount}</td>
                            <td className="px-6 py-4">
                              <span className={`px-2 py-1 text-xs font-bold rounded-full border flex items-center gap-1 w-max ${
                                payment.paymentStatus === 'SUCCESS' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 
                                payment.paymentStatus === 'PENDING' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' :
                                'bg-red-500/10 text-red-500 border-red-500/20'
                              }`}>
                                {payment.paymentStatus === 'SUCCESS' && <CheckCircle2 className="w-3 h-3" />}
                                {payment.paymentStatus}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              {payment.paymentStatus === 'SUCCESS' && (
                                <div className="flex justify-end gap-2">
                                  <button className="p-2 bg-background border border-border rounded hover:text-primary transition-colors" title="Download PDF"><Download className="w-4 h-4" /></button>
                                  <button className="p-2 bg-background border border-border rounded hover:text-primary transition-colors" title="Email Receipt"><Mail className="w-4 h-4" /></button>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}

              {activeTab === 'payment_methods' && (
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-300">
                  
                  {/* Credit Card */}
                  <div className="p-5 border border-border rounded-xl bg-gradient-to-br from-surface to-background relative overflow-hidden group hover:border-primary/50 transition-colors">
                    <div className="flex justify-between items-start mb-6 relative z-10">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-text-secondary" />
                        <span className="font-bold text-text">HDFC Bank Credit Card</span>
                      </div>
                      <span className="px-2 py-1 bg-green-500/10 text-green-500 text-[10px] font-bold rounded uppercase tracking-wider">Default</span>
                    </div>
                    <div className="relative z-10">
                      <p className="font-mono text-lg text-text tracking-widest mb-1">•••• •••• •••• 4242</p>
                      <p className="text-sm text-text-secondary">Expires 12/28</p>
                    </div>
                  </div>

                  {/* UPI */}
                  <div className="p-5 border border-border rounded-xl bg-gradient-to-br from-surface to-background relative overflow-hidden group hover:border-primary/50 transition-colors">
                    <div className="flex justify-between items-start mb-6 relative z-10">
                      <div className="flex items-center gap-2">
                        <Smartphone className="w-5 h-5 text-text-secondary" />
                        <span className="font-bold text-text">UPI ID</span>
                      </div>
                    </div>
                    <div className="relative z-10">
                      <p className="font-mono text-lg text-text mb-1">tishan.admin@okhdfcbank</p>
                      <p className="text-sm text-text-secondary">Verified</p>
                    </div>
                  </div>

                  <button className="p-5 border border-dashed border-border rounded-xl bg-background/50 hover:bg-surface hover:border-primary/50 transition-colors flex flex-col items-center justify-center text-text-secondary hover:text-primary min-h-[140px]">
                    <span className="text-2xl mb-2">+</span>
                    <span className="font-medium text-sm">Add Payment Method</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - AutoPay & Reminders */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-gradient-to-br from-primary/10 to-background border border-primary/20 rounded-xl p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-text">AutoPay Settings</h3>
              </div>
              <div className="w-10 h-5 bg-primary rounded-full relative cursor-pointer">
                <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 right-0.5 shadow"></div>
              </div>
            </div>
            <p className="text-sm text-text-secondary mb-4">AutoPay is currently active. Your premiums will be automatically deducted from your default HDFC Credit Card 3 days before the due date.</p>
            <button className="w-full py-2 bg-background border border-border rounded-lg text-sm font-medium text-text hover:border-primary transition-colors">
              Manage AutoPay
            </button>
          </div>

          {nextDue ? (
            <div className="bg-orange-500/5 border border-orange-500/20 rounded-xl p-6">
              <h3 className="font-bold text-orange-500 flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5" /> Next Premium Due
              </h3>
              <p className="text-3xl font-black text-text my-2">₹{nextDue.amount}</p>
              <p className="text-sm text-text-secondary">
                {nextDue.policy?.policyNumber || nextDue.id}<br/>
                Due on {format(new Date(nextDue.createdAt), 'dd MMM yyyy')}
              </p>
              <button 
                onClick={handlePayment}
                disabled={isCreatingOrder || isVerifying}
                className="w-full mt-4 py-2.5 bg-orange-500 text-white font-bold rounded-lg shadow-lg shadow-orange-500/20 hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
              >
                {(isCreatingOrder || isVerifying) ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                {isVerifying ? 'Verifying...' : 'Pay Now'}
              </button>
            </div>
          ) : (
            <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-6 text-center">
              <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto mb-3" />
              <h3 className="font-bold text-green-500 mb-1">All Caught Up!</h3>
              <p className="text-sm text-text-secondary">You have no pending premium payments.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
