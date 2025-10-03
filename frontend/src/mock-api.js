// Initial Mock Data (based on your screenshot)
let mockDoctors = [
  { id: 1, name: 'Dr Lokesh', specialty: 'mbs', email: 'lokesh3112002@gmail.com', phone: '' },
  { id: 2, name: 'Dr. John Smith', specialty: 'Neurology', email: 'jsmith@example.com', phone: '' },
  { id: 3, name: 'Dr. Lerla Joseph', specialty: 'Internal Medicine', email: 'lerla@test.com', phone: '' },
  { id: 4, name: 'John', specialty: 'NA', email: 'john@doctors.fscom', phone: '' },
];
 
let nextId = mockDoctors.length + 1;
 

export const apiFetchDoctors = async () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([...mockDoctors]);  
    }, 300);  
  });
};

export const apiCreateDoctor = async (newDoctor) => {
  return new Promise(resolve => {
    setTimeout(() => {
      const doctorWithId = { ...newDoctor, id: nextId++ };
      mockDoctors.push(doctorWithId);
      resolve(doctorWithId);
    }, 300);
  });
};

export const apiUpdateDoctor = async (updatedDoctor) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockDoctors.findIndex(d => d.id === updatedDoctor.id);
      if (index !== -1) {
        mockDoctors[index] = { ...mockDoctors[index], ...updatedDoctor };
        resolve(mockDoctors[index]);
      } else {
        reject(new Error("Doctor not found"));
      }
    }, 300);
  });
};

export const apiDeleteDoctor = async (doctorId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const initialLength = mockDoctors.length;
      mockDoctors = mockDoctors.filter(d => d.id !== doctorId);
      if (mockDoctors.length < initialLength) {
        resolve({ success: true, id: doctorId });
      } else {
        reject(new Error("Doctor not found for deletion"));
      }
    }, 300);
  });
};