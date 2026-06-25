'use client';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Calendar, DollarSign, ArrowUpRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { REVENUE_DATA, TODAY_APPOINTMENTS, STAFF_STATUS } from '@/lib/data/bookings';

export default function OwnerDashboard() {
  return (
    <div className="max-w-[1280px] mx-auto px-6 py-12">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="font-heading font-bold text-3xl">Owner Dashboard</h1>
          <p className="text-on-surface-variant">Maison de Beauté Overview</p>
        </div>
        <div className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Store Open
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Today\'s Revenue', value: '$3,240', icon: DollarSign, trend: '+12%' },
          { label: 'Appointments', value: '24', icon: Calendar, trend: '+4' },
          { label: 'New Clients', value: '8', icon: Users, trend: '+2' },
          { label: 'Avg Rating', value: '4.9', icon: TrendingUp, trend: '+0.1' },
        ].map((kpi, i) => (
          <div key={i} className="glass-panel p-6 rounded-3xl bg-white">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <kpi.icon className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">
                <ArrowUpRight className="w-3 h-3" /> {kpi.trend}
              </div>
            </div>
            <p className="text-sm text-on-surface-variant">{kpi.label}</p>
            <p className="font-heading font-bold text-3xl">{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl bg-white">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-heading font-bold text-xl">Revenue Trends</h2>
            <select className="bg-surface-container-low border-none rounded-lg text-sm px-3 py-1 outline-none">
              <option>This Week</option>
              <option>This Month</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={REVENUE_DATA} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e2e1" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#7f7663', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#7f7663', fontSize: 12 }} dx={-10} tickFormatter={(value) => `$${value}`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                  formatter={(value: any) => [`$${value}`, 'Revenue']}
                />
                <Line type="monotone" dataKey="revenue" stroke="#d4af37" strokeWidth={4} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Staff Status */}
        <div className="glass-panel p-6 rounded-3xl bg-white">
          <h2 className="font-heading font-bold text-xl mb-6">Staff Status</h2>
          <div className="space-y-4">
            {STAFF_STATUS.map(staff => (
              <div key={staff.id} className="flex items-center gap-4">
                <div className="relative">
                  <img src={staff.avatar} className="w-12 h-12 rounded-full object-cover" alt={staff.name} />
                  <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 border-2 border-white rounded-full ${
                    staff.statusType === 'available' ? 'bg-green-500' :
                    staff.statusType === 'busy' ? 'bg-rose-500' : 'bg-yellow-500'
                  }`} />
                </div>
                <div>
                  <p className="font-bold">{staff.name}</p>
                  <p className="text-xs text-on-surface-variant">{staff.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Today's Appointments */}
      <div className="mt-8 glass-panel p-6 rounded-3xl bg-white">
        <h2 className="font-heading font-bold text-xl mb-6">Today's Schedule</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="text-xs uppercase tracking-widest text-on-surface-variant border-b border-outline-variant/30">
                <th className="pb-3 px-4 font-semibold">Time</th>
                <th className="pb-3 px-4 font-semibold">Client</th>
                <th className="pb-3 px-4 font-semibold">Service</th>
                <th className="pb-3 px-4 font-semibold">Duration</th>
                <th className="pb-3 px-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {TODAY_APPOINTMENTS.map(apt => (
                <tr key={apt.id} className="border-b border-outline-variant/20 last:border-0 hover:bg-surface-container/50 transition-colors">
                  <td className="py-4 px-4 font-bold">{apt.time} <span className="text-xs text-on-surface-variant">{apt.period}</span></td>
                  <td className="py-4 px-4 font-semibold">{apt.client}</td>
                  <td className="py-4 px-4 text-on-surface-variant">{apt.service}</td>
                  <td className="py-4 px-4 text-sm">{apt.duration} min</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      apt.statusColor === 'gold' ? 'bg-primary-container/20 text-primary' : 'bg-green-100 text-green-700'
                    }`}>
                      {apt.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
