import React, { useState, useEffect } from 'react';
import { FileText, Send, Sparkles, Copy, MessageCircle, Loader2 } from 'lucide-react';
import { getStudents } from '../services/api';

const Report = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [loading, setLoading] = useState(true);
  
  const [keywords, setKeywords] = useState('');
  const [generating, setGenerating] = useState(false);
  const [report, setReport] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        const data = await getStudents();
        setStudents(data);
        if (data.length > 0) setSelectedStudent(String(data[0].id));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStudents();
  }, []);

  const handleGenerate = () => {
    if (!selectedStudent) {
      alert('학생을 선택해주세요.');
      return;
    }
    
    setGenerating(true);
    setReport('');
    
    const studentInfo = students.find(s => String(s.id) === String(selectedStudent));
    const name = studentInfo ? studentInfo.name : '학생';
    const goal = studentInfo ? studentInfo.goal : '성적향상';
    
    // Simulate AI generation
    setTimeout(() => {
      setGenerating(false);
      setReport(`어머니, 안녕하세요. ${name}이 담당 수학 강사 김원장입니다. 
이번 1학기 기말고사에서 ${name}이가 85점을 받았습니다. 
${name}이는 평소 수업 태도가 매우 좋고 식 세우는 연습을 꾸준히 해왔습니다. 다만 이번 시험에서 시간이 부족하여 13번, 18번 단순 계산에서 잔실수가 나온 점이 아쉽습니다. 

하지만 지난 중간고사(72점) 대비 성취도가 13점이나 크게 향상되었고, 어려운 난이도의 서술형 문제는 부분 점수까지 챙기는 등 긍정적인 발전이 돋보입니다. (${name}이 목표인 '${goal}'에 매우 잘 부합하는 결과입니다.)

앞으로는 강남/서초 지역 최신 기출 트렌드인 '도형을 활용한 이차방정식' 고난이도 문항을 집중적으로 풀리면서, 계산 속도와 정확성을 높이는 훈련을 병행하겠습니다. ${name}이가 학원 생활을 즐거워하니 집에서도 많은 칭찬과 격려 부탁드립니다. 감사합니다!`);
    }, 2000);
  };

  return (
    <div>
      <h1 className="page-title">학부모 보고서 자동 생성</h1>
      <p className="page-subtitle">학생의 성적 추이와 학부모 성향을 반영한 맞춤형 카카오톡/문자 보고서를 10초 만에 생성합니다.</p>

      <div className="grid grid-cols-2 gap-6">
        {/* Left: Input Form */}
        <div className="card">
          <h2 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FileText size={20} color="var(--primary)" /> 보고서 설정
          </h2>

          <div className="input-group">
            <label className="input-label">학생 선택</label>
            {loading ? (
              <div style={{ padding: '0.75rem', display: 'flex', justifyContent: 'center', border: '1px solid var(--border)', borderRadius: '8px', background: 'white' }}>
                <Loader2 className="animate-spin text-muted" size={20} />
              </div>
            ) : (
              <select className="input-field" value={selectedStudent} onChange={e => setSelectedStudent(e.target.value)}>
                {students.map(s => (
                  <option key={s.id} value={s.id}>{s.name} ({s.school} {s.grade}) - 학부모: {s.parentType}, 목표: {s.goal}</option>
                ))}
              </select>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4" style={{ marginBottom: '1rem' }}>
            <div className="input-group" style={{ marginBottom: 0 }}>
              <label className="input-label">이번 시험 점수</label>
              <input type="number" className="input-field" defaultValue="85" />
            </div>
            <div className="input-group" style={{ marginBottom: 0 }}>
              <label className="input-label">이전 시험 점수</label>
              <input type="number" className="input-field" defaultValue="72" />
            </div>
          </div>

          <div className="input-group" style={{ marginBottom: '2rem' }}>
            <label className="input-label">교사 추가 코멘트 키워드 (선택)</label>
            <textarea 
              className="input-field" 
              rows="3" 
              placeholder="예: 수업태도 좋음, 단순 계산 실수 아쉬움, 집에서 칭찬 요망"
              value={keywords}
              onChange={e => setKeywords(e.target.value)}
            ></textarea>
          </div>

          <button 
            className="btn btn-primary w-full" 
            style={{ padding: '0.875rem', fontSize: '1rem', fontWeight: '600' }}
            onClick={handleGenerate}
            disabled={generating || loading || !selectedStudent}
          >
            {generating ? (
              <><Sparkles size={20} className="animate-spin" /> AI가 학부모 성향에 맞춰 작성 중...</>
            ) : (
              <><Sparkles size={20} /> AI 보고서 생성하기</>
            )}
          </button>
        </div>

        {/* Right: Result */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', background: '#F8FAFC' }}>
          <h2 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <MessageCircle size={20} color="var(--secondary)" /> 생성된 보고서
          </h2>

          <div style={{ flex: 1, background: 'white', borderRadius: '12px', border: '1px solid var(--border)', padding: '1.5rem', minHeight: '300px', display: 'flex', flexDirection: 'column' }}>
            {generating ? (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                <Sparkles size={32} color="#CBD5E1" style={{ marginBottom: '1rem', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
                <p style={{ fontWeight: '500' }}>데이터 분석 및 문구 다듬는 중...</p>
              </div>
            ) : report ? (
              <div className="animate-fade-in" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.75rem', background: '#FEF3C7', color: '#D97706', padding: '0.25rem 0.625rem', borderRadius: '6px', fontWeight: '600' }}>#학부모_맞춤</span>
                  <span style={{ fontSize: '0.75rem', background: 'rgba(55, 114, 255, 0.1)', color: 'var(--primary)', padding: '0.25rem 0.625rem', borderRadius: '6px', fontWeight: '600' }}>#성적향상_강조</span>
                  <span style={{ fontSize: '0.75rem', background: '#D1FAE5', color: '#059669', padding: '0.25rem 0.625rem', borderRadius: '6px', fontWeight: '600' }}>#긍정적_톤앤매너</span>
                </div>
                <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.7', fontSize: '0.9375rem', color: 'var(--text-main)', flex: 1 }}>
                  {report}
                </div>
                
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
                  <button className="btn btn-secondary" style={{ flex: 1 }}>
                    <Copy size={18} /> 복사하기
                  </button>
                  <button className="btn btn-primary" style={{ flex: 1, background: '#FEE500', color: '#000000', border: 'none' }} onMouseOver={e => e.currentTarget.style.opacity = '0.9'} onMouseOut={e => e.currentTarget.style.opacity = '1'}>
                    <Send size={18} /> 카카오톡 전송
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', textAlign: 'center' }}>
                <FileText size={48} color="#E2E8F0" style={{ marginBottom: '1rem' }} />
                <p style={{ fontWeight: '500' }}>좌측에서 학생을 선택하고 생성 버튼을 누르면<br/>이곳에 보고서가 표시됩니다.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
