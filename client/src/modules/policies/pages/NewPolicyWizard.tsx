import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  Save, 
  X,
  AlertCircle
} from 'lucide-react';
import { Step1Client } from '../components/wizard/Step1Client';
import { Step2CompanyPlan } from '../components/wizard/Step2CompanyPlan';
import { Step3Premium } from '../components/wizard/Step3Premium';
import { Step4Documents } from '../components/wizard/Step4Documents';
import { Step5Payment } from '../components/wizard/Step5Payment';
import { Step6Review } from '../components/wizard/Step6Review';

export interface WizardData {
  client: any;
  companyPlan: any;
  premium: any;
  documents: any[];
  payment: any;
}

const INITIAL_DATA: WizardData = {
  client: null,
  companyPlan: null,
  premium: null,
  documents: [],
  payment: null
};

const STEPS = [
  { id: 1, title: 'Client Details' },
  { id: 2, title: 'Company & Plan' },
  { id: 3, title: 'Premium & Riders' },
  { id: 4, title: 'Documents' },
  { id: 5, title: 'Payment' },
  { id: 6, title: 'Review & Issue' }
];

export const NewPolicyWizard = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<WizardData>(INITIAL_DATA);
  const [isDraftSaved, setIsDraftSaved] = useState(true);
  const [showExitWarning, setShowExitWarning] = useState(false);

  // Load draft on mount
  useEffect(() => {
    const draft = localStorage.getItem('new_policy_draft');
    if (draft) {
      try {
        const parsed = JSON.parse(draft);
        setData(parsed.data);
        setCurrentStep(parsed.step || 1);
      } catch (e) {
        console.error('Failed to parse draft', e);
      }
    }
  }, []);

  // Auto-save draft when data changes
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('new_policy_draft', JSON.stringify({ data, step: currentStep }));
      setIsDraftSaved(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, [data, currentStep]);

  const updateData = (stepData: Partial<WizardData>) => {
    setData(prev => ({ ...prev, ...stepData }));
    setIsDraftSaved(false);
  };

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleExit = () => {
    if (!isDraftSaved) {
      setShowExitWarning(true);
    } else {
      navigate('/policies');
    }
  };

  const handleSubmit = async () => {
    // API Call would go here
    localStorage.removeItem('new_policy_draft');
    // Navigate to success or policies list
    navigate('/policies');
  };

  const CurrentStepComponent = () => {
    switch (currentStep) {
      case 1: return <Step1Client data={data.client} updateData={(d) => updateData({ client: d })} />;
      case 2: return <Step2CompanyPlan data={data.companyPlan} updateData={(d) => updateData({ companyPlan: d })} />;
      case 3: return <Step3Premium data={data.premium} updateData={(d) => updateData({ premium: d })} />;
      case 4: return <Step4Documents data={data.documents} updateData={(d) => updateData({ documents: d })} />;
      case 5: return <Step5Payment data={data.payment} updateData={(d) => updateData({ payment: d })} />;
      case 6: return <Step6Review data={data} />;
      default: return null;
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] -m-4 md:-m-8">
      {/* Wizard Header */}
      <header className="bg-surface border-b border-border px-6 py-4 flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-xl font-bold text-text">New Policy Application</h1>
          <div className="flex items-center gap-2 mt-1 text-sm text-text-secondary">
            {isDraftSaved ? (
              <span className="flex items-center gap-1 text-green-500"><CheckCircle2 className="w-4 h-4" /> Draft saved</span>
            ) : (
              <span className="flex items-center gap-1"><Save className="w-4 h-4 animate-pulse" /> Saving...</span>
            )}
          </div>
        </div>
        <button 
          onClick={handleExit}
          className="p-2 hover:bg-background rounded-full transition-colors text-text-secondary hover:text-text"
        >
          <X className="w-6 h-6" />
        </button>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden flex flex-col md:flex-row bg-background">
        
        {/* Sidebar Stepper */}
        <div className="w-full md:w-64 lg:w-80 bg-surface border-r border-border shrink-0 overflow-y-auto hidden md:block">
          <div className="p-6">
            <h3 className="text-sm font-bold text-text-secondary uppercase mb-6 tracking-wider">Progress</h3>
            <div className="space-y-6 relative">
              <div className="absolute left-4 top-2 bottom-4 w-0.5 bg-border -z-10"></div>
              
              {STEPS.map((step, index) => {
                const isCompleted = currentStep > step.id;
                const isCurrent = currentStep === step.id;
                
                return (
                  <div key={step.id} className="flex items-start gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 transition-colors duration-300 ${
                      isCompleted 
                        ? 'bg-primary border-primary text-white' 
                        : isCurrent 
                          ? 'bg-background border-primary text-primary' 
                          : 'bg-surface border-border text-text-secondary'
                    }`}>
                      {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <span className="font-bold text-sm">{step.id}</span>}
                    </div>
                    <div className="pt-1">
                      <p className={`font-bold ${isCurrent ? 'text-primary' : isCompleted ? 'text-text' : 'text-text-secondary'}`}>
                        {step.title}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          
          {/* Mobile Progress Bar */}
          <div className="md:hidden bg-surface border-b border-border p-4">
            <div className="flex justify-between text-sm mb-2 font-medium">
              <span>Step {currentStep} of {STEPS.length}</span>
              <span className="text-primary">{STEPS[currentStep - 1].title}</span>
            </div>
            <div className="w-full bg-background rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / STEPS.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
              <CurrentStepComponent />
            </div>
          </div>

          {/* Wizard Footer / Actions */}
          <div className="bg-surface border-t border-border p-4 md:p-6 shrink-0">
            <div className="max-w-4xl mx-auto flex items-center justify-between">
              <button
                onClick={handleBack}
                disabled={currentStep === 1}
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg border border-border text-text font-medium hover:bg-background transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" /> Back
              </button>
              
              {currentStep < STEPS.length ? (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-white font-medium hover:bg-primary-hover transition-colors shadow-lg shadow-primary/20"
                >
                  Continue <ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="flex items-center gap-2 px-8 py-2.5 rounded-lg bg-green-500 text-white font-bold hover:bg-green-600 transition-colors shadow-lg shadow-green-500/20"
                >
                  Issue Policy <CheckCircle2 className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Exit Warning Modal */}
      {showExitWarning && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface border border-border rounded-xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center gap-3 text-orange-500 mb-4">
              <AlertCircle className="w-8 h-8" />
              <h2 className="text-xl font-bold text-text">Unsaved Changes</h2>
            </div>
            <p className="text-text-secondary mb-6">
              You have unsaved changes. Your draft is still saving. Are you sure you want to exit?
            </p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setShowExitWarning(false)}
                className="px-4 py-2 border border-border rounded-lg text-text hover:bg-background font-medium"
              >
                Stay
              </button>
              <button 
                onClick={() => navigate('/policies')}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 font-medium"
              >
                Exit Anyway
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
