import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';

const DeliveryAgentReq = () => {
  const { t } = useTranslation();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch delivery agent requests
  const { data: agents = [], isLoading } = useQuery({
    queryKey: ['deliveryAgents'],
    queryFn: async () => {
      const res = await axiosSecure.get('/deliveryAgents');
      return res.data;
    }
  });

  // Accept mutation
  const acceptMutation = useMutation({
    mutationFn: async (agent) => {
      await axiosSecure.patch(`/users/role/${agent.email}`, { role: 'deliveryAgent', availability: 'available' });
      await axiosSecure.delete(`/deliveryAgents/${agent._id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['deliveryAgents']);
      Swal.fire({
        title: t('accepted'),
        text: t('user_made_delivery_agent'),
        icon: 'success',
        confirmButtonColor: '#D3123E',
        confirmButtonText: `${t('ok')}`
      });

    }
  });

  // Reject mutation
  const rejectMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/deliveryAgents/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['deliveryAgents']);
      Swal.fire({
        title: t('rejected'),
        text: t('request_removed'),
        icon: 'info',
        confirmButtonColor: '#D3123E',
        confirmButtonText: `${t('ok')}`
      });

    }
  });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">{t('delivery_agent_requests')}</h2>
      <p className="text-gray-600 mb-6">{t('manage_delivery_requests')}</p>

      {isLoading ? (
        <p>{t('loading')}</p>
      ) : agents.length === 0 ? (
        <p>{t('no_requests')}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-300 text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 text-left">{t('name1')}</th>
                <th className="p-3 text-left">{t('email1')}</th>
                <th className="p-3 text-left">{t('phone')}</th>
                <th className="p-3 text-left">{t('nid')}</th>
                <th className="p-3 text-left">{t('address1')}</th>
                <th className="p-3 text-center">{t('actions')}</th>
              </tr>
            </thead>
            <tbody>
              {agents.map(agent => (
                <tr key={agent._id} className="border-t">
                  <td className="p-3">{agent.name}</td>
                  <td className="p-3">{agent.email}</td>
                  <td className="p-3">{agent.phone}</td>
                  <td className="p-3">{agent.nid}</td>
                  <td className="p-3">{agent.address}</td>
                  <td className="p-3 space-x-2 text-center">
                    <button
                      onClick={() => acceptMutation.mutate(agent)}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded cursor-pointer"
                    >
                      {t('accept')}
                    </button>
                    <button
                      onClick={() => {
                        Swal.fire({
                          title: t('are_you_sure'),
                          text: t('confirm_reject_text'),
                          icon: 'warning',
                          showCancelButton: true,
                          confirmButtonColor: '#D3123E',
                          cancelButtonColor: '#3085d6',
                          confirmButtonText: t('yes_reject'),
                          cancelButtonText: `${t('cancel')}`
                        }).then((result) => {
                          if (result.isConfirmed) {
                            rejectMutation.mutate(agent._id);
                          }
                        });
                      }}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded cursor-pointer"
                    >
                      {t('reject')}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DeliveryAgentReq;
