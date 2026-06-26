/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { UserInformation, AuditAnswers, AuditReportData, CategoryScores, ScoreTier, RecommendationItem, GeminiInsight } from './types';
import { AUDIT_QUESTIONS } from './data/questions';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { UserInfoModal } from './components/UserInfoModal';
import { AssessmentExperience } from './components/AssessmentExperience';
import { AnalyzingScanner } from './components/AnalyzingScanner';
import { ResultsDashboard } from './components/ResultsDashboard';
import { HowItWorksModal } from './components/HowItWorksModal';
import { ContactKingModal } from './components/ContactKingModal';

type AppStep = 'landing' | 'user-info' | 'assessment' | 'analyzing' | 'results';

export default function App() {
  const [step, setStep] = useState<AppStep>('landing');
  const [userInfo, setUserInfo] = useState<UserInformation | null>(null);
  const [report, setReport] = useState<AuditReportData | null>(null);
  
  // Modals state
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [showContactKing, setShowContactKing] = useState(false);

  const handleStartFromLanding = () => {
    setStep('user-info');
  };

  const handleCompleteUserInfo = (info: UserInformation) => {
    setUserInfo(info);
    setStep('assessment');
    
    // Log analytics event
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event: 'assessment_started', properties: info })
    }).catch(() => {});
  };

  const handleCompleteAssessment = async (answers: AuditAnswers) => {
    setStep('analyzing');

    // Calculate score
    let totalScore = 0;
    const catScores: CategoryScores = {
      brandClarity: 0,
      trustCredibility: 0,
      visualExperience: 0,
      conversionSystem: 0,
      growthFoundation: 0
    };

    AUDIT_QUESTIONS.forEach((q) => {
      const ans = answers[q.id];
      let pts = 0;
      if (q.type === 'choice') {
        const chosenIdx = typeof ans === 'number' ? ans : 0;
        pts = q.options[chosenIdx]?.points || 0;
      } else {
        const chosenArr = Array.isArray(ans) ? ans : [];
        chosenArr.forEach((idx) => {
          pts += q.options[idx]?.points || 0;
        });
      }
      catScores[q.category] += pts;
      totalScore += pts;
    });

    // Normalize out of 100
    const finalScore = Math.min(100, Math.max(0, totalScore));

    // Determine tier
    let tier: ScoreTier = 'Needs Strategic Refinement';
    if (finalScore >= 90) tier = 'Digital Authority';
    else if (finalScore >= 70) tier = 'Strong Foundation';
    else if (finalScore >= 50) tier = 'Hidden Potential';

    // Generate recommendations engine output
    const recs: RecommendationItem[] = [];
    const strengths: string[] = [];
    const weaknesses: string[] = [];

    if (catScores.brandClarity >= 16) strengths.push("Your 5-second brand clarity and messaging foundation is solid.");
    else {
      weaknesses.push("Your positioning and core value proposition lack immediate clarity.");
      recs.push({
        category: 'Brand Clarity',
        title: 'Articulate Outcomes Over Services',
        description: 'Your audience understands your technical skill, but not your financial or strategic difference.',
        impact: 'Critical',
        actionStep: 'Rewrite your hero headline to state the concrete business outcome you solve within 5 seconds.'
      });
    }

    if (catScores.trustCredibility >= 16) strengths.push("Your portfolio foundation and proof architecture build strong trust.");
    else {
      weaknesses.push("Your case studies display passive mockups instead of quantifiable ROI numbers.");
      recs.push({
        category: 'Trust & Credibility',
        title: 'Quantify Client Case Studies',
        description: 'High-ticket buyers evaluate online credibility assets for instant third-party validation.',
        impact: 'High',
        actionStep: 'Add verifiable client ROI numbers (e.g. "+42% lead lift", "<1.8s load time") directly beside project mockups.'
      });
    }

    if (catScores.conversionSystem < 14) {
      weaknesses.push("Your conversion path is fragmented across competing links.");
      recs.push({
        category: 'Conversion Funnel',
        title: 'Establish Single Dominant CTA',
        description: 'Visitors experience cognitive overload when asked to choose between DMing, emailing, or link trees.',
        impact: 'Critical',
        actionStep: 'Replace multi-link directories with a singular, high-intent "Book Executive Strategy Call" button.'
      });
    }

    if (catScores.visualExperience < 14) {
      recs.push({
        category: 'Visual Polish',
        title: 'Elevate Container Craftsmanship',
        description: 'In premium SaaS and luxury agency markets, prospects judge operational competence by visual design standards.',
        impact: 'Medium',
        actionStep: 'Adopt clean editorial typography and generous negative space to establish bespoke studio positioning.'
      });
    }

    // Call Gemini API analysis backend
    let aiData: GeminiInsight | null = null;
    try {
      const res = await fetch('/api/analyze-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userInfo, score: finalScore, categories: catScores, answers })
      });
      const parsed = await res.json();
      if (parsed.insight) {
        aiData = parsed.insight;
      }
    } catch (e) {
      console.error("Analysis call failed", e);
    }

    const reportObj: AuditReportData = {
      id: "AUD_" + Math.random().toString(36).substring(2, 9).toUpperCase(),
      userInfo: userInfo || {
        name: 'Guest Professional',
        email: 'guest@webdesignking.com',
        profession: 'Web Designer',
        experienceLevel: 'Intermediate',
        mainPlatform: 'Website'
      },
      overallScore: finalScore,
      categoryScores: catScores,
      tier,
      strengths,
      weaknesses,
      recommendations: recs,
      aiInsight: aiData,
      completedAt: new Date().toISOString()
    };

    setReport(reportObj);

    // Sync lead capture & analytics
    if (userInfo) {
      fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...userInfo,
          score: finalScore,
          breakdown: catScores
        })
      }).catch(() => {});
    }
  };

  const handleDownloadReport = () => {
    if (!report) return;
    const content = `
====================================================================
THE FREELANCER/AGENCY DIGITAL PRESENCE AUDIT™
Powered by Web Design King | ID: #${report.id}
====================================================================
Assessed Profile: ${report.userInfo.name} (${report.userInfo.profession})
Primary Channel: ${report.userInfo.mainPlatform}
Experience Level: ${report.userInfo.experienceLevel}
Completed On: ${new Date(report.completedAt).toLocaleString()}

--------------------------------------------------------------------
OVERALL BENCHMARK SCORE: ${report.overallScore} / 100 (${report.tier})
--------------------------------------------------------------------
• Brand Clarity: ${report.categoryScores.brandClarity} / 20 Pts
• Trust & Credibility: ${report.categoryScores.trustCredibility} / 20 Pts
• Visual Experience: ${report.categoryScores.visualExperience} / 20 Pts
• Conversion System: ${report.categoryScores.conversionSystem} / 20 Pts
• Growth Foundation: ${report.categoryScores.growthFoundation} / 20 Pts

--------------------------------------------------------------------
EXECUTIVE DIAGNOSTIC SUMMARY
--------------------------------------------------------------------
${report.aiInsight?.executiveSummary || "Your digital presence demonstrates foundational technical skills, but suffers from conversion friction."}

PRIMARY BOTTLENECK:
${report.aiInsight?.topBottleneck || "Lack of direct high-ticket conversion funnel."}

--------------------------------------------------------------------
RECOMMENDED ACTION ROADMAP
--------------------------------------------------------------------
${report.recommendations.map((r, i) => `${i+1}. [${r.impact} Impact] ${r.title}\n   ${r.description}\n   Action Step: ${r.actionStep}`).join('\n\n')}

====================================================================
"Your digital presence is your silent salesperson."
Transform your digital architecture: https://webdesignking.com
====================================================================
`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${report.userInfo.name.replace(/\s+/g, '_')}_Digital_Presence_Audit.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-screen w-screen bg-[#0A0A0B] text-white font-sans flex flex-col overflow-hidden select-none">
      {/* Top Navigation Bar matching Sophisticated Dark theme HTML */}
      <Navbar
        userInfo={userInfo}
        onNavigateHome={() => setStep(report ? 'results' : 'landing')}
        onOpenHowItWorks={() => setShowHowItWorks(true)}
        onOpenContact={() => setShowContactKing(true)}
        currentStep={step}
      />

      {/* Dynamic View Router */}
      {step === 'landing' && (
        <LandingPage
          onStartAudit={handleStartFromLanding}
          onSeeHowItWorks={() => setShowHowItWorks(true)}
        />
      )}

      {step === 'user-info' && (
        <UserInfoModal
          onComplete={handleCompleteUserInfo}
          onCancel={() => setStep('landing')}
        />
      )}

      {step === 'assessment' && (
        <AssessmentExperience
          questions={AUDIT_QUESTIONS}
          userName={userInfo?.name}
          onComplete={handleCompleteAssessment}
          onCancel={() => setStep('landing')}
        />
      )}

      {step === 'analyzing' && (
        <AnalyzingScanner
          userName={userInfo?.name}
          profession={userInfo?.profession}
          onComplete={() => setStep('results')}
        />
      )}

      {step === 'results' && report && (
        <ResultsDashboard
          report={report}
          onWorkWithKing={() => setShowContactKing(true)}
          onDownloadReport={handleDownloadReport}
          onRetakeAudit={() => setStep('landing')}
        />
      )}

      {/* Modals */}
      {showHowItWorks && (
        <HowItWorksModal
          onClose={() => setShowHowItWorks(false)}
          onStartAudit={() => {
            setShowHowItWorks(false);
            setStep('user-info');
          }}
        />
      )}

      {showContactKing && (
        <ContactKingModal
          onClose={() => setShowContactKing(false)}
          userName={userInfo?.name}
          userEmail={userInfo?.email}
          auditScore={report?.overallScore}
        />
      )}
    </div>
  );
}
