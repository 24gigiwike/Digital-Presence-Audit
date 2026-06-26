/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import jsPDF from 'jspdf';
import { UserInformation, AuditAnswers, AuditReportData, CategoryScores, ScoreTier, RecommendationItem, GeminiInsight } from './types';
import { AUDIT_QUESTIONS } from './data/questions';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { UserInfoModal } from './components/UserInfoModal';
import { AssessmentExperience } from './components/AssessmentExperience';
import { AnalyzingScanner } from './components/AnalyzingScanner';
import { ResultsDashboard } from './components/ResultsDashboard';
import { ContactKingModal } from './components/ContactKingModal';

type AppStep = 'landing' | 'user-info' | 'assessment' | 'analyzing' | 'results';

export default function App() {
  const [step, setStep] = useState<AppStep>('landing');
  const [userInfo, setUserInfo] = useState<UserInformation | null>(null);
  const [report, setReport] = useState<AuditReportData | null>(null);
  
  // Modals state
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
        email: 'guest@webdesignking.online',
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
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    let y = 20;

    const checkPageBreak = (neededHeight: number) => {
      if (y + neededHeight > pageHeight - 25) {
        doc.addPage();
        y = 20;
        return true;
      }
      return false;
    };

    // Top Brand Accent Header
    doc.setFillColor(66, 194, 139); // #42c28b
    doc.rect(0, 0, pageWidth, 14, 'F');

    // Brand Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.text('WEB DESIGN KING • AUDIT ENGINE™', 20, y + 6);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(110, 110, 110);
    doc.text(`Assessment ID: #${report.id}   •   Date: ${new Date(report.completedAt).toLocaleDateString()}`, 20, y + 13);

    y += 24;

    // Assessed Profile Box
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(20, y, pageWidth - 40, 32, 3, 3, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.text('ASSESSED PROFILE', 26, y + 8);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(51, 65, 85);
    doc.text(`Name: ${report.userInfo.name}`, 26, y + 16);
    doc.text(`Category: ${report.userInfo.profession}`, 26, y + 23);
    doc.text(`Primary Channel: ${report.userInfo.mainPlatform}`, pageWidth / 2, y + 16);
    doc.text(`Experience Level: ${report.userInfo.experienceLevel}`, pageWidth / 2, y + 23);

    y += 42;

    // Benchmark Score Section
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(0, 0, 0);
    doc.text('BENCHMARK DIAGNOSTIC SCORE', 20, y);
    y += 6;

    doc.setFillColor(251, 246, 188); // #fbf6bc soft yellow
    doc.setDrawColor(130, 227, 170); // #82e3aa
    doc.roundedRect(20, y, pageWidth - 40, 22, 3, 3, 'FD');

    doc.setFontSize(20);
    doc.setTextColor(0, 0, 0);
    doc.text(`${report.overallScore} / 100 PTS`, 28, y + 14);

    doc.setFontSize(11);
    doc.text(`Performance Tier: ${report.tier.toUpperCase()}`, pageWidth / 2, y + 13.5);

    y += 32;

    // Category Breakdown
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('Category Score Breakdown (Max 20 Pts Each):', 20, y);
    y += 7;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(51, 65, 85);
    const cats = [
      `• Brand Clarity: ${report.categoryScores.brandClarity} Pts`,
      `• Trust & Credibility: ${report.categoryScores.trustCredibility} Pts`,
      `• Visual Experience: ${report.categoryScores.visualExperience} Pts`,
      `• Conversion System: ${report.categoryScores.conversionSystem} Pts`,
      `• Growth Foundation: ${report.categoryScores.growthFoundation} Pts`
    ];
    cats.forEach((c) => {
      doc.text(c, 26, y);
      y += 6;
    });

    y += 6;

    // Executive Summary
    checkPageBreak(40);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(0, 0, 0);
    doc.text('EXECUTIVE DIAGNOSTIC SUMMARY', 20, y);
    y += 7;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(51, 65, 85);
    const summaryLines = doc.splitTextToSize(
      report.aiInsight?.executiveSummary || "Your digital presence demonstrates solid foundational competence, but visitors encounter friction before booking calls.",
      pageWidth - 40
    );
    doc.text(summaryLines, 20, y);
    y += summaryLines.length * 5.5 + 8;

    // Primary Conversion Bottleneck
    checkPageBreak(28);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(220, 38, 38); // red accent
    doc.text('PRIMARY CONVERSION BOTTLENECK:', 20, y);
    y += 6;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(15, 23, 42);
    const bottleneckLines = doc.splitTextToSize(
      report.aiInsight?.topBottleneck || "Lack of direct high-ticket conversion funnel.",
      pageWidth - 40
    );
    doc.text(bottleneckLines, 20, y);
    y += bottleneckLines.length * 5.5 + 14;

    // Strategic Roadmap
    checkPageBreak(25);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('STRATEGIC ACTION ROADMAP', 20, y);
    y += 9;

    report.recommendations.forEach((rec, idx) => {
      const descLines = doc.splitTextToSize(rec.description, pageWidth - 48);
      const actionLines = doc.splitTextToSize(`Action Step: ${rec.actionStep}`, pageWidth - 48);
      const cardHeight = 12 + descLines.length * 5 + actionLines.length * 5 + 6;

      checkPageBreak(cardHeight);

      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(130, 227, 170); // #82e3aa
      doc.roundedRect(20, y, pageWidth - 40, cardHeight, 2.5, 2.5, 'S');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10.5);
      doc.setTextColor(0, 0, 0);
      doc.text(`${idx + 1}. [${rec.impact.toUpperCase()} IMPACT] ${rec.title}`, 25, y + 8);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(71, 85, 105);
      doc.text(descLines, 25, y + 15);

      const actionY = y + 15 + descLines.length * 5 + 2;
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(16, 185, 129); // emerald green
      doc.text(actionLines, 25, actionY);

      y += cardHeight + 8;
    });

    // Page numbers and Footer on every page
    const totalPages = doc.getNumberOfPages();
    for (let p = 1; p <= totalPages; p++) {
      doc.setPage(p);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(148, 163, 184);
      doc.text('Official Web Design King Website: www.webdesignking.online', 20, pageHeight - 12);
      doc.text(`Page ${p} of ${totalPages}`, pageWidth - 35, pageHeight - 12);
    }

    doc.save(`${report.userInfo.name.replace(/\s+/g, '_')}_Digital_Presence_Audit.pdf`);
  };

  return (
    <div className="min-h-screen w-full bg-white text-black font-sans flex flex-col justify-between overflow-x-hidden select-none">
      {/* Minimal Header flowing naturally with the page */}
      <Navbar onNavigateHome={() => setStep(report ? 'results' : 'landing')} />

      {/* Main View Router */}
      <main className="flex-1 w-full flex flex-col items-center justify-center my-auto">
        {step === 'landing' && (
          <LandingPage onStartAudit={handleStartFromLanding} />
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
      </main>

      {/* Footer flowing naturally at page bottom */}
      <Footer />

      {/* Modals */}
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
