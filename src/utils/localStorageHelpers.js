
export const loadPatients = () => {
    try {
      const data = localStorage.getItem('patients');
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Failed to parse patients from localStorage', e);
      return [];
    }
  };
  
  export const savePatients = (patients) =>
    localStorage.setItem('patients', JSON.stringify(patients));
  
  export const loadIncidents = () => {
    try {
      const data = localStorage.getItem('incidents');
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Failed to parse incidents from localStorage', e);
      return [];
    }
  };
  
  export const saveIncidents = (incidents) =>
    localStorage.setItem('incidents', JSON.stringify(incidents));
  