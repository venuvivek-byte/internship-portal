'use client';

import { useEffect, useState } from 'react';
import { PrismaClient } from '@prisma/client';

interface TableData {
  users: any[];
  profiles: any[];
  companies: any[];
  internships: any[];
  applications: any[];
}

export default function DatabasePage() {
  const [data, setData] = useState<TableData>({
    users: [],
    profiles: [],
    companies: [],
    internships: [],
    applications: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/database');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching database data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Database Tables</h1>
      
      {/* Users Table */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Users</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">User Type</th>
                <th className="px-4 py-2 border">Created At</th>
              </tr>
            </thead>
            <tbody>
              {data.users.map((user) => (
                <tr key={user.id}>
                  <td className="px-4 py-2 border">{user.id}</td>
                  <td className="px-4 py-2 border">{user.email}</td>
                  <td className="px-4 py-2 border">{user.name}</td>
                  <td className="px-4 py-2 border">{user.user_type}</td>
                  <td className="px-4 py-2 border">{new Date(user.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Profiles Table */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Profiles</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">User ID</th>
                <th className="px-4 py-2 border">Bio</th>
                <th className="px-4 py-2 border">Skills</th>
                <th className="px-4 py-2 border">Created At</th>
              </tr>
            </thead>
            <tbody>
              {data.profiles.map((profile) => (
                <tr key={profile.id}>
                  <td className="px-4 py-2 border">{profile.id}</td>
                  <td className="px-4 py-2 border">{profile.user_id}</td>
                  <td className="px-4 py-2 border">{profile.bio}</td>
                  <td className="px-4 py-2 border">{profile.skills}</td>
                  <td className="px-4 py-2 border">{new Date(profile.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Companies Table */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Companies</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Industry</th>
                <th className="px-4 py-2 border">Location</th>
                <th className="px-4 py-2 border">Created At</th>
              </tr>
            </thead>
            <tbody>
              {data.companies.map((company) => (
                <tr key={company.id}>
                  <td className="px-4 py-2 border">{company.id}</td>
                  <td className="px-4 py-2 border">{company.name}</td>
                  <td className="px-4 py-2 border">{company.industry}</td>
                  <td className="px-4 py-2 border">{company.location}</td>
                  <td className="px-4 py-2 border">{new Date(company.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Internships Table */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Internships</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Title</th>
                <th className="px-4 py-2 border">Company ID</th>
                <th className="px-4 py-2 border">Type</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Created At</th>
              </tr>
            </thead>
            <tbody>
              {data.internships.map((internship) => (
                <tr key={internship.id}>
                  <td className="px-4 py-2 border">{internship.id}</td>
                  <td className="px-4 py-2 border">{internship.title}</td>
                  <td className="px-4 py-2 border">{internship.company_id}</td>
                  <td className="px-4 py-2 border">{internship.type}</td>
                  <td className="px-4 py-2 border">{internship.status}</td>
                  <td className="px-4 py-2 border">{new Date(internship.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Applications Table */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Applications</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">User ID</th>
                <th className="px-4 py-2 border">Internship ID</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Created At</th>
              </tr>
            </thead>
            <tbody>
              {data.applications.map((application) => (
                <tr key={application.id}>
                  <td className="px-4 py-2 border">{application.id}</td>
                  <td className="px-4 py-2 border">{application.user_id}</td>
                  <td className="px-4 py-2 border">{application.internship_id}</td>
                  <td className="px-4 py-2 border">{application.status}</td>
                  <td className="px-4 py-2 border">{new Date(application.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 