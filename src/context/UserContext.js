import { createContext, useState } from "react";
import AppointmentData from '../data/AppointmentData'

const UserContext = createContext()

export const UserProvider = ({children}) => {
  const [appointments, setAppointments] = useState(AppointmentData)
  const [appointmentEdit, setAppointmentEdit] = useState({ appointment: {}, edit: false})
  const [user, setUser] = useState({
    name: 'Adam Phillips',
    email: 'adjp2013@gmail.com',
    phone: '812-374-2393',
    url: 'adphillips2017.github.io/portfolio/'
  })

  const deleteAppointmentById = async (id) => {
    if (!window.confirm('Are you sure you want to delete?')) return
    setAppointments(appointments.filter(item => item.id !== id))
  }

  const addAppointment = async (newAppointment) => {
    let newId = 0;
    if (appointments.length > 0) {
      newId = Math.max(...appointments.map(obj => obj.id)) + 1;
    }
    newAppointment.id = newId;
    setAppointments([newAppointment, ...appointments])
  }

  const updateAppointment = async (id, updItem) => {
    setAppointments(appointments.map((item) => item.id === id ? {...item, ...updItem} : item))
  }

  const editAppointment = (appointment) => {
    setAppointmentEdit({
      appointment: appointment,
      edit: true
    })
  }

  const cancelEditAppointment = () => {
    setAppointmentEdit({
      appointment: {},
      edit: false
    })
  }

  return (
    <UserContext.Provider value={{
      user,
      appointments,
      appointmentEdit,
      deleteAppointmentById,
      addAppointment,
      updateAppointment,
      editAppointment,
      cancelEditAppointment
    }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext