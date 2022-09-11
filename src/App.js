import "./styles.css";
import html2canvas from "html2canvas";
import jsPdf from "jspdf";
import Comp from "./Comp";
export default function App() {
  const printPDF = () => {
    const domElement = document.getElementById("pdf");
    html2canvas(domElement, {
      onclone: (document) => {
        document.getElementById("print").style.display = "none";
      }
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPdf();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${new Date().toISOString()}.pdf`);
    });
  };

  return (
    <div className="App">
      <div id="pdf">
        <Comp />
      </div>
      <button id="print" onClick={printPDF}>
        Downlod PDF
      </button>
    </div>
  );
}
