import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Users, FileSearch, FileText, Settings, Bell, Search, Plus } from 'lucide-react';

const Layout = () => {
  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div style={{ width: '40px', height: '40px', background: 'var(--primary)', color: 'white', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Plus size={24} />
          </div>
        </div>
        
        <nav style={{ flex: 1, marginTop: '1rem', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <NavLink to="/" className={({isActive}) => isActive ? "nav-link active" : "nav-link"} title="대시보드">
            <LayoutDashboard size={22} />
            <span>대시보드</span>
          </NavLink>
          <NavLink to="/profile" className={({isActive}) => isActive ? "nav-link active" : "nav-link"} title="학생/학부모 DB">
            <Users size={22} />
            <span>학생/학부모 DB</span>
          </NavLink>
          <NavLink to="/analysis" className={({isActive}) => isActive ? "nav-link active" : "nav-link"} title="시험지 분석 및 추천">
            <FileSearch size={22} />
            <span>시험지 분석 및 추천</span>
          </NavLink>
          <NavLink to="/report" className={({isActive}) => isActive ? "nav-link active" : "nav-link"} title="학부모 보고서 생성">
            <FileText size={22} />
            <span>학부모 보고서 생성</span>
          </NavLink>
        </nav>
        
        <div style={{ marginTop: 'auto', width: '100%', display: 'flex', justifyContent: 'center' }}>
          <button className="nav-link" title="설정">
            <Settings size={22} />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-main)' }}>
              에이마스터 AI
            </div>
            <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.8125rem' }}>
              새 분석 시작 +
            </button>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div className="search-bar" style={{ display: 'flex', alignItems: 'center', background: '#F8FAFC', padding: '0.625rem 1rem', borderRadius: '12px', width: '260px', border: '1px solid var(--border)' }}>
              <Search size={16} color="var(--text-muted)" />
              <input 
                type="text" 
                placeholder="학생 이름 검색..." 
                style={{ background: 'transparent', border: 'none', outline: 'none', marginLeft: '0.5rem', width: '100%', fontSize: '0.875rem' }}
              />
            </div>
            
            <button style={{ position: 'relative', color: 'var(--text-muted)' }}>
              <Bell size={20} />
              <span style={{ position: 'absolute', top: '-0.125rem', right: '-0.125rem', width: '8px', height: '8px', background: 'var(--error)', borderRadius: '50%', border: '2px solid white' }}></span>
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
              <img src="https://ui-avatars.com/api/?name=W&background=3772FF&color=fff&rounded=true" alt="Profile" style={{ width: '36px', height: '36px', borderRadius: '50%' }} />
            </div>
          </div>
        </header>

        <div className="page-container animate-fade-in" style={{ overflowY: 'auto' }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
