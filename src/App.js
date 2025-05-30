import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import LoadingSpinner from './components/LoadingSpinner';

// ---------- Auth Pages ----------
const Login = lazy(() => import('./pages/Auth/Login'));
const ForgotPassword = lazy(() => import('./pages/Auth/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/Auth/ResetPassword'));

// ---------- Dashboard ----------
const MainDashboard = lazy(() => import('./pages/Dashboard/MainDashboard'));
const Reports = lazy(() => import('./pages/Dashboard/Reports'));

// ---------- Leads ----------
const LeadList = lazy(() => import('./pages/Leads/LeadList'));
const LeadDetail = lazy(() => import('./pages/Leads/LeadDetail'));
const LeadImport = lazy(() => import('./pages/Leads/LeadImport'));

// ---------- Campaigns ----------
const CampaignList = lazy(() => import('./pages/Campaigns/CampaignList'));
const CampaignDetail = lazy(() => import('./pages/Campaigns/CampaignDetail'));
const CampaignDashboard = lazy(() => import('./pages/Campaigns/CampaignDashboard'));

// ---------- Tasks ----------
const TaskBoard = lazy(() => import('./pages/Tasks/TaskBoard'));
const TaskDetail = lazy(() => import('./pages/Tasks/TaskDetail'));

// ---------- Communication ----------
const EmailBuilder = lazy(() => import('./pages/Communication/EmailBuilder'));
const SMSTemplates = lazy(() => import('./pages/Communication/SMSTemplates'));
const CallCenter = lazy(() => import('./pages/Communication/CallCenter'));

// ---------- Team ----------
const TeamList = lazy(() => import('./pages/Team/TeamList'));
const Attendance = lazy(() => import('./pages/Team/Attendance'));
const Performance = lazy(() => import('./pages/Team/Performance'));

// ---------- Settings ----------
const RoleManagement = lazy(() => import('./pages/Settings/RoleManagement'));
const SystemSettings = lazy(() => import('./pages/Settings/SystemSettings'));
const CustomFields = lazy(() => import('./pages/Settings/CustomFields'));

const App = () => {
  return (
    <Suspense fallback={<LoadingSpinner fullPage />}>
      <Routes>
        {/* ---------- Public/Auth Routes ---------- */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* ---------- Protected Routes with Layout ---------- */}
        <Route path="/" element={<Layout />}>
          {/* Dashboard */}
          <Route index element={<MainDashboard />} />
          <Route path="dashboard" element={<MainDashboard />} />
          <Route path="reports" element={<Reports />} />

          {/* Leads */}
          <Route path="leads">
            <Route index element={<LeadList />} />
            <Route path=":leadId" element={<LeadDetail />} />
            <Route path="import" element={<LeadImport />} />
          </Route>

          {/* Campaigns */}
          <Route path="campaigns">
            <Route index element={<CampaignList />} />
            <Route path=":campaignId" element={<CampaignDetail />} />
            <Route path="dashboard/:campaignId" element={<CampaignDashboard />} />
          </Route>

          {/* Tasks */}
          <Route path="tasks">
            <Route index element={<TaskBoard />} />
            <Route path=":taskId" element={<TaskDetail />} />
          </Route>

          {/* Communication */}
          <Route path="communication">
            <Route path="/communication/call-center" element={<CallCenter />} />
          <Route path="/communication/email-builder" element={<EmailBuilder />} />
          <Route path="/communication/sms-templates" element={<SMSTemplates />} />
          </Route>

          {/* Team */}
          <Route path="team">
            <Route index element={<TeamList />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="performance" element={<Performance />} />
          </Route>

          {/* Settings */}
          <Route path="settings">
            <Route path="roles" element={<RoleManagement />} />
            <Route path="system" element={<SystemSettings />} />
            <Route path="custom-fields" element={<CustomFields />} />
          </Route>
        </Route>

        {/* ---------- Fallback for Unknown Routes ---------- */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default App;
