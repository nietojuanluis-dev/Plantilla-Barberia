export type Barber = {
  id: string;
  name: string;
  photo: string;
  specialty: string;
  rating: number;
  active: boolean;
  email: string;
  phone: string;
};

export type Service = {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in minutes
  category: "corte" | "barba" | "combo" | "tratamiento";
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  totalVisits: number;
  lastVisit: string;
  notes: string;
};

export type AppointmentStatus =
  | "pendiente"
  | "confirmada"
  | "en-progreso"
  | "completada"
  | "cancelada";

export type Appointment = {
  id: string;
  customerId: string;
  barberId: string;
  serviceIds: string[];
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  status: AppointmentStatus;
  totalPrice: number;
  totalDuration: number;
};

export const barbers: Barber[] = [
  {
    id: "b1",
    name: "Andres Felipe Rios",
    photo: "https://i.pravatar.cc/150?u=b1",
    specialty: "Cortes clásicos y degradados",
    rating: 4.9,
    active: true,
    email: "andres@barberia.com",
    phone: "+57 310 123 4567",
  },
  {
    id: "b2",
    name: "Santiago Montoya",
    photo: "https://i.pravatar.cc/150?u=b2",
    specialty: "Barba y cejas",
    rating: 4.7,
    active: true,
    email: "santiago@barberia.com",
    phone: "+57 311 234 5678",
  },
  {
    id: "b3",
    name: "Luis Esteban Torres",
    photo: "https://i.pravatar.cc/150?u=b3",
    specialty: "Diseños y freestyle",
    rating: 4.8,
    active: true,
    email: "luis@barberia.com",
    phone: "+57 312 345 6789",
  },
  {
    id: "b4",
    name: "Juan Carlos Marin",
    photo: "https://i.pravatar.cc/150?u=b4",
    specialty: "Corte militar y texturizado",
    rating: 4.6,
    active: false,
    email: "juan@barberia.com",
    phone: "+57 313 456 7890",
  },
  {
    id: "b5",
    name: "Daniel Ortega",
    photo: "https://i.pravatar.cc/150?u=b5",
    specialty: "Color y tratamientos capilares",
    rating: 4.9,
    active: true,
    email: "daniel@barberia.com",
    phone: "+57 314 567 8901",
  },
];

export const services: Service[] = [
  {
    id: "s1",
    name: "Corte Clásico",
    description: "Corte a tijera o máquina con acabado profesional",
    price: 25000,
    duration: 30,
    category: "corte",
  },
  {
    id: "s2",
    name: "Degradado Premium",
    description: "Fade de alta precisión con líneas definidas",
    price: 35000,
    duration: 45,
    category: "corte",
  },
  {
    id: "s3",
    name: "Afeitado Tradicional",
    description: "Afeitado con navaja y toallas calientes",
    price: 18000,
    duration: 25,
    category: "barba",
  },
  {
    id: "s4",
    name: "Arreglo de Barba",
    description: "Delineado y perfilado de barba con máquina",
    price: 15000,
    duration: 20,
    category: "barba",
  },
  {
    id: "s5",
    name: "Combo Corte + Barba",
    description: "Paquete completo de corte y arreglo de barba",
    price: 38000,
    duration: 55,
    category: "combo",
  },
  {
    id: "s6",
    name: "Combo Premium",
    description: "Degradado, barba, cejas y mascarilla facial",
    price: 55000,
    duration: 75,
    category: "combo",
  },
  {
    id: "s7",
    name: "Tratamiento Capilar",
    description: "Hidratación y fortalecimiento del cabello",
    price: 42000,
    duration: 40,
    category: "tratamiento",
  },
  {
    id: "s8",
    name: "Coloración",
    description: "Tinte completo o mechas para cabello",
    price: 65000,
    duration: 60,
    category: "tratamiento",
  },
];

export const customers: Customer[] = [
  {
    id: "c1",
    name: "Carlos Andrade",
    email: "carlos@email.com",
    phone: "+57 320 111 2222",
    avatar: "https://i.pravatar.cc/150?u=c1",
    totalVisits: 12,
    lastVisit: "2025-05-28",
    notes: "Prefiere degradado bajo, alérgico a ciertos productos",
  },
  {
    id: "c2",
    name: "Miguel Restrepo",
    email: "miguel@email.com",
    phone: "+57 321 222 3333",
    avatar: "https://i.pravatar.cc/150?u=c2",
    totalVisits: 8,
    lastVisit: "2025-05-30",
    notes: "Le gusta conversar mientras lo atienden",
  },
  {
    id: "c3",
    name: "Jose Pineda",
    email: "jose@email.com",
    phone: "+57 322 333 4444",
    avatar: "https://i.pravatar.cc/150?u=c3",
    totalVisits: 5,
    lastVisit: "2025-06-01",
    notes: "Siempre pide combo corte + barba",
  },
  {
    id: "c4",
    name: "Diego Valencia",
    email: "diego@email.com",
    phone: "+57 323 444 5555",
    avatar: "https://i.pravatar.cc/150?u=c4",
    totalVisits: 20,
    lastVisit: "2025-05-25",
    notes: "Cliente VIP, siempre con Santiago",
  },
  {
    id: "c5",
    name: "Pedro Salazar",
    email: "pedro@email.com",
    phone: "+57 324 555 6666",
    avatar: "https://i.pravatar.cc/150?u=c5",
    totalVisits: 3,
    lastVisit: "2025-06-02",
    notes: "Nuevo cliente, interesado en tratamientos",
  },
  {
    id: "c6",
    name: "Ricardo Vargas",
    email: "ricardo@email.com",
    phone: "+57 325 666 7777",
    avatar: "https://i.pravatar.cc/150?u=c6",
    totalVisits: 15,
    lastVisit: "2025-05-20",
    notes: "Muy puntual, siempre agenda con anticipación",
  },
  {
    id: "c7",
    name: "Fernando Loaiza",
    email: "fernando@email.com",
    phone: "+57 326 777 8888",
    avatar: "https://i.pravatar.cc/150?u=c7",
    totalVisits: 6,
    lastVisit: "2025-05-15",
    notes: "Prefiere cortes clásicos",
  },
  {
    id: "c8",
    name: "Alejandro Posada",
    email: "alejandro@email.com",
    phone: "+57 327 888 9999",
    avatar: "https://i.pravatar.cc/150?u=c8",
    totalVisits: 9,
    lastVisit: "2025-06-02",
    notes: "Trae a su hijo a veces",
  },
];

function generateAppointments(): Appointment[] {
  const today = new Date();
  const formatDate = (d: Date) => d.toISOString().split("T")[0];
  const addDays = (d: Date, n: number) => {
    const r = new Date(d);
    r.setDate(r.getDate() + n);
    return r;
  };

  const slots = [
    "08:00",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
  ];

  const appts: Appointment[] = [];
  let idCounter = 1;

  for (let d = -5; d <= 7; d++) {
    const date = formatDate(addDays(today, d));
    const numAppts = Math.floor(Math.random() * 6) + 3; // 3 to 8 appointments per day
    const daySlots = [...slots].sort(() => Math.random() - 0.5).slice(0, numAppts);
    daySlots.sort();

    daySlots.forEach((time) => {
      const barber = barbers[Math.floor(Math.random() * barbers.length)];
      const customer = customers[Math.floor(Math.random() * customers.length)];
      const numServices = Math.floor(Math.random() * 2) + 1;
      const apptServices: Service[] = [];
      for (let s = 0; s < numServices; s++) {
        const svc = services[Math.floor(Math.random() * services.length)];
        if (!apptServices.find((x) => x.id === svc.id)) apptServices.push(svc);
      }
      const totalPrice = apptServices.reduce((sum, s) => sum + s.price, 0);
      const totalDuration = apptServices.reduce((sum, s) => sum + s.duration, 0);

      let status: AppointmentStatus;
      if (d < 0) {
        status = Math.random() > 0.2 ? "completada" : "cancelada";
      } else if (d === 0) {
        const hour = parseInt(time.split(":")[0], 10);
        const nowHour = today.getHours();
        if (hour < nowHour) status = "completada";
        else if (hour === nowHour) status = "en-progreso";
        else status = Math.random() > 0.3 ? "confirmada" : "pendiente";
      } else {
        status = Math.random() > 0.4 ? "confirmada" : "pendiente";
      }

      appts.push({
        id: `a${idCounter++}`,
        customerId: customer.id,
        barberId: barber.id,
        serviceIds: apptServices.map((s) => s.id),
        date,
        time,
        status,
        totalPrice,
        totalDuration,
      });
    });
  }

  return appts;
}

export const appointments: Appointment[] = generateAppointments();

export function getBarberById(id: string) {
  return barbers.find((b) => b.id === id);
}

export function getCustomerById(id: string) {
  return customers.find((c) => c.id === id);
}

export function getServicesByIds(ids: string[]) {
  return services.filter((s) => ids.includes(s.id));
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(value);
}
