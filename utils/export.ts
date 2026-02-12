export const exportHistoryToCSV = (garage: any[], history: any) => {
    const rows = [['Vehículo', 'Matrícula/ID', 'Tarea', 'Fecha', 'KM', 'Tipo']];

    garage.forEach(vehicle => {
        const vehicleHistory = history[vehicle.id];
        if (vehicleHistory) {
            Object.entries(vehicleHistory).forEach(([taskId, record]: [string, any]) => {
                rows.push([
                    `${vehicle.make} ${vehicle.model}`,
                    vehicle.id,
                    taskId,
                    record.date,
                    record.km,
                    record.type
                ]);
            });
        }
    });

    const csvContent = "data:text/csv;charset=utf-8," 
        + rows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "historial_mantenimiento.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export const downloadICS = (title: string, dateStr: string, description: string) => {
    // Simple ICS generator
    // format dateStr (YYYY-MM-DD) to ICS format (YYYYMMDD)
    const date = dateStr.replace(/-/g, '');
    
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//CarCareApp//NONSGML v1.0//EN
BEGIN:VEVENT
UID:${Date.now()}@carcareapp.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART;VALUE=DATE:${date}
SUMMARY:${title} - Car Care App
DESCRIPTION:${description}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${title}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
