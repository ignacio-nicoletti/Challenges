export const formatDateTime = (dateTime: string): string => {
    const date = new Date(dateTime);
    
    // Obteniendo los componentes de la fecha
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Añadir ceros a la izquierda si es necesario
    const day = date.getDate().toString().padStart(2, '0');
    
    // Obteniendo los componentes de la hora
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    
    // Retornando la fecha y hora formateadas
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };