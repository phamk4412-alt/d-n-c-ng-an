import { saveAs } from 'file-saver';
import { write, utils } from 'xlsx';
import jsPDF from 'jspdf';
import { CrimeCase } from '../data/mockData';

const ReportExport = ({ cases }: { cases: CrimeCase[] }) => {
  const exportExcel = () => {
    const worksheet = utils.json_to_sheet(
      cases.map((item) => ({
        'Mã vụ việc': item.id,
        'Loại tội phạm': item.crimeType,
        'Thời gian': new Date(item.date).toLocaleString('vi-VN'),
        'Địa điểm': item.address,
        'Quận / Phường': `${item.district} / ${item.ward}`,
        'Trạng thái': item.status,
      }))
    );
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Vụ việc');
    const wbout = write(workbook, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'bao_cao_vu_viec.xlsx');
  };

  const exportPDF = () => {
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    doc.setFontSize(18);
    doc.text('Báo cáo thống kê vụ việc', 40, 50);
    doc.setFontSize(11);
    const rows = cases.map((item) => [item.id, item.crimeType, new Date(item.date).toLocaleDateString('vi-VN'), item.district, item.status]);
    const startY = 80;
    rows.slice(0, 18).forEach((row, index) => {
      doc.text(row.join(' | '), 40, startY + index * 18);
    });
    doc.save('bao_cao_vu_viec.pdf');
  };

  return (
    <div className="section-card">
      <div className="table-title-bar">
        <div>
          <h2>Xuất báo cáo</h2>
          <p style={{ margin: '10px 0 0', color: '#475569', maxWidth: 620 }}>
            Tạo báo cáo nhanh dạng PDF hoặc Excel để nộp cáo cáo nội bộ, đánh giá định kỳ và giám sát tội phạm.
          </p>
        </div>
        <div className="summary-pill">{cases.length} vụ đang chọn</div>
      </div>

      <div className="report-actions">
        <button onClick={exportPDF}>Xuất PDF</button>
        <button onClick={exportExcel}>Xuất Excel</button>
      </div>

      <div style={{ padding: 24, borderRadius: 20, background: '#f1f5f9', border: '1px solid rgba(148, 163, 184, 0.18)' }}>
        <p style={{ margin: 0, color: '#334155' }}><strong>Chức năng:</strong> xuất báo cáo theo tháng / năm, xuất dữ liệu vụ việc ra file để lưu trữ và phân tích.</p>
      </div>
    </div>
  );
};

export default ReportExport;
