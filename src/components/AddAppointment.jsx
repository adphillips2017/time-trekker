import { useState, useContext, useEffect } from 'react'
import UserContext from '../context/UserContext';

function AddAppointment() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState(0);
  const [location, setLocation] = useState('San Diego');
  const [description, setDescription] = useState('');
  const [isEdit, setIsEdit] = useState(false)

  const {
    addAppointment,
    updateAppointment,
    appointmentEdit,
    cancelEditAppointment,
    deleteAppointmentById
  } = useContext(UserContext)

  useEffect(() => {
    if (!appointmentEdit.edit) return

    setDate(appointmentEdit.appointment.date)
    setTime(appointmentEdit.appointment.time)
    setDuration(appointmentEdit.appointment.duration)
    setLocation(appointmentEdit.appointment.location)
    setDescription(appointmentEdit.appointment.description)
    setIsEdit(true)
  }, [appointmentEdit])

  const handleSubmit = (event) => {
    event.preventDefault();
    const newDuration = parseInt(duration)
    const newAppointment = { date, time, location, duration: newDuration, description };

    if (appointmentEdit.edit) {
      updateAppointment(appointmentEdit.appointment.id, newAppointment)
    } else {
      addAppointment(newAppointment)
    }

    formReset()
  };

  const cancel = () => {
    formReset()
  }

  const deleteAppointment = () => {
    if (!appointmentEdit.appointment) return
    deleteAppointmentById(appointmentEdit.appointment.id)
    formReset()
  }

  const formReset = () => {
    setDate('')
    setTime('')
    setDuration(0)
    setLocation('San Diego')
    setDescription('')
    setIsEdit(false)
    cancelEditAppointment()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-container">
        <div className='column'>
          <div>
            <label htmlFor="date">Date:</label>
            <input type="date" id="date" value={date} onChange={(event) => setDate(event.target.value)} required />
          </div>
          <div>
            <label htmlFor="location">Location:</label>
            <select id="location" value={location} onChange={(event) => setLocation(event.target.value)} required>
              <option value="San Diego">San Diego</option>
              <option value="Portland">Portland</option>
              <option value="Seattle">Seattle</option>
              <option value="London">London</option>
              <option value="Orlando">Orlando</option>
            </select>
          </div>
        </div>

        <div className='column'>
          <div>
            <label htmlFor="time">Time:</label>
            <input type="time" id="time" value={time} onChange={(event) => setTime(event.target.value)} required />
          </div>
          <div>
            <label htmlFor="duration">Duration (minutes):</label>
            <input type="number" id="duration" value={duration} onChange={(event) => setDuration(event.target.value)} required />
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="description">Description:</label>
        <textarea id="description" value={description} onChange={(event) => setDescription(event.target.value)} required />
      </div>
      <div className="button-container">
        <button className="submit" type="submit">{isEdit ? 'Update' : 'Add'} Appointment</button>
        <div>
          <button className="cancel" onClick={cancel} type="button">Clear</button>
          { isEdit && <button className="delete" onClick={deleteAppointment} type="button">Delete</button> }
        </div>
      </div>
    </form>
  )
}
export default AddAppointment