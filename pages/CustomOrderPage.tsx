import React, { useState, useContext } from 'react';
import { generateCustomTentProposal } from '../services/geminiService';
import { CustomOrderResponse, CustomerInfo } from '../types';
import { SparklesIcon } from '../components/icons';
import { ProductContext } from '../App';

const emptyCustomerInfo: CustomerInfo = {
    name: '',
    email: '',
    phone: ''
};

export const CustomOrderPage: React.FC = () => {
    const store = useContext(ProductContext);

    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<CustomOrderResponse | null>(null);
    
    const [submissionStep, setSubmissionStep] = useState<'generate' | 'form' | 'submitted'>('generate');
    const [customerInfo, setCustomerInfo] = useState<CustomerInfo>(emptyCustomerInfo);


    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim()) {
            setError('Please describe your desired tent.');
            return;
        }

        setIsLoading(true);
        setError(null);
        setResult(null);

        try {
            const proposal = await generateCustomTentProposal(prompt);
            setResult(proposal);
            setSubmissionStep('form');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
            setSubmissionStep('generate');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCustomerInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCustomerInfo(prev => ({ ...prev, [name]: value }));
    };

    const handleProposalSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!store || !result) return;
        store.addCustomOrder(customerInfo, result);
        setSubmissionStep('submitted');
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
                <h1 className="text-4xl font-extrabold tracking-tight text-brand-dark">Design Your Dream Tent</h1>
                <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500">
                    Tell us your vision, and our AI design assistant will create a preliminary proposal for you in seconds.
                </p>
            </div>
            
            {submissionStep !== 'submitted' && (
                <div className="mt-10 bg-white p-8 rounded-2xl shadow-2xl">
                    <form onSubmit={handleGenerate}>
                        <label htmlFor="tent-description" className="block text-lg font-medium text-gray-800">
                            Describe your custom tent
                        </label>
                        <p className="text-sm text-gray-500 mt-1 mb-3">
                            Be descriptive! Include details like purpose (e.g., wedding, safari lodge), capacity, desired colors, features (e.g., windows, extra doors, branding), and any specific materials you have in mind.
                        </p>
                        <textarea
                            id="tent-description"
                            rows={6}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-secondary focus:border-brand-secondary transition"
                            placeholder="e.g., A luxurious glamping tent for two people, with a canvas exterior, large mesh windows, and a raised wooden platform entrance."
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            disabled={isLoading || submissionStep === 'form'}
                        />
                        <div className="mt-6 flex justify-end">
                            <button
                                type="submit"
                                disabled={isLoading || submissionStep === 'form'}
                                className="flex items-center justify-center gap-2 bg-brand-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-brand-secondary disabled:bg-gray-400 transition-all text-lg"
                            >
                                {isLoading ? 'Generating...' : 'Generate Proposal'}
                                <SparklesIcon className="w-5 h-5"/>
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {error && <div className="mt-8 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert">
                <p className="font-bold">Error</p>
                <p>{error}</p>
            </div>}

            {isLoading && (
                <div className="mt-8 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto"></div>
                    <p className="mt-4 text-gray-600">Our AI is sketching your design... Please wait.</p>
                </div>
            )}
            
            {result && submissionStep === 'form' && (
                <div className="mt-10 bg-brand-light border border-brand-accent p-8 rounded-2xl shadow-lg animate-fade-in">
                    <h2 className="text-2xl font-bold text-brand-dark mb-4">Your AI-Generated Proposal</h2>
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold text-brand-primary">Design Summary</h3>
                            <p className="mt-1 text-gray-700">{result.summary}</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-brand-primary">Recommended Materials</h3>
                            <ul className="mt-2 list-disc list-inside space-y-1 text-gray-700">
                                {result.materials.map((material, index) => <li key={index}>{material}</li>)}
                            </ul>
                        </div>
                        <div className="pt-4 border-t border-brand-accent/50">
                            <h3 className="text-lg font-semibold text-brand-primary">Estimated Price</h3>
                            <p className="mt-1 text-3xl font-bold text-brand-dark">KES {result.estimatedPriceKES.toLocaleString()}</p>
                            <p className="text-sm text-gray-500">*This is a preliminary estimate. A final quote will be provided after consultation.</p>
                        </div>
                        
                        <div className="mt-6 pt-6 border-t border-brand-accent/50">
                             <h3 className="text-xl font-bold text-brand-dark mb-4">Submit Proposal for Consultation</h3>
                             <p className="text-gray-600 mb-4">Like what you see? Fill out your details below, and our sales team will contact you to finalize your custom tent order.</p>
                             <form onSubmit={handleProposalSubmit} className="space-y-4">
                                <input type="text" name="name" placeholder="Your Name" value={customerInfo.name} onChange={handleCustomerInfoChange} className="w-full p-2 border rounded-md" required />
                                <input type="email" name="email" placeholder="Your Email" value={customerInfo.email} onChange={handleCustomerInfoChange} className="w-full p-2 border rounded-md" required />
                                <input type="tel" name="phone" placeholder="Your Phone Number" value={customerInfo.phone} onChange={handleCustomerInfoChange} className="w-full p-2 border rounded-md" required />
                                <div className="text-right">
                                    <button type="submit" className="bg-brand-secondary text-white font-bold py-2 px-6 rounded-lg hover:bg-brand-primary transition-colors">
                                        Submit Proposal to Sales
                                    </button>
                                </div>
                             </form>
                        </div>
                    </div>
                </div>
            )}

            {submissionStep === 'submitted' && (
                 <div className="mt-10 text-center bg-green-50 border border-green-400 p-10 rounded-2xl animate-fade-in">
                    <h2 className="text-3xl font-bold text-green-800">Thank You!</h2>
                    <p className="mt-4 text-lg text-green-700">Your proposal has been submitted successfully. Our team will review your design and contact you within 24 hours to discuss the next steps.</p>
                 </div>
            )}
        </div>
    );
};