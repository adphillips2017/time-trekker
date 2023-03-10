import { useContext, useState } from "react"
import UserContext from '../context/UserContext'

function AppointmentsTable() {
  const { appointments, editAppointment } = useContext(UserContext)
  const appointmentsPerPage = 10;

  const [currentPage, setCurrentPage] = useState(1);
  const lastAppointmentIndex = currentPage * appointmentsPerPage;
  const firstAppointmentIndex = lastAppointmentIndex - appointmentsPerPage;
  const currentAppointments = appointments.slice(firstAppointmentIndex, lastAppointmentIndex);

  const totalPages = Math.ceil(appointments.length / appointmentsPerPage);

  const goToPreviousPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const formatTime = (time) => {
    let hour = parseInt(time.substring(0, 2));
    let minute = time.substring(3);
    let ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12;
    hour = hour ? hour : 12; // convert 0 to 12

    return hour + ':' + minute + ' ' + ampm;
  }

  const handleClick = (appointment) => {
    editAppointment(appointment)
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Location</th>
            <th>Duration</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {currentAppointments.map(appointment => (
            <tr className="edit" key={appointment.id} onClick={() => handleClick(appointment)}>
              <td>{appointment.date}</td>
              <td>{appointment.description}</td>
              <td>{appointment.location}</td>
              <td>{appointment.duration}</td>
              <td>{formatTime(appointment.time)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {totalPages > 1 && (
        <div className="pagination">
          <button disabled={currentPage === 1} onClick={goToPreviousPage}>Previous</button>
          <span>{`Page ${currentPage} of ${totalPages}`}</span>
          <button disabled={currentPage === totalPages} onClick={goToNextPage}>Next</button>
        </div>
      )}
    </>
  );
}
export default AppointmentsTable