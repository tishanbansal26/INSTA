import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiClient as api } from '../../../services/apiClient';
import { Button } from '../../../components/ui/button';
import { ArrowLeft, FileText, Activity, MessageSquare, Banknote, CheckCircle, Clock } from 'lucide-react';
import { format } from 'date-fns';

export function ClaimDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [claim, setClaim] = useState<any>(null);
  const [timeline, setTimeline] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('TIMELINE');
  const [noteMsg, setNoteMsg] = useState('');

  const fetchClaim = useCallback(async () => {
    try {
      const [claimRes, timelineRes] = await Promise.all([
        api.get(`/claims/${id}`),
        api.get(`/claims/${id}/timeline`)
      ]);
      setClaim(claimRes.data);
      setTimeline(timelineRes.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchClaim();
  }, [fetchClaim]);

  const toggleChecklist = async (itemId: string, currentStatus: boolean) => {
    try {
      await api.patch(`/claims/${id}/checklist/${itemId}`, { isUploaded: !currentStatus });
      fetchClaim();
    } catch (error) {
      console.error(error);
    }
  };

  const postNote = async () => {
    if (!noteMsg.trim()) return;
    try {
      await api.post(`/claims/${id}/notes`, { message: noteMsg });
      setNoteMsg('');
      fetchClaim();
    } catch (error) {
      console.error(error);
    }
  };

  const updateStatus = async (status: string) => {
    try {
      await api.post(`/claims/${id}/status`, { status });
      fetchClaim();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div className="p-10 text-center text-text-muted">Loading claim details...</div>;
  if (!claim) return <div className="p-10 text-center text-danger">Claim not found.</div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => navigate('/claims')} className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-text">{claim.claimNumber}</h1>
            <p className="text-text-muted">
              {claim.client.firstName} {claim.client.lastName} • {claim.claimType} • ₹{claim.claimAmount}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <span className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm font-semibold">
            {claim.status.replace(/_/g, ' ')}
          </span>
          <span className="px-3 py-1 bg-warning text-warning-foreground rounded-full text-sm font-semibold">
            {claim.priority} PRIORITY
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-card p-1 rounded-lg border border-border">
        {['TIMELINE', 'DOCUMENTS', 'NOTES', 'SETTLEMENT'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === tab ? 'bg-primary text-primary-foreground shadow' : 'text-text-muted hover:bg-background'
            }`}
          >
            {tab === 'TIMELINE' && <Activity className="inline-block mr-2 h-4 w-4" />}
            {tab === 'DOCUMENTS' && <FileText className="inline-block mr-2 h-4 w-4" />}
            {tab === 'NOTES' && <MessageSquare className="inline-block mr-2 h-4 w-4" />}
            {tab === 'SETTLEMENT' && <Banknote className="inline-block mr-2 h-4 w-4" />}
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-card border border-border rounded-xl p-6 min-h-[400px]">
        
        {activeTab === 'TIMELINE' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-text">Claim Lifecycle</h3>
            <div className="relative border-l-2 border-border ml-3 space-y-8">
              {timeline.map((log) => (
                <div key={log.id} className="relative pl-6">
                  <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-primary ring-4 ring-card" />
                  <p className="text-sm font-semibold text-text">{log.action}</p>
                  <p className="text-sm text-text-muted">{log.description}</p>
                  <p className="text-xs text-text-muted/70 mt-1">{format(new Date(log.createdAt), 'PPpp')}</p>
                </div>
              ))}
            </div>
            
            <div className="pt-6 border-t border-border flex space-x-3">
              <Button onClick={() => updateStatus('DOCUMENTS_VERIFIED')} variant="secondary">Verify Documents</Button>
              <Button onClick={() => updateStatus('APPROVED')} className="bg-success text-success-foreground hover:bg-success/90">Approve Claim</Button>
              <Button onClick={() => updateStatus('REJECTED')} variant="destructive">Reject</Button>
            </div>
          </div>
        )}

        {activeTab === 'DOCUMENTS' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-text">Required Documents Checklist</h3>
            <div className="grid grid-cols-2 gap-4">
              {claim.checklists.map((item: any) => (
                <div key={item.id} className="flex items-center justify-between p-4 border border-border rounded-lg bg-background">
                  <div className="flex items-center space-x-3">
                    {item.isUploaded ? (
                      <CheckCircle className="h-5 w-5 text-success" />
                    ) : (
                      <Clock className="h-5 w-5 text-warning" />
                    )}
                    <span className={`font-medium ${item.isUploaded ? 'text-text' : 'text-text-muted'}`}>
                      {item.documentName}
                    </span>
                  </div>
                  <Button 
                    variant={item.isUploaded ? "ghost" : "outline"}
                    size="sm"
                    onClick={() => toggleChecklist(item.id, item.isUploaded)}
                  >
                    {item.isUploaded ? 'Mark Missing' : 'Mark Uploaded'}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'NOTES' && (
          <div className="flex flex-col h-[400px]">
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {claim.notes.length === 0 ? (
                <div className="text-center text-text-muted py-10">No internal notes yet.</div>
              ) : (
                claim.notes.map((note: any) => (
                  <div key={note.id} className="bg-background border border-border p-3 rounded-lg w-[80%]">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-sm text-text">{note.user?.name || 'System'}</span>
                      <span className="text-xs text-text-muted">{format(new Date(note.createdAt), 'PP p')}</span>
                    </div>
                    <p className="text-sm text-text-muted">{note.message}</p>
                  </div>
                ))
              )}
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                value={noteMsg}
                onChange={(e) => setNoteMsg(e.target.value)}
                placeholder="Type an internal note..."
                className="flex-1 rounded-md border border-border bg-background px-4 py-2 text-sm text-text focus:outline-none focus:ring-1 focus:ring-primary"
                onKeyDown={(e) => e.key === 'Enter' && postNote()}
              />
              <Button onClick={postNote}>Send</Button>
            </div>
          </div>
        )}

        {activeTab === 'SETTLEMENT' && (
          <div className="space-y-6 max-w-2xl">
            {claim.settlement ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-success mb-6">
                  <CheckCircle className="h-6 w-6" />
                  <h3 className="text-xl font-semibold">Settlement Completed</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><p className="text-sm text-text-muted">Amount Settled</p><p className="font-medium text-text">₹{claim.settlement.amount}</p></div>
                  <div><p className="text-sm text-text-muted">Payment Date</p><p className="font-medium text-text">{format(new Date(claim.settlement.paymentDate), 'PP')}</p></div>
                  <div><p className="text-sm text-text-muted">Bank Name</p><p className="font-medium text-text">{claim.settlement.bankName}</p></div>
                  <div><p className="text-sm text-text-muted">Account Holder</p><p className="font-medium text-text">{claim.settlement.accountHolder}</p></div>
                  <div><p className="text-sm text-text-muted">Account Number</p><p className="font-medium text-text">{claim.settlement.accountNumber}</p></div>
                  <div><p className="text-sm text-text-muted">IFSC</p><p className="font-medium text-text">{claim.settlement.ifsc}</p></div>
                  <div><p className="text-sm text-text-muted">UTR Number</p><p className="font-medium font-mono text-text">{claim.settlement.utrNumber}</p></div>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-semibold text-text mb-4">Process Settlement</h3>
                <p className="text-sm text-text-muted mb-6">Enter bank and UTR details to close this claim.</p>
                {/* Normally we would build a full react-hook-form here, but for brevity we'll just show the placeholder */}
                <div className="p-4 border border-warning/50 bg-warning/10 text-warning rounded-lg flex items-center space-x-3">
                  <Activity className="h-5 w-5" />
                  <p className="text-sm font-medium">Claim must be APPROVED before processing settlement.</p>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
