import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import html2pdf from "html2pdf.js";

const ReportesAdmin = () => {
  const [reportes, setReportes] = useState([]);
  const tablaRef = useRef();

  const fetchReportes = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get("http://localhost:8080/api/pedidos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const pedidosEntregados = response.data.filter(
        (pedido) => pedido.estado === "ENTREGADO"
      );
      setReportes(pedidosEntregados);
    } catch (error) {
      console.error("Error al cargar reportes", error);
      alert("No se pudieron cargar los reportes.");
    }
  };

  useEffect(() => {
    fetchReportes();
  }, []);

  const descargarPDF = () => {
    const elemento = tablaRef.current;

    const opciones = {
      margin: 0.5,
      filename: `reporte_entregados_${new Date().toLocaleDateString()}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().set(opciones).from(elemento).save();
  };

  const totalGlobal = reportes.reduce((total, pedido) => {
    const totalPedido = pedido.detalles.reduce(
      (acc, item) => acc + item.cantidad * item.precio,
      0
    );
    return total + totalPedido;
  }, 0);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Reporte de pedidos entregados</h2>
        <button
          onClick={descargarPDF}
          className="bg-black text-white px-4 py-2"
        >
          Descargar PDF
        </button>
      </div>

      <div ref={tablaRef}>
        <table className="w-full text-center border" id="tabla-reportes">
          <thead className="bg-gray-100">
            <tr className="font-bold">
              <th className="p-2 border"># Pedido</th>
              <th className="p-2 border">Fecha</th>
              <th className="p-2 border">Cliente</th>
              <th className="p-2 border">Platillos</th>
              <th className="p-2 border">Total ($)</th>
            </tr>
          </thead>
          <tbody>
            {reportes.map((p) => {
              const total = p.detalles.reduce(
                (acc, d) => acc + d.cantidad * d.precio,
                0
              );

              return (
                <tr key={p.id} className="border-t border-b">
                  <td className="p-2 border">#{p.id}</td>
                  <td className="p-2 border">
                    {new Date(p.fecha).toLocaleString()}
                  </td>
                  <td className="p-2 border">{p.cliente}</td>
                  <td className="p-2 border">
                    <ul>
                      {p.detalles.map((d, i) => (
                        <li key={i}>
                          • {d.nombrePlatillo} x {d.cantidad} @ ${d.precio}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="p-2 border font-medium">${total.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Total general al final */}
        <div className="text-right mt-4 pr-2 font-semibold">
          Total global: ${totalGlobal.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default ReportesAdmin;
