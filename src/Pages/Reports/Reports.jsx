import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Loading from '../../Components/Loading/Loading';

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: 'Helvetica',
    color: '#1F2937',
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 12,
    textAlign: 'center',
    color: '#4B5563',
  },
  table: {
    display: 'table',
    width: 'auto',
    marginVertical: 10,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableColHeader: {
    width: '50%',
    borderStyle: 'solid',
    borderColor: '#D1D5DB',
    borderBottomWidth: 1,
    padding: 6,
    fontWeight: 'bold',
    backgroundColor: '#F9FAFB',
  },
  tableCol: {
    width: '50%',
    borderStyle: 'solid',
    borderColor: '#D1D5DB',
    borderBottomWidth: 1,
    padding: 6,
  },
  companyInfo: {
    textAlign: 'center',
    marginBottom: 20,
  },
});

const ReportDocument = ({ summary }) => {
  const today = new Date().toLocaleDateString();

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.companyInfo}>
          <Text style={styles.title}>GoQuick Reports</Text>
          <Text style={styles.subtitle}>Summary of all collections and parcels</Text>

          <Text>Address: Uttara, Dhaka-1230</Text>
          <Text>
            Date: {today}
          </Text>
        </View>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableColHeader}>Metric</Text>
            <Text style={styles.tableColHeader}>Value</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.tableCol}>Total Customers</Text>
            <Text style={styles.tableCol}>{summary.totalCustomers}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCol}>Total Delivery Agents</Text>
            <Text style={styles.tableCol}>{summary.totalDeliveryAgents}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCol}>Available Delivery Agents</Text>
            <Text style={styles.tableCol}>{summary.totalAvailableAgents}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCol}>Total Admins</Text>
            <Text style={styles.tableCol}>{summary.totalAdmins}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCol}>Total Parcels</Text>
            <Text style={styles.tableCol}>{summary.totalParcels}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCol}>Parcels Delivered</Text>
            <Text style={styles.tableCol}>{summary.totalDeliveredParcels}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCol}>Total COD</Text>
            <Text style={styles.tableCol}>{summary.totalCOD}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCol}>Total Prepaid</Text>
            <Text style={styles.tableCol}>{summary.totalPrepaid}</Text>
          </View>
        </View>
      </Page>
    </Document>

  );
};

const Reports = () => {
  const { t } = useTranslation();
  const axiosSecure = useAxiosSecure();

  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  // Prepare labels object for PDF to avoid hooks inside PDF components
  const labels = {
    title: t('report_title') || 'GoQuick Reports',
    subtitle: t('report_subtitle') || 'Summary of all collections and parcels',
    address: t('report_address') || 'Address: Uttara, Dhaka-1230',
    date: t('report_date') || 'Date',
    metric: t('report_metric') || 'Metric',
    value: t('report_value') || 'Value',
    totalCustomers: t('report_total_customers') || 'Total Customers',
    totalDeliveryAgents: t('report_total_delivery_agents') || 'Total Delivery Agents',
    availableDeliveryAgents: t('report_available_delivery_agents') || 'Available Delivery Agents',
    totalAdmins: t('report_total_admins') || 'Total Admins',
    totalParcels: t('report_total_parcels') || 'Total Parcels',
    parcelsDelivered: t('report_parcels_delivered') || 'Parcels Delivered',
    totalCOD: t('report_total_cod') || 'Total COD',
    totalPrepaid: t('report_total_prepaid') || 'Total Prepaid',
    downloadPDF: t('download_pdf') || 'Download PDF',
    preparingDocument: t('preparing_document') || 'Preparing document...',
  };

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const [usersRes, parcelsRes] = await Promise.all([
          axiosSecure.get('/users'),
          axiosSecure.get('/parcels'),
        ]);

        const users = usersRes.data;
        const parcels = parcelsRes.data;

        const dataSummary = {
          totalCustomers: users.filter(u => u.role === 'customer').length,
          totalDeliveryAgents: users.filter(u => u.role === 'deliveryAgent').length,
          totalAvailableAgents: users.filter(u => u.role === 'deliveryAgent' && u.availability === 'available').length,
          totalAdmins: users.filter(u => u.role === 'admin').length,
          totalParcels: parcels.length,
          totalDeliveredParcels: parcels.filter(p => p.status === 'Delivered').length,
          totalCOD: parcels.filter(p => p.paymentType === 'Cash on Delivery').length,
          totalPrepaid: parcels.filter(p => p.paymentType === 'Prepaid').length,
        };

        setSummary(dataSummary);
      } catch (error) {
        console.error('Error fetching report data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [axiosSecure]);

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans">
      <h1 className="text-3xl font-bold mb-2">{labels.title}</h1>
      <p className="mb-6 text-gray-600">{labels.subtitle}</p>

      {loading && <Loading />}

      {summary && (
        <>
          <table className="w-full border-collapse text-left text-sm mb-6">
            <tbody>
              <tr>
                <td className="border px-4 py-2 font-medium">{labels.totalCustomers}</td>
                <td className="border px-4 py-2">{summary.totalCustomers}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-medium">{labels.totalDeliveryAgents}</td>
                <td className="border px-4 py-2">{summary.totalDeliveryAgents}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-medium">{labels.availableDeliveryAgents}</td>
                <td className="border px-4 py-2">{summary.totalAvailableAgents}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-medium">{labels.totalAdmins}</td>
                <td className="border px-4 py-2">{summary.totalAdmins}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-medium">{labels.totalParcels}</td>
                <td className="border px-4 py-2">{summary.totalParcels}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-medium">{labels.parcelsDelivered}</td>
                <td className="border px-4 py-2">{summary.totalDeliveredParcels}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-medium">{labels.totalCOD}</td>
                <td className="border px-4 py-2">{summary.totalCOD}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-medium">{labels.totalPrepaid}</td>
                <td className="border px-4 py-2">{summary.totalPrepaid}</td>
              </tr>
            </tbody>
          </table>

          <PDFDownloadLink
            document={<ReportDocument summary={summary} labels={labels} />}
            fileName={`GoQuick_Report_${new Date().toISOString().slice(0, 10)}.pdf`}
            style={{
              textDecoration: 'none',
              padding: '12px 24px',
              color: 'white',
              backgroundColor: '#D3123E',
              borderRadius: '6px',
              fontWeight: 'bold',
              display: 'inline-block',
              cursor: 'pointer',
            }}
          >
            {({ loading }) => (loading ? labels.preparingDocument : labels.downloadPDF)}
          </PDFDownloadLink>
        </>
      )}
    </div>
  );
};

export default Reports;
