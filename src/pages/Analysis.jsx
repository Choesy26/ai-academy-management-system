import React, { useState, useRef, useEffect } from 'react';
import { UploadCloud, CheckCircle, FileSearch, ArrowRight, BookOpen, AlertCircle, Loader2 } from 'lucide-react';
import { getStudents } from '../services/api';

const Analysis = () => {
  const [step, setStep] = useState(1); // 1: Upload, 2: Analyzing, 3: Result
  const fileInputRef = useRef(null);
  
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        const data = await getStudents();
        setStudents(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStudents();
  }, []);

  const handleUpload = () => {
    if (!selectedStudent) {
      alert("학생을 먼저 선택해주세요.");
      return;
    }
    
    // Mock upload and analysis
    setStep(2);
    setTimeout(() => {
      setStep(3);
    }, 2500); // 2.5s analyzing animation
  };

  // Find the selected student info for the result screen
  const studentInfo = students.find(s => String(s.id) === String(selectedStudent)) || {};

  return (
    <div>
      <h1 className="page-title">시험지 분석 및 문제 추천</h1>
      <p className="page-subtitle">학생의 시험지를 업로드하면 AI가 약점을 분석하고 맞춤형 기출문제를 추천합니다.</p>

      {/* Progress Stepper */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: step >= 1 ? 'var(--primary)' : '#E5E7EB', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>1</div>
            <span style={{ fontSize: '0.875rem', fontWeight: step >= 1 ? '600' : '400', color: step >= 1 ? 'var(--text-main)' : 'var(--text-muted)' }}>시험지 업로드</span>
          </div>
          <div style={{ width: '60px', height: '2px', background: step >= 2 ? 'var(--primary)' : '#E5E7EB', marginBottom: '1.5rem' }}></div>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: step >= 2 ? 'var(--primary)' : '#E5E7EB', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>2</div>
            <span style={{ fontSize: '0.875rem', fontWeight: step >= 2 ? '600' : '400', color: step >= 2 ? 'var(--text-main)' : 'var(--text-muted)' }}>AI 약점 분석</span>
          </div>
          <div style={{ width: '60px', height: '2px', background: step >= 3 ? 'var(--primary)' : '#E5E7EB', marginBottom: '1.5rem' }}></div>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: step >= 3 ? 'var(--primary)' : '#E5E7EB', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>3</div>
            <span style={{ fontSize: '0.875rem', fontWeight: step >= 3 ? '600' : '400', color: step >= 3 ? 'var(--text-main)' : 'var(--text-muted)' }}>맞춤 문제 추천</span>
          </div>
        </div>
      </div>

      {step === 1 && (
        <div className="card animate-fade-in" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', padding: '3rem 2rem' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(55, 114, 255, 0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
            <UploadCloud size={32} />
          </div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>시험지 이미지 업로드</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.9375rem' }}>
            학생이 푼 시험지 사진(JPG, PNG)을 업로드해주세요.<br/>자동으로 채점 및 오답 분석이 진행됩니다.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
            {loading ? (
              <div style={{ flex: 1, padding: '0.75rem', display: 'flex', justifyContent: 'center', border: '1px solid var(--border)', borderRadius: '8px' }}>
                <Loader2 className="animate-spin text-muted" size={20} />
              </div>
            ) : (
              <select className="input-field" style={{ flex: 1, cursor: 'pointer' }} value={selectedStudent} onChange={e => setSelectedStudent(e.target.value)}>
                <option value="">학생 선택</option>
                {students.map(s => (
                  <option key={s.id} value={s.id}>{s.name} ({s.school} {s.grade})</option>
                ))}
              </select>
            )}
          </div>
          
          <div 
            style={{ border: '2px dashed var(--primary)', borderRadius: 'var(--radius-lg)', padding: '2.5rem 2rem', cursor: 'pointer', background: '#F8FAFC' }}
            onClick={() => fileInputRef.current?.click()}
          >
            <p style={{ fontWeight: '600', color: 'var(--primary)', fontSize: '1rem' }}>클릭하여 파일 선택 및 분석 시작</p>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>또는 이미지를 이곳에 드래그 앤 드롭하세요</p>
            <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleUpload} accept="image/*" />
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="card animate-fade-in" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', padding: '4rem 2rem' }}>
          <div className="scanning-animation" style={{ position: 'relative', width: '120px', height: '160px', border: '2px solid var(--border)', borderRadius: '12px', margin: '0 auto 2rem', overflow: 'hidden', background: '#F8FAFC' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FileSearch size={48} color="#CBD5E1" />
            </div>
            <div style={{ position: 'absolute', top: '-10%', left: 0, width: '100%', height: '3px', background: 'var(--primary)', boxShadow: '0 0 12px 3px rgba(55, 114, 255, 0.4)', animation: 'scan 1.5s ease-in-out infinite alternate' }}></div>
          </div>
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes scan {
              0% { top: 0%; }
              100% { top: 100%; }
            }
          `}} />
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>AI가 시험지를 분석하고 있습니다...</h2>
          <p style={{ color: 'var(--text-muted)' }}>문항 인식, 오답 패턴 파악, 지역 기출 DB 매칭 중</p>
        </div>
      )}

      {step === 3 && (
        <div className="animate-fade-in">
          <div className="grid grid-cols-3 gap-6">
            
            {/* 좌측: 분석 결과 요약 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.25rem' }}>
                    {studentInfo.name ? studentInfo.name[0] : 'S'}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: '700' }}>{studentInfo.name || '학생'}</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{studentInfo.school || '알수없음'} {studentInfo.grade || ''}</p>
                  </div>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid var(--border)', marginBottom: '1rem' }}>
                  <span style={{ color: 'var(--text-muted)', fontWeight: '500' }}>분석 점수</span>
                  <span style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary)' }}>85점</span>
                </div>

                <h4 style={{ fontWeight: '600', marginBottom: '1rem', fontSize: '0.9375rem' }}>오답 분석 (총 4문제 틀림)</h4>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <AlertCircle size={16} color="var(--error)" style={{ marginTop: '0.125rem', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.875rem', lineHeight: '1.4' }}><strong>단순 계산 실수:</strong> 13번, 18번 (연산 과정 오류)</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <AlertCircle size={16} color="var(--warning)" style={{ marginTop: '0.125rem', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.875rem', lineHeight: '1.4' }}><strong>개념 이해 부족:</strong> 22번 (이차함수 그래프 평행이동)</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <AlertCircle size={16} color="var(--warning)" style={{ marginTop: '0.125rem', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.875rem', lineHeight: '1.4' }}><strong>서술형 감점:</strong> 25번 (조건 누락)</span>
                  </li>
                </ul>

                <h4 style={{ fontWeight: '600', marginBottom: '0.75rem', fontSize: '0.9375rem' }}>주요 약점 유형</h4>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span style={{ background: '#FEE2E2', color: '#DC2626', padding: '0.25rem 0.75rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '600' }}>다항식 연산 실수</span>
                  <span style={{ background: '#FEF3C7', color: '#D97706', padding: '0.25rem 0.75rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '600' }}>이차함수 활용</span>
                </div>
              </div>
            </div>

            {/* 우측: 맞춤 기출문제 추천 */}
            <div className="card" style={{ gridColumn: 'span 2' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <BookOpen size={20} color="var(--primary)" /> 강남/서초 지역 기출 기반 맞춤 추천
                </h3>
                <button className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>추천 문제집 생성 PDF</button>
              </div>

              <div style={{ background: '#FAFCFF', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem', border: '1px solid var(--border)' }}>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-main)', lineHeight: '1.6' }}>
                  💡 <strong>AI의 추천 코멘트:</strong> {studentInfo.name || '해당'} 학생은 이차방정식 계산은 빠르나, 조건이 복잡한 활용 문제에서 식 세우기에 어려움을 겪고 있습니다. <strong>{studentInfo.school || '해당 학교'} 최근 3개년 기출 트렌드</strong>에 자주 등장하는 <u>"도형의 넓이를 활용한 이차방정식"</u> 유형 3문제를 우선 추천합니다.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { num: 1, title: '도형을 활용한 이차방정식 (심화)', source: '2025 강남중 기출 18번 유사', type: '개념 보완', accuracy: '유사도 98%' },
                  { num: 2, title: '복잡한 식의 전개와 계산', source: '2024 서초중 기출 12번 유사', type: '실수 방지', accuracy: '유사도 95%' },
                  { num: 3, title: '이차방정식 실생활 활용 (서술형)', source: '2023 역삼중 기출 서술형 2번', type: '서술형 대비', accuracy: '유사도 90%' },
                ].map(q => (
                  <div key={q.num} style={{ border: '1px solid var(--border)', borderRadius: '12px', padding: '1rem', display: 'flex', gap: '1rem', alignItems: 'center', transition: 'box-shadow 0.2s', cursor: 'pointer' }} className="hover:shadow-sm">
                    <div style={{ width: '40px', height: '40px', background: 'var(--background)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', color: 'var(--text-muted)' }}>
                      {q.num}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                        <h4 style={{ fontWeight: '600', fontSize: '0.9375rem' }}>{q.title}</h4>
                        <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: '600', background: 'rgba(55, 114, 255, 0.1)', padding: '0.125rem 0.5rem', borderRadius: '4px' }}>{q.accuracy}</span>
                      </div>
                      <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>출처: {q.source}</p>
                      
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.75rem', border: '1px solid var(--border)', padding: '0.125rem 0.5rem', borderRadius: '4px', fontWeight: '500', color: 'var(--text-muted)' }}>{q.type}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '1rem' }}>
                       <button className="btn btn-secondary" style={{ padding: '0.5rem', borderRadius: '8px' }}><CheckCircle size={18} color="var(--secondary)" /></button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                <button className="btn btn-secondary" onClick={() => setStep(1)}>다른 시험지 분석하기</button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analysis;
