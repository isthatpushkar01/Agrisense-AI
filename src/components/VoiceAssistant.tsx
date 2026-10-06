import React, { useState, useEffect, useRef } from 'react';
import { 
  Radio, Mic, MicOff, Send, Volume2, VolumeX, Sparkles, Globe, 
  User as UserIcon, Bot, RefreshCw, HelpCircle, CheckCircle2, Award 
} from 'lucide-react';
import { ChatMessage, UserRole } from '../types';

interface VoiceAssistantProps {
  currentRole: UserRole;
}

export const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ currentRole }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: 'Namaste! I am Kisan Mitra AI, your official voice & chat agricultural scientist. I speak English, Hindi (हिन्दी), Punjabi (ਪੰਜਾਬੀ), Marathi (मराठी), and Telugu (తెలుగు). How can I assist your farming or commodity operations today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      language: 'English',
      suggestedActions: [
        'How to cure Rice Blast disease?',
        'Best fertilizer for wheat in Rabi season',
        'What is PM-KISAN subsidy criteria?',
        'Live Basmati mandi price forecast'
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [selectedLang, setSelectedLang] = useState<'English' | 'Hindi' | 'Punjabi' | 'Marathi' | 'Telugu'>('English');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Handle Speech Recognition (Voice Input)
  const toggleListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Voice microphone recognition is not supported in this browser/iframe. Please type your query in the chatbox below!');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = selectedLang === 'Hindi' ? 'hi-IN' : selectedLang === 'Punjabi' ? 'pa-IN' : selectedLang === 'Marathi' ? 'mr-IN' : selectedLang === 'Telugu' ? 'te-IN' : 'en-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      if (transcript) {
        setInput(transcript);
        handleSend(transcript);
      }
    };

    recognition.start();
  };

  // Handle Speech Synthesis (Voice Output)
  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) {
      return;
    }
    window.speechSynthesis.cancel();
    if (isSpeaking) {
      setIsSpeaking(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = selectedLang === 'Hindi' ? 'hi-IN' : selectedLang === 'Punjabi' ? 'pa-IN' : selectedLang === 'Marathi' ? 'mr-IN' : selectedLang === 'Telugu' ? 'te-IN' : 'en-US';
    utterance.rate = 0.95;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      language: selectedLang
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          language: selectedLang,
          role: currentRole
        })
      });
      const data = await response.json();
      
      const aiReplyText = data.reply || "Namaste! I am Kisan Mitra. Please monitor local weather and APMC mandi rates for best results.";
      const aiMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        text: aiReplyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        language: selectedLang,
        suggestedActions: data.suggestedActions || ['Check Mandi Prices', 'Run Crop Disease Scan', 'Explore KCC Loan']
      };

      setMessages((prev) => [...prev, aiMsg]);
      
      // Automatically speak AI response if user used voice
      if (queryText || isListening) {
        speakText(aiReplyText);
      }
    } catch (err) {
      console.error('Chat error:', err);
      const fallbackMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        text: `Namaste! For "${textToSend}", I advise checking soil drainage channels and verifying APMC rates at your nearest market.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        language: selectedLang
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 sm:p-6 lg:p-8 text-slate-800 dark:text-slate-100 transition-colors flex flex-col justify-between">
      <div className="max-w-5xl mx-auto w-full flex-1 flex flex-col">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-blue-600 flex items-center justify-center shadow-lg shadow-emerald-600/30 text-white">
              <Radio className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100">
                  Kisan Mitra AI • Voice & Chat Assistant
                </h1>
                <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  5 Languages
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-xs mt-0.5">
                Speak or type in your regional language. Context-aware advice for crops, fertilizers, pests, and government schemes.
              </p>
            </div>
          </div>

          {/* Language Switcher Pills */}
          <div className="flex items-center space-x-1.5 bg-white dark:bg-slate-900 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-x-auto">
            {(['English', 'Hindi', 'Punjabi', 'Marathi', 'Telugu'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLang(lang)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  selectedLang === lang
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {lang === 'Hindi' ? 'हिन्दी (Hindi)' : lang === 'Punjabi' ? 'ਪੰਜਾਬੀ (Punjabi)' : lang === 'Marathi' ? 'मराठी (Marathi)' : lang === 'Telugu' ? 'తెలుగు (Telugu)' : 'English'}
              </button>
            ))}
          </div>
        </div>

        {/* Chat History Box */}
        <div className="flex-1 my-6 space-y-4 overflow-y-auto max-h-[550px] pr-2 no-scrollbar">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start space-x-3 max-w-3xl ${
                msg.sender === 'user' ? 'ml-auto flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
                msg.sender === 'user' 
                  ? 'bg-slate-800 dark:bg-slate-700 text-white' 
                  : 'bg-gradient-to-br from-emerald-600 to-teal-700 text-white'
              }`}>
                {msg.sender === 'user' ? <UserIcon className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>

              <div className={`space-y-2 ${msg.sender === 'user' ? 'text-right' : ''}`}>
                <div className={`p-4 rounded-3xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-emerald-700 to-teal-800 text-white rounded-tr-none font-semibold'
                    : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-slate-800 rounded-tl-none'
                }`}>
                  <p>{msg.text}</p>
                  
                  {/* Speak Audio Icon for AI messages */}
                  {msg.sender === 'ai' && (
                    <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-bold">
                      <span>Language: {msg.language || 'English'}</span>
                      <button
                        onClick={() => speakText(msg.text)}
                        className="flex items-center space-x-1 text-emerald-600 dark:text-emerald-400 hover:underline"
                      >
                        {isSpeaking ? <VolumeX className="w-3.5 h-3.5 animate-pulse text-rose-500" /> : <Volume2 className="w-3.5 h-3.5" />}
                        <span>{isSpeaking ? 'Mute Speech' : 'Listen Voice'}</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Suggested Action Chips */}
                {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {msg.suggestedActions.map((act, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(act)}
                        className="bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 text-emerald-800 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-2xs transition-all flex items-center gap-1.5"
                      >
                        <Sparkles className="w-3 h-3 text-amber-500 shrink-0" />
                        <span>{act}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <Bot className="w-5 h-5 animate-spin" />
              </div>
              <div className="bg-white dark:bg-slate-900 px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-500 animate-pulse">
                Kisan Mitra is formulating agronomy response in {selectedLang}...
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Bottom Input & Voice Microphone Bar */}
        <div className="bg-white dark:bg-slate-900 p-3 sm:p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl flex items-center space-x-3">
          
          {/* Microphone Button for Voice Input */}
          <button
            onClick={toggleListening}
            title={isListening ? 'Stop Recording' : 'Speak Now'}
            className={`p-3 sm:p-3.5 rounded-2xl font-bold transition-all flex items-center justify-center shrink-0 shadow-md ${
              isListening
                ? 'bg-rose-600 text-white animate-pulse ring-4 ring-rose-300'
                : 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-200'
            }`}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* Text Input Field */}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={isListening ? `Listening in ${selectedLang}... Speak your farming question!` : `Ask anything in ${selectedLang} (e.g., 'How to treat leaf rust in wheat?')...`}
            className="flex-1 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-4 py-3 text-sm font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

          {/* Send Button */}
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            className="p-3 sm:p-3.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 disabled:opacity-40 text-white rounded-2xl font-bold transition-all shadow-md shrink-0"
          >
            <Send className="w-5 h-5" />
          </button>

        </div>

      </div>
    </div>
  );
};
