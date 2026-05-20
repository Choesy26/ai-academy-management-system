import React, { useState, useEffect } from 'react';
import { Users, FileCheck, Target, TrendingUp, ChevronRight, Clock, Loader2 } from 'lucide-react';
import { getRecentAnalyses } from '../services/api';

const Dashboard = () => {
  const [recentAnalyses, setRecentAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const analyses = await getRecentAnalyses();
        setRecentAnalyses(analyses);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  return (
    <div>
      <h1 className="page-title">대시보드</h1>
      <p className="page-subtitle">오늘 학원의 주요 현황을 한눈에 확인하세요.</p>

      <div className="grid grid-cols-4 gap-6" style={{ marginBottom: '2.5rem' }}>
        <div className="card stat-card">
          <div className="stat-icon" style={{ background: 'rgba(55, 114, 255, 0.1)', color: 'var(--primary)' }}>
            <Users size={24} />
          </div>
          <div className="stat-info">
            <h3>총 재원생</h3>
            <p>128명</p>
          </div>
        </div>
        <div className="card stat-card">
          <div className="stat-icon" style={{ background: '#D1FAE5', color: '#10B981' }}>
            <FileCheck size={24} />
          </div>
          <div className="stat-info">
            <h3>이번 달 분석 완료</h3>
            <p>42건</p>
          </div>
        </div>
        <div className="card stat-card">
          <div className="stat-icon" style={{ background: '#FEF3C7', color: '#F59E0B' }}>
            <Target size={24} />
          </div>
          <div className="stat-info">
            <h3>맞춤 문제 제공</h3>
            <p>356문항</p>
          </div>
        </div>
        <div className="card stat-card">
          <div className="stat-icon" style={{ background: '#FCE7F3', color: '#EC4899' }}>
            <TrendingUp size={24} />
          </div>
          <div className="stat-info">
            <h3>평균 성취도 향상</h3>
            <p>+12%</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="card" style={{ gridColumn: 'span 2' }}>
          <div className="flex justify-between items-center" style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', letterSpacing: '-0.02em' }}>최근 분석된 시험지</h2>
            <button style={{ color: 'var(--primary)', fontSize: '0.875rem', fontWeight: '600', display: 'flex', alignItems: 'center' }}>
              전체 보기 <ChevronRight size={16} />
            </button>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                <Loader2 className="animate-spin" size={24} />
              </div>
            ) : recentAnalyses.length > 0 ? (
              recentAnalyses.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', border: '1px solid var(--border)', borderRadius: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', color: 'var(--primary)' }}>
                      {item.name[0]}
                    </div>
                    <div>
                      <h4 style={{ fontWeight: '600', fontSize: '0.9375rem' }}>{item.name} <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 'normal' }}>({item.school})</span></h4>
                      <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '0.125rem' }}>{item.test}</p>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.125rem', fontWeight: '500' }}>발견된 약점</p>
                      <span style={{ display: 'inline-block', padding: '0.125rem 0.625rem', background: '#FEE2E2', color: '#DC2626', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '600' }}>
                        {item.weakness}
                      </span>
                    </div>
                    <div style={{ textAlign: 'right', minWidth: '60px' }}>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.125rem', fontWeight: '500' }}>점수</p>
                      <p style={{ fontWeight: '700', color: 'var(--text-main)' }}>{item.score}점</p>
                    </div>
                    <button className="btn btn-secondary" style={{ padding: '0.375rem 0.75rem' }}>상세 보기</button>
                  </div>
                </div>
              ))
            ) : (
               <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>최근 분석된 시험지가 없습니다.</div>
            )}
          </div>
        </div>

        <div className="card">
          <h2 style={{ fontSize: '1.25rem', fontWeight: '700', letterSpacing: '-0.02em', marginBottom: '1.5rem' }}>할 일 및 알림</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ padding: '1rem', background: '#FFFBEB', borderRadius: '12px', border: '1px solid #FEF3C7' }}>
              <h4 style={{ fontWeight: '600', fontSize: '0.875rem', color: '#B45309', marginBottom: '0.25rem' }}>학부모 보고서 작성 필요</h4>
              <p style={{ fontSize: '0.8125rem', color: '#92400E', marginBottom: '0.5rem' }}>이번 달 미작성 보고서가 12건 있습니다.</p>
              <button style={{ fontSize: '0.75rem', fontWeight: '600', color: '#D97706' }}>바로 가기 &rarr;</button>
            </div>
            
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem', padding: '0.5rem' }}>
              <Clock size={16} color="var(--primary)" style={{ marginTop: '0.125rem' }} />
              <div>
                <p style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-main)' }}>신규 기출문제 업데이트</p>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '0.125rem' }}>강남중학교 2025년 기출이 DB에 추가되었습니다.</p>
                <p style={{ fontSize: '0.75rem', color: '#9CA3AF', marginTop: '0.375rem' }}>오늘 오전 10:30</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
