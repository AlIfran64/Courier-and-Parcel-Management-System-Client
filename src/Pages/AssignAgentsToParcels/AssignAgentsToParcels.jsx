import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import useAuth from '../../Hooks/useAuth';
import socket from '../../utils/socket';
import Swal from 'sweetalert2';


const AssignAgentsToParcels = () => {
  const { t } = useTranslation();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  useEffect(() => {
    socket.on('status-updated', () => {
      queryClient.invalidateQueries(['parcels']);
    });

    return () => {
      socket.off('status-updated');
    };
  }, [queryClient, user?.email]);

  const [selectedParcel, setSelectedParcel] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  // Fetch all parcels
  const { data: parcels = [], isLoading: loadingParcels } = useQuery({
    queryKey: ['parcels'],
    queryFn: async () => {
      const res = await axiosSecure.get('/parcels');
      return res.data;
    },
  });

  // Fetch available delivery agents
  const { data: agents = [], isLoading: loadingAgents } = useQuery({
    queryKey: ['availableAgents'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data.filter((u) => u.role === 'deliveryAgent' && u.availability?.trim() === 'available');
    },
    enabled: isOpen,
  });

  // Assign agent mutation
  const assignAgentMutation = useMutation({
    mutationFn: async ({ parcelId, agent }) => {
      const parcelUpdate = await axiosSecure.patch(`/parcels/${parcelId}`, {
        status: 'Assigned',
        deliveryAgent: {
          name: agent.name,
          email: agent.email,
        },
      });

      await axiosSecure.patch(`/users/role/${agent.email}`, {
        availability: 'unavailable',
      });

      return parcelUpdate;

    },
    onSuccess: () => {
      queryClient.invalidateQueries(['parcels']);
      queryClient.invalidateQueries(['availableAgents']);
      setIsOpen(false);
    },
  });

  const openModal = (parcel) => {
    setSelectedParcel(parcel);
    setIsOpen(true);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-2">{t('assign_agents')}</h1>
      <p className="text-gray-600 mb-6">{t('manage_assign_agents')}</p>

      {loadingParcels ? (
        <p>{t('loading_parcels')}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border border-gray-300">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">{t('name')}</th>
                <th className="p-3">{t('pickup')}</th>
                <th className="p-3">{t('delivery')}</th>
                <th className="p-3">{t('status')}</th>
                <th className="p-3 text-center">{t('action')}</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel) => (
                <tr key={parcel._id} className="border-t">
                  <td className="p-3">{parcel.name}</td>
                  <td className="p-3">{parcel.pickupAddress}</td>
                  <td className="p-3">{parcel.deliveryAddress}</td>
                  <td className="p-3">{parcel.status}</td>
                  <td className="p-3 text-center">
                    <button
                      className="px-3 py-1 rounded text-white cursor-pointer"
                      style={{ backgroundColor: '#D3123E' }}
                      onClick={() => openModal(parcel)}
                    >
                      {t('assign_delivery_agent')}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Manual Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 bg-opacity-50">
          <div className="bg-white rounded p-6 w-full max-w-md shadow-xl">
            <h2 className="text-xl font-bold mb-4">{t('available_agents')}</h2>

            {loadingAgents ? (
              <p>{t('loading_agents')}</p>
            ) : agents.length === 0 ? (
              <p>{t('no_agents')}</p>
            ) : (
              <ul className="space-y-3">
                {agents.map((agent) => (
                  <li key={agent._id} className="flex justify-between items-center border-b pb-2">
                    <span>{agent.name}</span>
                    <button
                      onClick={async () => {
                        const result = await Swal.fire({
                          title: t('are_you_sure'),
                          text: t('confirm_assign_text'),
                          icon: 'question',
                          showCancelButton: true,
                          confirmButtonColor: '#D3123E',
                          cancelButtonColor: '#aaa',
                          confirmButtonText: t('yes_assign'),
                          cancelButtonText: `${t('cancel')}`
                        });

                        if (result.isConfirmed) {
                          assignAgentMutation.mutate({
                            parcelId: selectedParcel._id,
                            agent,
                          });

                          Swal.fire({
                            title: t('assigned'),
                            text: t('agent_assigned_successfully'),
                            icon: 'success',
                            confirmButtonColor: '#D3123E',
                            confirmButtonText: `${t('ok')}`
                          });
                        }
                      }}

                      className="px-3 py-1 rounded text-white cursor-pointer"
                      style={{ backgroundColor: '#D3123E' }}
                    >
                      {t('assign')}
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-6 text-right">
              <button onClick={() => setIsOpen(false)} className="text-sm text-gray-500 cursor-pointer">
                {t('close')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignAgentsToParcels;
