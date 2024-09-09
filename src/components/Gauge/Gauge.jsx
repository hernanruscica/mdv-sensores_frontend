import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const Gauge = ({ currentValue, alarmMax, alarmMin }) => {
  const gaugeRef = useRef();

  useEffect(() => {
    // Limpiar el contenido anterior del SVG para evitar duplicados
    d3.select(gaugeRef.current).selectAll("*").remove();

    // Dimensiones y márgenes del gráfico
    const width = 320;
    const height = 240;
    const margin = { top: 20, right: 20, bottom: 30, left: 20 };

    // Crear el SVG y grupo principal
    const svg = d3
      .select(gaugeRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 1.5})`);

    // Definir los valores de alarma y límites
    const minValue = 0;
    const maxValue = 100;
    const gaugeValue = currentValue !== undefined ? currentValue : minValue; // Validar el valor actual

    // Verificación básica de los valores
    if (gaugeValue < minValue || gaugeValue > maxValue) {
      console.error("El valor del gauge está fuera de rango:", gaugeValue);
      return;
    }

    // Definir el radio interno y externo
    const outerRadius = Math.min(width, height) / 2 - margin.top;
    const innerRadius = outerRadius - 30;

    // Escala del gauge
    const x = d3.scaleLinear().domain([minValue, maxValue]).range([-Math.PI / 2, Math.PI / 2]);

    // Verificar el ángulo calculado para la aguja
    const needleAngle = x(gaugeValue);
    if (isNaN(needleAngle)) {
      console.error("El ángulo de la aguja no es un número válido:", needleAngle);
      return;
    }

    // Generador de arcos
    const arc = d3
      .arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)
      .startAngle((d) => d.startAngle)
      .endAngle((d) => d.endAngle);

    // Datos de los arcos de fondo
    const arcData = [
      { startAngle: -Math.PI / 2, endAngle: x(alarmMin), color: "#FF6666" },
      { startAngle: x(alarmMin), endAngle: x(alarmMax), color: "#66CC66" },
      { startAngle: x(alarmMax), endAngle: Math.PI / 2, color: "#FF6666" }
    ];

    // Dibujar los arcos de fondo
    svg
      .selectAll("path")
      .data(arcData)
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => d.color)
      .attr("class", "arc");

    // Dibujar la aguja
    const needle = svg
      .append("line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", 0)
      .attr("y2", -innerRadius)
      .attr("transform", `rotate(${(x(minValue) * 180) / Math.PI})`)
      .attr("stroke", "black")
      .attr("stroke-width", 4)
      .attr("class", "needle");

    // Animar la aguja
    needle
      .transition()
      .duration(1000)
      .attr("transform", `rotate(${(needleAngle * 180) / Math.PI})`);

    // Etiqueta del valor actual debajo de la aguja
    svg
      .append("text")
      .attr("x", 0)
      .attr("y", 20) // Debajo de la aguja
      .attr("text-anchor", "middle")
      .attr("class", "label needle-value")
      .attr("dy", ".35em")
      .text(`${gaugeValue}%`);

    // Función para agregar líneas y etiquetas
    const addLineAndLabel = (value, label, className) => {
      const angle = (x(value) * 180) / Math.PI;
      svg
        .append("line")
        .attr("x1", 0)
        .attr("y1", -outerRadius - 5)
        .attr("x2", 0)
        .attr("y2", -innerRadius + 5)
        .attr("transform", `rotate(${angle})`)
        .attr("class", className)
        .attr("stroke", "black")
        .attr("stroke-width", 2);

      svg
        .append("text")
        .attr("x", (outerRadius + 30) * Math.cos(x(value) - Math.PI / 2))
        .attr("y", (outerRadius + 35) * Math.sin(x(value) - Math.PI / 2))
        .attr("text-anchor", "middle")
        .attr("class", `label ${className.includes('-alarm-line') ? 'min-max-label' : ''}`)
        .attr("dy", ".35em")
        .text(label);
    };

    // Agregar líneas y etiquetas
    addLineAndLabel(alarmMin, `${alarmMin}%`, "min-alarm-line");
    addLineAndLabel(alarmMax, `${alarmMax}%`, "max-alarm-line");
  }, [currentValue, alarmMax, alarmMin]);

  return <div ref={gaugeRef} id="gauge"></div>;
};

export default Gauge;
