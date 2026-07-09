import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Activity,
  AlertCircle,
  BarChart3,
  BriefcaseBusiness,
  CalendarClock,
  Check,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  FileText,
  Filter,
  FolderLock,
  Home,
  ListChecks,
  LayoutDashboard,
  Lock,
  Mail,
  Pencil,
  Phone,
  Play,
  Plus,
  ReceiptText,
  Search,
  Server,
  ShieldCheck,
  Settings,
  Square,
  Tag,
  TimerReset,
  Trash2,
  Unlock,
  Utensils,
  UsersRound,
  X,
} from 'lucide-react';
import './styles.css';

const roles = {
  management: {
    label: 'Management',
    person: 'Ana Kovač',
    dept: 'Company',
    copy: 'Full access across HR, time, settings, approvals, and cost analytics.',
  },
  lead: {
    label: 'Team Lead',
    person: 'Marko Novak',
    dept: 'Development',
    copy: 'Department-level control for people, work types, entries, and corrections.',
  },
  operations: {
    label: 'Operations',
    person: 'Sara Kranjc',
    dept: 'Customer Support',
    copy: 'Own hours, own profile, current-day entries, and correction requests.',
  },
};

const platformProfiles = {
  laravel: {
    label: 'Laravel',
    stack: 'Laravel · React',
    owner: 'Laravel application',
    runtime: 'Laravel controllers, jobs and policies',
    api: 'Sanctum API /api/time-management',
    auth: 'Laravel policies + Sanctum',
    storage: 'Eloquent models + migrations',
    scheduler: 'Laravel Scheduler + queues',
    ui: 'React SPA with guarded routes',
    copy: 'Application mode for Laravel systems with React screens, API-first data flow and policy-backed permissions.',
  },
};

const people = [
  {
    id: 1,
    name: 'Ana Kovač',
    level: 'Management',
    department: 'Management',
    tags: ['Finance', 'Leadership'],
    employment: 'Full-time permanent',
    start: '2019-03-01',
    contract: 'Indefinite',
    personalId: '0103999505001',
    address: 'Trg republike 3, 1000 Ljubljana',
    postNumber: '1000',
    city: 'Ljubljana',
    taxNumber: 'SI12345678',
    email: 'ana.kovac@esm.local',
    phone: '+386 40 100 001',
    privateEmail: 'ana.kovac@example.com',
    contractValidity: 'Indefinite',
    medicalExamDate: '2025-04-12',
    medicalValidUntil: '2027-04-12',
    safetyTrainingDate: '2025-02-01',
    safetyValidUntil: '2027-02-01',
    compensationRows: [
      { id: 1, employmentType: 'Full-time permanent', workTypes: [], payType: 'Monthly salary', grossSalary: 4200, grossGrossCost: 6840, mealAllowance: 0, transportAllowance: 0, hourlyRate: 0, oneTimeAmount: 0 },
    ],
    medical: 'Valid until 2027-04-12',
    safety: 'Valid until 2027-02-01',
    cost: 6840,
    hours: 161,
    docs: 6,
  },
  {
    id: 2,
    name: 'Marko Novak',
    level: 'Team Lead',
    department: 'Development',
    leadDepartments: ['Development'],
    tags: ['Lead', 'Backend'],
    employment: 'Full-time permanent',
    start: '2021-06-14',
    contract: 'Indefinite',
    personalId: '1406991505002',
    address: 'Dunajska cesta 21, 1000 Ljubljana',
    postNumber: '1000',
    city: 'Ljubljana',
    taxNumber: 'SI23456789',
    email: 'marko.novak@esm.local',
    phone: '+386 40 100 002',
    privateEmail: 'marko.novak@example.com',
    contractValidity: 'Indefinite',
    medicalExamDate: '2024-12-09',
    medicalValidUntil: '2026-12-09',
    safetyTrainingDate: '2024-09-22',
    safetyValidUntil: '2026-09-22',
    compensationRows: [
      { id: 1, employmentType: 'Full-time permanent', workTypes: ['Development', 'Testing', 'Meeting'], payType: 'Monthly salary', grossSalary: 2550, grossGrossCost: 4120, mealAllowance: 0, transportAllowance: 0, hourlyRate: 0, oneTimeAmount: 0 },
      { id: 2, employmentType: 'Side work', workTypes: ['Work from home'], payType: 'Hourly rate', grossSalary: 0, grossGrossCost: 0, mealAllowance: 0, transportAllowance: 0, hourlyRate: 28, oneTimeAmount: 0 },
    ],
    medical: 'Valid until 2026-12-09',
    safety: 'Valid until 2026-09-22',
    cost: 4120,
    hours: 174,
    docs: 5,
  },
  {
    id: 3,
    name: 'Sara Kranjc',
    level: 'Operations',
    department: 'Customer Support',
    tags: ['Customer support', 'WFH eligible'],
    employment: 'Fixed-term',
    start: '2024-11-04',
    contract: 'Valid until 2026-11-04',
    personalId: '0411996505003',
    address: 'Celovska cesta 88, 1000 Ljubljana',
    postNumber: '1000',
    city: 'Ljubljana',
    taxNumber: 'SI34567890',
    email: 'sara.kranjc@esm.local',
    phone: '+386 40 100 003',
    privateEmail: 'sara.kranjc@example.com',
    contractValidity: '2026-11-04',
    medicalExamDate: '2024-10-18',
    medicalValidUntil: '2026-10-18',
    safetyTrainingDate: '2024-08-30',
    safetyValidUntil: '2026-08-30',
    compensationRows: [
      { id: 1, employmentType: 'Fixed-term', workTypes: [], payType: 'Monthly salary', grossSalary: 1700, grossGrossCost: 2740, mealAllowance: 0, transportAllowance: 0, hourlyRate: 0, oneTimeAmount: 0 },
    ],
    medical: 'Valid until 2026-10-18',
    safety: 'Valid until 2026-08-30',
    cost: 2740,
    hours: 156,
    docs: 4,
  },
  {
    id: 4,
    name: 'Nika Zupan',
    level: 'Operations',
    department: 'Operations',
    tags: ['Container unloading', 'Evening shift'],
    employment: 'Service contract',
    start: '2025-02-10',
    contract: 'Custom period',
    personalId: '1002998505004',
    address: 'Industrijska cesta 12, 3000 Celje',
    postNumber: '3000',
    city: 'Celje',
    taxNumber: 'SI45678901',
    email: 'nika.zupan@esm.local',
    phone: '+386 40 100 004',
    privateEmail: 'nika.zupan@example.com',
    contractValidity: 'Custom period',
    medicalExamDate: '2025-02-01',
    medicalValidUntil: '2026-07-29',
    safetyTrainingDate: '2025-01-10',
    safetyValidUntil: '2027-01-10',
    compensationRows: [
      { id: 1, employmentType: 'Side work', workTypes: ['Container unloading', 'Warehouse work'], payType: 'Hourly rate', grossSalary: 0, grossGrossCost: 0, mealAllowance: 0, transportAllowance: 0, hourlyRate: 16, oneTimeAmount: 0 },
      { id: 2, employmentType: 'Service contract', workTypes: [], payType: 'Project work', grossSalary: 0, grossGrossCost: 0, mealAllowance: 0, transportAllowance: 0, hourlyRate: 0, oneTimeAmount: 120, projectName: 'Weekend warehouse shift', projectStartDate: '2026-07-01', projectEndDate: '2026-07-31' },
    ],
    medical: 'Expires in 21 days',
    safety: 'Valid until 2027-01-10',
    cost: 2210,
    hours: 132,
    docs: 3,
  },
  {
    id: 5,
    name: 'Tim Ravnik',
    level: 'Operations',
    department: 'Marketing',
    tags: ['Content', 'Campaigns'],
    employment: 'Sole proprietor',
    start: '2023-08-21',
    contract: 'Valid until 2026-12-31',
    personalId: '2108992505005',
    address: 'Slovenska cesta 44, 1000 Ljubljana',
    postNumber: '1000',
    city: 'Ljubljana',
    taxNumber: 'SI56789012',
    email: 'tim.ravnik@esm.local',
    phone: '+386 40 100 005',
    privateEmail: 'tim.ravnik@example.com',
    contractValidity: '2026-12-31',
    medicalExamDate: '',
    medicalValidUntil: '',
    safetyTrainingDate: '2024-01-15',
    safetyValidUntil: '',
    compensationRows: [
      { id: 1, employmentType: 'Sole proprietor', workTypes: ['Marketing content'], payType: 'Hourly rate', grossSalary: 0, grossGrossCost: 0, mealAllowance: 0, transportAllowance: 0, hourlyRate: 32, oneTimeAmount: 0 },
    ],
    medical: 'Not required',
    safety: 'Completed',
    cost: 3860,
    hours: 148,
    docs: 2,
  },
  {
    id: 6,
    name: 'Ana Mlakar',
    level: 'Team Lead',
    department: 'Customer Support',
    tags: ['Lead', 'Escalations'],
    employment: 'Full-time permanent',
    start: '2020-01-13',
    contract: 'Indefinite',
    personalId: '1301990505006',
    address: 'Prešernova ulica 7, 2000 Maribor',
    postNumber: '2000',
    city: 'Maribor',
    taxNumber: 'SI67890123',
    email: 'ana.mlakar@esm.local',
    phone: '+386 40 100 006',
    privateEmail: 'ana.mlakar@example.com',
    contractValidity: 'Indefinite',
    medicalExamDate: '2024-12-13',
    medicalValidUntil: '2026-12-13',
    safetyTrainingDate: '2024-12-13',
    safetyValidUntil: '2026-12-13',
    compensationRows: [
      { id: 1, employmentType: 'Full-time permanent', workTypes: [], payType: 'Monthly salary', grossSalary: 2450, grossGrossCost: 3980, mealAllowance: 0, transportAllowance: 0, hourlyRate: 0, oneTimeAmount: 0 },
    ],
    medical: 'Valid until 2026-12-13',
    safety: 'Valid until 2026-12-13',
    cost: 3980,
    hours: 168,
    docs: 5,
  },
];

const workTypes = [
  { name: 'Customer support', department: 'Customer Support', paid: true, break: false, users: 'Customer Support + WFH tag', hours: 420, cost: 7480 },
  { name: 'Warehouse work', department: 'Operations', paid: true, break: false, users: 'Operations department', hours: 360, cost: 6120 },
  { name: 'Container unloading', department: 'Operations', paid: true, break: false, users: 'Container tag', hours: 122, cost: 2370 },
  { name: 'Marketing content', department: 'Marketing', paid: true, break: false, users: 'Marketing department', hours: 210, cost: 5250 },
  { name: 'Development', department: 'Development', paid: true, break: false, users: 'Development department', hours: 310, cost: 7900 },
  { name: 'Testing', department: 'Development', paid: true, break: false, users: 'Development department', hours: 145, cost: 3180 },
  { name: 'Meeting', department: 'All', paid: true, break: false, users: 'All employees', hours: 96, cost: 2120 },
  { name: 'Lunch break', department: 'All', paid: false, break: true, users: 'All employees', hours: 74, cost: 0 },
  { name: 'Work from home', department: 'All', paid: true, break: false, users: 'WFH eligible', hours: 188, cost: 4010 },
];

const departments = [
  { name: 'Management', lead: 'Ana Kovač', people: 1 },
  { name: 'Customer Support', lead: 'Petra Horvat', people: 2 },
  { name: 'Marketing', lead: 'No team lead assigned', people: 2 },
  { name: 'Development', lead: 'Marko Novak', people: 3 },
  { name: 'Operations', lead: 'Tomaž Bizjak', people: 2 },
];

const settingsTags = [
  { name: 'Backend', department: 'Development', workType: 'Development' },
  { name: 'Frontend', department: 'Development', workType: 'Development' },
  { name: 'Remote', department: 'All departments', workType: 'Work from home' },
  { name: 'Night shift', department: 'Operations', workType: 'Warehouse work' },
  { name: 'Container', department: 'Operations', workType: 'Container unloading' },
  { name: 'Seasonal', department: 'All departments', workType: 'All work types' },
  { name: 'Social', department: 'Marketing', workType: 'Marketing content' },
  { name: 'Content', department: 'Marketing', workType: 'Marketing content' },
  { name: 'QA', department: 'Development', workType: 'Testing' },
  { name: 'CS Lead', department: 'Customer Support', workType: 'Customer support' },
  { name: 'Warehouse', department: 'Operations', workType: 'Warehouse work' },
];

const managementSettingsWorkTypes = [
  { name: 'Customer support', department: 'Customer Support', paid: true, color: '#28a35a', tags: [] },
  { name: 'Order processing', department: 'Operations', paid: true, color: '#5b91f4' },
  { name: 'Warehouse work', department: 'Operations', paid: true, color: '#e9944a' },
  { name: 'Container unloading', department: 'Operations', paid: true, color: '#bf594f', tags: ['Container'] },
  { name: 'Marketing content', department: 'Marketing', paid: true, color: '#7b62d8', tags: ['Content'] },
  { name: 'Campaign management', department: 'Marketing', paid: true, color: '#f36c8c' },
  { name: 'Development', department: 'Development', paid: true, color: '#2bbdaf' },
  { name: 'Testing', department: 'Development', paid: true, color: '#5b91f4' },
  { name: 'Meeting', department: 'All departments', paid: true, color: '#75869a' },
  { name: 'Lunch break', department: 'All departments', paid: false, color: '#f5bd3f' },
  { name: 'Work from home', department: 'All departments', paid: true, color: '#28a35a' },
];

const leadSettingsWorkTypes = [
  { name: 'Development', department: 'Development', paid: true, color: '#2bbdaf' },
  { name: 'Testing', department: 'Development', paid: true, color: '#5b91f4' },
  { name: 'Administration', department: 'All departments', paid: true, color: '#9aa7b5' },
  { name: 'Meeting', department: 'All departments', paid: true, color: '#75869a' },
  { name: 'Lunch break', department: 'All departments', paid: false, color: '#f5bd3f' },
];

const operationsSettingsWorkTypes = [
  { name: 'Customer support', department: 'Assigned to you', paid: true, color: '#28a35a' },
  { name: 'Order processing', department: 'Assigned to you', paid: true, color: '#5b91f4' },
  { name: 'Meeting', department: 'All departments', paid: true, color: '#75869a' },
  { name: 'Lunch break', department: 'All departments', paid: false, color: '#f5bd3f' },
];

const PAY_TYPE_MONTHLY = 'Monthly salary';
const PAY_TYPE_PROJECT = 'Project work';
const PAY_TYPE_HOURLY = 'Hourly rate';
const payTypeOptions = [PAY_TYPE_MONTHLY, PAY_TYPE_PROJECT, PAY_TYPE_HOURLY].map((name) => ({ name }));

const employmentRules = [
  {
    id: 1,
    name: 'Full-time permanent',
    payType: PAY_TYPE_MONTHLY,
    requiresContract: true,
    requiresMedical: true,
    requiresSafety: true,
    cardFields: ['contract', 'medical', 'safety', 'cost'],
  },
  {
    id: 2,
    name: 'Fixed-term',
    payType: PAY_TYPE_MONTHLY,
    requiresContract: true,
    requiresMedical: true,
    requiresSafety: true,
    cardFields: ['contract', 'medical', 'safety', 'cost'],
  },
  {
    id: 3,
    name: 'Trial period',
    payType: PAY_TYPE_MONTHLY,
    requiresContract: true,
    requiresMedical: true,
    requiresSafety: true,
    cardFields: ['contract', 'medical', 'safety', 'cost'],
  },
  {
    id: 4,
    name: 'Service contract',
    payType: PAY_TYPE_PROJECT,
    requiresContract: true,
    requiresMedical: false,
    requiresSafety: false,
    cardFields: ['contract', 'projectAmount', 'hours', 'cost'],
  },
  {
    id: 5,
    name: 'Sole proprietor',
    payType: PAY_TYPE_HOURLY,
    requiresContract: true,
    requiresMedical: false,
    requiresSafety: false,
    cardFields: ['hourlyRate', 'hours', 'contract', 'cost'],
  },
  {
    id: 6,
    name: 'Side work',
    payType: PAY_TYPE_HOURLY,
    requiresContract: true,
    requiresMedical: false,
    requiresSafety: false,
    cardFields: ['hourlyRate', 'hours', 'contract', 'cost'],
  },
  {
    id: 7,
    name: 'Permanent',
    payType: PAY_TYPE_MONTHLY,
    requiresContract: true,
    requiresMedical: true,
    requiresSafety: true,
    cardFields: ['contract', 'medical', 'safety', 'cost'],
  },
];

function normalizeEmploymentRules(items) {
  return (Array.isArray(items) && items.length > 0 ? items : employmentRules).map((rule, index) => ({
    id: rule.id || index + 1,
    name: rule.name || 'Employment type',
    payType: [PAY_TYPE_MONTHLY, PAY_TYPE_PROJECT, PAY_TYPE_HOURLY].includes(rule.payType) ? rule.payType : PAY_TYPE_MONTHLY,
    requiresContract: rule.requiresContract !== false,
    requiresMedical: Boolean(rule.requiresMedical),
    requiresSafety: Boolean(rule.requiresSafety),
    cardFields: Array.isArray(rule.cardFields) && rule.cardFields.length > 0
      ? rule.cardFields
      : defaultRuleCardFields(rule.payType),
  })).filter((rule) => rule.name);
}

function defaultRuleCardFields(payType) {
  if (payType === PAY_TYPE_HOURLY) return ['hourlyRate', 'contract', 'cost'];
  if (payType === PAY_TYPE_PROJECT) return ['contract', 'projectAmount', 'cost'];
  return ['contract', 'medical', 'safety', 'cost'];
}

function normalizeSettingsTags(tags) {
  return (Array.isArray(tags) ? tags : settingsTags).map((tag) => (
    typeof tag === 'string'
      ? { name: tag, department: 'All departments', workType: 'All work types' }
      : {
          name: tag.name,
          department: tag.department || 'All departments',
          workType: tag.workType || 'All work types',
        }
  )).filter((tag) => tag.name);
}

function normalizeSettingsWorkTypes(types) {
  return (Array.isArray(types) ? types : []).map((type) => ({
    ...type,
    tags: Array.isArray(type.tags) ? type.tags : [],
    paid: type.paid !== false,
  }));
}

function activeTagNames(tagItems) {
  return Array.from(new Set(normalizeSettingsTags(tagItems).map((tag) => tag.name)));
}

function filterActiveTags(tags, tagItems) {
  const activeTags = new Set(activeTagNames(tagItems));
  return Array.from(new Set((Array.isArray(tags) ? tags : []).filter((tag) => activeTags.has(tag))));
}

function syncEmployeeTagsWithSettings(employeeItems, tagItems) {
  return employeeItems.map((person) => ({
    ...person,
    tags: filterActiveTags(person.tags, tagItems),
  }));
}

function normalizeDepartmentName(department) {
  if (department === 'Assigned to you' || department === 'All departments') return 'All';
  return department;
}

function canonicalDepartmentName(department) {
  const aliases = {
    Support: 'Customer Support',
    Warehouse: 'Operations',
  };
  return aliases[department] || department;
}

function workTypeMatchesPerson(type, person) {
  const typeDepartment = normalizeDepartmentName(type.department);
  const departmentMatches = typeDepartment === 'All' || canonicalDepartmentName(typeDepartment) === canonicalDepartmentName(person.department);
  const tags = Array.isArray(type.tags) ? type.tags.filter(Boolean) : [];
  const tagMatches = tags.length === 0 || tags.some((tag) => person.tags.includes(tag));
  return departmentMatches && tagMatches;
}

function departmentLeadNames(department) {
  if (Array.isArray(department.leads)) return department.leads;
  if (!department.lead || department.lead === 'No team lead assigned') return [];
  return department.lead.split(',').map((lead) => lead.trim()).filter(Boolean);
}

function departmentLeadCopy(department) {
  const leads = departmentLeadNames(department);
  if (leads.length === 0) return 'No team lead assigned';
  return `Lead · ${leads.join(', ')}`;
}

function canAssignDepartmentLead(person) {
  return person.level !== 'Management';
}

function employeeLeadDepartments(person) {
  return Array.isArray(person.leadDepartments) ? person.leadDepartments : [];
}

function leadDepartmentsFromSettings(person, departmentItems) {
  if (!person || !Array.isArray(departmentItems)) return [];
  return departmentItems
    .filter((department) => departmentLeadNames(department).includes(person.name))
    .map((department) => department.name);
}

function employeeLeadDepartmentScope(person, departmentItems) {
  return Array.from(new Set([
    ...employeeLeadDepartments(person),
    ...leadDepartmentsFromSettings(person, departmentItems),
  ].filter(Boolean)));
}

function syncEmployeesWithDepartmentLeads(employeeItems, departmentItems) {
  return employeeItems.map((person) => {
    const leadDepartments = employeeLeadDepartmentScope(person, departmentItems);
    if (leadDepartments.length === 0) return person;
    return {
      ...person,
      level: person.level === 'Management' ? person.level : 'Team Lead',
      leadDepartments,
    };
  });
}

function departmentInScope(department, scope) {
  return scope.some((item) => canonicalDepartmentName(item) === canonicalDepartmentName(department));
}

function resolveDepartmentName(department, departmentItems = departments) {
  const canonical = canonicalDepartmentName(department);
  const match = departmentItems.find((item) => canonicalDepartmentName(item.name) === canonical);
  return match?.name || canonical;
}

function normalizeEmployeeDepartments(employeeItems, departmentItems) {
  return employeeItems.map((person) => ({
    ...person,
    department: resolveDepartmentName(person.department, departmentItems),
    leadDepartments: employeeLeadDepartments(person).map((department) => resolveDepartmentName(department, departmentItems)),
  }));
}

function normalizeEntryDepartments(entryItems, departmentItems) {
  return entryItems.map((entry) => ({
    ...entry,
    department: resolveDepartmentName(entry.department, departmentItems),
  }));
}

function normalizeWorkTypeDepartments(typeItems, departmentItems) {
  return normalizeSettingsWorkTypes(typeItems).map((type) => {
    if (type.department === 'All departments' || type.department === 'Assigned to you') return type;
    return { ...type, department: resolveDepartmentName(type.department, departmentItems) };
  });
}

function normalizeTagDepartments(tagItems, departmentItems) {
  return normalizeSettingsTags(tagItems).map((tag) => {
    if (tag.department === 'All departments') return tag;
    return { ...tag, department: resolveDepartmentName(tag.department, departmentItems) };
  });
}

function syncDepartmentItemsWithEmployees(departmentItems, employeeItems) {
  const normalizedItems = departmentItems
    .map((department) => ({
      ...department,
      name: resolveDepartmentName(department.name, departments),
    }))
    .filter((department, index, items) => (
      items.findIndex((item) => canonicalDepartmentName(item.name) === canonicalDepartmentName(department.name)) === index
    ));
  const names = new Set(normalizedItems.map((department) => canonicalDepartmentName(department.name)));
  const missing = normalizeEmployeeDepartments(employeeItems, normalizedItems)
    .map((person) => person.department)
    .filter(Boolean)
    .filter((department, index, items) => (
      items.findIndex((item) => canonicalDepartmentName(item) === canonicalDepartmentName(department)) === index
      && !names.has(canonicalDepartmentName(department))
    ))
    .map((name) => ({ name, lead: 'No team lead assigned', leads: [] }));
  return [...normalizedItems, ...missing];
}

const baseEntries = [
  { id: 101, employee: 'Sara Kranjc', department: 'Customer Support', date: '2026-07-08', type: 'Customer support', start: '08:00', end: '11:45', hours: 3.75, status: 'Running eligible', source: 'Manual', workFromHome: true },
  { id: 102, employee: 'Sara Kranjc', department: 'Customer Support', date: '2026-07-08', type: 'Lunch break', start: '11:45', end: '12:15', hours: 0.5, status: 'Break', source: 'Tracked', break: true },
  { id: 107, employee: 'Sara Kranjc', department: 'Customer Support', date: '2026-07-06', type: 'Work from home', start: '13:00', end: '16:00', hours: 3, status: 'Locked', source: 'Tracked', workFromHome: true },
  { id: 103, employee: 'Marko Novak', department: 'Development', date: '2026-07-08', type: 'Development', start: '07:00', end: '13:30', hours: 6.5, status: 'Approved', source: 'Tracked' },
  { id: 104, employee: 'Nika Zupan', department: 'Operations', date: '2026-07-07', type: 'Container unloading', start: '14:00', end: '19:30', hours: 5.5, status: 'Unlocked', source: 'Correction' },
  { id: 105, employee: 'Tim Ravnik', department: 'Marketing', date: '2026-07-07', type: 'Marketing content', start: '09:30', end: '16:00', hours: 6.5, status: 'Locked', source: 'Tracked' },
  { id: 106, employee: 'Ana Mlakar', department: 'Customer Support', date: '2026-07-08', type: 'Meeting', start: '10:00', end: '12:00', hours: 2, status: 'Approved', source: 'Manual' },
];

const TODAY = localDate();
const YESTERDAY = relativeLocalDate(-1);
const DEFAULT_TABLE_FILTERS = {
  from: TODAY,
  to: TODAY,
  department: '',
  person: '',
};
const LUNCH_BREAK_TYPE = 'Lunch break';
const UNDEFINED_DEPARTMENT = 'Undefined department';
const MANUAL_UNLOCK_LABEL = 'Until manually locked';
const REQUEST_APPROVAL_OPTIONS = [
  { value: '10m', label: '10 min' },
  { value: '1h', label: '1 h' },
  { value: 'today', label: 'Today' },
  { value: 'manual', label: MANUAL_UNLOCK_LABEL },
];

const correctionLog = [
  { employee: 'Nika Zupan', date: '2026-07-07', change: 'Added 14:00-19:30 container unloading', by: 'Luka Horvat', state: 'Unlocked' },
  { employee: 'Sara Kranjc', date: '2026-07-06', change: 'Requested missing WFH block', by: 'Sara Kranjc', state: 'Pending review' },
  { employee: 'Tim Ravnik', date: '2026-07-03', change: 'Changed campaign work end time', by: 'Maja Novak', state: 'Locked' },
];

const baseDocuments = [
  { id: 201, employee: 'Ana Kovač', title: 'Employment contract', type: 'Contract', date: '2019-03-01', status: 'Stored locally' },
  { id: 202, employee: 'Marko Novak', title: 'Medical certificate', type: 'Medical', date: '2026-12-09', status: 'Valid' },
  { id: 203, employee: 'Sara Kranjc', title: 'Safety training', type: 'Safety', date: '2026-08-30', status: 'Valid' },
  { id: 204, employee: 'Nika Zupan', title: 'Service contract', type: 'Contract', date: '2026-07-07', status: 'Review soon' },
];

const timeManagementTabs = [
  { icon: CalendarClock, label: 'Time Management', tab: 'time', path: '/time-management' },
  { icon: BarChart3, label: 'Analytics', tab: 'analytics', path: '/analytics' },
  { icon: Settings, label: 'Settings', tab: 'settings', path: '/settings', requiresSettings: true },
  { icon: FolderLock, label: 'Correction log', tab: 'corrections', path: '/correction-log' },
];
const timeManagementTabIds = timeManagementTabs.map((item) => item.tab);
const employeeTabs = [
  { icon: UsersRound, label: 'Employees', tab: 'hr', path: '/employees' },
  { icon: BriefcaseBusiness, label: 'Departments', tab: 'hr-departments', path: '/employees/departments' },
  { icon: ListChecks, label: 'Rules', tab: 'hr-rules', path: '/employees/rules', requiresSettings: true },
  { icon: Tag, label: 'Tags', tab: 'hr-tags', path: '/employees/tags', requiresSettings: true },
];

const navGroups = [
  { title: 'Dashboard', items: [{ icon: LayoutDashboard, label: 'Dashboard', tab: 'dashboard', path: '/dashboard' }] },
  {
    title: 'Operations',
    items: [
      { icon: UsersRound, label: 'Employees', tab: 'hr', path: '/employees', children: employeeTabs },
      { icon: CalendarClock, label: 'Time Management', tab: 'time', path: '/time-management', children: timeManagementTabs },
    ],
  },
  {
    title: 'Records',
    items: [
      { icon: FileText, label: 'Documentation', tab: 'documentation', path: '/documentation' },
    ],
  },
];

const navItems = navGroups.flatMap((group) => group.items);
const routeItems = [...navItems, ...timeManagementTabs, ...employeeTabs];
const pathByTab = Object.fromEntries(routeItems.map((item) => [item.tab, item.path]));
const tabByPath = Object.fromEntries(routeItems.map((item) => [item.path, item.tab]));
const DEFAULT_TAB = 'time';

function normalizeRoutePath(pathname) {
  const path = pathname.replace(/\/+$/, '') || '/';
  return path === '/index.html' ? '/' : path;
}

function tabFromLocation(fallbackTab = DEFAULT_TAB) {
  const path = normalizeRoutePath(window.location.pathname);
  if (path === '/') return pathByTab[fallbackTab] ? fallbackTab : DEFAULT_TAB;
  return tabByPath[path] || DEFAULT_TAB;
}

function routeForTab(tab) {
  return pathByTab[tab] || pathByTab[DEFAULT_TAB];
}

const documentationSections = [
  {
    title: 'Time management',
    intro: 'This area documents how users record, edit, filter, review, and audit working time in the prototype.',
    features: [
      {
        name: 'Live timer',
        howItWorks: 'The timer is started from the top bar after a work type is selected. While it is running, the work type, work-from-home toggle, and lunch-break toggle are locked so the saved record stays consistent with the started session.',
        userSteps: [
          'Select a work type in the top bar.',
          'Optionally enable Work from home or Lunch break before starting.',
          'Click Start to begin the timer.',
          'Click Stop to save the elapsed time as a time entry.',
        ],
        specifics: [
          'The selected work type is auto-filled from the current role scope when the previous selection is no longer available.',
          'Lunch break forces the work type to Lunch break and saves the entry as a break.',
          'The timer automatically stops at 23:59 on the tracked date.',
          'Saved tracked entries use the active role user, current local date, start time, end time, and elapsed duration.',
          'Tracked work-from-home entries use the source Tracked · WFH; other tracked entries use Tracked.',
        ],
        metrics: [
          'Elapsed time = now - session.startedAt',
          'Saved hours = max(round((stoppedAt - startedAt) / 3,600,000, 2), 0.01)',
        ],
      },
      {
        name: 'Manual time entries',
        howItWorks: 'Manual entries let permitted users add or edit a time record by employee, work type, date, start, end, and optional note. The form enforces role scope, work type eligibility, and date rules before saving.',
        userSteps: [
          'Open Time Management.',
          'Click Add manual entry or edit an existing row.',
          'Choose the employee, work type, date, start time, end time, and optional note.',
          'Click Save entry or Save changes.',
        ],
        specifics: [
          'Operations users can only create entries for themselves.',
          'Future dates are blocked.',
          'On today, start and end time cannot be later than the current local time.',
          'Past dates require edit permission: management and team leads can edit scoped past entries; operations users need an approved correction window.',
          'If the selected work type is not available for the selected employee department or tags, the entry cannot be saved.',
          'The End field includes a Now button that sets the end time to the current local browser time.',
          'If the end time is earlier than the start time, saved hours are clamped to 0 instead of rolling into the next day.',
          'Editing an entry writes an Edited record to the correction log.',
          'Deleting an entry writes a Deleted record to the correction log.',
          'Deleting a record always asks for confirmation: Are you sure you want to delete this record?',
        ],
        metrics: [
          'Manual entry hours = round(max(0, endMinutes - startMinutes) / 60, 2)',
          'Break flag = selected work type === Lunch break',
          'Work-from-home flag = selected work type === Work from home',
        ],
      },
      {
        name: 'Time entry filters',
        howItWorks: 'The table filters the visible time entries by date range and, for non-operations roles, by department and employee. The default date range is today, so Time Management opens with only current-day entries visible.',
        userSteps: [
          'Open Time Management.',
          'Review today\'s entries shown by default.',
          'Set From and To dates to narrow the period.',
          'For management or team lead roles, select a department and employee when needed.',
          'Click Clear to return to today and remove department or employee filters.',
        ],
        specifics: [
          'When no saved table filters exist, From and To are both set to today using the browser local date.',
          'If saved table filters have no complete date range, the app restores From and To to today on the next load.',
          'The Clear button resets From and To to today and clears department and employee selections.',
          'Each entry row shows the employee name with a compact department-colored pill beside the name instead of a separate Department column.',
          'Operations users only see their own entries, so department and employee filters are hidden.',
          'Filter options are built from the currently visible role scope.',
          'If a role change makes a department or employee filter invalid, that filter is cleared automatically.',
          'Rows are sorted chronologically by date, start time, end time, and id.',
          'The empty state says: No time entries match the current filters.',
        ],
        metrics: [
          'Filtered totals = sum(entries that pass active table filters)',
          'Role totals = sum(entries in active role scope before table filters)',
        ],
      },
      {
        name: 'Correction requests and unlock windows',
        howItWorks: 'Operations users request past-date edit access. Management and team leads can review requests, approve a temporary or manual unlock, decline with a reason, lock an approved window manually, or open a manual unlock directly.',
        userSteps: [
          'Operations user clicks Request correction.',
          'They choose a past date range and enter a reason.',
          'Management or team lead opens Time Management and reviews the request.',
          'Reviewer clicks Approve, chooses 10 min, 1 h, Today, or Until manually locked, or clicks Decline and enters a reason.',
          'Management or team lead can also click Unlock user, choose an employee and date range, and open access without a submitted request.',
          'When approved, the operations user can edit entries inside the approved date range until the window expires or is locked.',
        ],
        specifics: [
          'Correction requests require a reason before they can be sent.',
          'Correction requests cannot include future dates.',
          'Manual unlocks cannot include future dates.',
          'If From and To are entered in reverse order, the saved correction window is normalized to the earlier date first.',
          'Declining a request requires a decline reason.',
          'Approved 10 min and 1 h windows expire from the approval timestamp.',
          'Approved Today windows expire at 23:59 on the current local date.',
          'Until manually locked windows do not expire automatically.',
          'Expired approved requests are marked Locked by System.',
          'Active unlocks show the employee, date range, unlock expiry, and live time-left countdown.',
          'Operations users see their own pending and unlocked requests in My requests; when there are none, the empty state says: No requests yet.',
        ],
        metrics: [
          'Active unlock countdown = unlock.expiresAt - now',
          'Visible request count = count(pending or unlocked request records visible to the active reviewer scope)',
          'Locked entry count = count(visible entries where editable === false)',
        ],
      },
      {
        name: 'Role-based visibility',
        howItWorks: 'The role switcher previews three permission scopes: Management, Team Lead, and Operations. Every major view uses the active role to decide which people, time entries, settings, requests, and documents are visible.',
        userSteps: [
          'Use the role switcher in the top bar.',
          'Review how the sidebar content and tables change for the selected role.',
          'Use the available actions inside the current role scope.',
        ],
        specifics: [
          'Management sees company-wide people and entries.',
          'Team Lead sees entries and employees for the lead departments stored on their employee record.',
          'Operations sees only their own profile and time entries.',
          'Operations cannot manage settings or add employees, and the Settings subtab is hidden for operations.',
          'When the active role changes to operations while Settings is open, the app returns to the Time Management subtab and closes any settings modal.',
        ],
      },
      {
        name: 'Time Management subtabs',
        howItWorks: 'The Time Management sidebar item groups subtabs for the time-entry table, Analytics, Settings, and Correction log. The Time Management subtab is the table and correction workflow view.',
        userSteps: [
          'Open Time Management from the sidebar.',
          'Use the nested sidebar links to switch between Time Management, Analytics, Settings, and Correction log.',
          'Use the browser URL or Back and Forward buttons to return to a specific subtab.',
        ],
        specifics: [
          'The Time Management sidebar item remains highlighted while any Time Management subtab is open.',
          'Correction counts are not shown in the sidebar navigation.',
          'Operations users do not see the Settings subtab.',
          'The subtab URLs remain stable: /time-management, /analytics, /settings, and /correction-log.',
        ],
      },
    ],
  },
  {
    title: 'Analytics and metrics',
    intro: 'This area documents the dashboard, time, HR, and analytics metrics shown in the app.',
    features: [
      {
        name: 'Dashboard summary',
        howItWorks: 'Dashboard cards summarize the active role scope, show the active local timer, list locked entries and correction audit count, and show the five most recent visible entries.',
        userSteps: [
          'Open Dashboard.',
          'Switch role to change the visible scope.',
          'Click Add entry to open the manual entry modal.',
        ],
        specifics: [
          'The live timer panel shows 00:00:00 when no timer is running.',
          'The Records card uses all local document records stored in the browser, not only documents visible to the active role.',
          'Recent entries are the first five visible entries in the current in-memory order.',
        ],
        metrics: [
          'Records = count(all local document records)',
          'Locked entries = count(visible entries where editable === false)',
          'Corrections = count(correction records visible to the active role)',
        ],
      },
      {
        name: 'Total hours',
        howItWorks: 'Total hours summarize the hours field from visible time entries.',
        userSteps: [
          'Open Dashboard, the Time Management subtab, or the Analytics subtab.',
          'Switch role or apply table filters to change the visible scope.',
        ],
        specifics: [
          'Dashboard and Analytics use the active role scope.',
          'Time Management metric cards use the active table filters.',
        ],
        metrics: [
          'Total hours = Σ entry.hours for visible entries',
        ],
      },
      {
        name: 'Paid hours',
        howItWorks: 'Paid hours include only entries whose work type is configured as paid.',
        userSteps: [
          'Open Time Management or Dashboard.',
          'Review the Paid or Paid hours card.',
          'Change work type settings to affect whether future matching entries count as paid.',
        ],
        specifics: [
          'Lunch break is configured as unpaid and excluded from paid hours.',
          'Unknown or unpaid work types do not add to paid hours.',
        ],
        metrics: [
          'Paid hours = Σ entry.hours where workType.paid === true',
        ],
      },
      {
        name: 'Entry cost',
        howItWorks: 'Entry cost estimates real cost from visible paid time entries, mapped monthly or hourly compensation rows, and date-prorated project rows.',
        userSteps: [
          'Open the Time Management subtab as Management or Team Lead, or open the Analytics subtab in any role.',
          'Review the Cost or Cost by scope metric.',
          'Use filters or role scope to change which entries are included.',
        ],
        specifics: [
          'Operations users do not see the Time Management cost card.',
          'Operations users can see Cost by scope in Analytics for their own visible scope.',
          'Only paid work types contribute to entry cost.',
          'When an employee has multiple non-project compensation rows, management or the team lead must select the work types that belong to each non-project row.',
          'Project work is not mapped to work types. Project hours can be tracked through any paid work type.',
          'Project work cost is distributed evenly by calendar day between Project from and Project to.',
        ],
        metrics: [
          'Monthly entry cost = entry.hours × ((grossGrossCost + mealAllowance + transportAllowance) / max(monthlyWorkingDays × 8, 1))',
          'Hourly entry cost = entry.hours × hourlyRate',
          'Hourly row allowances = mealAllowance + transportAllowance once per matched row',
          'Project daily cost = projectValue / count(calendar days from Project from through Project to)',
          'Visible project cost = project daily cost × count(unique visible paid-entry dates inside the project date range)',
          'Total entry cost = Σ monthly entry cost + Σ hourly entry cost + hourly row allowances + Σ visible project cost',
        ],
      },
      {
        name: 'Average hours per employee',
        howItWorks: 'Analytics divides visible total hours by the number of visible people.',
        userSteps: [
          'Open Time Management, then open the Analytics subtab.',
          'Switch role to change the people and entries in scope.',
        ],
        specifics: [
          'The denominator is at least 1 to prevent division by zero.',
          'The label states Last 30 days, but the current prototype uses the visible local time entries rather than a dynamic 30-day server query.',
        ],
        metrics: [
          'Average hours per employee = round(total visible hours / max(visible people count, 1), 1)',
        ],
      },
      {
        name: 'Work type distribution',
        howItWorks: 'Analytics renders configured work types as bars based on the visible time-entry hours recorded for each work type.',
        userSteps: [
          'Open Time Management, then open the Analytics subtab.',
          'Review the Work type distribution list.',
        ],
        specifics: [
          'The bars use visible local time entries in the active role scope.',
          'Role scope controls which work types are shown.',
        ],
        metrics: [
          'Work type hours = Σ entry.hours where entry.type matches the work type',
          'Bar width = (work type hours / max visible work type hours) × 100%',
        ],
      },
      {
        name: 'Employee workload',
        howItWorks: 'Analytics shows each visible person with time-entry hours and real cost data.',
        userSteps: [
          'Open Time Management, then open the Analytics subtab.',
          'Review Employee workload in the right panel.',
        ],
        specifics: [
          'Role scope controls which employees are shown.',
          'The displayed cost is calculated from employee compensation rows and visible local time entries.',
          'The displayed hours are summed from visible local time entries linked by employee name.',
        ],
        metrics: [
          'Employee workload hours = Σ entry.hours where entry.employee matches the employee',
          'Workload cost bar width = (employee real cost / max visible employee real cost) × 100%',
        ],
      },
    ],
  },
  {
    title: 'Employees, settings, and tags',
    intro: 'This area documents administration features used to maintain local prototype records and access rules.',
    features: [
      {
        name: 'HR metrics',
        howItWorks: 'The Employees sidebar item groups role-scoped subtabs for Employees, Departments, Rules, and Tags. The metric cards show visible people, department scope, document counts, and the active platform owner for the active Employees area scope.',
        userSteps: [
          'Open Employees.',
          'Use the nested sidebar links to switch between Employees, Departments, Rules, and Tags.',
          'Switch role to compare Management, Team Lead, and Operations scope.',
        ],
        specifics: [
          'People visible is based on the active role scope and the active Employees filters.',
          'The Departments card is a scope indicator based on departments visible in the active Employees area scope.',
          'The Documents card sums each visible employee document count, refreshed from local document records linked by employee name when the employee is saved.',
          'System owner is currently Laravel because the platform profile is fixed in code.',
          'Operations users do not see the Rules or Tags subtabs because those libraries affect employee administration and cost logic.',
        ],
        metrics: [
          'People visible = count(people in active role scope that match the active Employees filters)',
          'Documents = Σ person.docs for filtered visible people',
          'Departments = count(departments visible in the active role scope)',
        ],
      },
      {
        name: 'Employee database',
        howItWorks: 'The Employees tab shows a compact employee table in the active role scope. The table displays the employee initials, name, department, role level, and employment type. Open setup items and contract end-date alerts are shown as an alert icon next to the employee name instead of as full-width messages. Hover or click the alert icon to review the notices in a small popover. Clicking a table row opens a tabbed employee record with Overview, Documents, Comments, and Archive / delete user sections. The employee edit form is organized into User info, Department and employment, Contract and compliance, and Compensation rows. The employee profile stores personal identity details, street address, post number, city, work email, phone number, private email, department and role level, segmentation tags, employment type, contract from/to dates, compliance dates, internal comments, compensation rows for each work arrangement, and active or archived status. Documents are separate local document records linked to the employee by name.',
        userSteps: [
          'Open Employees, then open the Employees subtab.',
          'Use Department, Level, or Tags in the Filter employees bar to narrow the employee table.',
          'Use Clear filters to return to every employee in the active role scope.',
          'Review the visible employee rows.',
          'Hover the alert icon beside an employee name to see missing setup items and contract end-date notices. The popover stays visible while the pointer is on the icon or popover, then closes automatically.',
          'Management and team leads can click Add employee, complete the employee form, and save a local profile.',
          'Click an employee row to open the employee record sidebar.',
          'Use Overview, Documents, Comments, and Archive / delete user at the top of the sidebar to switch between employee details, stored documents, internal comments, and administrative status actions.',
          'Management and team leads can edit the profile from the sidebar and save the employee.',
          'In the employee form User info section, enter the full name, then Address, Post number, and City on one row, Personal ID / EMŠO and Tax number on one row, and Work email, Phone number, and Private email on one row.',
          'Then enter department, role level, tags, employment type from Rules, start date, contract from and contract to dates, medical exam completion date, safety training completion and expiry dates, and compensation rows.',
          'Use Add row in Compensation rows to add another work arrangement. Select the employment type from the Rules list; the pay type and visible compensation fields follow that rule.',
          'Open Comments, enter an internal note, and click Add comment to store it on the employee record.',
          'Open Archive / delete user to archive an employee as inactive, restore an archived employee, or delete the employee and linked local records.',
        ],
        specifics: [
          'Department and level filters match exactly one selected value each.',
          'Department choices in employee filters and employee forms come from the same Departments records shown in the Departments subtab.',
          'Legacy department aliases are normalized on load: Support is shown as Customer Support and Warehouse is shown as Operations.',
          'The Tags filter is multi-select and shows only employees that have every selected tag.',
          'If no employees match the active role scope, the empty state says: No employees match the current scope.',
          'If employees exist in scope but filters exclude all of them, the empty state says: No employees match the current filters.',
          'Filter options are generated from employees already visible in the active role scope, so they do not expose people outside the active permission scope.',
          'The People visible and Documents metric cards update when Employees filters are active.',
          'Employee names are required and must be unique ignoring case.',
          'Saving an edited employee updates the selected employee record immediately, keeps the sidebar on that employee even when filters or role scope change, and persists the employee list in browser localStorage.',
          'When an employee is renamed, linked time entries, document records, correction records, active correction windows, department team lead assignments, role preview users, table person filters, active timers, and employee comment authors that used the old name are updated to the new name.',
          'Team lead users can add or edit employees only inside their lead department scope; the department field is fixed to the primary lead department from the Departments records.',
          'Management users can choose the employee department and can assign Management, Team Lead, or Operations role level.',
          'The employee add/edit form uses a compact four-column desktop layout with shorter inputs, separated section dividers with vertical padding above and below the upper dividers, smaller section headers, and row-based compliance fields so identity, department, contract, compliance, and compensation fields stay easier to scan. On narrow screens the fields collapse into a single-column layout.',
          'The employee table is intentionally limited to initials, name, department, role level, and employment type so operational scanning stays clean.',
          'Open rule to-dos and contract end-date notices in the employee table appear only as an alert icon next to the employee name. The popover lists the exact missing setup items or contract date notice and stays visible only while the pointer is on the icon or popover.',
          'Contract end-date notices appear 14 days before the Contract to date in both the employee table alert popover and the employee record Work setup list. On the Contract to date and after it, the notice becomes a critical red notice stating that the contract ended.',
          'The role level is shown as a compact pill in the employee table. The employee record sidebar uses a separate Active or Inactive status pill.',
          'The employee record sidebar uses a compact detail layout with smaller text, icons, avatar, rows, tabs, and spacing. It shows the employee summary, active or inactive status, role, department, employment type, start date, rule pay type, and segmentation tags.',
          'The Overview tab identity table shows Address, Post number, City, EMŠO / Personal ID, Tax number, and Private email. Name, role, department, employment type, work email, phone number, start date, pay type, and segmentation tags stay in the employee record sidebar so the Overview tab does not duplicate sidebar data.',
          'Address, Post number, City, Work email, Phone number, and Private email are optional fields stored directly on the employee record. Existing local employee records can remain blank until edited.',
          'For compatibility with older local records, the app still keeps a combined address value generated from Address, Post number, and City.',
          'The Overview tab Work setup list is a flat divided status list driven by the employee employment rule pay type. Monthly salary employees show the contract period and, when the rule requires them, Medical exam and Safety training details. Hourly rate and Project work employees show the contract period. Displayed employee record dates use day-month-year format.',
          'The Overview tab Compensation setup uses a flat divided table without an extra panel frame. It shows each compensation row by employment type, work types, cost details, and project period; on narrow screens the same fields stack with labels.',
          'The Contract and compliance form section is split into separate rows for Contract, Medical, and Safety training. Row controls align vertically so the Contract from field, Contract to field, and No end date button scan as one row.',
          'The Contract row stores Contract from and Contract to dates. Turning on No end date clears Contract to, disables that date input, and saves the contract as indefinite. Turning the button off restores an editable Contract to date seeded from Contract from, the employee start date, or today.',
          'Medical exam stores only the date the employee completed the exam in the Medical row. If the completed date is empty, the form shows a red inline warning with an alert icon under the date input.',
          'Safety training stores the completion date and the valid-until date in the Safety training row. If the completed date is empty, the form shows a red inline warning with an alert icon under the completed date input.',
          'The Comments tab stores internal employee comments with comment text, author, and local date. Operations users can view comments but the comment input and Add comment button are disabled for them.',
          'The Archive / delete user tab lets permitted users archive an employee without deleting data, restore an archived employee, or delete the employee record and linked local entries, documents, correction records, and unlock windows.',
          'Archived employees remain visible in the employee list and sidebar with an Inactive status.',
          'Archiving an employee stops that employee\'s active timer if one is running.',
          'The Documents tab lists local document records linked by employee name. It is intended for contracts, annexes, medical certificates, safety certificates, and other important employee files.',
          'If the employee has no linked documents, the Documents tab shows No documents stored and explains that contracts, annexes, certificates, and other important files will appear after they are added to local document records.',
          'Team lead assignments are stored on employee records as leadDepartments and are available in the employee record, but the compact Employees table does not show lead department details.',
          'Operations users cannot add employees. The Add employee button remains visible in the Employees tab but is disabled for Operations users.',
          'Employee tags can be selected only from the active Settings tag library.',
          'When an employee is loaded or saved, tags that are no longer active in Settings are removed from that employee record.',
          'Employee initials use the same name-based color everywhere the employee avatar appears, including the top bar, Dashboard recent records, Time Management entries, and Employees table.',
          'When an employee name or department is changed, matching local time entries, documents, correction records, active unlocks, table filters, and the active timer are updated to keep local records linked.',
          'Deleting an employee asks for confirmation: Are you sure you want to delete this employee and all linked local records?',
          'Deleting an employee removes linked local time entries, documents, correction records, active unlock windows, matching employee table filters, and any active timer for that employee.',
          'Compensation rows are stored on the employee profile. Each row selects an employment type from Rules. Monthly salary and Hourly rate rows can be mapped to one or more Time Management work types.',
          'The first compensation row is treated as the primary employment type. Changing the profile Employment type updates that first row, and changing the first row Employment type updates the profile Employment type.',
          'The employee table Employment type column shows the primary employee profile employment type selected from Rules.',
          'When an employee has more than one non-project compensation row, every non-project row must have at least one applicable work type selected so the app knows which cost applies to each entry.',
          'Monthly salary compensation rows let users enter gross salary, gross gross cost, meal allowance, transport allowance, and an optional note. Monthly hours are calculated automatically from the current month working days.',
          'Hourly rate rows show hourly rate, meal allowance, transport allowance, and note fields. Meal and transport values can be 0.',
          'Project work rows show project name, Project from, Project to, project value, and note fields. Project work applies to all paid work types for time tracking and does not use a work type selector. Project name and a valid date range are required. At least one row remains in the form.',
          'The selected employment type is matched to the Rules subtab and controls which compensation fields are shown in the employee form.',
          'If the selected rule requires medical exam or safety training and the employee is missing the matching dates, the employee table alert popover and record sidebar show an open to-do.',
          'If the selected rule requires an employment contract and neither the employee contract fields nor linked local document records show a contract, the employee table alert popover and record sidebar show an open to-do.',
          'Contract end-date notices use Contract to from the employee record, with older local records also checked through contract validity or contract text when an ISO date is available. The Work setup Contract period row shows the contract period as the main value and the contract end-date notice as supporting detail.',
        ],
        metrics: [
          'People visible = count(people in active role scope where department filter matches and level filter matches and every selected tag is present)',
          'Documents metric = Σ person.docs for filtered visible people, where person.docs is refreshed from local document records linked by employee name when the employee is saved',
          'Employee record Documents count = count(local document records linked to the employee name)',
          'The employee table does not display employee cost. Employee cost is still calculated in the employee record and analytics views from visible paid time entries and employee compensation rows.',
          'Monthly salary employee cost = Σ entry.hours × ((grossGrossCost + mealAllowance + transportAllowance) / max(monthlyWorkingDays × 8, 1)) for entries mapped to a monthly row',
          'Hourly rate employee cost = Σ entry.hours × hourlyRate for entries mapped to an hourly row + mealAllowance + transportAllowance once for each matched hourly row',
          'Project work employee cost = Σ ((projectValue / project calendar days) × unique visible paid-entry dates inside Project from and Project to)',
        ],
      },
      {
        name: 'Employment rules',
        howItWorks: 'The Rules subtab under Employees stores employment type rules. Each rule has a user-defined employment type name, a cost method, optional employee requirements, and an automatic employee card field set.',
        userSteps: [
          'Open Employees, then open the Rules subtab.',
          'Click Add employment type.',
          'Enter the employment type name.',
          'Choose Monthly salary, Project work, or Hourly rate as the cost method.',
          'Select whether the rule requires an employment contract, medical exam, and safety training.',
          'Save the rule, then assign that employment type on an employee profile.',
        ],
        specifics: [
          'Rules are hidden for Operations users.',
          'Employment type names are required and must be unique.',
          'Monthly salary defaults to requiring employment contract, medical exam, and safety training.',
          'Project work and Hourly rate default to requiring an employment contract only, but medical exam and safety training can be enabled manually.',
          'Rules assigned to employees cannot be deleted.',
          'Deleting an unassigned rule asks for confirmation: Are you sure you want to delete this employment rule?',
          'Renaming a rule updates employees that used the old employment type name.',
          'Rule requirements create employee to-dos; this prototype does not block saving an employee when a to-do is open.',
          'If no rules exist, the empty state says: No employment rules have been configured.',
        ],
        metrics: [
          'Employees on a rule card = count(visible people where person.employment matches the rule name)',
          'Monthly salary cost = Σ entry.hours × ((grossGrossCost + mealAllowance + transportAllowance) / max(monthlyWorkingDays × 8, 1)) for entries mapped to a monthly compensation row',
          'Hourly rate cost = Σ entry.hours × hourlyRate for entries mapped to an hourly compensation row + mealAllowance + transportAllowance once for each matched hourly row',
          'Project work cost = Σ ((projectValue / project calendar days) × unique visible paid-entry dates inside the project active date range)',
          'Open rule to-dos = required contract, medical exam, and safety training items that are missing from the employee profile or local document records',
        ],
      },
      {
        name: 'Departments',
        howItWorks: 'The Departments subtab under Employees is the source of truth for department names used by employees, employee filters, work types, tags, time records, lead scopes, and active timers. It shows an org-chart style view of departments in the active role scope and groups each department with its team leads, employees, and department tags.',
        userSteps: [
          'Open Employees, then open the Departments subtab.',
          'Management can add, edit, and delete departments.',
          'Review each department card to see assigned leads, employees in scope, and tags connected to that department.',
        ],
        specifics: [
          'On wider screens, department cards use a compact responsive grid so at least two cards can fit across when space allows.',
          'Only Management can manage departments.',
          'Team Lead and Operations roles can only see departments that are already inside their role scope.',
          'Department name is required and must be unique ignoring case.',
          'Department team leads can be selected from non-management employees.',
          'Saving a department synchronizes its selected team leads back to the matching employee leadDepartments field.',
          'The Team lead selector subtitle uses the employee leadDepartments scope first, then the employee home department when no lead scope exists.',
          'Renaming a department updates employees, lead department assignments, matching time records, matching work types, matching tags, department filters, and the active timer.',
          'Deleting a department asks for confirmation: Are you sure you want to delete this department? Users and existing time records in this department will be moved to Undefined department. Related work types and tags will be removed.',
          'Deleting a department moves matching employees and existing time records to Undefined department, adds Undefined department to the department list when needed, removes the deleted department from lead assignments, and removes related work types and tags.',
          'Employee department dropdowns, employee department filters, work type department choices, and tag department choices use the same Departments records.',
          'Tags shown on department cards are active tag library records whose department matches that department, displayed as compact tag chips with a tag icon.',
          'If no departments match the active scope, the empty state says: No departments match the current scope.',
        ],
        metrics: [
          'People on a department card = count(visible people where person.department matches the department)',
          'Leads on a department card = unique(department.leads plus employees whose leadDepartments include the department)',
          'Tags on a department card = count(active tags where tag.department matches the department)',
          'Department count = count(departments visible in the active role scope after department records and employee department values are synchronized)',
        ],
      },
      {
        name: 'Work types',
        howItWorks: 'Settings lets permitted users manage local work type definitions. Work type definitions control payroll inclusion, colors, tags, and work type availability.',
        userSteps: [
          'Open Time Management, then open the Settings subtab.',
          'Management and team leads can add, edit, and delete work types.',
          'Choose payroll status and optional tag visibility when adding a work type.',
        ],
        specifics: [
          'The Settings page contains work type records only; departments and tags are managed from Employees subtabs.',
          'Work type name and department are required.',
          'Work type department choices come from the same Departments records used by Employees. All departments is the only special shared-scope option.',
          'A concrete department must exist in Departments before a work type can be assigned to it.',
          'Team leads can add work types only for their own department.',
          'Unpaid work types are treated as break-type records for payroll cost purposes.',
          'Each work type row shows whether it is Paid or Unpaid and whether it applies to all tags or only selected tags.',
          'Work types with selected tags are visible only to users with a matching tag.',
          'If no tags exist, the Visible for tags picker says: No tags yet.',
          'Saving a work type makes it the selected top-bar timer work type.',
          'Renaming a work type updates existing time entries that used the old work type name.',
          'Deleting a work type asks for confirmation: Are you sure you want to delete this work type? Existing time records will stay unchanged.',
          'Deleting a work type removes it from settings but does not rewrite existing time records.',
        ],
        metrics: [
          'Payroll inclusion = workType.paid === true',
          'Work type visibility = department match + matching tag when tags exist',
        ],
      },
      {
        name: 'Tags',
        howItWorks: 'Tags define user attributes and optional work type restrictions. When a tag is attached to a work type, only users with that tag can select that work type.',
        userSteps: [
          'Open Employees, then open the Tags subtab.',
          'Click Add tag if your role can manage settings.',
          'Enter a tag name, department, and optional work type.',
          'Save the tag.',
        ],
        specifics: [
          'The Tags subtab groups tags by department and shows the number of visible employees in each department.',
          'Tags assigned to All departments are grouped separately from concrete department tags.',
          'Tags whose stored department is outside the visible department list are grouped under Other tags.',
          'Tag department choices come from the same Departments records used by Employees. All departments is the only special shared-scope option.',
          'A concrete department must exist in Departments before a tag can be assigned to it.',
          'Tags can apply to All work types or to one work type available in the selected department scope.',
          'Adding a tag to a specific work type also attaches that tag to matching management and team lead work type definitions.',
          'The Settings tag library is the source of truth for employee tags.',
          'Only active tags from Settings can be assigned to employees.',
          'Tag name and department are required.',
          'Team leads can add, edit, and delete tags only inside their own department.',
          'Renaming a tag updates matching tags on employees.',
          'Deleting a tag asks for confirmation: Are you sure you want to delete this tag? It will be removed from users and work types.',
          'Deleting a tag removes it from the tag library, users, and work type restrictions.',
          'If a department has no tags, its card says: No tags for this department.',
          'If no tags match the active scope, the empty state says: No tags match the current scope.',
          'Operations users cannot open the Settings subtab, so they cannot view or manage the tag library.',
        ],
        metrics: [
          'Department tag count = count(tags grouped under the visible department or All departments group)',
          'People in scope on a tag card = count(visible people in the department), or count(all visible people) for All departments',
        ],
      },
      {
        name: 'Correction log',
        howItWorks: 'The Correction log subtab shows visible audit records for unlocks, requests, edits, deletions, declines, and locks.',
        userSteps: [
          'Open Time Management, then open the Correction log subtab.',
          'Review the change, employee, date or date range, actor, and state.',
          'Switch role to change which audit records are visible.',
        ],
        specifics: [
          'Management sees all correction records.',
          'Team Lead sees records for employees in the visible people scope.',
          'Operations sees records for their own user and any employee visible in their role scope.',
          'The empty state says: No correction records in this scope.',
        ],
        metrics: [
          'Visible correction records = count(corrections visible to the active role)',
        ],
      },
    ],
  },
  {
    title: 'Prototype behavior and persistence',
    intro: 'This area documents non-production behaviors that are important when testing the prototype.',
    features: [
      {
        name: 'Local browser storage',
        howItWorks: 'The prototype stores app state in browser localStorage so the current role, role preview users, last tab fallback, employees, entries, corrections, settings, tags, documents, filters, and active timer can persist across reloads.',
        userSteps: [
          'Use the app normally.',
          'Reload the browser.',
          'The last saved local state is restored where possible, while the current URL decides which page opens.',
        ],
        specifics: [
          'Storage key: esm-time-management-local-v2.',
          'The saved tab is used only as a fallback when the app opens from the root path.',
          'Direct page URLs take priority over the saved tab.',
          'If localStorage is unavailable, the app continues with in-memory state.',
          'This is a prototype persistence layer, not a server database.',
          'Expired correction windows are not restored as active windows on reload.',
        ],
      },
      {
        name: 'Page navigation',
        howItWorks: 'Each main sidebar tab and nested Employees or Time Management subtab has a stable client-side URL path. Clicking navigation updates the browser address without a full reload, and direct page URLs open the matching view.',
        userSteps: [
          'Click a sidebar item to open a main page.',
          'Under Employees, click a nested sidebar subtab to open Employees, Departments, Rules, or Tags.',
          'Under Time Management, click a nested sidebar subtab to open a related workspace view.',
          'Copy or reload the browser URL to return to the same page.',
          'Use the browser Back and Forward buttons to move between recently opened pages.',
        ],
        specifics: [
          'Dashboard uses /dashboard.',
          'Employees uses /employees.',
          'Employee Departments uses /employees/departments.',
          'Employee Rules uses /employees/rules and is hidden for Operations users.',
          'Employee Tags uses /employees/tags and is hidden for Operations users.',
          'Time Management opens from the sidebar and uses /time-management for the table subtab.',
          'Analytics is a Time Management subtab and uses /analytics.',
          'Settings is a Time Management subtab, uses /settings, and is hidden for Operations users.',
          'Correction log is a Time Management subtab and uses /correction-log.',
          'Documentation uses /documentation.',
          'When an Operations user lands on Settings, the app redirects to the Time Management table subtab because Operations users cannot manage settings.',
          'When an Operations user lands on Employee Rules or Employee Tags, the app redirects to the Employees list because Operations users cannot manage settings records.',
          'Unknown routes fall back to Time Management.',
        ],
      },
      {
        name: 'Platform profile',
        howItWorks: 'The prototype currently uses the Laravel platform profile for system-owner labels and implementation copy.',
        userSteps: [
          'Review HR, Analytics, Settings, and Time Management copy.',
          'Use these labels as implementation context for a Laravel application mode.',
        ],
        specifics: [
          'Laravel mode references controllers, jobs, policies, Sanctum API access, Eloquent models, migrations, scheduler jobs, queues, and guarded React routes.',
          'The platform profile is not currently exposed through a user-facing platform switcher.',
        ],
      },
      {
        name: 'Documentation format',
        howItWorks: 'The Documentation tab uses structured feature blocks so behavior, user steps, specifics, and formulas are easy to scan.',
        userSteps: [
          'Open Documentation from the Records navigation group.',
          'Use the section index to jump to the needed topic.',
          'Read user steps as numbered actions and formulas as monospaced equation blocks.',
        ],
        specifics: [
          'Formula blocks use a compact one-line code-note style so calculations remain readable without decorative equation chrome.',
          'Every feature change should update the related documentation entry in the same change.',
        ],
      },
    ],
  },
];

const STORAGE_KEY = 'esm-time-management-local-v2';
const SAMPLE_CORRECTION_WINDOW = {
  employee: 'Nika Zupan',
  from: '2026-07-07',
  to: '2026-07-07',
  by: 'Ana Kovač',
};

function cx(...classes) {
  return classes.filter(Boolean).join(' ');
}

function money(value) {
  return new Intl.NumberFormat('sl-SI', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);
}

function compactValue(value, fallback = 'Not specified') {
  return value || fallback;
}

function employeeAddressParts(employee = {}) {
  const savedAddress = employee.address || '';
  if (employee.postNumber || employee.city || !savedAddress.includes(',')) {
    return {
      address: savedAddress,
      postNumber: employee.postNumber || '',
      city: employee.city || '',
    };
  }
  const [street, ...postCityParts] = savedAddress.split(',');
  const postCity = postCityParts.join(',').trim();
  const postCityMatch = postCity.match(/^(\S+)\s+(.+)$/);
  return {
    address: street.trim(),
    postNumber: postCityMatch?.[1] || '',
    city: postCityMatch?.[2] || postCity,
  };
}

function employeeFullAddress(employee = {}) {
  const parts = employeeAddressParts(employee);
  const postCity = [parts.postNumber, parts.city].filter(Boolean).join(' ');
  return [parts.address, postCity].filter(Boolean).join(', ');
}

function firstIsoDate(value) {
  return String(value || '').match(/\d{4}-\d{2}-\d{2}/)?.[0] || '';
}

function displayDate(dateValue) {
  const match = firstIsoDate(dateValue);
  if (!match) return dateValue || '';
  const [year, month, day] = match.split('-');
  return `${day}-${month}-${year}`;
}

function isoDateDiffDays(from, to) {
  if (!from || !to) return null;
  const start = new Date(`${from}T00:00:00`);
  const end = new Date(`${to}T00:00:00`);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return null;
  return Math.round((end - start) / 86400000);
}

function contractPeriodLabel(employee) {
  const from = employee.contractStartDate || employee.start || '';
  const to = employee.contractEndDate || firstIsoDate(employee.contractValidity || employee.contract);
  if (from && to) return `${displayDate(from)} to ${displayDate(to)}`;
  if (from) return `${displayDate(from)} to no end date`;
  if (to) return `Until ${displayDate(to)}`;
  return 'Not specified';
}

function employeeContractEndNotice(employee) {
  const contractEndDate = employee.contractEndDate || firstIsoDate(employee.contractValidity || employee.contract);
  const daysUntilContractEnd = isoDateDiffDays(TODAY, contractEndDate);
  if (daysUntilContractEnd === null || daysUntilContractEnd > 14) return null;
  return {
    date: contractEndDate,
    daysUntilEnd: daysUntilContractEnd,
    tone: daysUntilContractEnd <= 0 ? 'critical' : 'warning',
    text: daysUntilContractEnd <= 0
      ? `Contract ended on ${displayDate(contractEndDate)}`
      : `Contract ends in ${daysUntilContractEnd} day${daysUntilContractEnd === 1 ? '' : 's'} on ${displayDate(contractEndDate)}`,
  };
}

function elapsedDateParts(dateValue) {
  if (!dateValue) return '';
  const start = new Date(`${dateValue}T00:00:00`);
  const end = new Date(`${TODAY}T00:00:00`);
  if (Number.isNaN(start.getTime()) || start > end) return '';
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();
  if (days < 0) {
    months -= 1;
    days += new Date(end.getFullYear(), end.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  return `${years} y ${months} m ${days} d ago`;
}

function complianceDateSummary(dateValue) {
  return dateValue ? elapsedDateParts(dateValue) || 'Completed' : 'Not completed';
}

function workingDaysInMonth(dateValue = TODAY) {
  const [year, month] = dateValue.split('-').map(Number);
  const daysInMonth = new Date(year, month, 0).getDate();
  let workingDays = 0;
  for (let day = 1; day <= daysInMonth; day += 1) {
    const weekday = new Date(year, month - 1, day).getDay();
    if (weekday !== 0 && weekday !== 6) workingDays += 1;
  }
  return workingDays;
}

function monthlyWorkingHours(row) {
  const workingDays = Number(row.monthlyWorkingDays) || workingDaysInMonth(TODAY);
  return workingDays * 8;
}

function monthlyCompensationTotal(row) {
  return (Number(row.grossGrossCost) || 0) + (Number(row.mealAllowance) || 0) + (Number(row.transportAllowance) || 0);
}

function employeeCompensationRows(employee) {
  if (Array.isArray(employee.compensationRows) && employee.compensationRows.length > 0) {
    return employee.compensationRows.map((row, index) => ({
      id: row.id || index + 1,
      employmentType: row.employmentType || row.workType || employee.employment || 'Employment type',
      workTypes: Array.isArray(row.workTypes)
        ? row.workTypes
        : (row.workType && ![employee.employment, 'Employment', 'Work'].includes(row.workType) ? [row.workType] : []),
      payType: row.payType || 'Monthly salary',
      grossSalary: Number(row.grossSalary) || 0,
      grossGrossCost: Number(row.grossGrossCost) || 0,
      mealAllowance: Number(row.mealAllowance) || 0,
      transportAllowance: Number(row.transportAllowance) || 0,
      monthlyWorkingDays: Number(row.monthlyWorkingDays) || workingDaysInMonth(TODAY),
      hourlyRate: Number(row.hourlyRate) || 0,
      oneTimeAmount: Number(row.oneTimeAmount) || 0,
      projectName: row.projectName || '',
      projectStartDate: row.projectStartDate || '',
      projectEndDate: row.projectEndDate || '',
      note: row.note || '',
    }));
  }
  return [{
    id: 1,
    employmentType: employee.employment || 'Employment type',
    workTypes: [],
    payType: 'Monthly salary',
    grossSalary: 0,
    grossGrossCost: Number(employee.cost) || 0,
    mealAllowance: 0,
    transportAllowance: 0,
    monthlyWorkingDays: workingDaysInMonth(TODAY),
    hourlyRate: 0,
    oneTimeAmount: 0,
    projectName: '',
    projectStartDate: '',
    projectEndDate: '',
    note: '',
  }];
}

function findEmploymentRule(employee, ruleItems) {
  const normalizedRules = normalizeEmploymentRules(ruleItems);
  return normalizedRules.find((rule) => rule.name === employee.employment) || normalizedRules[0];
}

function sumCompensationRows(rows, field, payType) {
  return rows
    .filter((row) => !payType || row.payType === payType)
    .reduce((sum, row) => sum + (Number(row[field]) || 0), 0);
}

function daysInclusive(from, to) {
  if (!from || !to || from > to) return 0;
  const start = new Date(`${from}T00:00:00`);
  const end = new Date(`${to}T00:00:00`);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return 0;
  return Math.floor((end - start) / 86400000) + 1;
}

function projectRowCost(row, entries) {
  const projectDays = daysInclusive(row.projectStartDate, row.projectEndDate);
  if (!projectDays) return 0;
  const visibleProjectDates = new Set(entries
    .filter((entry) => entry.date >= row.projectStartDate && entry.date <= row.projectEndDate)
    .map((entry) => entry.date));
  return ((Number(row.oneTimeAmount) || 0) / projectDays) * visibleProjectDates.size;
}

function rowMatchesEntry(row, entry, fallback = false) {
  if (!entry) return false;
  const scopedTypes = Array.isArray(row.workTypes) ? row.workTypes.filter(Boolean) : [];
  if (scopedTypes.length === 0) return fallback;
  return scopedTypes.includes(entry.type);
}

function scopedEmployeeEntries(employee, entries = [], configuredTypes = []) {
  const paidByType = new Map(configuredTypes.map((type) => [type.name, type.paid !== false]));
  return entries.filter((entry) => (
    entry.employee === employee.name
    && entry.break !== true
    && paidByType.get(entry.type) !== false
  ));
}

function employeeRuleCost(employee, ruleItems, entries = [], configuredTypes = []) {
  const rows = employeeCompensationRows(employee);
  const employeeEntries = scopedEmployeeEntries(employee, entries, configuredTypes);
  const projectRows = rows.filter((row) => row.payType === PAY_TYPE_PROJECT);
  const timeRows = rows.filter((row) => row.payType !== PAY_TYPE_PROJECT);
  const scopedRows = timeRows.filter((row) => row.workTypes.length > 0);
  const fallbackRows = timeRows.filter((row) => row.workTypes.length === 0);
  const timeCost = employeeEntries.reduce((sum, entry) => {
    const row = scopedRows.find((item) => rowMatchesEntry(item, entry, false))
      || fallbackRows.find((item) => rowMatchesEntry(item, entry, true));
    if (!row) return sum;
    if (row.payType === PAY_TYPE_HOURLY) {
      return sum + ((Number(row.hourlyRate) || 0) * (Number(entry.hours) || 0));
    }
    const monthlyTotal = monthlyCompensationTotal(row);
    if (!monthlyTotal) return sum;
    return sum + ((monthlyTotal / Math.max(monthlyWorkingHours(row), 1)) * (Number(entry.hours) || 0));
  }, 0);
  const matchedHourlyRows = timeRows.filter((row) => (
    row.payType === PAY_TYPE_HOURLY
    && employeeEntries.some((entry) => rowMatchesEntry(row, entry, row.workTypes.length === 0))
  ));
  const allowances = matchedHourlyRows.reduce((sum, row) => (
    sum + (Number(row.mealAllowance) || 0) + (Number(row.transportAllowance) || 0)
  ), 0);
  const projectCost = projectRows.reduce((sum, row) => sum + projectRowCost(row, employeeEntries), 0);
  return timeCost + allowances + projectCost;
}

function employeeCostFormula(employee, ruleItems) {
  const rule = findEmploymentRule(employee, ruleItems);
  if (rule?.payType === PAY_TYPE_HOURLY) return 'Hourly rate x time entries';
  if (rule?.payType === PAY_TYPE_PROJECT) return 'Project value / project days';
  return 'Monthly total / monthly hours x time entries';
}

function hasEmployeeContract(employee, documents) {
  const contractText = `${employee.contractStartDate || ''} ${employee.contractEndDate || ''} ${employee.contract || ''} ${employee.contractValidity || ''}`.toLowerCase();
  const hasContractField = contractText && !['pending', 'not specified'].some((word) => contractText.includes(word));
  const hasContractDocument = documents.some((document) => (
    document.employee === employee.name
    && ['contract', 'employment contract', 'service contract'].some((word) => `${document.type} ${document.title}`.toLowerCase().includes(word))
  ));
  return Boolean(hasContractField || hasContractDocument);
}

function employeeRuleTasks(employee, documents, ruleItems) {
  const rule = findEmploymentRule(employee, ruleItems);
  if (!rule) return [{ text: 'Assign an employment rule', tone: 'warning' }];
  const tasks = [];
  const contractEndNotice = employeeContractEndNotice(employee);
  if (rule.requiresContract && !hasEmployeeContract(employee, documents)) tasks.push({ text: 'Add employment contract', tone: 'warning' });
  if (contractEndNotice) {
    tasks.push({
      text: contractEndNotice.text,
      tone: contractEndNotice.tone,
    });
  }
  if (rule.requiresMedical && !employee.medicalExamDate) tasks.push({ text: 'Complete medical exam', tone: 'warning' });
  if (rule.requiresSafety && (!employee.safetyTrainingDate || !employee.safetyValidUntil)) tasks.push({ text: 'Complete safety training', tone: 'warning' });
  return tasks;
}

function employeeCardFacts(employee, documents, ruleItems, entries = [], configuredTypes = []) {
  const rule = findEmploymentRule(employee, ruleItems);
  const rows = employeeCompensationRows(employee);
  const fieldValues = {
    contract: { label: 'Contract', value: contractPeriodLabel(employee) },
    medical: { label: 'Medical', value: complianceDateSummary(employee.medicalExamDate) },
    safety: { label: 'Safety', value: employee.safetyTrainingDate ? `${complianceDateSummary(employee.safetyTrainingDate)}${employee.safetyValidUntil ? ` · until ${displayDate(employee.safetyValidUntil)}` : ''}` : 'Not completed' },
    cost: { label: 'Cost', value: money(employeeRuleCost(employee, ruleItems, entries, configuredTypes)) },
    hourlyRate: { label: 'Hourly rate', value: `${money(sumCompensationRows(rows, 'hourlyRate', PAY_TYPE_HOURLY) || sumCompensationRows(rows, 'hourlyRate'))} / h` },
    projectAmount: { label: 'Project amount', value: money(sumCompensationRows(rows, 'oneTimeAmount', PAY_TYPE_PROJECT) || sumCompensationRows(rows, 'oneTimeAmount')) },
  };
  return (rule?.cardFields || defaultRuleCardFields(rule?.payType))
    .map((field) => fieldValues[field])
    .filter(Boolean)
    .slice(0, 4);
}

function employeeStatus(employee) {
  return employee.status || 'Active';
}

function isArchivedEmployee(employee) {
  return employeeStatus(employee) === 'Archived';
}

function roleClassName(level) {
  if (level === 'Management') return 'management';
  if (level === 'Team Lead') return 'lead';
  return 'operations';
}

function EmployeeNotice({ tasks }) {
  const taskItems = tasks.map((task) => (typeof task === 'string' ? { text: task, tone: 'warning' } : task));
  const critical = taskItems.some((task) => task.tone === 'critical');
  return (
    <span
      className={`employee-notice ${critical ? 'critical' : ''}`}
      onClick={(event) => event.stopPropagation()}
    >
      <button
        className="employee-notice-button"
        type="button"
        aria-label="Show employee notice"
        onClick={(event) => event.stopPropagation()}
      >
        <AlertCircle size={16} />
      </button>
      <span className="employee-notice-popover" role="status">
        <span className="employee-notice-head">
          <strong>{critical ? 'Critical notice' : 'Employee notice'}</strong>
        </span>
        <span className="employee-notice-list">
          {taskItems.map((task) => <span className={task.tone === 'critical' ? 'critical' : ''} key={task.text}>{task.text}</span>)}
        </span>
      </span>
    </span>
  );
}

function employeeRequirementItems(employee, ruleItems) {
  const rule = findEmploymentRule(employee, ruleItems);
  const payType = rule?.payType || PAY_TYPE_MONTHLY;
  const contractEnd = contractPeriodLabel(employee);
  const contractEndNotice = employeeContractEndNotice(employee);
  const items = [
    { label: 'Work start', value: compactValue(displayDate(employee.start)), tone: 'neutral', icon: CalendarClock },
  ];

  if (payType === PAY_TYPE_MONTHLY) {
    items.push({
        label: 'Contract period',
      value: contractEnd,
      detail: contractEndNotice?.text || '',
      tone: contractEndNotice?.tone || (contractEnd === 'Not specified' ? 'warning' : 'neutral'),
      icon: contractEndNotice ? AlertCircle : FileText,
    });
    if (rule?.requiresMedical) {
      items.push({
        label: 'Medical exam',
        value: employee.medicalExamDate ? displayDate(employee.medicalExamDate) : 'Not completed',
        detail: employee.medicalExamDate ? complianceDateSummary(employee.medicalExamDate) : '',
        tone: employee.medicalExamDate ? 'success' : 'warning',
        icon: employee.medicalExamDate ? Check : AlertCircle,
      });
    }
    if (rule?.requiresSafety) {
      items.push({
        label: 'Safety training',
        value: employee.safetyTrainingDate ? `${displayDate(employee.safetyTrainingDate)}${employee.safetyValidUntil ? ` to ${displayDate(employee.safetyValidUntil)}` : ''}` : 'Not completed',
        detail: employee.safetyValidUntil ? `Valid until ${displayDate(employee.safetyValidUntil)}` : '',
        tone: employee.safetyTrainingDate ? 'success' : 'warning',
        icon: employee.safetyTrainingDate ? ShieldCheck : AlertCircle,
      });
    }
    return items;
  }

  items.push({
    label: 'Work end',
    value: contractEnd,
    tone: contractEnd === 'Not specified' ? 'warning' : 'neutral',
    icon: CalendarClock,
  });
  return items;
}

function initials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function getPersonColor(name) {
  const colors = ['#4f8df7', '#2bbdaf', '#c7584b', '#ec6f9a', '#55b884', '#7b62d8', '#e9944a', '#5b91f4', '#75869a'];
  const index = name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0) % colors.length;
  return colors[index];
}

function personAvatarStyle(name) {
  return { backgroundColor: getPersonColor(name) };
}

const departmentColors = {
  Management: { color: '#c7584b', background: '#fff0ed', border: '#f3c7c0' },
  Development: { color: '#1c978c', background: '#e8f8f6', border: '#bdebe5' },
  'Customer Support': { color: '#218650', background: '#eaf8ef', border: '#c4ebd1' },
  Operations: { color: '#3f72d8', background: '#eef4ff', border: '#cbdcff' },
  Marketing: { color: '#6d55c8', background: '#f1edff', border: '#d9d1fb' },
};

function departmentPillStyle(department) {
  const colors = departmentColors[canonicalDepartmentName(department)] || {
    color: '#526070',
    background: '#eef3f6',
    border: '#dce5ec',
  };
  return {
    '--department-pill-color': colors.color,
    '--department-pill-bg': colors.background,
    '--department-pill-border': colors.border,
  };
}

function activeCorrectionWindows(correctionWindows) {
  const now = Date.now();
  return correctionWindows.filter((window) => !window.expiresAt || window.expiresAt > now);
}

function isUserDateUnlocked(correctionWindows, employee, date) {
  if (isFutureDate(date)) return false;
  if (date === TODAY) return true;
  return activeCorrectionWindows(correctionWindows).some((window) => window.employee === employee && window.from <= date && date <= window.to);
}

function canEditEntryDate(role, correctionWindows, employee, date) {
  if (isFutureDate(date)) return false;
  if (date === TODAY) return true;
  if (role === 'management' || role === 'lead') return true;
  return isUserDateUnlocked(correctionWindows, employee, date);
}

function compareEntriesChronologically(first, second) {
  return `${first.date} ${first.start || '00:00'} ${first.end || '00:00'} ${first.id}`.localeCompare(`${second.date} ${second.start || '00:00'} ${second.end || '00:00'} ${second.id}`);
}

function localDate(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function relativeLocalDate(dayOffset) {
  const date = new Date();
  date.setDate(date.getDate() + dayOffset);
  return localDate(date);
}

function localTime(date = new Date()) {
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

function endOfTrackingDayMs(date) {
  const [year, month, day] = date.split('-').map(Number);
  return new Date(year, month - 1, day, 23, 59, 0, 0).getTime();
}

function approvalExpiry(option, from, to) {
  if (option === '10m') return Date.now() + (10 * 60 * 1000);
  if (option === '1h') return Date.now() + (60 * 60 * 1000);
  if (option === 'today') return endOfTrackingDayMs(TODAY);
  return null;
}

function approvalLabel(option) {
  return REQUEST_APPROVAL_OPTIONS.find((item) => item.value === option)?.label || MANUAL_UNLOCK_LABEL;
}

function parseCorrectionRange(dateRange) {
  const [from, to] = dateRange.split(' - ').map((value) => value.trim());
  return { from, to: to || from };
}

function requestKey(request) {
  return request.id || `${request.employee}|${request.date}|${request.change}|${request.by}`;
}

function formatUnlockUntil(window) {
  if (!window?.expiresAt) return MANUAL_UNLOCK_LABEL;
  const expiry = new Date(window.expiresAt);
  return `${localDate(expiry)} ${localTime(expiry)}`;
}

function unlockedUntilCopy(unlockedUntil) {
  const value = unlockedUntil || MANUAL_UNLOCK_LABEL;
  return value === MANUAL_UNLOCK_LABEL ? `Unlocked until manually locked` : `Unlocked until ${value}`;
}

function formatUnlockCountdown(expiresAt, now = Date.now()) {
  if (!expiresAt) return 'Manual unlock';
  const remainingSeconds = Math.max(0, Math.floor((expiresAt - now) / 1000));
  const days = Math.floor(remainingSeconds / 86400);
  const hours = Math.floor((remainingSeconds % 86400) / 3600);
  const minutes = Math.floor((remainingSeconds % 3600) / 60);
  const seconds = remainingSeconds % 60;
  return `${days} d ${hours} h ${minutes} m ${seconds} s`;
}

function minutesFromTime(time) {
  const [hours, minutes] = time.split(':').map(Number);
  return (hours * 60) + minutes;
}

function isFutureDate(date) {
  return Boolean(date) && date > TODAY;
}

function isFutureTimeOnToday(date, time) {
  if (!time || date !== TODAY) return false;
  return minutesFromTime(time) > minutesFromTime(localTime());
}

function isFutureEntryPoint(date, time) {
  return isFutureDate(date) || isFutureTimeOnToday(date, time);
}

function elapsedMs(session, tick) {
  if (!session?.startedAt) return 0;
  return Math.max(0, tick - session.startedAt);
}

function formatElapsed(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

function hoursFromMs(ms) {
  return Math.round((ms / 3600000) * 100) / 100;
}

function readStoredState() {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    if (!value) return {};
    const parsed = JSON.parse(value);
    return {
      ...parsed,
      correctionWindows: Array.isArray(parsed.correctionWindows)
        ? parsed.correctionWindows.filter((window) => (
          window.employee !== SAMPLE_CORRECTION_WINDOW.employee
          || window.from !== SAMPLE_CORRECTION_WINDOW.from
          || window.to !== SAMPLE_CORRECTION_WINDOW.to
          || window.by !== SAMPLE_CORRECTION_WINDOW.by
          || window.requestKey
          || window.expiresAt
        ))
        : parsed.correctionWindows,
    };
  } catch {
    return {};
  }
}

function initialTableFilters(storedFilters) {
  if (!storedFilters) return DEFAULT_TABLE_FILTERS;
  const hasStoredDateRange = Boolean(storedFilters.from && storedFilters.to);
  return {
    ...DEFAULT_TABLE_FILTERS,
    ...storedFilters,
    from: hasStoredDateRange ? storedFilters.from : TODAY,
    to: hasStoredDateRange ? storedFilters.to : TODAY,
  };
}

function writeStoredState(state) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Local storage can be unavailable in private or restricted browser modes.
  }
}

function App() {
  const stored = useMemo(readStoredState, []);
  const initialDepartmentItems = useMemo(() => (
    syncDepartmentItemsWithEmployees(stored.departmentItems || departments, stored.employees || people)
  ), [stored]);
  const initialTagItems = useMemo(() => (
    normalizeTagDepartments(stored.tagItems || settingsTags, initialDepartmentItems)
  ), [stored, initialDepartmentItems]);
  const initialEmployees = useMemo(() => (
    syncEmployeesWithDepartmentLeads(
      normalizeEmployeeDepartments(syncEmployeeTagsWithSettings(stored.employees || people, initialTagItems), initialDepartmentItems),
      initialDepartmentItems,
    )
  ), [stored, initialTagItems, initialDepartmentItems]);
  const [role, setRole] = useState(stored.role || 'management');
  const [rolePeople, setRolePeople] = useState(stored.rolePeople || {
    management: roles.management.person,
    lead: roles.lead.person,
    operations: roles.operations.person,
  });
  const platform = 'laravel';
  const [tab, setTab] = useState(() => tabFromLocation(stored.tab));
  const [employees, setEmployees] = useState(initialEmployees);
  const [entries, setEntries] = useState(() => normalizeEntryDepartments(stored.entries || baseEntries, initialDepartmentItems));
  const [documents, setDocuments] = useState(stored.documents || baseDocuments);
  const [corrections, setCorrections] = useState(stored.corrections || correctionLog);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWorkType, setSelectedWorkType] = useState(stored.selectedWorkType || '');
  const [tableFilters, setTableFilters] = useState(() => initialTableFilters(stored.tableFilters));
  const [activeSession, setActiveSession] = useState(stored.activeSession || null);
  const [wfh, setWfh] = useState(Boolean(stored.wfh));
  const [lunch, setLunch] = useState(Boolean(stored.lunch));
  const [correctionWindows, setCorrectionWindows] = useState(stored.correctionWindows || []);
  const [departmentItems, setDepartmentItems] = useState(initialDepartmentItems);
  const [managementTypes, setManagementTypes] = useState(() => normalizeWorkTypeDepartments(stored.managementTypes || managementSettingsWorkTypes, initialDepartmentItems));
  const [leadTypes, setLeadTypes] = useState(() => normalizeWorkTypeDepartments(stored.leadTypes || leadSettingsWorkTypes, initialDepartmentItems));
  const [tagItems, setTagItems] = useState(initialTagItems);
  const [employmentRuleItems, setEmploymentRuleItems] = useState(() => normalizeEmploymentRules(stored.employmentRuleItems || employmentRules));
  const [entryModal, setEntryModal] = useState(null);
  const [employeeModal, setEmployeeModal] = useState(null);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [settingsModal, setSettingsModal] = useState(null);
  const [ruleModal, setRuleModal] = useState(null);
  const [manualUnlockModal, setManualUnlockModal] = useState(false);
  const [correctionRequestModal, setCorrectionRequestModal] = useState(false);
  const [toast, setToast] = useState('');
  const [tick, setTick] = useState(Date.now());

  const activeRole = {
    ...roles[role],
    person: rolePeople[role] || roles[role].person,
  };
  const activePlatform = platformProfiles[platform];
  const isTracking = Boolean(activeSession);
  const currentCorrectionWindows = useMemo(() => activeCorrectionWindows(correctionWindows), [correctionWindows, tick]);
  const activePerson = useMemo(() => employees.find((person) => person.name === activeRole.person) || employees[0], [employees, activeRole.person]);
  const activeLeadDepartments = useMemo(() => {
    if (role !== 'lead' || !activePerson) return [];
    const leadDepartments = employeeLeadDepartmentScope(activePerson, departmentItems);
    return leadDepartments.length > 0 ? leadDepartments : [activeRole.dept];
  }, [role, activePerson, departmentItems, activeRole.dept]);
  const primaryLeadDepartment = activeLeadDepartments[0] || activeRole.dept;
  const canEditPeople = role !== 'operations';
  const canManageSettings = role !== 'operations';
  const visibleNavGroups = useMemo(() => navGroups.map((group) => ({
    ...group,
    items: group.items.map((item) => ({
      ...item,
      children: item.children?.filter((child) => !child.requiresSettings || canManageSettings),
    })),
  })).filter((group) => group.items.length > 0), [canManageSettings]);

  function navigateToTab(nextTab, options = {}) {
    const nextPath = routeForTab(nextTab);
    if (normalizeRoutePath(window.location.pathname) !== nextPath) {
      window.history[options.replace ? 'replaceState' : 'pushState']({}, '', nextPath);
    }
    setTab(nextTab);
  }

  useEffect(() => {
    writeStoredState({
      role,
      rolePeople,
      tab,
      employees,
      entries,
      documents,
      corrections,
      selectedWorkType,
      tableFilters,
      activeSession,
      wfh,
      lunch,
      correctionWindows: currentCorrectionWindows,
      departmentItems,
      managementTypes,
      leadTypes,
      tagItems,
      employmentRuleItems,
    });
  }, [role, rolePeople, tab, employees, entries, documents, corrections, selectedWorkType, tableFilters, activeSession, wfh, lunch, currentCorrectionWindows, departmentItems, managementTypes, leadTypes, tagItems, employmentRuleItems]);

  useEffect(() => {
    const routeTab = tabFromLocation(stored.tab);
    if (routeTab !== tab) {
      setTab(routeTab);
      return undefined;
    }
    if (normalizeRoutePath(window.location.pathname) !== routeForTab(routeTab)) {
      window.history.replaceState({}, '', routeForTab(routeTab));
    }

    const handlePopState = () => {
      setTab(tabFromLocation(DEFAULT_TAB));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (!activeSession) return undefined;
    setTick(Date.now());
    const timerId = window.setInterval(() => setTick(Date.now()), 1000);
    return () => window.clearInterval(timerId);
  }, [activeSession]);

  useEffect(() => {
    if (!correctionWindows.some((window) => window.expiresAt)) return undefined;
    const timerId = window.setInterval(() => setTick(Date.now()), 1000);
    return () => window.clearInterval(timerId);
  }, [correctionWindows]);

  useEffect(() => {
    if (role === 'operations' && tab === 'settings') {
      navigateToTab('time', { replace: true });
      setSettingsModal(null);
    }
    if (role === 'operations' && tab === 'hr-tags') {
      navigateToTab('hr', { replace: true });
    }
    if (role === 'operations' && tab === 'hr-rules') {
      navigateToTab('hr', { replace: true });
      setRuleModal(null);
    }
  }, [role, tab]);

  const visiblePeople = useMemo(() => {
    const scoped = role === 'management'
      ? employees
      : role === 'lead'
        ? employees.filter((person) => departmentInScope(person.department, activeLeadDepartments) || person.name === activeRole.person)
        : employees.filter((person) => person.name === activeRole.person);
    if (!searchQuery.trim()) return scoped;
    const query = searchQuery.toLowerCase();
    return scoped.filter((person) => [person.name, person.department, person.level, person.employment, ...person.tags].join(' ').toLowerCase().includes(query));
  }, [employees, role, activeLeadDepartments, activeRole.person, searchQuery]);
  const selectedEmployee = useMemo(() => (
    employees.find((person) => person.id === selectedEmployeeId) || null
  ), [employees, selectedEmployeeId]);

  useEffect(() => {
    if (selectedEmployeeId && !selectedEmployee) {
      setSelectedEmployeeId(null);
    }
  }, [selectedEmployeeId, selectedEmployee]);

  const visibleEntries = useMemo(() => {
    const scoped = role === 'management'
      ? entries
      : role === 'lead'
        ? entries.filter((entry) => departmentInScope(entry.department, activeLeadDepartments))
        : entries.filter((entry) => entry.employee === activeRole.person);
    if (!searchQuery.trim()) return scoped;
    const query = searchQuery.toLowerCase();
    return scoped.filter((entry) => [entry.employee, entry.department, entry.date, entry.type, entry.status, entry.source].join(' ').toLowerCase().includes(query));
  }, [entries, role, activeLeadDepartments, activeRole.person, searchQuery]);

  const tableFilterOptions = useMemo(() => {
    const departments = Array.from(new Set(visibleEntries.map((entry) => entry.department))).sort();
    const departmentScopedPeople = tableFilters.department
      ? visiblePeople.filter((person) => person.department === tableFilters.department)
      : visiblePeople;
    const people = Array.from(new Map(
      departmentScopedPeople.map((person) => [person.name, { name: person.name, meta: person.department }]),
    ).values());
    return { departments, people };
  }, [visibleEntries, visiblePeople, tableFilters.department]);

  const filteredEntries = useMemo(() => {
    return visibleEntries.filter((entry) => {
      const afterFrom = !tableFilters.from || entry.date >= tableFilters.from;
      const beforeTo = !tableFilters.to || entry.date <= tableFilters.to;
      const departmentMatch = role === 'operations' || !tableFilters.department || entry.department === tableFilters.department;
      const personMatch = role === 'operations' || !tableFilters.person || entry.employee === tableFilters.person;
      return afterFrom && beforeTo && departmentMatch && personMatch;
    }).sort(compareEntriesChronologically);
  }, [visibleEntries, tableFilters, role]);

  useEffect(() => {
    setTableFilters((current) => {
      const next = { ...current };
      if (role === 'operations') {
        next.department = '';
        next.person = '';
      } else {
        if (next.department && !tableFilterOptions.departments.includes(next.department)) next.department = '';
        if (next.person && !tableFilterOptions.people.some((person) => person.name === next.person)) next.person = '';
      }
      return next.from === current.from && next.to === current.to && next.department === current.department && next.person === current.person ? current : next;
    });
  }, [role, tableFilterOptions]);

  const configuredWorkTypes = useMemo(() => {
    const base = workTypes.map((type) => [type.name, type]);
    const configured = [...managementTypes, ...leadTypes].map((type) => [
      type.name,
      {
        name: type.name,
        department: type.department === 'All departments' || type.department === 'Assigned to you' ? 'All' : type.department,
        paid: type.paid,
        break: !type.paid || type.name === 'Lunch break',
        color: type.color,
        tags: Array.isArray(type.tags) ? type.tags : [],
        users: type.department === 'Assigned to you' ? primaryLeadDepartment : type.department,
      },
    ]);
    return Array.from(new Map([...base, ...configured]).values());
  }, [managementTypes, leadTypes, primaryLeadDepartment]);

  const visibleWorkTypes = useMemo(() => {
    if (role === 'management') return configuredWorkTypes;
    if (role === 'lead') return configuredWorkTypes.filter((type) => departmentInScope(normalizeDepartmentName(type.department), activeLeadDepartments) || normalizeDepartmentName(type.department) === 'All');
    if (!activePerson) return [];
    return configuredWorkTypes.filter((type) => workTypeMatchesPerson(type, activePerson));
  }, [configuredWorkTypes, role, activeLeadDepartments, activePerson]);

  const entryAssignableWorkTypes = useMemo(() => {
    if (role === 'management') return configuredWorkTypes;
    if (role === 'lead') return configuredWorkTypes.filter((type) => departmentInScope(normalizeDepartmentName(type.department), activeLeadDepartments) || normalizeDepartmentName(type.department) === 'All');
    return visibleWorkTypes;
  }, [configuredWorkTypes, visibleWorkTypes, role, activeLeadDepartments]);

  const totals = useMemo(() => {
    const workTypeByName = new Map(configuredWorkTypes.map((type) => [type.name, type]));
    const hours = visibleEntries.reduce((sum, entry) => sum + entry.hours, 0);
    const paidHours = visibleEntries.reduce((sum, entry) => {
      const workType = workTypeByName.get(entry.type);
      return workType?.paid ? sum + entry.hours : sum;
    }, 0);
    const entryCost = visiblePeople.reduce((sum, person) => (
      sum + employeeRuleCost(person, employmentRuleItems, visibleEntries, configuredWorkTypes)
    ), 0);
    const peopleCost = entryCost;
    const locked = visibleEntries.filter((entry) => !canEditEntryDate(role, currentCorrectionWindows, entry.employee, entry.date)).length;
    const correctionsCount = corrections.filter((item) => role === 'management' || item.employee === activeRole.person || visiblePeople.some((person) => person.name === item.employee)).length;
    return { hours, paidHours, entryCost, peopleCost, locked, corrections: correctionsCount };
  }, [visibleEntries, visiblePeople, corrections, currentCorrectionWindows, role, activeRole.person, configuredWorkTypes, employmentRuleItems]);

  const filteredTotals = useMemo(() => {
    const workTypeByName = new Map(configuredWorkTypes.map((type) => [type.name, type]));
    const hours = filteredEntries.reduce((sum, entry) => sum + entry.hours, 0);
    const paidHours = filteredEntries.reduce((sum, entry) => {
      const workType = workTypeByName.get(entry.type);
      return workType?.paid ? sum + entry.hours : sum;
    }, 0);
    const entryCost = visiblePeople.reduce((sum, person) => (
      sum + employeeRuleCost(person, employmentRuleItems, filteredEntries, configuredWorkTypes)
    ), 0);
    const locked = filteredEntries.filter((entry) => !canEditEntryDate(role, currentCorrectionWindows, entry.employee, entry.date)).length;
    return { ...totals, hours, paidHours, entryCost, locked };
  }, [filteredEntries, currentCorrectionWindows, configuredWorkTypes, totals]);

  const visibleCorrectionRequests = useMemo(() => {
    if (role === 'operations') return [];
    return corrections.filter((item) => (
      ['Pending review', 'Unlocked'].includes(item.state)
      && item.change.startsWith('Requested edit access')
      && (role === 'management' || visiblePeople.some((person) => person.name === item.employee))
    ));
  }, [corrections, role, visiblePeople]);

  const myCorrectionRequests = useMemo(() => {
    if (role !== 'operations') return [];
    return corrections.filter((item) => (
      item.employee === activeRole.person
      && item.change.startsWith('Requested edit access')
      && ['Pending review', 'Unlocked'].includes(item.state)
    ));
  }, [corrections, role, activeRole.person]);
  const visibleCorrectionWindows = useMemo(() => {
    if (role === 'operations') {
      return currentCorrectionWindows.filter((window) => window.employee === activeRole.person);
    }
    const visibleNames = new Set(visiblePeople.map((person) => person.name));
    return currentCorrectionWindows.filter((window) => role === 'management' || visibleNames.has(window.employee));
  }, [currentCorrectionWindows, role, activeRole.person, visiblePeople]);

  const trackerAvailableWorkTypes = useMemo(() => {
    if (role === 'management') return visibleWorkTypes;
    if (!activePerson) return [];
    return visibleWorkTypes.filter((type) => workTypeMatchesPerson(type, activePerson));
  }, [visibleWorkTypes, role, activePerson]);
  const trackerWorkType = lunch ? LUNCH_BREAK_TYPE : selectedWorkType;
  const canStart = Boolean(trackerWorkType) && !isTracking;
  const trackerControlsDisabled = isTracking;
  const trackerDisplayWorkType = activeSession?.type || trackerWorkType;
  const trackerWfhActive = activeSession ? Boolean(activeSession.workFromHome) : wfh;
  const trackerLunchActive = activeSession ? Boolean(activeSession.break) : lunch;
  const trackerElapsedLabel = formatElapsed(elapsedMs(activeSession, tick));

  useEffect(() => {
    if (lunch || trackerControlsDisabled || trackerAvailableWorkTypes.length === 0) return;
    if (!trackerAvailableWorkTypes.some((type) => type.name === selectedWorkType)) {
      setSelectedWorkType(trackerAvailableWorkTypes[0].name);
    }
  }, [trackerAvailableWorkTypes, selectedWorkType, lunch, trackerControlsDisabled]);

  useEffect(() => {
    if (!activeSession) return;
    const autoStopAt = endOfTrackingDayMs(activeSession.date);
    if (tick >= autoStopAt) {
      stopActiveSession(autoStopAt, true);
    }
  }, [activeSession, tick]);

  useEffect(() => {
    const expired = correctionWindows.filter((window) => window.expiresAt && window.expiresAt <= tick);
    if (expired.length === 0) return;
    setCorrectionWindows((items) => items.filter((window) => !window.expiresAt || window.expiresAt > tick));
    setCorrections((items) => items.map((item) => {
      const expiredWindow = expired.find((window) => window.requestKey === requestKey(item));
      return expiredWindow ? { ...item, state: 'Locked', lockedBy: 'System', lockedAt: localDate(), unlockedUntil: formatUnlockUntil(expiredWindow) } : item;
    }));
  }, [correctionWindows, tick]);

  function stopActiveSession(stoppedAt = Date.now(), automatic = false) {
    if (!activeSession) return;
    const endDate = new Date(stoppedAt);
    const duration = Math.max(hoursFromMs(stoppedAt - activeSession.startedAt), 0.01);
    addEntry({
      employee: activeSession.employee,
      department: activeSession.department,
      date: activeSession.date,
      type: activeSession.type,
      start: activeSession.start,
      end: localTime(endDate),
      hours: duration,
      status: activeSession.break ? 'Break' : 'Approved',
      source: activeSession.workFromHome ? 'Tracked · WFH' : 'Tracked',
      break: activeSession.break,
      workFromHome: activeSession.workFromHome,
    });
    setToast(automatic ? `Timer auto-stopped at 23:59: ${duration.toFixed(2)} h` : `Timer saved: ${duration.toFixed(2)} h`);
    setActiveSession(null);
  }

  function handlePrimaryTracker() {
    if (isTracking) {
      stopActiveSession();
      return;
    }

    if (trackerWorkType) {
      const person = visiblePeople.find((employee) => employee.name === activeRole.person) || visiblePeople[0];
      const startedAt = Date.now();
      setActiveSession({
        startedAt,
        employee: person.name,
        department: person.department,
        date: localDate(new Date(startedAt)),
        type: trackerWorkType,
        start: localTime(new Date(startedAt)),
        workFromHome: wfh,
        break: trackerWorkType === LUNCH_BREAK_TYPE,
      });
      setToast(`Timer started for ${trackerWorkType}`);
    }
  }

  function unlockCorrectionWindow({ employee, from, to }) {
    const normalizedFrom = from <= to ? from : to;
    const normalizedTo = from <= to ? to : from;
    if (isFutureDate(normalizedFrom) || isFutureDate(normalizedTo)) {
      setToast('Correction windows cannot include future dates');
      return;
    }
    const correctionWindow = {
      id: Date.now(),
      employee,
      from: normalizedFrom,
      to: normalizedTo,
      by: activeRole.person,
    };
    setCorrectionWindows((items) => [correctionWindow, ...items]);
    setCorrections((items) => [
      {
        employee,
        date: `${normalizedFrom} - ${normalizedTo}`,
        change: 'Correction window unlocked',
        by: activeRole.person,
        state: 'Unlocked',
      },
      ...items,
    ]);
    setToast(`${employee} unlocked from ${normalizedFrom} to ${normalizedTo}`);
  }

  function lockCorrectionWindow(windowId) {
    const window = correctionWindows.find((item) => item.id === windowId);
    setCorrectionWindows((items) => items.filter((item) => item.id !== windowId));
    if (window) {
      setCorrections((items) => [
        {
          employee: window.employee,
          date: `${window.from} - ${window.to}`,
          change: 'Correction window locked',
          by: activeRole.person,
          state: 'Locked',
        },
        ...items,
      ]);
      setToast(`${window.employee} locked from ${window.from} to ${window.to}`);
    }
  }

  function addEntry(entry) {
    setSearchQuery('');
    setEntries((items) => [
      {
        id: Date.now(),
        ...entry,
      },
      ...items,
    ]);
  }

  function saveEntry(form) {
    const start = form.start || '09:00';
    const end = form.end || '17:00';
    const hours = calculateHours(start, end);
    const employee = employees.find((person) => person.name === form.employee) || visiblePeople[0];
    const selectedType = configuredWorkTypes.find((type) => type.name === form.type);
    const payload = {
      employee: employee.name,
      department: employee.department,
      date: form.date,
      type: form.type,
      start,
      end,
      hours,
      status: form.date === TODAY ? 'Approved' : 'Correction',
      source: 'Manual',
      break: form.type === 'Lunch break',
      workFromHome: form.type === 'Work from home',
      note: form.note,
    };

    if (isFutureDate(payload.date)) {
      setToast('Future dates cannot be added');
      return;
    }

    if (isFutureEntryPoint(payload.date, payload.start) || isFutureEntryPoint(payload.date, payload.end)) {
      setToast('Time entries cannot go beyond now');
      return;
    }

    if (selectedType && employee && !workTypeMatchesPerson(selectedType, employee)) {
      setToast('This work type is not available for the selected employee');
      return;
    }

    if (!canEditEntryDate(role, currentCorrectionWindows, payload.employee, payload.date)) {
      setToast(role === 'operations'
        ? 'Only today can be edited. Send a correction request for past dates.'
        : 'Past entry must be unlocked for this user');
      return;
    }

    if (form.id) {
      setEntries((items) => items.map((entry) => (entry.id === form.id ? { ...entry, ...payload } : entry)));
      setCorrections((items) => [{ employee: payload.employee, date: payload.date, change: `Edited ${payload.start}-${payload.end} ${payload.type}`, by: activeRole.person, state: 'Edited' }, ...items]);
      setToast('Entry updated');
    } else {
      addEntry(payload);
      setToast('Manual entry added');
    }
    setEntryModal(null);
  }

  function deleteEntry(entryId) {
    const entry = entries.find((item) => item.id === entryId);
    if (entry && !canEditEntryDate(role, currentCorrectionWindows, entry.employee, entry.date)) {
      setToast(role === 'operations'
        ? 'Only today can be edited. Send a correction request for past dates.'
        : 'Past entry must be unlocked for this user');
      return;
    }
    const confirmed = window.confirm('Are you sure you want to delete this record?');
    if (!confirmed) {
      return;
    }
    setEntries((items) => items.filter((item) => item.id !== entryId));
    if (entry) {
      setCorrections((items) => [{ employee: entry.employee, date: entry.date, change: `Deleted ${entry.start}-${entry.end} ${entry.type}`, by: activeRole.person, state: 'Deleted' }, ...items]);
    }
    setToast('Entry deleted');
  }

  function requestCorrectionWindow(form) {
    const normalizedFrom = form.from <= form.to ? form.from : form.to;
    const normalizedTo = form.from <= form.to ? form.to : form.from;
    if (isFutureDate(normalizedFrom) || isFutureDate(normalizedTo)) {
      setToast('Correction requests cannot include future dates');
      return;
    }
    setCorrections((items) => [
      {
        employee: activeRole.person,
        id: Date.now(),
        date: `${normalizedFrom} - ${normalizedTo}`,
        change: `Requested edit access: ${form.note.trim()}`,
        by: activeRole.person,
        state: 'Pending review',
      },
      ...items,
    ]);
    setCorrectionRequestModal(false);
    setToast('Edit request sent');
  }

  function approveCorrectionRequest(request, duration) {
    const key = requestKey(request);
    const { from, to } = parseCorrectionRange(request.date);
    if (isFutureDate(from) || isFutureDate(to)) {
      setToast('Correction requests cannot include future dates');
      return;
    }
    const expiresAt = approvalExpiry(duration, from, to);
    const correctionWindow = {
      id: Date.now(),
      requestKey: key,
      employee: request.employee,
      from,
      to,
      by: activeRole.person,
      expiresAt,
      approvalMode: duration,
    };
    setCorrectionWindows((items) => [correctionWindow, ...items.filter((item) => item.requestKey !== key)]);
    setCorrections((items) => items.map((item) => (
      requestKey(item) === key
        ? {
            ...item,
            state: 'Unlocked',
            approvedBy: activeRole.person,
            approvedAt: localDate(),
            approvalMode: approvalLabel(duration),
            unlockExpiresAt: correctionWindow.expiresAt,
            unlockedUntil: formatUnlockUntil(correctionWindow),
          }
        : item
    )));
    setToast(`${request.employee} unlocked until ${formatUnlockUntil(correctionWindow)}`);
  }

  function declineCorrectionRequest(request, comment) {
    const reason = comment.trim();
    if (!reason) {
      setToast('Decline reason is required');
      return;
    }
    const key = requestKey(request);
    setCorrectionWindows((items) => items.filter((window) => window.requestKey !== key));
    setCorrections((items) => items.map((item) => (
      requestKey(item) === key
        ? { ...item, state: 'Declined', declinedBy: activeRole.person, declinedAt: localDate(), declineComment: reason }
        : item
    )));
    setToast(`Request declined for ${request.employee}`);
  }

  function lockApprovedCorrectionRequest(request) {
    const key = requestKey(request);
    const window = correctionWindows.find((item) => item.requestKey === key);
    setCorrectionWindows((items) => items.filter((item) => item.requestKey !== key));
    setCorrections((items) => items.map((item) => (
      requestKey(item) === key
        ? { ...item, state: 'Locked', lockedBy: activeRole.person, lockedAt: localDate(), unlockedUntil: window ? formatUnlockUntil(window) : item.unlockedUntil }
        : item
    )));
    setToast(`${request.employee} locked manually`);
  }

  function showToast(message) {
    setToast(message);
  }

  function addEmployee() {
    if (!canEditPeople) {
      showToast('Operations cannot add employees');
      return;
    }
    setSearchQuery('');
    setEmployeeModal({ mode: 'add' });
  }

  function editEmployee(employee) {
    if (!canEditPeople) {
      showToast('Operations cannot edit employees');
      return;
    }
    setEmployeeModal({ mode: 'edit', employee });
  }

  function saveEmployee(form) {
    if (!canEditPeople) {
      showToast('Operations cannot save employees');
      return;
    }
    const name = form.name.trim();
    if (!name) {
      showToast('Employee name is required');
      return;
    }
    const original = form.id ? employees.find((person) => person.id === form.id) : null;
    const duplicate = employees.some((person) => person.id !== form.id && person.name.toLowerCase() === name.toLowerCase());
    if (duplicate) {
      showToast('Employee name must be unique');
      return;
    }
    const department = resolveDepartmentName(form.department, departmentItems);
    const linkedName = original?.name || name;
    const linkedHours = entries
      .filter((entry) => entry.employee === linkedName)
      .reduce((sum, entry) => sum + (Number(entry.hours) || 0), 0);
    const linkedDocs = documents.filter((document) => document.employee === linkedName).length;
    const contractStartDate = form.contractStartDate || form.start;
    const contractEndDate = form.contractEndDate || '';
    const compensationRows = employeeCompensationRows({ ...form, cost: Number(form.cost) || 0 });
    const primaryEmployment = compensationRows[0]?.employmentType || form.employment.trim() || 'Not specified';
    const nextEmployeeBase = {
      id: form.id || Date.now(),
      name,
      level: form.level,
      department,
      tags: filterActiveTags(form.tags, tagItems),
      personalId: form.personalId.trim(),
      address: employeeFullAddress(form),
      postNumber: form.postNumber.trim(),
      city: form.city.trim(),
      taxNumber: form.taxNumber.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      privateEmail: form.privateEmail.trim(),
      employment: primaryEmployment,
      start: form.start,
      contractStartDate,
      contractEndDate,
      contract: contractPeriodLabel({ contractStartDate, contractEndDate, start: form.start }),
      contractValidity: contractEndDate,
      medicalExamDate: form.medicalExamDate,
      medicalValidUntil: '',
      safetyTrainingDate: form.safetyTrainingDate,
      safetyValidUntil: form.safetyValidUntil,
      medical: form.medicalExamDate ? complianceDateSummary(form.medicalExamDate) : 'Pending',
      safety: form.safetyTrainingDate ? `${complianceDateSummary(form.safetyTrainingDate)}${form.safetyValidUntil ? ` · until ${form.safetyValidUntil}` : ''}` : 'Pending',
      cost: Number(form.cost) || 0,
      hours: linkedHours,
      docs: linkedDocs,
      status: form.status || employeeStatus(original || {}),
      comments: Array.isArray(form.comments) ? form.comments : (original?.comments || []),
      compensationRows,
      leadDepartments: form.level === 'Team Lead'
        ? form.leadDepartments.map((item) => resolveDepartmentName(item, departmentItems))
        : [],
    };
    const nextEmployee = {
      ...nextEmployeeBase,
      cost: employeeRuleCost(nextEmployeeBase, employmentRuleItems, entries, configuredWorkTypes),
    };
    setEmployees((items) => (
      original
        ? items.map((person) => {
            const linkedComments = Array.isArray(person.comments)
              ? person.comments.map((comment) => (
                  comment.by === original.name ? { ...comment, by: nextEmployee.name } : comment
                ))
              : person.comments;
            return person.id === nextEmployee.id
              ? {
                  ...nextEmployee,
                  comments: Array.isArray(nextEmployee.comments)
                    ? nextEmployee.comments.map((comment) => (
                        comment.by === original.name ? { ...comment, by: nextEmployee.name } : comment
                      ))
                    : nextEmployee.comments,
                }
              : { ...person, comments: linkedComments };
          })
        : [nextEmployee, ...items]
    ));
    if (original) {
      setEntries((items) => items.map((entry) => (
        entry.employee === original.name
          ? { ...entry, employee: nextEmployee.name, department: nextEmployee.department }
          : entry
      )));
      setDocuments((items) => items.map((document) => (
        document.employee === original.name ? { ...document, employee: nextEmployee.name } : document
      )));
      setCorrections((items) => items.map((item) => (
        item.employee === original.name
          ? {
              ...item,
              employee: nextEmployee.name,
              by: item.by === original.name ? nextEmployee.name : item.by,
              approvedBy: item.approvedBy === original.name ? nextEmployee.name : item.approvedBy,
              declinedBy: item.declinedBy === original.name ? nextEmployee.name : item.declinedBy,
              lockedBy: item.lockedBy === original.name ? nextEmployee.name : item.lockedBy,
            }
          : {
              ...item,
              by: item.by === original.name ? nextEmployee.name : item.by,
              approvedBy: item.approvedBy === original.name ? nextEmployee.name : item.approvedBy,
              declinedBy: item.declinedBy === original.name ? nextEmployee.name : item.declinedBy,
              lockedBy: item.lockedBy === original.name ? nextEmployee.name : item.lockedBy,
            }
      )));
      setCorrectionWindows((items) => items.map((window) => (
        window.employee === original.name
          ? { ...window, employee: nextEmployee.name, by: window.by === original.name ? nextEmployee.name : window.by }
          : { ...window, by: window.by === original.name ? nextEmployee.name : window.by }
      )));
      setDepartmentItems((items) => items.map((department) => ({
        ...department,
        lead: department.lead === original.name ? nextEmployee.name : department.lead,
        leads: departmentLeadNames(department).map((lead) => (lead === original.name ? nextEmployee.name : lead)),
      })));
      setRolePeople((current) => Object.fromEntries(
        Object.entries(current).map(([key, value]) => [key, value === original.name ? nextEmployee.name : value]),
      ));
      setTableFilters((current) => (
        current.person === original.name ? { ...current, person: nextEmployee.name } : current
      ));
      setActiveSession((current) => (
        current?.employee === original.name ? { ...current, employee: nextEmployee.name, department: nextEmployee.department } : current
      ));
    }
    setSelectedEmployeeId(nextEmployee.id);
    setEmployeeModal(null);
    showToast(original ? `${nextEmployee.name} updated` : `${nextEmployee.name} added`);
  }

  function addEmployeeComment(employee, comment) {
    if (!canEditPeople) {
      showToast('Operations cannot add employee comments');
      return;
    }
    const text = comment.trim();
    if (!text) {
      showToast('Comment is required');
      return;
    }
    const nextComment = {
      id: Date.now(),
      text,
      by: activeRole.person,
      date: localDate(),
    };
    setEmployees((items) => items.map((person) => (
      person.id === employee.id
        ? { ...person, comments: [nextComment, ...(Array.isArray(person.comments) ? person.comments : [])] }
        : person
    )));
    showToast(`Comment added for ${employee.name}`);
  }

  function archiveEmployee(employee) {
    if (!canEditPeople) {
      showToast('Operations cannot archive employees');
      return;
    }
    setEmployees((items) => items.map((person) => (
      person.id === employee.id ? { ...person, status: 'Archived' } : person
    )));
    setActiveSession((current) => (
      current?.employee === employee.name ? null : current
    ));
    showToast(`${employee.name} archived`);
  }

  function restoreEmployee(employee) {
    if (!canEditPeople) {
      showToast('Operations cannot restore employees');
      return;
    }
    setEmployees((items) => items.map((person) => (
      person.id === employee.id ? { ...person, status: 'Active' } : person
    )));
    showToast(`${employee.name} restored`);
  }

  function deleteEmployee(employee) {
    if (!canEditPeople) {
      showToast('Operations cannot delete employees');
      return;
    }
    if (!window.confirm('Are you sure you want to delete this employee and all linked local records?')) return;
    setEmployees((items) => items.filter((person) => person.id !== employee.id));
    setEntries((items) => items.filter((entry) => entry.employee !== employee.name));
    setDocuments((items) => items.filter((document) => document.employee !== employee.name));
    setCorrections((items) => items.filter((item) => item.employee !== employee.name));
    setCorrectionWindows((items) => items.filter((window) => window.employee !== employee.name));
    setTableFilters((current) => (
      current.person === employee.name ? { ...current, person: '' } : current
    ));
    setActiveSession((current) => (
      current?.employee === employee.name ? null : current
    ));
    setSelectedEmployeeId(null);
    showToast(`${employee.name} deleted`);
  }

  function addTag() {
    if (!canManageSettings) return;
    setSettingsModal({ type: 'tag' });
  }

  function addDepartment() {
    if (role !== 'management') return;
    setSettingsModal({ type: 'department' });
  }

  function editDepartment(department) {
    if (role !== 'management') return;
    setSettingsModal({ type: 'department', item: department });
  }

  function saveDepartment(form) {
    const name = resolveDepartmentName(form.name.trim(), departments);
    const previousName = form.originalName;
    if (!name) {
      showToast('Department name is required');
      return;
    }
    if (departmentItems.some((department) => (
      canonicalDepartmentName(department.name) === canonicalDepartmentName(name)
      && canonicalDepartmentName(department.name) !== canonicalDepartmentName(previousName)
    ))) {
      showToast('Department already exists');
      return;
    }
    const eligibleLeadNames = new Set(employees.filter(canAssignDepartmentLead).map((person) => person.name));
    const leads = Array.isArray(form.leads) ? form.leads.filter((lead) => eligibleLeadNames.has(lead)) : [];
    const next = {
      name,
      lead: leads.length ? leads.join(', ') : 'No team lead assigned',
      leads,
      people: form.people || 0,
    };
    if (previousName) {
      setDepartmentItems((items) => items.map((department) => (
        canonicalDepartmentName(department.name) === canonicalDepartmentName(previousName) ? next : department
      )));
      setEmployees((items) => items.map((person) => {
        const wasInDepartment = canonicalDepartmentName(person.department) === canonicalDepartmentName(previousName);
        const isSelectedLead = leads.includes(person.name);
        const wasLeadForEditedDepartment = employeeLeadDepartments(person).some((department) => (
          canonicalDepartmentName(department) === canonicalDepartmentName(previousName)
          || canonicalDepartmentName(department) === canonicalDepartmentName(name)
        ));
        const renamedLeadDepartments = employeeLeadDepartments(person).map((department) => (
          canonicalDepartmentName(department) === canonicalDepartmentName(previousName) ? name : department
        ));
        const leadDepartmentsWithoutCurrent = renamedLeadDepartments.filter((department) => (
          canonicalDepartmentName(department) !== canonicalDepartmentName(name)
        ));
        const nextLeadDepartments = isSelectedLead
          ? Array.from(new Set([...leadDepartmentsWithoutCurrent, name]))
          : leadDepartmentsWithoutCurrent;
        return {
          ...person,
          department: wasInDepartment ? name : person.department,
          level: person.level === 'Management'
            ? person.level
            : (nextLeadDepartments.length > 0 ? 'Team Lead' : (wasLeadForEditedDepartment ? 'Operations' : person.level)),
          leadDepartments: nextLeadDepartments,
        };
      }));
      setEntries((items) => items.map((entry) => (
        canonicalDepartmentName(entry.department) === canonicalDepartmentName(previousName)
          ? { ...entry, department: name }
          : entry
      )));
      setManagementTypes((items) => items.map((type) => (
        canonicalDepartmentName(type.department) === canonicalDepartmentName(previousName) ? { ...type, department: name } : type
      )));
      setLeadTypes((items) => items.map((type) => (
        canonicalDepartmentName(type.department) === canonicalDepartmentName(previousName) ? { ...type, department: name } : type
      )));
      setTagItems((items) => items.map((tag) => (
        canonicalDepartmentName(tag.department) === canonicalDepartmentName(previousName) ? { ...tag, department: name } : tag
      )));
      setTableFilters((current) => (
        canonicalDepartmentName(current.department) === canonicalDepartmentName(previousName)
          ? { ...current, department: name }
          : current
      ));
      setActiveSession((current) => (
        current && canonicalDepartmentName(current.department) === canonicalDepartmentName(previousName)
          ? { ...current, department: name }
          : current
      ));
      showToast(`${next.name} updated`);
    } else {
      setDepartmentItems((items) => [next, ...items]);
      setEmployees((items) => items.map((person) => (leads.includes(person.name)
        ? { ...person, level: 'Team Lead', leadDepartments: Array.from(new Set([...employeeLeadDepartments(person), name])) }
        : person)));
      showToast(`${next.name} added`);
    }
    setSettingsModal(null);
  }

  function deleteDepartment(department) {
    if (role !== 'management') return;
    const confirmed = window.confirm('Are you sure you want to delete this department? Users and existing time records in this department will be moved to Undefined department. Related work types and tags will be removed.');
    if (!confirmed) return;
    setDepartmentItems((items) => {
      const withoutDeleted = items.filter((item) => canonicalDepartmentName(item.name) !== canonicalDepartmentName(department.name));
      if (withoutDeleted.some((item) => item.name === UNDEFINED_DEPARTMENT)) return withoutDeleted;
      return [...withoutDeleted, { name: UNDEFINED_DEPARTMENT, lead: 'No team lead assigned', leads: [] }];
    });
    setEmployees((items) => items.map((person) => ({
      ...person,
      department: canonicalDepartmentName(person.department) === canonicalDepartmentName(department.name)
        ? UNDEFINED_DEPARTMENT
        : person.department,
      leadDepartments: employeeLeadDepartments(person).filter((item) => canonicalDepartmentName(item) !== canonicalDepartmentName(department.name)),
    })));
    setEntries((items) => items.map((entry) => (
      canonicalDepartmentName(entry.department) === canonicalDepartmentName(department.name)
        ? { ...entry, department: UNDEFINED_DEPARTMENT }
        : entry
    )));
    setManagementTypes((items) => items.filter((type) => canonicalDepartmentName(type.department) !== canonicalDepartmentName(department.name)));
    setLeadTypes((items) => items.filter((type) => canonicalDepartmentName(type.department) !== canonicalDepartmentName(department.name)));
    setTagItems((items) => items.filter((tag) => canonicalDepartmentName(tag.department) !== canonicalDepartmentName(department.name)));
    setTableFilters((current) => (
      canonicalDepartmentName(current.department) === canonicalDepartmentName(department.name)
        ? { ...current, department: UNDEFINED_DEPARTMENT }
        : current
    ));
    setActiveSession((current) => (
      current && canonicalDepartmentName(current.department) === canonicalDepartmentName(department.name)
        ? { ...current, department: UNDEFINED_DEPARTMENT }
        : current
    ));
    showToast(`${department.name} deleted`);
  }

  function addWorkType() {
    if (!canManageSettings) return;
    setSettingsModal({ type: 'workType' });
  }

  function editWorkType(type) {
    if (!canManageSettings) return;
    if (role === 'lead' && !departmentInScope(type.department, activeLeadDepartments)) return;
    setSettingsModal({ type: 'workType', item: type });
  }

  function saveWorkType(form) {
    if (!canManageSettings) return;
    const isLead = role === 'lead';
    const name = form.name.trim();
    const previousName = form.originalName;
    const previousDepartment = form.originalDepartment;
    if (!name) {
      showToast('Work type name is required');
      return;
    }
    const department = isLead ? primaryLeadDepartment : (form.department === 'All departments' ? form.department : resolveDepartmentName(form.department, departmentItems));
    if (!department) {
      showToast('Department is required');
      return;
    }
    if (department !== 'All departments' && !departmentItems.some((item) => canonicalDepartmentName(item.name) === canonicalDepartmentName(department))) {
      showToast('Department must exist before assigning a work type');
      return;
    }
    const next = {
      name,
      department,
      paid: form.paid,
      color: '#35bfae',
      tags: form.tags,
    };
    const updateTypes = (items) => previousName
      ? items.map((type) => (
        type.name === previousName && canonicalDepartmentName(type.department) === canonicalDepartmentName(previousDepartment)
          ? { ...type, ...next, color: type.color || next.color }
          : type
      ))
      : [next, ...items];
    if (isLead) setLeadTypes(updateTypes);
    else setManagementTypes(updateTypes);
    setSelectedWorkType(next.name);
    if (previousName && previousName !== next.name) {
      setEntries((items) => items.map((entry) => (entry.type === previousName ? { ...entry, type: next.name } : entry)));
    }
    showToast(`${next.name} ${previousName ? 'updated' : 'added'}`);
    setSettingsModal(null);
  }

  function deleteWorkType(type) {
    if (!canManageSettings) return;
    if (role === 'lead' && !departmentInScope(type.department, activeLeadDepartments)) return;
    const confirmed = window.confirm('Are you sure you want to delete this work type? Existing time records will stay unchanged.');
    if (!confirmed) return;
    const removeType = (items) => items.filter((item) => !(
      item.name === type.name && canonicalDepartmentName(item.department) === canonicalDepartmentName(type.department)
    ));
    if (role === 'lead') setLeadTypes(removeType);
    else setManagementTypes(removeType);
    if (selectedWorkType === type.name) setSelectedWorkType('');
    showToast(`${type.name} deleted`);
  }

  function saveTag(form) {
    if (!canManageSettings) return;
    const isLead = role === 'lead';
    const name = form.name.trim();
    const previousName = form.originalName;
    const previousDepartment = form.originalDepartment;
    const previousWorkType = form.originalWorkType;
    if (!name) {
      showToast('Tag name is required');
      return;
    }
    const department = isLead ? primaryLeadDepartment : (form.department === 'All departments' ? form.department : resolveDepartmentName(form.department, departmentItems));
    if (!department) {
      showToast('Department is required');
      return;
    }
    if (department !== 'All departments' && !departmentItems.some((item) => canonicalDepartmentName(item.name) === canonicalDepartmentName(department))) {
      showToast('Department must exist before assigning a tag');
      return;
    }
    const next = {
      name,
      department,
      workType: form.workType || 'All work types',
    };
    setTagItems((items) => previousName
      ? items.map((tag) => (
          tag.name === previousName
          && canonicalDepartmentName(tag.department) === canonicalDepartmentName(previousDepartment)
          && tag.workType === previousWorkType
            ? next
            : tag
        ))
      : [next, ...items]);
    if (previousName && previousName !== name) {
      setEmployees((items) => items.map((person) => ({
        ...person,
        tags: person.tags.map((tag) => (tag === previousName ? name : tag)),
      })));
    }
    const syncTagOnTypes = (items) => items.map((type) => {
      const tags = (type.tags || []).filter((tag) => tag !== previousName);
      if (
        next.workType !== 'All work types'
        && type.name === next.workType
        && (canonicalDepartmentName(type.department) === canonicalDepartmentName(department) || type.department === 'All departments')
      ) {
        return { ...type, tags: Array.from(new Set([...tags, name])) };
      }
      return { ...type, tags };
    });
    setManagementTypes(syncTagOnTypes);
    setLeadTypes(syncTagOnTypes);
    showToast(`${next.name} ${previousName ? 'updated' : 'added'}`);
    setSettingsModal(null);
  }

  function editTag(tag) {
    if (!canManageSettings) return;
    if (role === 'lead' && !departmentInScope(tag.department, activeLeadDepartments)) return;
    setSettingsModal({ type: 'tag', item: tag });
  }

  function deleteTag(tag) {
    if (!canManageSettings) return;
    if (role === 'lead' && !departmentInScope(tag.department, activeLeadDepartments)) return;
    const confirmed = window.confirm('Are you sure you want to delete this tag? It will be removed from users and work types.');
    if (!confirmed) return;
    setTagItems((items) => items.filter((item) => !(
      item.name === tag.name
      && canonicalDepartmentName(item.department) === canonicalDepartmentName(tag.department)
      && item.workType === tag.workType
    )));
    setEmployees((items) => items.map((person) => ({ ...person, tags: person.tags.filter((item) => item !== tag.name) })));
    setManagementTypes((items) => items.map((type) => ({ ...type, tags: (type.tags || []).filter((item) => item !== tag.name) })));
    setLeadTypes((items) => items.map((type) => ({ ...type, tags: (type.tags || []).filter((item) => item !== tag.name) })));
    showToast(`${tag.name} deleted`);
  }

  function addEmploymentRule() {
    if (!canManageSettings) return;
    setRuleModal({ mode: 'add' });
  }

  function editEmploymentRule(rule) {
    if (!canManageSettings) return;
    setRuleModal({ mode: 'edit', rule });
  }

  function saveEmploymentRule(form) {
    if (!canManageSettings) return;
    const name = form.name.trim();
    if (!name) {
      showToast('Employment type name is required');
      return;
    }
    const duplicate = employmentRuleItems.some((rule) => rule.id !== form.id && rule.name.toLowerCase() === name.toLowerCase());
    if (duplicate) {
      showToast('Employment type name must be unique');
      return;
    }
    const next = {
      id: form.id || Date.now(),
      name,
      payType: form.payType,
      requiresContract: Boolean(form.requiresContract),
      requiresMedical: Boolean(form.requiresMedical),
      requiresSafety: Boolean(form.requiresSafety),
      cardFields: defaultRuleCardFields(form.payType),
    };
    const previousName = form.originalName;
    setEmploymentRuleItems((items) => (
      form.id
        ? items.map((rule) => (rule.id === form.id ? next : rule))
        : [next, ...items]
    ));
    if (previousName && previousName !== next.name) {
      setEmployees((items) => items.map((person) => (
        person.employment === previousName ? { ...person, employment: next.name } : person
      )));
    }
    setRuleModal(null);
    showToast(`${next.name} ${form.id ? 'updated' : 'added'}`);
  }

  function deleteEmploymentRule(rule) {
    if (!canManageSettings) return;
    const employeesUsingRule = employees.filter((person) => person.employment === rule.name).length;
    if (employeesUsingRule > 0) {
      showToast('Employment rules assigned to employees cannot be deleted');
      return;
    }
    const confirmed = window.confirm('Are you sure you want to delete this employment rule?');
    if (!confirmed) return;
    setEmploymentRuleItems((items) => items.filter((item) => item.id !== rule.id));
    showToast(`${rule.name} deleted`);
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark"><TimerReset size={26} /></span>
          <span>esm</span>
        </div>
        <button className="collapse-btn" aria-label="Collapse"><ChevronDown size={16} /></button>
        {visibleNavGroups.map((group) => (
          <div className="nav-group" key={group.title}>
            <div className="nav-title">{group.title}</div>
            {group.items.map((item) => {
              const Icon = item.icon;
              const itemTab = item.tab;
              const childActive = item.children?.some((child) => child.tab === tab);
              const active = itemTab === tab || childActive;
              return (
                <div className="nav-tree" key={item.label}>
                  <a
                    className={cx('nav-item', active && 'active')}
                    href={item.path}
                    onClick={(event) => {
                      event.preventDefault();
                      navigateToTab(itemTab);
                    }}
                    aria-current={active && !childActive ? 'page' : undefined}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                    {item.children && <ChevronDown className="nav-expand-icon" size={16} />}
                  </a>
                  {item.children && active && (
                    <div className="nav-subitems" aria-label={`${item.label} sections`}>
                      {item.children.map((child) => {
                        const childIsActive = child.tab === tab;
                        return (
                          <a
                            className={cx('nav-subitem', childIsActive && 'active')}
                            href={child.path}
                            key={child.tab}
                            onClick={(event) => {
                              event.preventDefault();
                              navigateToTab(child.tab);
                            }}
                            aria-current={childIsActive ? 'page' : undefined}
                          >
                            <span className="nav-subitem-bullet" />
                            <span>{child.label}</span>
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </aside>

      <main className="main">
        <header className="topbar">
          <div className="topbar-left">
            <button className="search-trigger" aria-label="Search">
              <Search size={16} />
              <kbd>⌘K</kbd>
            </button>
          </div>
          <div className="header-tracker">
            <WorkTypeDropdown
              value={trackerDisplayWorkType}
              onChange={setSelectedWorkType}
              options={trackerAvailableWorkTypes}
              disabled={lunch || trackerControlsDisabled}
            />
            <button
              className={cx('header-icon-toggle', trackerWfhActive && 'active')}
              onClick={() => !trackerControlsDisabled && setWfh(!wfh)}
              aria-label={trackerControlsDisabled ? 'Work from home is locked while the timer is running' : 'Work from home'}
              title={trackerControlsDisabled ? 'Locked while the timer is running' : 'Work from home'}
              disabled={trackerControlsDisabled}
            >
              <Home size={16} />
            </button>
            <button
              className={cx('header-icon-toggle', trackerLunchActive && 'active')}
              onClick={() => !trackerControlsDisabled && setLunch((current) => !current)}
              aria-label={trackerControlsDisabled ? 'Lunch break is locked while the timer is running' : 'Lunch break'}
              title={trackerControlsDisabled ? 'Locked while the timer is running' : 'Lunch break'}
              disabled={trackerControlsDisabled}
            >
              <Utensils size={16} />
            </button>
            <button className={cx('header-start', isTracking && 'stop')} disabled={!canStart && !isTracking} onClick={handlePrimaryTracker}>
              {isTracking ? <Square size={15} /> : <Play size={15} />}
              {isTracking ? 'Stop' : 'Start'}
            </button>
            {isTracking && (
              <span className="header-timer" aria-label="Active timer">
                {trackerElapsedLabel}
              </span>
            )}
          </div>
          <div className="topbar-right">
            <div className="role-switcher compact" aria-label="Permission preview">
              {Object.entries(roles).map(([key, value]) => (
                <button key={key} className={cx(role === key && 'selected')} onClick={() => setRole(key)}>
                  <span>{value.label}</span>
                </button>
              ))}
            </div>
            <div className="top-actions">
              <div className="avatar" style={personAvatarStyle(activeRole.person)}>{initials(activeRole.person)}</div>
              <div className="user-meta">
                <strong>{activeRole.person}</strong>
                <span>{activeRole.label}</span>
              </div>
            </div>
          </div>
        </header>

        {tab === 'dashboard' && (
          <DashboardView
            role={role}
            activeRole={activeRole}
            totals={totals}
            entries={visibleEntries}
            documents={documents}
            activeSession={activeSession}
            elapsedLabel={formatElapsed(elapsedMs(activeSession, tick))}
            onAddEntry={() => setEntryModal({ mode: 'add' })}
          />
        )}
        {tab === 'time' && (
          <TimeView
            role={role}
            platform={platform}
            activeRole={activeRole}
            visibleEntries={filteredEntries}
            visiblePeople={visiblePeople}
            workTypes={visibleWorkTypes}
            filters={tableFilters}
            filterOptions={tableFilterOptions}
            onFilterChange={(field, value) => setTableFilters((current) => ({ ...current, [field]: value }))}
            onClearFilters={() => setTableFilters(DEFAULT_TABLE_FILTERS)}
            isTracking={isTracking}
            activeSession={activeSession}
            elapsedLabel={formatElapsed(elapsedMs(activeSession, tick))}
            correctionWindows={currentCorrectionWindows}
            tick={tick}
            totals={filteredTotals}
            correctionRequests={visibleCorrectionRequests}
            myCorrectionRequests={myCorrectionRequests}
            correctionWindowsVisible={visibleCorrectionWindows}
            onAddEntry={() => setEntryModal({ mode: 'add' })}
            onOpenManualUnlock={() => setManualUnlockModal(true)}
            onOpenCorrectionRequest={() => setCorrectionRequestModal(true)}
            onApproveCorrectionRequest={approveCorrectionRequest}
            onDeclineCorrectionRequest={declineCorrectionRequest}
            onLockCorrectionRequest={lockApprovedCorrectionRequest}
            onLockCorrectionWindow={lockCorrectionWindow}
            onEditEntry={(entry) => setEntryModal({ mode: 'edit', entry })}
            onDeleteEntry={deleteEntry}
          />
        )}
        {tab === 'analytics' && <AnalyticsView role={role} platform={platform} activePlatform={activePlatform} people={visiblePeople} entries={visibleEntries} workTypes={visibleWorkTypes} configuredWorkTypes={configuredWorkTypes} employmentRules={employmentRuleItems} totals={totals} activeRole={activeRole} onFilters={() => showToast('Analytics filters applied')} />}
        {tab === 'settings' && role !== 'operations' && (
          <SettingsView
            role={role}
            canManageSettings={canManageSettings}
            activeLeadDepartments={activeLeadDepartments}
            managementTypes={managementTypes}
            leadTypes={leadTypes}
            onAddWorkType={addWorkType}
            onEditWorkType={editWorkType}
            onDeleteWorkType={deleteWorkType}
          />
        )}
        {tab === 'corrections' && <CorrectionLogView corrections={corrections} role={role} activeRole={activeRole} people={visiblePeople} />}
        {['hr', 'hr-departments', 'hr-rules', 'hr-tags'].includes(tab) && (
          <HrView
            section={tab === 'hr-departments' ? 'departments' : tab === 'hr-rules' ? 'rules' : tab === 'hr-tags' ? 'tags' : 'employees'}
            role={role}
            platform={platform}
            activePlatform={activePlatform}
            people={visiblePeople}
            entries={entries}
            configuredWorkTypes={configuredWorkTypes}
            documents={documents}
            activeLeadDepartments={activeLeadDepartments}
            canEditPeople={canEditPeople}
            canManageSettings={canManageSettings}
            departmentItems={departmentItems}
            tagItems={tagItems}
            employmentRules={employmentRuleItems}
            totals={totals}
            selectedEmployeeId={selectedEmployeeId}
            onAddEmployee={addEmployee}
            onSelectEmployee={(person) => setSelectedEmployeeId(person.id)}
            onAddDepartment={addDepartment}
            onEditDepartment={editDepartment}
            onDeleteDepartment={deleteDepartment}
            onAddTag={addTag}
            onEditTag={editTag}
            onDeleteTag={deleteTag}
            onAddEmploymentRule={addEmploymentRule}
            onEditEmploymentRule={editEmploymentRule}
            onDeleteEmploymentRule={deleteEmploymentRule}
          />
        )}
        {tab === 'documentation' && <DocumentationView sections={documentationSections} />}
      </main>
      {selectedEmployee && (
        <EmployeeRecordSidebar
          employee={selectedEmployee}
          documents={documents}
          entries={entries}
          corrections={corrections}
          employmentRules={employmentRuleItems}
          canEditPeople={canEditPeople}
          onClose={() => setSelectedEmployeeId(null)}
          onEditEmployee={editEmployee}
          onAddComment={addEmployeeComment}
          onArchiveEmployee={archiveEmployee}
          onRestoreEmployee={restoreEmployee}
          onDeleteEmployee={deleteEmployee}
        />
      )}
      {entryModal && (
        <EntryModal
          mode={entryModal.mode}
          entry={entryModal.entry}
          role={role}
          people={visiblePeople}
          workTypes={entryAssignableWorkTypes}
          activeRole={activeRole}
          correctionWindows={currentCorrectionWindows}
          onClose={() => setEntryModal(null)}
          onSave={saveEntry}
        />
      )}
      {employeeModal && (
        <EmployeeModal
          mode={employeeModal.mode}
          employee={employeeModal.employee}
          role={role}
          primaryLeadDepartment={primaryLeadDepartment}
          employees={employees}
          departments={departmentItems}
          tags={tagItems}
          workTypes={configuredWorkTypes}
          employmentRules={employmentRuleItems}
          onClose={() => setEmployeeModal(null)}
          onSave={saveEmployee}
        />
      )}
      {manualUnlockModal && (
        <ManualUnlockModal
          people={visiblePeople}
          onClose={() => setManualUnlockModal(false)}
          onSave={(form) => {
            unlockCorrectionWindow(form);
            setManualUnlockModal(false);
          }}
        />
      )}
      {correctionRequestModal && (
        <CorrectionRequestModal
          activeRole={activeRole}
          onClose={() => setCorrectionRequestModal(false)}
          onSave={requestCorrectionWindow}
        />
      )}
      {settingsModal && role !== 'operations' && (
        <SettingsCreateModal
          mode={settingsModal.type}
          item={settingsModal.item}
          role={role}
          activeRole={activeRole}
          activeLeadDepartments={activeLeadDepartments}
          primaryLeadDepartment={primaryLeadDepartment}
          employees={employees}
          departments={departmentItems}
          workTypes={role === 'lead' ? leadTypes.filter((type) => departmentInScope(type.department, activeLeadDepartments) || type.department === 'All departments') : managementTypes}
          tags={tagItems}
          onClose={() => setSettingsModal(null)}
          onSaveDepartment={saveDepartment}
          onSaveWorkType={saveWorkType}
          onSaveTag={saveTag}
        />
      )}
      {ruleModal && role !== 'operations' && (
        <EmploymentRuleModal
          mode={ruleModal.mode}
          rule={ruleModal.rule}
          existingRules={employmentRuleItems}
          onClose={() => setRuleModal(null)}
          onSave={saveEmploymentRule}
        />
      )}
      {toast && <button className="toast" onClick={() => setToast('')}>{toast}</button>}
    </div>
  );
}

function calculateHours(start, end) {
  const [startHour, startMinute] = start.split(':').map(Number);
  const [endHour, endMinute] = end.split(':').map(Number);
  const minutes = Math.max(0, (endHour * 60 + endMinute) - (startHour * 60 + startMinute));
  return Math.round((minutes / 60) * 100) / 100;
}

function TimeView(props) {
  const {
    role,
    platform,
    visiblePeople,
    visibleEntries,
    workTypes,
    filters,
    filterOptions,
    onFilterChange,
    onClearFilters,
    isTracking,
    activeSession,
    elapsedLabel,
    correctionWindows,
    tick,
    totals,
    correctionRequests,
    myCorrectionRequests,
    correctionWindowsVisible,
    onAddEntry,
    onOpenManualUnlock,
    onOpenCorrectionRequest,
    onApproveCorrectionRequest,
    onDeclineCorrectionRequest,
    onLockCorrectionRequest,
    onLockCorrectionWindow,
    onEditEntry,
    onDeleteEntry,
  } = props;
  const canSeeCost = role !== 'operations';
  const canUseScopeFilters = role !== 'operations';
  const hasActiveFilters = filters.from !== TODAY || filters.to !== TODAY || Boolean(filters.department || filters.person);
  const workTypeColors = useMemo(() => new Map(workTypes.map((type, index) => [type.name, optionColor(type, index)])), [workTypes]);

  return (
    <div className="workspace">
      <div className="time-metrics">
        <Metric icon={Clock3} label="Total hours" value={`${totals.hours.toFixed(1)} h`} delta="Current visible scope" />
        <Metric icon={Check} label="Paid hours" value={`${totals.paidHours.toFixed(1)} h`} delta="Based on work type settings" />
        {canSeeCost && <Metric icon={CircleDollarSign} label="Cost" value={money(totals.entryCost)} delta="Mapped to Laravel cost center" />}
      </div>
      <section className="time-list-section">
        <div className="table-control-bar">
          <div className="table-filters" aria-label="Time entry filters">
            <label className="filter-field date-filter">
              <span>From</span>
              <input type="date" value={filters.from} onInput={(event) => onFilterChange('from', event.target.value)} onChange={(event) => onFilterChange('from', event.target.value)} />
            </label>
            <label className="filter-field date-filter">
              <span>To</span>
              <input type="date" value={filters.to} onInput={(event) => onFilterChange('to', event.target.value)} onChange={(event) => onFilterChange('to', event.target.value)} />
            </label>
            {canUseScopeFilters && (
              <>
                <label className="filter-field">
                  <span>Department</span>
                  <SimpleDropdown
                    value={filters.department}
                    options={[{ name: 'All departments' }, ...filterOptions.departments.map((department) => ({ name: department }))]}
                    onChange={(value) => onFilterChange('department', value === 'All departments' ? '' : value)}
                  />
                </label>
                <label className="filter-field person-filter">
                  <span>Employee</span>
                  <SimpleDropdown
                    value={filters.person}
                    options={[{ name: 'All employees' }, ...filterOptions.people]}
                    onChange={(value) => onFilterChange('person', value === 'All employees' ? '' : value)}
                  />
                </label>
              </>
            )}
            <button className="soft-btn clear-filters" onClick={onClearFilters} disabled={!hasActiveFilters}>Clear</button>
          </div>
          <div className="entry-actions table-toolbar">
            {isTracking && (
              <span className="status-pill live">
                {activeSession.type} · {elapsedLabel}
              </span>
            )}
            <button className="soft-btn" onClick={onAddEntry}><Plus size={17} /> Add manual entry</button>
            {role !== 'operations' && (
              <button className="soft-btn manual-unlock-btn" onClick={onOpenManualUnlock}><Unlock size={17} /> Unlock user</button>
            )}
            {role === 'operations' && (
              <button className="soft-btn correction-request-btn" onClick={onOpenCorrectionRequest}><Unlock size={17} /> Request correction</button>
            )}
          </div>
        </div>
        <div className="table">
          <div className="time-entry-header">
            <span>User</span>
            <span>Date</span>
            <span>Hours</span>
            <span>Qty</span>
            <span>Work type</span>
            <span>Note</span>
            <span>Actions</span>
          </div>
          {visibleEntries.map((entry) => {
            const editable = canEditEntryDate(role, correctionWindows, entry.employee, entry.date);
            const isOverDailyLimit = entry.hours > 9;
            return (
              <div className={cx('time-entry-row', isOverDailyLimit && 'over-daily-limit')} key={entry.id}>
                <span className="employee-cell">
                  <span className="entry-avatar" style={personAvatarStyle(entry.employee)}>{initials(entry.employee)}</span>
                  <span className="entry-person-info">
                    <span className="entry-person-name">{entry.employee}</span>
                    <span className="department-pill entry-department-pill" style={departmentPillStyle(entry.department)}>{entry.department}</span>
                  </span>
                </span>
                <span className="entry-date">{entry.date}</span>
                <span className="time-range">{entry.start} - {entry.end}</span>
                <span className="duration">{entry.hours} h</span>
                <span className="work-type-cell">
                  <i className="work-type-dot" style={{ background: workTypeColors.get(entry.type) || optionColor({ name: entry.type }, 0) }} aria-hidden="true" />
                  <strong>{entry.type}</strong>
                  {entry.break && <em className="work-type-pill break">Break</em>}
                  {entry.workFromHome && <em className="work-type-pill home">Home</em>}
                </span>
                <span className={cx('note-cell', !entry.note && 'empty')}>{entry.note || '-'}</span>
                <span className="row-actions">
                  <button className="icon-btn table-action" disabled={!editable} onClick={() => onEditEntry(entry)} aria-label={`Edit ${entry.employee} entry`} title={editable ? 'Edit entry' : (role === 'operations' ? 'Only today can be edited' : 'User date must be unlocked')}>
                    <Pencil size={16} />
                  </button>
                  <button className="icon-btn table-action danger" disabled={!editable} onClick={() => onDeleteEntry(entry.id)} aria-label={`Delete ${entry.employee} entry`} title={editable ? 'Delete entry' : (role === 'operations' ? 'Only today can be edited' : 'User date must be unlocked')}>
                    <Trash2 size={16} />
                  </button>
                </span>
              </div>
            );
          })}
          {visibleEntries.length === 0 && <span className="empty-state table-empty">No time entries match the current filters.</span>}
        </div>
        {role !== 'operations' && correctionRequests.length > 0 && (
          <div className="request-inbox">
            <div className="request-inbox-head">
              <span className="eyebrow">Action requested</span>
              <strong>{correctionRequests.length} edit {correctionRequests.length === 1 ? 'request' : 'requests'}</strong>
            </div>
            <div className="request-list">
              {correctionRequests.map((request, index) => (
                <RequestReviewRow
                  key={`${requestKey(request)}-${index}`}
                  request={request}
                  onApprove={onApproveCorrectionRequest}
                  onDecline={onDeclineCorrectionRequest}
                  onLock={onLockCorrectionRequest}
                />
              ))}
            </div>
          </div>
        )}
        {role === 'operations' && (
          <MyRequestsPanel requests={myCorrectionRequests} correctionWindows={correctionWindows} tick={tick} />
        )}
        <ActiveUnlocksPanel role={role} windows={correctionWindowsVisible} tick={tick} onLock={onLockCorrectionWindow} />
      </section>
    </div>
  );
}

function ActiveUnlocksPanel({ role, windows, tick, onLock }) {
  if (windows.length === 0) return null;
  const canLock = role !== 'operations';
  return (
    <div className="request-inbox active-unlocks">
      <div className="request-inbox-head">
        <span className="eyebrow">{role === 'operations' ? 'Active access' : 'Active unlocks'}</span>
        <strong>{windows.length} open correction {windows.length === 1 ? 'window' : 'windows'}</strong>
      </div>
      <div className="request-list">
        {windows.map((window) => (
          <div className="request-row my-request-row unlocked active-unlock-row" key={window.id}>
            <div className="my-request-details">
              <strong className="my-request-segment my-request-date">{window.from} - {window.to}</strong>
              <i className="my-request-divider" aria-hidden="true" />
              <span className="my-request-segment my-request-reason">{window.employee}</span>
              <i className="my-request-divider" aria-hidden="true" />
              <span className="my-request-segment my-request-unlock">{unlockedUntilCopy(formatUnlockUntil(window))}</span>
              <i className="my-request-divider" aria-hidden="true" />
              <b className="my-request-segment unlock-countdown">Time left: {formatUnlockCountdown(window.expiresAt, tick)}</b>
            </div>
            <div className="active-unlock-actions">
              <em>Unlocked</em>
              {canLock && (
                <button className="soft-btn danger-soft" onClick={() => onLock(window.id)}>
                  <Lock size={15} /> Lock manually
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RequestReviewRow({ request, onApprove, onDecline, onLock }) {
  const [reviewAction, setReviewAction] = useState(null);
  const [duration, setDuration] = useState('10m');
  const [declineComment, setDeclineComment] = useState('');
  const reason = request.change.replace('Requested edit access: ', '');
  const isUnlocked = request.state === 'Unlocked';

  return (
    <div className={cx('request-row review-row', isUnlocked && 'unlocked')}>
      <div className="request-summary">
        <strong>{request.employee}</strong>
        <span>{request.date} · {reason}</span>
        {isUnlocked && <small>{unlockedUntilCopy(request.unlockedUntil)} · approved by {request.approvedBy}</small>}
      </div>
      <div className="request-review-actions">
        <em>{request.state}</em>
        {isUnlocked ? (
          <button className="soft-btn danger-soft" onClick={() => onLock(request)}>
            <Lock size={15} /> Lock manually
          </button>
        ) : (
          <>
            {reviewAction === 'approve' && (
              <SimpleDropdown
                value={approvalLabel(duration)}
                options={REQUEST_APPROVAL_OPTIONS.map((option) => ({ name: option.label, value: option.value }))}
                onChange={(label) => {
                  const selected = REQUEST_APPROVAL_OPTIONS.find((option) => option.label === label);
                  setDuration(selected?.value || 'manual');
                }}
              />
            )}
            <button
              className="primary-btn compact-primary"
              onClick={() => (reviewAction === 'approve' ? onApprove(request, duration) : setReviewAction('approve'))}
            >
              <Unlock size={15} /> Approve
            </button>
            {reviewAction === 'decline' && (
              <input
                value={declineComment}
                onChange={(event) => setDeclineComment(event.target.value)}
                placeholder="Decline reason"
                aria-label={`Decline reason for ${request.employee}`}
              />
            )}
            <button
              className="soft-btn danger-soft"
              disabled={reviewAction === 'decline' && !declineComment.trim()}
              onClick={() => (reviewAction === 'decline' ? onDecline(request, declineComment) : setReviewAction('decline'))}
            >
              Decline
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function MyRequestsPanel({ requests, correctionWindows, tick }) {
  return (
    <div className="request-inbox my-requests">
      <div className="request-inbox-head">
        <span className="eyebrow">My requests</span>
        <strong>{requests.length} edit {requests.length === 1 ? 'request' : 'requests'}</strong>
      </div>
      <div className="request-list">
        {requests.map((request, index) => {
          const unlockWindow = correctionWindows.find((window) => window.requestKey === requestKey(request));
          const unlockExpiresAt = request.unlockExpiresAt || unlockWindow?.expiresAt;
          const hasRequestMeta = ['Unlocked', 'Declined', 'Locked'].includes(request.state);
          return (
            <div className={cx('request-row my-request-row', request.state.toLowerCase().replaceAll(' ', '-'))} key={`${requestKey(request)}-${index}`}>
              <div className="my-request-details">
                <strong className="my-request-segment my-request-date">{request.date}</strong>
                <i className="my-request-divider" aria-hidden="true" />
                <span className="my-request-segment my-request-reason">{request.change.replace('Requested edit access: ', '')}</span>
                {hasRequestMeta && <i className="my-request-divider" aria-hidden="true" />}
                {request.state === 'Unlocked' && <span className="my-request-segment my-request-unlock">{unlockedUntilCopy(request.unlockedUntil)}</span>}
                {request.state === 'Unlocked' && <i className="my-request-divider" aria-hidden="true" />}
                {request.state === 'Unlocked' && <b className="my-request-segment unlock-countdown">Time left: {formatUnlockCountdown(unlockExpiresAt, tick)}</b>}
                {request.state === 'Declined' && <small className="my-request-segment my-request-note">Declined by {request.declinedBy}: {request.declineComment}</small>}
                {request.state === 'Locked' && <small className="my-request-segment my-request-note">Locked {request.lockedBy ? `by ${request.lockedBy}` : 'after approved window ended'}</small>}
              </div>
              <em>{request.state}</em>
            </div>
          );
        })}
        {requests.length === 0 && <span className="empty-state">No requests yet.</span>}
      </div>
    </div>
  );
}

function DashboardView({ role, activeRole, totals, entries, documents, activeSession, elapsedLabel, onAddEntry }) {
  const recentEntries = entries.slice(0, 5);
  return (
    <div className="workspace">
      <div className="time-metrics">
        <Metric icon={Clock3} label="Hours" value={`${totals.hours.toFixed(1)} h`} delta={role === 'operations' ? 'Your visible entries' : 'Visible scope'} />
        <Metric icon={Check} label="Paid" value={`${totals.paidHours.toFixed(1)} h`} delta="Excludes unpaid breaks" />
        <Metric icon={FileText} label="Records" value={documents.length} delta="Saved in this browser" />
      </div>
      <section className="primary-panel dashboard-panel">
        <div className="panel-heading">
          <div>
            <span className="eyebrow">Today</span>
            <h2>{activeSession ? `${activeSession.type} is running` : `${activeRole.person} is ready`}</h2>
          </div>
          <button className="soft-btn" onClick={onAddEntry}><Plus size={17} /> Add entry</button>
        </div>
        <div className="dashboard-current">
          <div>
            <span>Live timer</span>
            <strong>{activeSession ? elapsedLabel : '00:00:00'}</strong>
            <small>{activeSession ? `${activeSession.employee} · started ${activeSession.start}` : 'No active local timer'}</small>
          </div>
          <div>
            <span>Locked entries</span>
            <strong>{totals.locked}</strong>
            <small>Past dates need a correction window</small>
          </div>
          <div>
            <span>Corrections</span>
            <strong>{totals.corrections}</strong>
            <small>Visible audit records</small>
          </div>
        </div>
        <div className="record-list">
          {recentEntries.map((entry) => (
            <div className="record-row" key={entry.id}>
              <div className="record-main">
                <span className="entry-avatar" style={personAvatarStyle(entry.employee)}>{initials(entry.employee)}</span>
                <div>
                  <strong>{entry.type}</strong>
                  <span>{entry.employee} · {entry.date} · {entry.start}-{entry.end}</span>
                </div>
              </div>
              <b>{entry.hours} h</b>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function CorrectionLogView({ corrections, role, activeRole, people }) {
  const visibleNames = new Set(people.map((person) => person.name));
  const visibleCorrections = role === 'management'
    ? corrections
    : corrections.filter((item) => item.employee === activeRole.person || visibleNames.has(item.employee));
  return (
    <div className="workspace">
      <section className="primary-panel">
        <div className="panel-heading">
          <div>
            <span className="eyebrow">Correction log</span>
            <h2>Audit trail</h2>
          </div>
        </div>
        <div className="record-list">
          {visibleCorrections.map((item, index) => (
            <div className="record-row" key={`${item.employee}-${item.date}-${item.change}-${index}`}>
              <div>
                <strong>{item.change}</strong>
                <span>{item.employee} · {item.date} · by {item.by}</span>
              </div>
              <em>{item.state}</em>
            </div>
          ))}
          {visibleCorrections.length === 0 && <span className="empty-state">No correction records in this scope.</span>}
        </div>
      </section>
    </div>
  );
}

function documentationSlug(value) {
  return value.toLowerCase().replaceAll(' ', '-').replaceAll(',', '');
}

function renderMetricLine(metric) {
  const [label, ...formulaParts] = metric.split(' = ');
  if (formulaParts.length === 0) {
    return <p className="metric-note">{metric}</p>;
  }
  return (
    <div className="metric-equation" aria-label={`${label} formula`}>
      <span>{label}</span>
      <code>
        <b>=</b>
        {formulaParts.join(' = ')}
      </code>
    </div>
  );
}

function DocumentationView({ sections }) {
  return (
    <div className="documentation-page">
      <section className="documentation-hero">
        <span className="eyebrow">Documentation</span>
        <h1>Time management product documentation</h1>
        <p>
          Detailed behavior, user steps, rules, edge cases, and metric formulas for the current prototype.
        </p>
        <div className="documentation-hero-stats" aria-label="Documentation summary">
          <span><b>{sections.length}</b> sections</span>
          <span><b>{sections.reduce((sum, section) => sum + section.features.length, 0)}</b> features</span>
          <span><b>{sections.reduce((sum, section) => sum + section.features.filter((feature) => feature.metrics?.length).length, 0)}</b> metric groups</span>
        </div>
      </section>

      <div className="documentation-layout">
        <aside className="documentation-index" aria-label="Documentation sections">
          {sections.map((section) => (
            <a key={section.title} href={`#${documentationSlug(section.title)}`}>{section.title}</a>
          ))}
        </aside>

        <div className="documentation-content">
          {sections.map((section) => (
            <section className="documentation-section" id={documentationSlug(section.title)} key={section.title}>
              <div className="documentation-section-head">
                <span className="eyebrow">Section</span>
                <h2>{section.title}</h2>
                <p>{section.intro}</p>
                <div className="documentation-section-meta">
                  <span>{section.features.length} documented features</span>
                  <span>{section.features.filter((feature) => feature.metrics?.length).length} metric groups</span>
                </div>
              </div>

              <div className="documentation-feature-list">
                {section.features.map((feature) => (
                  <article className="documentation-feature" key={feature.name}>
                    <header className="documentation-feature-head">
                      <h3>{feature.name}</h3>
                      <span>{feature.userSteps.length} steps</span>
                    </header>
                    <div className="documentation-block">
                      <strong>How it works</strong>
                      <p>{feature.howItWorks}</p>
                    </div>
                    <div className="documentation-block">
                      <strong>User steps</strong>
                      <ol className="step-list">
                        {feature.userSteps.map((step, index) => (
                          <li key={step}>
                            <span>{index + 1}</span>
                            <p>{step}</p>
                          </li>
                        ))}
                      </ol>
                    </div>
                    {feature.specifics?.length > 0 && (
                      <div className="documentation-block">
                        <strong>Specifics</strong>
                        <ul className="specifics-list">
                          {feature.specifics.map((item) => <li key={item}>{item}</li>)}
                        </ul>
                      </div>
                    )}
                    {feature.metrics?.length > 0 && (
                      <div className="documentation-block metric-doc-block">
                        <strong>Metrics and formulas</strong>
                        <div className="metric-equation-list">
                          {feature.metrics.map((metric) => (
                            <div key={metric}>{renderMetricLine(metric)}</div>
                          ))}
                        </div>
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

function HrView({
  section,
  role,
  platform,
  activePlatform,
  people,
  entries,
  configuredWorkTypes,
  documents,
  activeLeadDepartments,
  canEditPeople,
  canManageSettings,
  departmentItems,
  tagItems,
  employmentRules,
  totals,
  selectedEmployeeId,
  onAddEmployee,
  onSelectEmployee,
  onAddDepartment,
  onEditDepartment,
  onDeleteDepartment,
  onAddTag,
  onEditTag,
  onDeleteTag,
  onAddEmploymentRule,
  onEditEmploymentRule,
  onDeleteEmploymentRule,
}) {
  const [employeeFilters, setEmployeeFilters] = useState({ department: 'All departments', level: 'All levels', tags: [] });
  const scopedTags = useMemo(() => (
    role === 'management'
      ? tagItems
      : role === 'lead'
        ? tagItems.filter((tag) => tag.department === 'All departments' || departmentInScope(tag.department, activeLeadDepartments))
        : []
  ), [role, tagItems, activeLeadDepartments]);
  const scopedDepartments = useMemo(() => {
    if (role === 'management') return departmentItems;
    if (role === 'lead') {
      return departmentItems.filter((department) => departmentInScope(department.name, activeLeadDepartments));
    }
    const ownDepartments = Array.from(new Set(people.map((person) => person.department).filter(Boolean)));
    return ownDepartments.map((name) => departmentItems.find((department) => (
      canonicalDepartmentName(department.name) === canonicalDepartmentName(name)
    )) || { name, lead: 'No team lead assigned', leads: [] });
  }, [role, departmentItems, activeLeadDepartments, people]);
  const departmentCount = scopedDepartments.length || (role === 'operations' ? 1 : 0);
  const departmentOptions = useMemo(() => [
    { name: 'All departments' },
    ...Array.from(new Set(scopedDepartments.map((department) => department.name).filter(Boolean)))
      .sort((first, second) => first.localeCompare(second))
      .map((name) => ({ name })),
  ], [scopedDepartments]);
  const levelOptions = useMemo(() => [
    { name: 'All levels' },
    ...Array.from(new Set(people.map((person) => person.level).filter(Boolean)))
      .sort((first, second) => first.localeCompare(second))
      .map((name) => ({ name })),
  ], [people]);
  const tagOptions = useMemo(() => (
    Array.from(new Set(people.flatMap((person) => Array.isArray(person.tags) ? person.tags : []).filter(Boolean)))
      .sort((first, second) => first.localeCompare(second))
      .map((name) => ({ name }))
  ), [people]);
  const filteredPeople = useMemo(() => people.filter((person) => {
    const matchesDepartment = employeeFilters.department === 'All departments' || person.department === employeeFilters.department;
    const matchesLevel = employeeFilters.level === 'All levels' || person.level === employeeFilters.level;
    const personTags = Array.isArray(person.tags) ? person.tags : [];
    const matchesTags = employeeFilters.tags.length === 0 || employeeFilters.tags.every((tag) => personTags.includes(tag));
    return matchesDepartment && matchesLevel && matchesTags;
  }), [people, employeeFilters]);
  const hasActiveEmployeeFilters = employeeFilters.department !== 'All departments' || employeeFilters.level !== 'All levels' || employeeFilters.tags.length > 0;

  function updateEmployeeFilter(field, value) {
    setEmployeeFilters((current) => ({ ...current, [field]: value }));
  }

  function clearEmployeeFilters() {
    setEmployeeFilters({ department: 'All departments', level: 'All levels', tags: [] });
  }

  useEffect(() => {
    if (!departmentOptions.some((option) => option.name === employeeFilters.department)) {
      setEmployeeFilters((current) => ({ ...current, department: 'All departments' }));
    }
  }, [departmentOptions, employeeFilters.department]);

  return (
    <div className="workspace">
      <div className="metric-grid">
        <Metric icon={UsersRound} label="People visible" value={filteredPeople.length} delta={hasActiveEmployeeFilters ? `Filtered from ${people.length}` : (role === 'management' ? 'Company-wide HR database' : role === 'lead' ? 'Department scope' : 'Own profile')} />
        <Metric icon={BriefcaseBusiness} label="Departments" value={departmentCount} delta="Permission filtered" />
        <Metric icon={FileText} label="Documents" value={filteredPeople.reduce((sum, person) => sum + person.docs, 0)} delta="Stored through Laravel files" />
        <Metric icon={Server} label="System owner" value={activePlatform.label} delta={activePlatform.owner} />
      </div>

      {section === 'employees' && (
        <section className="primary-panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">Employees</span>
              <h2>Employee database</h2>
            </div>
            <button className="soft-btn" disabled={!canEditPeople} onClick={onAddEmployee}><Plus size={17} /> Add employee</button>
          </div>
          <div className="employee-filter-bar" aria-label="Employee filters">
            <div className="employee-filter-title">
              <Filter size={16} />
              <span>Filter employees</span>
            </div>
            <label className="filter-field employee-filter-field">
              <span>Department</span>
              <SimpleDropdown value={employeeFilters.department} options={departmentOptions} onChange={(value) => updateEmployeeFilter('department', value)} />
            </label>
            <label className="filter-field employee-filter-field">
              <span>Level</span>
              <SimpleDropdown value={employeeFilters.level} options={levelOptions} onChange={(value) => updateEmployeeFilter('level', value)} />
            </label>
            <label className="filter-field employee-filter-tags">
              <span>Tags</span>
              <MultiSelectDropdown
                values={employeeFilters.tags}
                options={tagOptions}
                onChange={(values) => updateEmployeeFilter('tags', values)}
                placeholder={tagOptions.length === 0 ? 'No tags available' : 'Any tags'}
              />
            </label>
            <button className="clear-filters employee-clear-filters" disabled={!hasActiveEmployeeFilters} onClick={clearEmployeeFilters}>Clear filters</button>
          </div>
          <div className="employee-table-shell">
            <table className="employee-table">
              <thead>
                <tr>
                  <th scope="col">Employee</th>
                  <th scope="col">Department</th>
                  <th scope="col">Role</th>
                  <th scope="col">Employment type</th>
                </tr>
              </thead>
              <tbody>
                {filteredPeople.map((person) => {
                  const tasks = employeeRuleTasks(person, documents, employmentRules);
                  const archived = isArchivedEmployee(person);
                  const rowSelected = selectedEmployeeId === person.id;
                  return (
                    <tr
                      className={`${rowSelected ? 'selected' : ''} ${archived ? 'archived' : ''}`}
                      key={person.id}
                      role="button"
                      tabIndex={0}
                      onClick={() => onSelectEmployee(person)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault();
                          onSelectEmployee(person);
                        }
                      }}
                      aria-label={`Open ${person.name} employee record`}
                    >
                      <td>
                        <div className="employee-name-cell">
                          <div className="person-avatar" style={personAvatarStyle(person.name)}>{initials(person.name)}</div>
                          <div>
                            <div className="employee-name-line">
                              <strong>{person.name}</strong>
                              {tasks.length > 0 && (
                                <EmployeeNotice tasks={tasks} />
                              )}
                            </div>
                            {archived && <span className="employee-subtle-status">Inactive</span>}
                          </div>
                        </div>
                      </td>
                      <td><span className="department-pill">{person.department}</span></td>
                      <td><span className={`role-pill ${roleClassName(person.level)}`}>{person.level}</span></td>
                      <td><span className="employment-type-text" title={person.employment}>{person.employment}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filteredPeople.length === 0 && (
              <span className="empty-state table-empty">
                {people.length === 0 ? 'No employees match the current scope.' : 'No employees match the current filters.'}
              </span>
            )}
          </div>
        </section>
      )}

      {section === 'departments' && (
        <DepartmentOrgView
          role={role}
          people={people}
          departments={scopedDepartments}
          allDepartments={departmentItems}
          tags={scopedTags}
          canManageDepartments={role === 'management'}
          onAddDepartment={onAddDepartment}
          onEditDepartment={onEditDepartment}
          onDeleteDepartment={onDeleteDepartment}
        />
      )}

      {section === 'rules' && role !== 'operations' && (
        <EmploymentRulesView
          rules={employmentRules}
          people={people}
          canManageRules={canManageSettings}
          onAddRule={onAddEmploymentRule}
          onEditRule={onEditEmploymentRule}
          onDeleteRule={onDeleteEmploymentRule}
        />
      )}

      {section === 'tags' && role !== 'operations' && (
        <DepartmentTagsView
          canManageTags={canManageSettings}
          departments={scopedDepartments}
          tags={scopedTags}
          people={people}
          onAddTag={onAddTag}
          onEditTag={onEditTag}
          onDeleteTag={onDeleteTag}
        />
      )}
    </div>
  );
}

function EmploymentRulesView({ rules, people, canManageRules, onAddRule, onEditRule, onDeleteRule }) {
  return (
    <section className="primary-panel employment-rules-panel">
      <div className="panel-heading">
        <div>
          <span className="eyebrow">Rules</span>
          <h2>Employment type rules</h2>
        </div>
        <button className="soft-btn" disabled={!canManageRules} onClick={onAddRule}><Plus size={17} /> Add employment type</button>
      </div>
      <div className="settings-tag-note employee-admin-note">
        <ListChecks size={16} />
        <span>Employment rules define the cost formula, required employee to-dos, and which fields appear on employee cards.</span>
      </div>
      <div className="employment-rule-list">
        {rules.map((rule) => {
          const assignedPeople = people.filter((person) => person.employment === rule.name);
          const requirements = [
            rule.requiresContract && 'Employment contract',
            rule.requiresMedical && 'Medical exam',
            rule.requiresSafety && 'Safety training',
          ].filter(Boolean);
          return (
            <article className="employment-rule-card" key={rule.id}>
              <div className="employment-rule-main">
                <div>
                  <strong>{rule.name}</strong>
                  <span>{rule.payType} · {assignedPeople.length} employees</span>
                </div>
                <div className="rule-chip-row">
                  <small>{rule.payType === PAY_TYPE_MONTHLY ? 'Cost = monthly total / monthly hours x time entries' : rule.payType === PAY_TYPE_HOURLY ? 'Cost = hourly rate x time entries' : 'Cost = project value / project days'}</small>
                  {requirements.length > 0
                    ? requirements.map((requirement) => <small key={requirement}>{requirement}</small>)
                    : <small>No automatic to-dos</small>}
                </div>
              </div>
              {canManageRules && (
                <span className="settings-row-actions">
                  <button className="icon-btn table-action" onClick={() => onEditRule(rule)} aria-label={`Edit ${rule.name}`}><Pencil size={16} /></button>
                  <button className="icon-btn table-action danger" onClick={() => onDeleteRule(rule)} aria-label={`Delete ${rule.name}`}><Trash2 size={16} /></button>
                </span>
              )}
            </article>
          );
        })}
        {rules.length === 0 && <span className="empty-state">No employment rules have been configured.</span>}
      </div>
    </section>
  );
}

function DepartmentOrgView({ role, people, departments, allDepartments, tags, canManageDepartments, onAddDepartment, onEditDepartment, onDeleteDepartment }) {
  return (
    <section className="primary-panel department-org-panel">
      <div className="panel-heading">
        <div>
          <span className="eyebrow">Departments</span>
          <h2>Department org chart</h2>
        </div>
        <button className="soft-btn" disabled={!canManageDepartments} onClick={onAddDepartment}><Plus size={17} /> Add department</button>
      </div>
      <div className="department-org-grid">
        {departments.map((department) => {
          const leads = Array.from(new Set([
            ...departmentLeadNames(department),
            ...people
              .filter((person) => employeeLeadDepartmentScope(person, allDepartments).some((leadDepartment) => (
                canonicalDepartmentName(leadDepartment) === canonicalDepartmentName(department.name)
              )))
              .map((person) => person.name),
          ]));
          const members = people.filter((person) => canonicalDepartmentName(person.department) === canonicalDepartmentName(department.name));
          const departmentTags = tags.filter((tag) => departmentInScope(tag.department, [department.name]));
          return (
            <article className="department-card" key={department.name}>
              <div className="department-card-head">
                <div>
                  <strong>{department.name}</strong>
                  <span>{members.length} people · {leads.length || 0} leads · {departmentTags.length} tags</span>
                </div>
                {canManageDepartments && (
                  <span className="settings-row-actions">
                    <button className="icon-btn table-action" onClick={() => onEditDepartment(department)} aria-label={`Edit ${department.name}`}><Pencil size={16} /></button>
                    <button className="icon-btn table-action danger" onClick={() => onDeleteDepartment(department)} aria-label={`Delete ${department.name}`}><Trash2 size={16} /></button>
                  </span>
                )}
              </div>
              <div className="org-lane lead-lane">
                <span>Lead</span>
                <div>
                  {leads.length > 0
                    ? leads.map((lead) => <small key={lead}>Lead · {lead}</small>)
                    : <small className="muted">No team lead</small>}
                </div>
              </div>
              <div className="org-lane">
                <span>Employees</span>
                <div>
                  {members.length > 0
                    ? members.map((person) => (
                        <small key={person.id}>
                          {person.name}
                          {person.level === 'Team Lead' ? ' · Team Lead' : ''}
                        </small>
                      ))
                    : <small className="muted">No employees in scope</small>}
                </div>
              </div>
              <div className="org-lane tag-lane">
                <span>Tags</span>
                <div>
                  {departmentTags.length > 0
                    ? departmentTags.map((tag) => (
                        <small className="department-tag-chip" key={`${tag.department}-${tag.workType}-${tag.name}`}>
                          <Tag size={12} />
                          {tag.name}
                        </small>
                      ))
                    : <small className="muted">{role === 'operations' ? 'Tags are managed by authorized users' : 'No department tags'}</small>}
                </div>
              </div>
            </article>
          );
        })}
        {departments.length === 0 && <span className="empty-state">No departments match the current scope.</span>}
      </div>
    </section>
  );
}

function DepartmentTagsView({ canManageTags, departments, tags, people, onAddTag, onEditTag, onDeleteTag }) {
  const allDepartmentTags = tags.filter((tag) => tag.department === 'All departments');
  const unassignedTags = tags.filter((tag) => (
    tag.department !== 'All departments'
    && !departments.some((department) => departmentInScope(tag.department, [department.name]))
  ));
  const groupedDepartments = [
    ...(allDepartmentTags.length > 0 ? [{ name: 'All departments', tags: allDepartmentTags, shared: true }] : []),
    ...departments.map((department) => ({
      name: department.name,
      tags: tags.filter((tag) => departmentInScope(tag.department, [department.name])),
    })),
    ...(unassignedTags.length > 0 ? [{ name: 'Other tags', tags: unassignedTags }] : []),
  ];

  return (
    <section className="primary-panel department-tags-panel">
      <div className="panel-heading">
        <div>
          <span className="eyebrow">Tags</span>
          <h2>Department tag library</h2>
        </div>
        <button className="soft-btn" disabled={!canManageTags} onClick={onAddTag}><Plus size={17} /> Add tag</button>
      </div>
      <div className="settings-tag-note employee-admin-note">
        <Tag size={16} />
        <span>Tags are matched against employees. Tagged work types are visible only to employees with the same tag.</span>
      </div>
      <div className="tag-department-grid">
        {groupedDepartments.map((department) => (
          <article className="tag-department-card" key={department.name}>
            <div className="tag-department-head">
              <strong>{department.name}</strong>
              <span>{department.tags.length} tags · {department.shared ? people.length : people.filter((person) => canonicalDepartmentName(person.department) === canonicalDepartmentName(department.name)).length} people in scope</span>
            </div>
            <div className="settings-tags department-tag-list">
              {department.tags.map((tag) => (
                <span className="settings-tag-chip" key={`${tag.department}-${tag.workType}-${tag.name}`}>
                  <b>{tag.name}</b>
                  <small>{tag.workType}</small>
                  {canManageTags && (
                    <>
                      <button onClick={() => onEditTag(tag)} aria-label={`Edit ${tag.name}`}><Pencil size={13} /></button>
                      <button onClick={() => onDeleteTag(tag)} aria-label={`Delete ${tag.name}`}><Trash2 size={13} /></button>
                    </>
                  )}
                </span>
              ))}
              {department.tags.length === 0 && <span className="empty-tag-chip">No tags for this department</span>}
            </div>
          </article>
        ))}
        {groupedDepartments.length === 0 && <span className="empty-state">No tags match the current scope.</span>}
      </div>
    </section>
  );
}

function EmployeeRecordSidebar({
  employee,
  documents,
  entries,
  corrections,
  employmentRules,
  canEditPeople,
  onClose,
  onEditEmployee,
  onAddComment,
  onArchiveEmployee,
  onRestoreEmployee,
  onDeleteEmployee,
}) {
  const [activeRecordTab, setActiveRecordTab] = useState('overview');
  const [commentText, setCommentText] = useState('');
  const employeeDocuments = documents.filter((document) => document.employee === employee.name);
  const employeeComments = Array.isArray(employee.comments) ? employee.comments : [];
  const employmentRule = findEmploymentRule(employee, employmentRules);
  const compensationRows = employeeCompensationRows(employee);
  const requirementItems = employeeRequirementItems(employee, employmentRules);
  const archived = isArchivedEmployee(employee);
  const recordTabs = [
    { id: 'overview', label: 'Overview', icon: BriefcaseBusiness },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'comments', label: 'Comments', icon: ReceiptText },
    { id: 'admin', label: 'Archive / delete user', icon: FolderLock },
  ];

  function submitComment() {
    onAddComment(employee, commentText);
    setCommentText('');
  }

  return (
    <div className="record-sidebar-backdrop" onClick={onClose}>
      <aside className="employee-record-sidebar" onClick={(event) => event.stopPropagation()} aria-label={`${employee.name} employee record`}>
        <header className="employee-record-topbar">
          <span>Employee record</span>
          <div>
            <button className="icon-btn" disabled={!canEditPeople} onClick={() => onEditEmployee(employee)} aria-label={`Edit ${employee.name}`} title={canEditPeople ? 'Edit employee' : 'Operations cannot edit employees'}><Pencil size={17} /></button>
            <button className="icon-btn" onClick={onClose} aria-label="Close employee record"><X size={20} /></button>
          </div>
        </header>
        <div className="employee-record-body">
          <section className="employee-record-profile">
            <div className="employee-record-avatar" style={personAvatarStyle(employee.name)}>{initials(employee.name)}</div>
            <div className="employee-record-name">
              <h2>{employee.name}</h2>
              <span className={`status-pill ${archived ? 'archived' : 'live'}`}>{archived ? 'Inactive' : 'Active'}</span>
            </div>
            <div className="employee-record-facts">
              <EmployeeFact icon={BriefcaseBusiness} label="Role" value={employee.level} />
              <EmployeeFact icon={UsersRound} label="Department" value={employee.department} />
              <EmployeeFact icon={UsersRound} label="Employment" value={employee.employment} />
              <EmployeeFact icon={Mail} label="Work email" value={compactValue(employee.email)} />
              <EmployeeFact icon={Phone} label="Phone" value={compactValue(employee.phone)} />
              <EmployeeFact icon={CalendarClock} label="Start date" value={displayDate(employee.start)} />
              <EmployeeFact icon={CircleDollarSign} label="Pay type" value={employmentRule?.payType || 'No rule'} />
            </div>
            <div className="employee-record-divider" />
            <div className="employee-record-tags">
              <Tag size={20} />
              <div>
                <span>Segmentation tags</span>
                <strong>{employee.tags.length > 0 ? employee.tags.join(' | ') : 'No tags assigned'}</strong>
              </div>
            </div>
          </section>
          <section className="employee-record-overview">
            <nav className="employee-record-tabs" aria-label="Employee record sections">
              {recordTabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    className={activeRecordTab === tab.id ? 'active' : ''}
                    onClick={() => setActiveRecordTab(tab.id)}
                    aria-selected={activeRecordTab === tab.id}
                    type="button"
                  >
                    <Icon size={18} /> {tab.label}
                  </button>
                );
              })}
            </nav>
            {activeRecordTab === 'overview' && (
              <div className="employee-overview-card">
                <div className="overview-title">
                  <span><BriefcaseBusiness size={19} /></span>
                  <h3>Employee overview</h3>
                </div>
                <div className="overview-grid employee-identity-grid">
                  <EmployeeOverviewItem label="Address" value={compactValue(employeeAddressParts(employee).address)} />
                  <EmployeeOverviewItem label="Post number" value={compactValue(employeeAddressParts(employee).postNumber)} />
                  <EmployeeOverviewItem label="City" value={compactValue(employeeAddressParts(employee).city)} />
                  <EmployeeOverviewItem label="EMŠO / Personal ID" value={compactValue(employee.personalId)} />
                  <EmployeeOverviewItem label="Tax number" value={compactValue(employee.taxNumber)} />
                  <EmployeeOverviewItem label="Private email" value={compactValue(employee.privateEmail)} />
                </div>
                <div className="employee-record-section">
                  <div className="overview-title">
                    <span><ListChecks size={19} /></span>
                    <h3>Work setup</h3>
                  </div>
                  <div className="employee-requirement-list">
                    {requirementItems.filter((item) => item.label !== 'Work start').map((item) => {
                      const Icon = item.icon || Check;
                      return (
                        <div className={`employee-requirement-item ${item.tone || 'neutral'}`} key={item.label}>
                          <div>
                            <Icon size={17} />
                            <div>
                              <strong>{item.label}</strong>
                              {item.detail && <small>{item.detail}</small>}
                            </div>
                          </div>
                          <span>{item.value}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="employee-record-section">
                  <div className="overview-title">
                    <span><CircleDollarSign size={19} /></span>
                    <h3>Compensation setup</h3>
                  </div>
                  <div className="employee-record-table compensation-table">
                    <div className="employee-record-table-head">
                      <span>Employment type</span>
                      <span>Work types</span>
                      <span>Cost details</span>
                      <span>Project period</span>
                    </div>
                    {compensationRows.map((row) => (
                      <div className="employee-record-table-row" key={row.id}>
                        <strong data-label="Employment type">{row.employmentType}</strong>
                        <span data-label="Work types">{row.payType === PAY_TYPE_PROJECT ? 'All paid work types' : (row.workTypes.length > 0 ? row.workTypes.join(', ') : 'All eligible work types')}</span>
                        <span data-label="Cost details">
                          {row.payType === PAY_TYPE_MONTHLY && `${money(monthlyCompensationTotal(row))} monthly total`}
                          {row.payType === PAY_TYPE_HOURLY && `${money(row.hourlyRate)} / h · meal ${money(row.mealAllowance)} · transport ${money(row.transportAllowance)}`}
                          {row.payType === PAY_TYPE_PROJECT && `${row.projectName || 'Unnamed project'} · ${money(row.oneTimeAmount)}`}
                        </span>
                        <span data-label="Project period">{row.payType === PAY_TYPE_PROJECT ? `${row.projectStartDate ? displayDate(row.projectStartDate) : 'No start'} to ${row.projectEndDate ? displayDate(row.projectEndDate) : 'No end'}` : '-'}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {activeRecordTab === 'documents' && (
              <div className="employee-overview-card">
                <div className="overview-title">
                  <span><FileText size={19} /></span>
                  <h3>Employee documents</h3>
                </div>
                <div className="employee-record-list">
                  {employeeDocuments.map((document) => (
                    <div className="employee-record-list-item" key={document.id}>
                      <FileText size={20} />
                      <div>
                        <strong>{document.title}</strong>
                        <span>{document.type} · {displayDate(document.date)} · {document.status}</span>
                      </div>
                    </div>
                  ))}
                  {employeeDocuments.length === 0 && (
                    <div className="employee-record-empty">
                      <FileText size={22} />
                      <strong>No documents stored</strong>
                      <span>Contracts, annexes, certificates, and other important employee files will appear here once they are added to the local document records.</span>
                    </div>
                  )}
                </div>
              </div>
            )}
            {activeRecordTab === 'comments' && (
              <div className="employee-overview-card">
                <div className="overview-title">
                  <span><ReceiptText size={19} /></span>
                  <h3>Employee comments</h3>
                </div>
                <div className="employee-comment-form">
                  <textarea
                    value={commentText}
                    disabled={!canEditPeople}
                    onChange={(event) => setCommentText(event.target.value)}
                    placeholder={canEditPeople ? 'Add an internal employee comment...' : 'Operations cannot add comments'}
                    aria-label={`Add comment for ${employee.name}`}
                  />
                  <button className="primary-btn" disabled={!canEditPeople || !commentText.trim()} onClick={submitComment}>
                    <Plus size={16} /> Add comment
                  </button>
                </div>
                <div className="employee-record-list">
                  {employeeComments.map((comment) => (
                    <div className="employee-record-list-item" key={comment.id}>
                      <ReceiptText size={20} />
                      <div>
                        <strong>{comment.text}</strong>
                        <span>{comment.date} · {comment.by}</span>
                      </div>
                    </div>
                  ))}
                  {employeeComments.length === 0 && <span className="empty-state">No employee comments have been added yet.</span>}
                </div>
              </div>
            )}
            {activeRecordTab === 'admin' && (
              <div className="employee-overview-card">
                <div className="overview-title">
                  <span><FolderLock size={19} /></span>
                  <h3>Archive / delete user</h3>
                </div>
                <div className="employee-admin-actions">
                  <div>
                    <strong>{archived ? 'Inactive employee' : 'Active employee'}</strong>
                    <span>{archived ? 'Archived employees stay in the database with their data, but are marked inactive.' : 'Archiving keeps the employee data and marks the user as inactive.'}</span>
                  </div>
                  <button
                    className="soft-btn"
                    disabled={!canEditPeople}
                    onClick={() => (archived ? onRestoreEmployee(employee) : onArchiveEmployee(employee))}
                  >
                    <FolderLock size={16} /> {archived ? 'Restore user' : 'Archive user'}
                  </button>
                </div>
                <div className="employee-admin-actions danger-zone">
                  <div>
                    <strong>Delete employee data</strong>
                    <span>Deleting removes this employee record and linked local entries, documents, correction records, and unlock windows.</span>
                  </div>
                  <button className="soft-btn danger-soft" disabled={!canEditPeople} onClick={() => onDeleteEmployee(employee)}>
                    <Trash2 size={16} /> Delete user
                  </button>
                </div>
                {!canEditPeople && <div className="modal-warning"><AlertCircle size={16} /> Operations cannot archive or delete employees.</div>}
              </div>
            )}
          </section>
        </div>
      </aside>
    </div>
  );
}

function EmployeeFact({ icon: Icon, label, value }) {
  return (
    <div className="employee-record-fact">
      <Icon size={22} />
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
    </div>
  );
}

function EmployeeOverviewItem({ label, value }) {
  return (
    <div>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function EmployeeModal({ mode, employee, role, primaryLeadDepartment, employees, departments, tags, workTypes, employmentRules, onClose, onSave }) {
  const editing = mode === 'edit';
  const availableDepartments = Array.from(new Set([
    ...(role === 'lead' ? [primaryLeadDepartment] : departments.map((department) => department.name)),
  ].filter(Boolean)));
  const availableTags = activeTagNames(tags).map((tag) => ({ name: tag }));
  const defaultTags = filterActiveTags(
    employee?.tags || (role === 'lead' ? ['New hire', primaryLeadDepartment].filter(Boolean) : ['New hire']),
    tags,
  );
  const levelOptions = ['Operations', 'Team Lead', ...(role === 'management' ? ['Management'] : [])].map((level) => ({ name: level }));
  const normalizedEmploymentRules = normalizeEmploymentRules(employmentRules);
  const employmentOptions = normalizedEmploymentRules.map((rule) => ({ name: rule.name, meta: rule.payType }));
  const defaultDepartment = employee?.department || (role === 'lead' ? primaryLeadDepartment : availableDepartments[0] || '');
  const initialContractEnd = employee?.contractEndDate || firstIsoDate(employee?.contractValidity || employee?.contract);
  const initialAddressParts = employeeAddressParts(employee || {});
  const initialCompensationRows = employeeCompensationRows(employee || {}).map((row) => {
    const matchingRule = normalizedEmploymentRules.find((rule) => rule.name === row.employmentType)
      || normalizedEmploymentRules.find((rule) => rule.name === employee?.employment)
      || normalizedEmploymentRules.find((rule) => rule.payType === row.payType)
      || normalizedEmploymentRules[0];
    return {
      ...row,
      employmentType: matchingRule?.name || row.employmentType,
      payType: matchingRule?.payType || row.payType,
    };
  });
  const [form, setForm] = useState({
    id: employee?.id,
    name: employee?.name || '',
    level: employee?.level || 'Operations',
    department: defaultDepartment,
    tags: defaultTags,
    personalId: employee?.personalId || '',
    address: initialAddressParts.address,
    postNumber: initialAddressParts.postNumber,
    city: initialAddressParts.city,
    taxNumber: employee?.taxNumber || '',
    email: employee?.email || '',
    phone: employee?.phone || '',
    privateEmail: employee?.privateEmail || '',
    employment: employee?.employment || 'Trial period',
    start: employee?.start || TODAY,
    contractStartDate: employee?.contractStartDate || employee?.start || TODAY,
    contractEndDate: initialContractEnd,
    medicalExamDate: employee?.medicalExamDate || '',
    safetyTrainingDate: employee?.safetyTrainingDate || '',
    safetyValidUntil: employee?.safetyValidUntil || '',
    cost: employee?.cost || 0,
    hours: employee?.hours || 0,
    docs: employee?.docs || 0,
    status: employeeStatus(employee || {}),
    comments: Array.isArray(employee?.comments) ? employee.comments : [],
    compensationRows: initialCompensationRows,
    leadDepartments: employeeLeadDepartments(employee || {}),
  });
  const duplicateName = employees.some((person) => (
    person.id !== form.id && person.name.toLowerCase() === form.name.trim().toLowerCase()
  ));
  const hasMultiplePayRows = form.compensationRows.length > 1;
  const hasUnscopedRequiredRows = hasMultiplePayRows && form.compensationRows.some((row) => row.payType !== PAY_TYPE_PROJECT && row.workTypes.length === 0);
  const hasInvalidProjectRows = form.compensationRows.some((row) => (
    row.payType === PAY_TYPE_PROJECT
    && (!row.projectName.trim() || !row.projectStartDate || !row.projectEndDate || row.projectStartDate > row.projectEndDate)
  ));
  const hasNoContractEndDate = !form.contractEndDate;
  const canSave = Boolean(form.name.trim() && form.department && form.level) && !duplicateName && !hasUnscopedRequiredRows && !hasInvalidProjectRows;
  const compensationEmploymentOptions = normalizedEmploymentRules.map((rule) => ({ name: rule.name, meta: rule.payType }));
  const compensationWorkTypeOptions = workTypes
    .filter((type) => workTypeMatchesPerson(type, { department: form.department, tags: form.tags }))
    .map((type) => ({ name: type.name, meta: type.department }));

  function update(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
      ...(field === 'employment'
        ? {
            compensationRows: current.compensationRows.map((row, index) => (
              index === 0
                ? {
                    ...row,
                    employmentType: value,
                    payType: normalizedEmploymentRules.find((rule) => rule.name === value)?.payType || row.payType,
                  }
                : row
            )),
          }
        : {}),
    }));
  }

  function toggleContractEndDateMode() {
    setForm((current) => ({
      ...current,
      contractEndDate: current.contractEndDate ? '' : (current.contractStartDate || current.start || TODAY),
    }));
  }

  function updateCompensationRow(id, field, value) {
    setForm((current) => ({
      ...current,
      employment: field === 'employmentType' && current.compensationRows[0]?.id === id ? value : current.employment,
      compensationRows: current.compensationRows.map((row) => (
        row.id === id
          ? {
              ...row,
              [field]: value,
              ...(field === 'employmentType'
                ? { payType: normalizedEmploymentRules.find((rule) => rule.name === value)?.payType || row.payType }
                : {}),
            }
          : row
      )),
    }));
  }

  function addCompensationRow() {
    const defaultRule = normalizedEmploymentRules[0];
    setForm((current) => ({
      ...current,
      compensationRows: [
        ...current.compensationRows,
        {
          id: Date.now(),
          employmentType: defaultRule?.name || '',
          workTypes: [],
          payType: defaultRule?.payType || PAY_TYPE_MONTHLY,
          grossSalary: 0,
          grossGrossCost: 0,
          mealAllowance: 0,
          transportAllowance: 0,
          monthlyWorkingDays: workingDaysInMonth(TODAY),
          hourlyRate: 0,
          oneTimeAmount: 0,
          projectName: '',
          projectStartDate: TODAY,
          projectEndDate: TODAY,
          note: '',
        },
      ],
    }));
  }

  function removeCompensationRow(id) {
    setForm((current) => ({
      ...current,
      compensationRows: current.compensationRows.length === 1
        ? current.compensationRows
        : current.compensationRows.filter((row) => row.id !== id),
    }));
  }

  useEffect(() => {
    if (role !== 'lead') return;
    setForm((current) => ({ ...current, department: primaryLeadDepartment }));
  }, [role, primaryLeadDepartment]);

  return (
    <div className="modal-backdrop" onClick={(event) => event.target === event.currentTarget && onClose()}>
      <section className="entry-modal employee-modal" role="dialog" aria-modal="true">
        <div className="modal-head">
          <div>
            <h2>{editing ? 'Edit employee' : 'Add employee'}</h2>
            <p>{editing ? 'Update the employee card and related local records.' : 'Create a local employee profile for the active role scope.'}</p>
          </div>
          <button className="icon-btn" onClick={onClose} aria-label="Close"><X size={16} /></button>
        </div>

        <div className="employee-form-sections">
          <section className="employee-form-section">
            <div className="employee-form-section-head">
              <h3>User info</h3>
              <p>Personal identity details stored on the employee record.</p>
            </div>
            <div className="modal-grid user-info-grid">
              <label className="field user-info-full">
                <span>Name</span>
                <input value={form.name} onChange={(event) => update('name', event.target.value)} placeholder="Employee name" />
              </label>
              <label className="field user-info-address">
                <span>Address</span>
                <input value={form.address} onChange={(event) => update('address', event.target.value)} placeholder="Street and house number" />
              </label>
              <label className="field user-info-post">
                <span>Post number</span>
                <input value={form.postNumber} onChange={(event) => update('postNumber', event.target.value)} placeholder="1000" />
              </label>
              <label className="field user-info-city">
                <span>City</span>
                <input value={form.city} onChange={(event) => update('city', event.target.value)} placeholder="City" />
              </label>
              <label className="field user-info-half">
                <span>Personal ID / EMŠO</span>
                <input value={form.personalId} onChange={(event) => update('personalId', event.target.value)} placeholder="Personal ID number" />
              </label>
              <label className="field user-info-half">
                <span>Tax number</span>
                <input value={form.taxNumber} onChange={(event) => update('taxNumber', event.target.value)} placeholder="Tax number" />
              </label>
              <label className="field user-info-third">
                <span>Work email</span>
                <input type="email" value={form.email} onChange={(event) => update('email', event.target.value)} placeholder="name@company.com" />
              </label>
              <label className="field user-info-third">
                <span>Phone number</span>
                <input type="tel" value={form.phone} onChange={(event) => update('phone', event.target.value)} placeholder="+386 ..." />
              </label>
              <label className="field user-info-third">
                <span>Private email</span>
                <input type="email" value={form.privateEmail} onChange={(event) => update('privateEmail', event.target.value)} placeholder="Private email address" />
              </label>
            </div>
          </section>

          <section className="employee-form-section">
            <div className="employee-form-section-head">
              <h3>Department and employment</h3>
              <p>Role scope, department assignment, employment type, and tags.</p>
            </div>
            <div className="modal-grid">
              <label className="field">
                <span>Role level</span>
                <SimpleDropdown value={form.level} options={levelOptions} onChange={(value) => update('level', value)} />
              </label>
              <label className="field">
                <span>Department</span>
                {role === 'lead' ? (
                  <input value={primaryLeadDepartment} disabled />
                ) : (
                  <SimpleDropdown value={form.department} options={availableDepartments.map((name) => ({ name }))} onChange={(value) => update('department', value)} />
                )}
              </label>
              <label className="field">
                <span>Employment type</span>
                <SimpleDropdown value={form.employment} options={employmentOptions} onChange={(value) => update('employment', value)} />
              </label>
              <label className="field">
                <span>Start date</span>
                <input type="date" value={form.start} max={TODAY} onInput={(event) => update('start', event.target.value)} onChange={(event) => update('start', event.target.value)} />
              </label>
              <label className="field modal-note">
                <span>Tags</span>
                <MultiSelectDropdown
                  values={form.tags}
                  options={availableTags}
                  onChange={(values) => update('tags', values)}
                  placeholder={availableTags.length === 0 ? 'No active tags' : 'Select tags...'}
                />
              </label>
              {form.level === 'Team Lead' && (
                <label className="field modal-note">
                  <span>Lead departments</span>
                  <MultiSelectDropdown
                    values={form.leadDepartments}
                    options={availableDepartments.map((name) => ({ name }))}
                    onChange={(values) => update('leadDepartments', values)}
                    placeholder="Select departments..."
                  />
                </label>
              )}
            </div>
          </section>

          <section className="employee-form-section">
            <div className="employee-form-section-head">
              <h3>Contract and compliance</h3>
              <p>Only contract dates, medical completion, and safety training dates are entered here.</p>
            </div>
            <div className="employee-compliance-rows">
              <div className="employee-compliance-row">
                <div className="employee-compliance-type">
                  <strong>Contract</strong>
                  <span>Employment period</span>
                </div>
                <label className="field">
                  <span>Contract from</span>
                  <input type="date" value={form.contractStartDate} onInput={(event) => update('contractStartDate', event.target.value)} onChange={(event) => update('contractStartDate', event.target.value)} />
                </label>
                <label className="field">
                  <span>Contract to</span>
                  <input type="date" value={form.contractEndDate} disabled={hasNoContractEndDate} onInput={(event) => update('contractEndDate', event.target.value)} onChange={(event) => update('contractEndDate', event.target.value)} />
                </label>
                <button
                  className={`employee-end-date-toggle ${hasNoContractEndDate ? 'active' : ''}`}
                  type="button"
                  aria-pressed={hasNoContractEndDate}
                  onClick={toggleContractEndDateMode}
                >
                  No end date
                </button>
              </div>
              <div className="employee-compliance-row">
                <div className="employee-compliance-type">
                  <strong>Medical</strong>
                  <span>Exam completion</span>
                </div>
                <label className="field">
                  <span>Medical exam completed</span>
                  <input type="date" value={form.medicalExamDate} max={TODAY} onInput={(event) => update('medicalExamDate', event.target.value)} onChange={(event) => update('medicalExamDate', event.target.value)} />
                  {!form.medicalExamDate && (
                    <span className="employee-compliance-warning">
                      <AlertCircle size={14} /> Medical exam is not completed.
                    </span>
                  )}
                </label>
              </div>
              <div className="employee-compliance-row">
                <div className="employee-compliance-type">
                  <strong>Safety training</strong>
                  <span>Training validity</span>
                </div>
                <label className="field">
                  <span>Safety training completed</span>
                  <input type="date" value={form.safetyTrainingDate} max={TODAY} onInput={(event) => update('safetyTrainingDate', event.target.value)} onChange={(event) => update('safetyTrainingDate', event.target.value)} />
                  {!form.safetyTrainingDate && (
                    <span className="employee-compliance-warning">
                      <AlertCircle size={14} /> Safety training is not completed.
                    </span>
                  )}
                </label>
                <label className="field">
                  <span>Safety valid until</span>
                  <input type="date" value={form.safetyValidUntil} onInput={(event) => update('safetyValidUntil', event.target.value)} onChange={(event) => update('safetyValidUntil', event.target.value)} />
                </label>
              </div>
            </div>
          </section>
        </div>

        <div className="modal-subsection">
          <div className="modal-subsection-head">
            <div>
              <h3>Compensation rows</h3>
              <p>Add one row for each employment type or project arrangement.</p>
            </div>
            <button className="soft-btn" onClick={addCompensationRow} type="button"><Plus size={16} /> Add row</button>
          </div>
          <div className="compensation-editor">
            {form.compensationRows.map((row) => {
              const monthly = row.payType === PAY_TYPE_MONTHLY;
              const hourly = row.payType === PAY_TYPE_HOURLY;
              return (
                <div className="compensation-editor-row" key={row.id}>
                  <label className="field">
                    <span>Employment type</span>
                    <SimpleDropdown value={row.employmentType} options={compensationEmploymentOptions} onChange={(value) => updateCompensationRow(row.id, 'employmentType', value)} />
                  </label>
                  <div className="derived-field compact">
                    <span>Pay type</span>
                    <strong>{row.payType}</strong>
                  </div>
                  {row.payType !== PAY_TYPE_PROJECT ? (
                    <label className="field compensation-worktypes-field">
                      <span>Applies to work types</span>
                      <MultiSelectDropdown
                        values={row.workTypes}
                        options={compensationWorkTypeOptions}
                        onChange={(values) => updateCompensationRow(row.id, 'workTypes', values)}
                        placeholder={hasMultiplePayRows ? 'Select work types...' : 'All eligible work types'}
                      />
                    </label>
                  ) : (
                    <div className="derived-field compact compensation-worktypes-field">
                      <span>Work types</span>
                      <strong>All paid work types</strong>
                    </div>
                  )}
                  {monthly && (
                    <>
                      <label className="field">
                        <span>Gross salary</span>
                        <input type="number" min="0" value={row.grossSalary} onChange={(event) => updateCompensationRow(row.id, 'grossSalary', event.target.value)} />
                      </label>
                      <label className="field">
                        <span>Gross gross cost</span>
                        <input type="number" min="0" value={row.grossGrossCost} onChange={(event) => updateCompensationRow(row.id, 'grossGrossCost', event.target.value)} />
                      </label>
                      <label className="field">
                        <span>Meal allowance</span>
                        <input type="number" min="0" value={row.mealAllowance} onChange={(event) => updateCompensationRow(row.id, 'mealAllowance', event.target.value)} />
                      </label>
                      <label className="field">
                        <span>Transport allowance</span>
                        <input type="number" min="0" value={row.transportAllowance} onChange={(event) => updateCompensationRow(row.id, 'transportAllowance', event.target.value)} />
                      </label>
                      <div className="derived-field compact">
                        <span>Monthly hours</span>
                        <strong>{monthlyWorkingHours(row)} h</strong>
                      </div>
                    </>
                  )}
                  {hourly && (
                    <>
                      <label className="field">
                        <span>Hourly rate</span>
                        <input type="number" min="0" value={row.hourlyRate} onChange={(event) => updateCompensationRow(row.id, 'hourlyRate', event.target.value)} />
                      </label>
                      <label className="field">
                        <span>Meal allowance</span>
                        <input type="number" min="0" value={row.mealAllowance} onChange={(event) => updateCompensationRow(row.id, 'mealAllowance', event.target.value)} />
                      </label>
                      <label className="field">
                        <span>Transport allowance</span>
                        <input type="number" min="0" value={row.transportAllowance} onChange={(event) => updateCompensationRow(row.id, 'transportAllowance', event.target.value)} />
                      </label>
                    </>
                  )}
                  {!monthly && !hourly && (
                    <>
                      <label className="field">
                        <span>Project name</span>
                        <input value={row.projectName} onChange={(event) => updateCompensationRow(row.id, 'projectName', event.target.value)} placeholder="Project name" />
                      </label>
                      <label className="field">
                        <span>Project from</span>
                        <input type="date" value={row.projectStartDate} onInput={(event) => updateCompensationRow(row.id, 'projectStartDate', event.target.value)} onChange={(event) => updateCompensationRow(row.id, 'projectStartDate', event.target.value)} />
                      </label>
                      <label className="field">
                        <span>Project to</span>
                        <input type="date" value={row.projectEndDate} onInput={(event) => updateCompensationRow(row.id, 'projectEndDate', event.target.value)} onChange={(event) => updateCompensationRow(row.id, 'projectEndDate', event.target.value)} />
                      </label>
                      <label className="field">
                        <span>Project value</span>
                        <input type="number" min="0" value={row.oneTimeAmount} onChange={(event) => updateCompensationRow(row.id, 'oneTimeAmount', event.target.value)} />
                      </label>
                    </>
                  )}
                  <label className="field compensation-note-field">
                    <span>Note</span>
                    <input value={row.note} onChange={(event) => updateCompensationRow(row.id, 'note', event.target.value)} placeholder="Special case or agreement" />
                  </label>
                  <button
                    className="icon-btn danger"
                    disabled={form.compensationRows.length === 1}
                    onClick={() => removeCompensationRow(row.id)}
                    type="button"
                    aria-label="Remove compensation row"
                    title={form.compensationRows.length === 1 ? 'At least one compensation row is required' : 'Remove row'}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {duplicateName && (
          <div className="modal-warning"><AlertCircle size={16} /> Employee name must be unique.</div>
        )}
        {hasUnscopedRequiredRows && (
          <div className="modal-warning"><AlertCircle size={16} /> Select applicable work types for every non-project compensation row when an employee has multiple employment types.</div>
        )}
        {hasInvalidProjectRows && (
          <div className="modal-warning"><AlertCircle size={16} /> Project work requires a project name and a valid Project from / Project to date range.</div>
        )}

        <div className="modal-actions">
          <button className="soft-btn" onClick={onClose}>Cancel</button>
          <button className="primary-btn" disabled={!canSave} onClick={() => onSave(form)}>{editing ? 'Save employee' : 'Add employee'}</button>
        </div>
      </section>
    </div>
  );
}

function EmploymentRuleModal({ mode, rule, existingRules, onClose, onSave }) {
  const editing = mode === 'edit';
  const [form, setForm] = useState({
    id: rule?.id,
    originalName: rule?.name || '',
    name: rule?.name || '',
    payType: rule?.payType || PAY_TYPE_MONTHLY,
    requiresContract: rule?.requiresContract ?? true,
    requiresMedical: rule?.requiresMedical ?? true,
    requiresSafety: rule?.requiresSafety ?? true,
  });
  const duplicateName = existingRules.some((item) => item.id !== form.id && item.name.toLowerCase() === form.name.trim().toLowerCase());
  const canSave = Boolean(form.name.trim() && form.payType) && !duplicateName;

  function update(field, value) {
    setForm((current) => {
      const next = { ...current, [field]: value };
      if (field === 'payType') {
        if (value === PAY_TYPE_MONTHLY) {
          next.requiresContract = true;
          next.requiresMedical = true;
          next.requiresSafety = true;
        } else {
          next.requiresContract = true;
          next.requiresMedical = false;
          next.requiresSafety = false;
        }
      }
      return next;
    });
  }

  return (
    <div className="modal-backdrop" onClick={(event) => event.target === event.currentTarget && onClose()}>
      <section className="entry-modal rule-modal" role="dialog" aria-modal="true">
        <div className="modal-head">
          <div>
            <h2>{editing ? 'Edit employment rule' : 'Add employment rule'}</h2>
            <p>Define the employment type, cost calculation, employee to-dos, and card display.</p>
          </div>
          <button className="icon-btn" onClick={onClose} aria-label="Close"><X size={16} /></button>
        </div>
        <div className="modal-grid">
          <label className="field modal-note">
            <span>Employment type name</span>
            <input value={form.name} onChange={(event) => update('name', event.target.value)} placeholder="Permanent employment, project work, hourly contractor..." />
          </label>
          <label className="field modal-note">
            <span>Cost method</span>
            <SimpleDropdown value={form.payType} options={payTypeOptions} onChange={(value) => update('payType', value)} />
          </label>
          <label className="toggle-line">
            <input type="checkbox" checked={form.requiresContract} onChange={(event) => update('requiresContract', event.target.checked)} />
            <span>Require employment contract</span>
          </label>
          <label className="toggle-line">
            <input type="checkbox" checked={form.requiresMedical} onChange={(event) => update('requiresMedical', event.target.checked)} />
            <span>Require medical exam</span>
          </label>
          <label className="toggle-line">
            <input type="checkbox" checked={form.requiresSafety} onChange={(event) => update('requiresSafety', event.target.checked)} />
            <span>Require safety training</span>
          </label>
          <div className="rule-form-note modal-note">
            <ListChecks size={17} />
            <span>
              Monthly salary defaults to contract, medical exam, and safety training. Employee cards use the selected cost method to choose the visible fields.
            </span>
          </div>
        </div>
        {duplicateName && (
          <div className="modal-warning"><AlertCircle size={16} /> Employment type name must be unique.</div>
        )}
        <div className="modal-actions">
          <button className="soft-btn" onClick={onClose}>Cancel</button>
          <button className="primary-btn" disabled={!canSave} onClick={() => onSave(form)}>{editing ? 'Save rule' : 'Add rule'}</button>
        </div>
      </section>
    </div>
  );
}

function AnalyticsView({ role, platform, activePlatform, people, entries, workTypes, configuredWorkTypes, employmentRules, totals, activeRole, onFilters }) {
  const workTypeHours = new Map(workTypes.map((type) => [
    type.name,
    entries.filter((entry) => entry.type === type.name).reduce((sum, entry) => sum + (Number(entry.hours) || 0), 0),
  ]));
  const peopleStats = people.map((person) => {
    const personEntries = entries.filter((entry) => entry.employee === person.name);
    return {
      person,
      hours: personEntries.reduce((sum, entry) => sum + (Number(entry.hours) || 0), 0),
      cost: employeeRuleCost(person, employmentRules, entries, configuredWorkTypes),
    };
  });
  const maxHours = Math.max(...Array.from(workTypeHours.values()), 1);
  const maxCost = Math.max(...peopleStats.map((item) => item.cost), 1);
  return (
    <div className="workspace two-col">
      <section className="primary-panel">
        <div className="panel-heading">
          <div>
            <span className="eyebrow">Analytics</span>
            <h2>{role === 'management' ? 'Company overview' : role === 'lead' ? `${activeRole.dept} overview` : 'My work overview'}</h2>
          </div>
          <button className="soft-btn" onClick={onFilters}><Filter size={17} /> Filters</button>
        </div>
        <div className="analytics-kpis">
          <Metric icon={Clock3} label="Total working hours" value={`${totals.hours.toFixed(1)} h`} delta="Current visible scope" />
          <Metric icon={Activity} label="Average hours / employee" value={`${(totals.hours / Math.max(people.length, 1)).toFixed(1)} h`} delta="Last 30 days" />
          <Metric icon={CircleDollarSign} label="Cost by scope" value={money(totals.entryCost)} delta="Available through React analytics API" />
        </div>
        <div className="bar-list">
          <h3>Work type distribution</h3>
          {workTypes.map((type) => (
            <div className="bar-row" key={`${type.department}-${type.name}`}>
              <div><strong>{type.name}</strong><span>{type.department}</span></div>
              <div className="bar-track"><i style={{ width: `${(workTypeHours.get(type.name) / maxHours) * 100}%` }} /></div>
              <b>{(workTypeHours.get(type.name) || 0).toFixed(1)} h</b>
            </div>
          ))}
        </div>
      </section>

      <aside className="primary-panel">
        <div className="panel-heading compact">
          <div>
            <span className="eyebrow">{activePlatform.stack}</span>
            <h2>Employee workload</h2>
          </div>
        </div>
        <div className="cost-list">
          {peopleStats.map(({ person, hours, cost }) => (
            <div className="cost-row" key={person.id}>
              <div>
                <strong>{person.name}</strong>
                <span>{person.department} · {hours.toFixed(1)} h</span>
              </div>
              <div className="cost-meter"><i style={{ width: `${(cost / maxCost) * 100}%` }} /></div>
              <b>{money(cost)}</b>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}

function SettingsView({
  role,
  canManageSettings,
  activeLeadDepartments,
  managementTypes,
  leadTypes,
  onAddWorkType,
  onEditWorkType,
  onDeleteWorkType,
}) {
  const isManagement = role === 'management';
  const isLead = role === 'lead';
  const operationsTypes = operationsSettingsWorkTypes;
  const scopedWorkTypes = isManagement
    ? managementTypes
    : isLead
      ? leadTypes.filter((type) => type.department === 'All departments' || departmentInScope(type.department, activeLeadDepartments))
      : operationsTypes;

  return (
    <div className={cx('settings-page', isManagement && 'management-layout', isLead && 'lead-layout')}>
      <SettingsPanel title="Work types" action={canManageSettings ? 'Add' : undefined} onAction={onAddWorkType} className="worktypes-panel">
        <div className="settings-list scroll-list">
          {scopedWorkTypes.map((type) => (
            <div className="settings-row worktype-row" key={`${type.department}-${type.name}`}>
              <i style={{ background: type.color }} />
              <div>
                <strong>{type.name}</strong>
                <span>{type.department}</span>
              </div>
              <em className={type.paid ? 'paid' : 'break'}>{type.paid ? 'Paid' : 'Unpaid'}</em>
              <small className="worktype-tags">{type.tags?.length > 0 ? `Tags: ${type.tags.join(', ')}` : 'Tags: All'}</small>
              {canManageSettings && (
                <span className="settings-row-actions">
                  <button className="icon-btn table-action" onClick={() => onEditWorkType(type)} aria-label={`Edit ${type.name}`}><Pencil size={16} /></button>
                  <button className="icon-btn table-action danger" onClick={() => onDeleteWorkType(type)} aria-label={`Delete ${type.name}`}><Trash2 size={16} /></button>
                </span>
              )}
            </div>
          ))}
        </div>
      </SettingsPanel>
    </div>
  );
}

function EntryModal({ mode, entry, role, people, workTypes, activeRole, correctionWindows, onClose, onSave }) {
  const defaultEmployee = role === 'operations' ? activeRole.person : people[0]?.name || '';
  const [form, setForm] = useState({
    id: entry?.id,
    employee: entry?.employee || defaultEmployee,
    date: entry?.date || TODAY,
    type: entry?.type || workTypes[0]?.name || '',
    start: entry?.start || '09:00',
    end: entry?.end || '17:00',
    note: entry?.note || '',
  });
  const selectedEmployee = people.find((person) => person.name === form.employee) || people[0];
  const employeeWorkTypes = useMemo(() => {
    if (!selectedEmployee) return [];
    return workTypes.filter((type) => workTypeMatchesPerson(type, selectedEmployee));
  }, [workTypes, selectedEmployee]);

  const isNonTodayDate = form.date !== TODAY;
  const hasFutureDate = isFutureDate(form.date);
  const hasFutureTime = isFutureEntryPoint(form.date, form.start) || isFutureEntryPoint(form.date, form.end);
  const canEditSelectedDate = canEditEntryDate(role, correctionWindows, form.employee, form.date);
  const canSave = Boolean(form.employee && form.type && form.start && form.end) && canEditSelectedDate && !hasFutureDate && !hasFutureTime;

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  useEffect(() => {
    if (employeeWorkTypes.length === 0) return;
    if (!employeeWorkTypes.some((type) => type.name === form.type)) {
      setForm((current) => ({ ...current, type: employeeWorkTypes[0].name }));
    }
  }, [employeeWorkTypes, form.type]);

  return (
    <div className="modal-backdrop" onClick={(event) => event.target === event.currentTarget && onClose()}>
      <section className="entry-modal" role="dialog" aria-modal="true">
        <div className="modal-head">
          <div>
            <h2>{mode === 'edit' ? 'Edit time entry' : 'Add manual entry'}</h2>
            <p>{mode === 'edit' ? 'Update the entry and record the change.' : 'Manual entries follow role permissions and correction rules.'}</p>
          </div>
          <button className="icon-btn" onClick={onClose} aria-label="Close"><X size={16} /></button>
        </div>

        <div className="modal-grid">
          <label className="field">
            <span>Employee</span>
            <SimpleDropdown
              value={form.employee}
              options={people.map((person) => ({ name: person.name, meta: person.department }))}
              onChange={(value) => update('employee', value)}
              disabled={role === 'operations'}
            />
          </label>
          <label className="field">
            <span>Work type</span>
            <WorkTypeDropdown value={form.type} onChange={(value) => update('type', value)} options={employeeWorkTypes} />
          </label>
          <label className="field">
            <span>Date</span>
            <input type="date" value={form.date} max={TODAY} onInput={(event) => update('date', event.target.value)} onChange={(event) => update('date', event.target.value)} />
          </label>
          <label className="field">
            <span>Start</span>
            <input type="time" value={form.start} onInput={(event) => update('start', event.target.value)} onChange={(event) => update('start', event.target.value)} />
          </label>
          <label className="field">
            <span>End</span>
            <div className="time-input-action">
              <input type="time" value={form.end} onInput={(event) => update('end', event.target.value)} onChange={(event) => update('end', event.target.value)} />
              <button type="button" className="soft-btn compact-action" onClick={() => update('end', localTime())}>Now</button>
            </div>
          </label>
          <label className="field modal-note">
            <span>Note</span>
            <input value={form.note} onChange={(event) => update('note', event.target.value)} placeholder="Optional correction or work context" />
          </label>
        </div>

        {isNonTodayDate && !canEditSelectedDate && !hasFutureDate && (
          <div className="modal-warning">
            <Lock size={16} />
            {role === 'operations'
              ? 'Only today can be edited. Send a correction request to your supervisor for past dates.'
              : 'Past dates must be unlocked for this user before hours can be added, edited, or removed.'}
          </div>
        )}
        {hasFutureDate && (
          <div className="modal-warning"><AlertCircle size={16} /> Future dates cannot be added. The latest allowed date is today.</div>
        )}
        {hasFutureTime && !hasFutureDate && (
          <div className="modal-warning"><AlertCircle size={16} /> Start and end cannot be later than now.</div>
        )}

        <div className="modal-actions">
          <button className="soft-btn" onClick={onClose}>Cancel</button>
          <button className="primary-btn" disabled={!canSave} onClick={() => onSave(form)}>{mode === 'edit' ? 'Save changes' : 'Save entry'}</button>
        </div>
      </section>
    </div>
  );
}

function ManualUnlockModal({ people, onClose, onSave }) {
  const [form, setForm] = useState({
    employee: people[0]?.name || '',
    from: YESTERDAY,
    to: TODAY,
  });

  const hasFutureDate = isFutureDate(form.from) || isFutureDate(form.to);
  const canSave = Boolean(form.employee && form.from && form.to) && !hasFutureDate;

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  return (
    <div className="modal-backdrop" onClick={(event) => event.target === event.currentTarget && onClose()}>
      <section className="entry-modal manual-unlock-modal" role="dialog" aria-modal="true">
        <div className="modal-head">
          <div>
            <h2>Unlock user edits</h2>
            <p>Open a past-date editing window without waiting for a request.</p>
          </div>
          <button className="icon-btn" onClick={onClose} aria-label="Close"><X size={16} /></button>
        </div>

        <div className="modal-grid">
          <label className="field modal-note">
            <span>Employee</span>
            <SimpleDropdown
              value={form.employee}
              options={people.map((person) => ({ name: person.name, meta: person.department }))}
              onChange={(value) => update('employee', value)}
            />
          </label>
          <label className="field">
            <span>From</span>
            <input type="date" value={form.from} max={TODAY} onInput={(event) => update('from', event.target.value)} onChange={(event) => update('from', event.target.value)} />
          </label>
          <label className="field">
            <span>To</span>
            <input type="date" value={form.to} max={TODAY} onInput={(event) => update('to', event.target.value)} onChange={(event) => update('to', event.target.value)} />
          </label>
        </div>

        {hasFutureDate && (
          <div className="modal-warning"><AlertCircle size={16} /> Manual unlocks cannot include future dates.</div>
        )}

        <div className="modal-actions">
          <button className="soft-btn" onClick={onClose}>Cancel</button>
          <button className="primary-btn" disabled={!canSave} onClick={() => onSave(form)}><Unlock size={16} /> Unlock user</button>
        </div>
      </section>
    </div>
  );
}

function CorrectionRequestModal({ activeRole, onClose, onSave }) {
  const [form, setForm] = useState({
    from: YESTERDAY,
    to: TODAY,
    note: '',
  });

  const hasFutureDate = isFutureDate(form.from) || isFutureDate(form.to);
  const canSave = Boolean(form.from && form.to && form.note.trim()) && !hasFutureDate;

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  return (
    <div className="modal-backdrop" onClick={(event) => event.target === event.currentTarget && onClose()}>
      <section className="entry-modal correction-request-modal" role="dialog" aria-modal="true">
        <div className="modal-head">
          <div>
            <h2>Request past edit access</h2>
            <p>Send the date range and reason to your team lead and management.</p>
          </div>
          <button className="icon-btn" onClick={onClose} aria-label="Close"><X size={16} /></button>
        </div>

        <div className="modal-grid">
          <label className="field">
            <span>Employee</span>
            <input value={activeRole.person} disabled />
          </label>
          <label className="field">
            <span>Department</span>
            <input value={activeRole.dept} disabled />
          </label>
          <label className="field">
            <span>From</span>
            <input type="date" value={form.from} max={TODAY} onInput={(event) => update('from', event.target.value)} onChange={(event) => update('from', event.target.value)} />
          </label>
          <label className="field">
            <span>To</span>
            <input type="date" value={form.to} max={TODAY} onInput={(event) => update('to', event.target.value)} onChange={(event) => update('to', event.target.value)} />
          </label>
          <label className="field modal-note">
            <span>Reason</span>
            <textarea value={form.note} onChange={(event) => update('note', event.target.value)} placeholder="Explain what needs to be corrected and why." rows={4} />
          </label>
        </div>

        {hasFutureDate && (
          <div className="modal-warning"><AlertCircle size={16} /> Requests for past edits cannot include future dates.</div>
        )}

        <div className="modal-actions">
          <button className="soft-btn" onClick={onClose}>Cancel</button>
          <button className="primary-btn" disabled={!canSave} onClick={() => onSave(form)}>Send request</button>
        </div>
      </section>
    </div>
  );
}

function SettingsCreateModal({ mode, item, role, activeRole, primaryLeadDepartment, employees, departments, workTypes, tags, onClose, onSaveDepartment, onSaveWorkType, onSaveTag }) {
  const isLead = role === 'lead';
  const concreteDepartmentOptions = departments.map((department) => ({ name: department.name }));
  const departmentOptions = mode === 'department' || isLead
    ? concreteDepartmentOptions
    : [{ name: 'All departments' }, ...concreteDepartmentOptions];
  const defaultDepartment = item?.department || (isLead ? primaryLeadDepartment : departmentOptions[0]?.name || '');
  const assignableLeadNames = new Set(employees.filter(canAssignDepartmentLead).map((person) => person.name));
  const selectedLeadNames = mode === 'department' && item
    ? Array.from(new Set([
        ...departmentLeadNames(item),
        ...employees
          .filter((person) => employeeLeadDepartmentScope(person, departments).some((department) => (
            canonicalDepartmentName(department) === canonicalDepartmentName(item.name)
          )))
          .map((person) => person.name),
      ])).filter((lead) => assignableLeadNames.has(lead))
    : [];
  const leadOptions = employees
    .filter(canAssignDepartmentLead)
    .map((person) => {
      const leadScope = employeeLeadDepartmentScope(person, departments);
      const departmentMeta = leadScope.length > 0 ? leadScope.join(', ') : person.department;
      return { name: person.name, meta: `${departmentMeta} · ${person.level}` };
    });
  const tagOptions = tags.map((tag) => ({ name: tag.name, meta: tag.department }));
  const [form, setForm] = useState({
    name: item?.name || '',
    leads: selectedLeadNames,
    department: defaultDepartment,
    workType: item?.workType || 'All work types',
    paid: item?.paid ?? true,
    tags: item?.tags || [],
    people: item?.people || 0,
    originalName: item?.name,
    originalDepartment: item?.department,
    originalWorkType: item?.workType,
    originalLeads: selectedLeadNames,
  });
  const scopedWorkTypeOptions = [
    { name: 'All work types' },
    ...workTypes
      .filter((type) => type.department === form.department || type.department === 'All departments')
      .map((type) => ({ name: type.name, meta: type.department })),
  ];

  useEffect(() => {
    if (mode !== 'tag') return;
    if (!scopedWorkTypeOptions.some((option) => option.name === form.workType)) {
      setForm((current) => ({ ...current, workType: 'All work types' }));
    }
  }, [mode, scopedWorkTypeOptions, form.workType]);

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function toggleTag(tagName) {
    setForm((current) => ({
      ...current,
      tags: current.tags.includes(tagName)
        ? current.tags.filter((tag) => tag !== tagName)
        : [...current.tags, tagName],
    }));
  }

  function save() {
    if (mode === 'department') onSaveDepartment(form);
    if (mode === 'workType') onSaveWorkType(form);
    if (mode === 'tag') onSaveTag(form);
  }

  const editing = Boolean(item);
  const title = mode === 'department'
    ? `${editing ? 'Edit' : 'Add'} department`
    : mode === 'workType'
      ? `${editing ? 'Edit' : 'Add'} work type`
      : `${editing ? 'Edit' : 'Add'} tag`;
  const canSave = Boolean(form.name.trim()) && (mode === 'department' || form.department);

  return (
    <div className="modal-backdrop" onClick={(event) => event.target === event.currentTarget && onClose()}>
      <section className="entry-modal settings-create-modal" role="dialog" aria-modal="true">
        <div className="modal-head">
          <div>
            <h2>{title}</h2>
            <p>{isLead && mode !== 'department' ? `${primaryLeadDepartment} will be assigned automatically.` : `${editing ? 'Update' : 'Create'} a scoped settings record.`}</p>
          </div>
          <button className="icon-btn" onClick={onClose} aria-label="Close"><X size={16} /></button>
        </div>

        <div className="modal-grid">
          <label className="field modal-note">
            <span>Name</span>
            <input value={form.name} onChange={(event) => update('name', event.target.value)} placeholder={mode === 'department' ? 'Department name' : mode === 'workType' ? 'Work type name' : 'Tag name'} />
          </label>

          {mode === 'department' && (
            <label className="field modal-note">
              <span>Team lead</span>
              <MultiSelectDropdown
                values={form.leads}
                options={leadOptions}
                onChange={(values) => update('leads', values)}
                placeholder="Select team lead..."
              />
            </label>
          )}

          {mode !== 'department' && (
            <label className="field">
              <span>Department</span>
              {isLead ? (
                <input value={primaryLeadDepartment} disabled />
              ) : (
                <SimpleDropdown value={form.department} options={departmentOptions} onChange={(value) => update('department', value)} />
              )}
            </label>
          )}

          {mode === 'workType' && (
            <>
              <label className="field">
                <span>Payroll</span>
                <button type="button" className={cx('toggle-field', form.paid && 'active')} onClick={() => update('paid', !form.paid)}>
                  {form.paid ? 'Paid' : 'Unpaid'}
                </button>
              </label>
              <div className="field modal-note">
                <span>Visible for tags</span>
                <div className="tag-picker">
                  {tagOptions.map((tag) => (
                    <button type="button" key={`${tag.meta}-${tag.name}`} className={cx(form.tags.includes(tag.name) && 'selected')} onClick={() => toggleTag(tag.name)}>
                      {tag.name}
                    </button>
                  ))}
                  {tagOptions.length === 0 && <small>No tags yet.</small>}
                </div>
              </div>
            </>
          )}

          {mode === 'tag' && (
            <label className="field modal-note">
              <span>Work type</span>
              <SimpleDropdown value={form.workType} options={scopedWorkTypeOptions} onChange={(value) => update('workType', value)} />
            </label>
          )}
        </div>

        <div className="modal-actions">
          <button className="soft-btn" onClick={onClose}>Cancel</button>
          <button className="primary-btn" disabled={!canSave} onClick={save}>{editing ? 'Save changes' : 'Save'}</button>
        </div>
      </section>
    </div>
  );
}

function SimpleDropdown({ value, options, onChange, disabled }) {
  const [open, setOpen] = useState(false);
  const selectRef = useRef(null);
  const selected = options.find((option) => option.name === value) || (!value ? options[0] : undefined);

  useEffect(() => {
    if (!open) return undefined;

    function closeOnOutsidePointer(event) {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener('pointerdown', closeOnOutsidePointer);
    return () => document.removeEventListener('pointerdown', closeOnOutsidePointer);
  }, [open]);

  return (
    <div ref={selectRef} className={cx('custom-select form-select', disabled && 'disabled')}>
      <button
        className={cx('custom-select-trigger', open && 'open', selected && 'has-value')}
        onClick={() => !disabled && setOpen((current) => !current)}
        aria-expanded={open}
        aria-haspopup="listbox"
        type="button"
      >
        <span>{selected ? selected.name : 'Select...'}</span>
        <ChevronDown size={18} />
      </button>
      {open && (
        <div className="custom-select-menu" role="listbox">
          {options.map((option, index) => {
            const isAllOption = option.name === 'All departments' || option.name === 'All employees';
            return (
              <button
                type="button"
                data-value={option.name}
                key={option.name}
                className={cx('custom-select-option', isAllOption && 'all-option', option.name === value && 'selected')}
                onMouseDown={(event) => {
                  event.preventDefault();
                  onChange(option.name);
                  setOpen(false);
                }}
                onClick={() => {
                  onChange(option.name);
                  setOpen(false);
                }}
                role="option"
                aria-selected={option.name === value}
              >
                <i style={{ background: isAllOption ? '#ffffff' : optionColor(option, index) }} />
                <span>{option.name}</span>
                {option.meta && <small>{option.meta}</small>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function MultiSelectDropdown({ values, options, onChange, placeholder, disabled }) {
  const [open, setOpen] = useState(false);
  const selectRef = useRef(null);
  const selectedValues = Array.isArray(values) ? values : [];

  useEffect(() => {
    if (!open) return undefined;

    function closeOnOutsidePointer(event) {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener('pointerdown', closeOnOutsidePointer);
    return () => document.removeEventListener('pointerdown', closeOnOutsidePointer);
  }, [open]);

  function toggleValue(value) {
    onChange(selectedValues.includes(value)
      ? selectedValues.filter((item) => item !== value)
      : [...selectedValues, value]);
  }

  return (
    <div ref={selectRef} className={cx('custom-select form-select multi-select', disabled && 'disabled')}>
      <button
        className={cx('custom-select-trigger', open && 'open', selectedValues.length > 0 && 'has-value')}
        onClick={() => !disabled && setOpen((current) => !current)}
        aria-expanded={open}
        aria-haspopup="listbox"
        type="button"
      >
        <span className={cx('multi-select-value', selectedValues.length === 0 && 'empty')}>
          {selectedValues.length === 0 ? (
            placeholder || 'Select...'
          ) : (
            selectedValues.map((value) => (
              <small className="multi-select-pill" key={value}>
                {value}
                <i
                  role="button"
                  tabIndex={-1}
                  aria-label={`Remove ${value}`}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={(event) => {
                    event.stopPropagation();
                    toggleValue(value);
                  }}
                >
                  <X size={12} />
                </i>
              </small>
            ))
          )}
        </span>
        <ChevronDown size={18} />
      </button>
      {open && (
        <div className="custom-select-menu" role="listbox" aria-multiselectable="true">
          {options.map((option, index) => {
            const selected = selectedValues.includes(option.name);
            return (
              <button
                type="button"
                key={option.name}
                className={cx('custom-select-option', selected && 'selected')}
                onMouseDown={(event) => {
                  event.preventDefault();
                }}
                onClick={() => toggleValue(option.name)}
                role="option"
                aria-selected={selected}
              >
                <i style={{ background: selected ? '#28a35a' : optionColor(option, index) }} />
                <span>{option.name}</span>
                {option.meta && <small>{option.meta}</small>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function WorkTypeDropdown({ value, onChange, options, disabled = false }) {
  const [open, setOpen] = useState(false);
  const selectRef = useRef(null);
  const selected = options.find((option) => option.name === value);

  useEffect(() => {
    if (!open) return undefined;

    function closeOnOutsidePointer(event) {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener('pointerdown', closeOnOutsidePointer);
    return () => document.removeEventListener('pointerdown', closeOnOutsidePointer);
  }, [open]);

  function selectOption(optionName) {
    onChange(optionName);
    setOpen(false);
  }

  return (
    <div ref={selectRef} className={cx('custom-select worktype-select', disabled && 'disabled')}>
      <button
        type="button"
        className={cx('custom-select-trigger', open && 'open', selected && 'has-value')}
        onClick={() => !disabled && setOpen((current) => !current)}
        aria-expanded={open}
        aria-haspopup="listbox"
        disabled={disabled}
      >
        <span>{selected ? selected.name : 'Select work type...'}</span>
        <ChevronDown size={18} />
      </button>
      {open && (
        <div className="custom-select-menu" role="listbox">
          {options.map((option, index) => (
            <button
              type="button"
              data-value={option.name}
              key={option.name}
              className={cx('custom-select-option', option.name === value && 'selected')}
              onMouseDown={(event) => {
                event.preventDefault();
                selectOption(option.name);
              }}
              onClick={() => selectOption(option.name)}
              role="option"
              aria-selected={option.name === value}
            >
              <i style={{ background: optionColor(option, index) }} />
              <span>{option.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function optionColor(option, index) {
  if (option.color) return option.color;
  const palette = ['#35bfae', '#5b8df6', '#9aa7b5', '#6f7f92', '#f4b740', '#d86a5f', '#7b62d8', '#28a35a'];
  const byName = {
    'Customer support': '#28a35a',
    'Warehouse work': '#e9944a',
    'Container unloading': '#bf594f',
    'Marketing content': '#7b62d8',
    Development: '#35bfae',
    Testing: '#5b8df6',
    Meeting: '#6f7f92',
    'Lunch break': '#f4b740',
    'Work from home': '#28a35a',
  };
  return byName[option.name] || palette[index % palette.length];
}

function Metric({ icon: Icon, label, value, delta }) {
  return (
    <div className="metric">
      <div className="metric-icon"><Icon size={18} /></div>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{delta}</small>
    </div>
  );
}

function SettingsPanel({ title, action, onAction, className, children }) {
  return (
    <section className={cx('settings-panel', className)}>
      <div className="settings-panel-head">
        <h3>{title}</h3>
        {action && <button onClick={onAction}><Plus size={16} /> {action}</button>}
      </div>
      {children}
    </section>
  );
}

const rootElement = document.getElementById('root');
globalThis.__esmRoot = globalThis.__esmRoot || createRoot(rootElement);
globalThis.__esmRoot.render(<App />);
