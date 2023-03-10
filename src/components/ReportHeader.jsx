import { useContext } from "react"
import UserContext from '../context/UserContext';

function ReportHeader() {
  const { user, appointments } = useContext(UserContext)

  const calculateTotalDuration = () => {
    let totalDuration = 0;
    appointments.forEach(appointment => totalDuration += appointment.duration);
    const hours = Math.floor(totalDuration / 60);
    const minutes = totalDuration % 60;
    const formattedString = hours + "hr " + minutes + "m";
    return formattedString;
  }

  return (
    <div className="report-header-container">
      <div className="left-column">
        <h3 className="txt-primary">{user.name}</h3>
        <p className="txt-sm">{user.email}</p>
        <p className="txt-sm">{user.phone}</p>
        <p className="txt-sm"><a href={`http://${user.url}`} rel="noreferrer" target="_blank">{user.url}</a></p>
      </div>

      <div className="right-column">
        <div className="time-label">Total Hours</div>
        <div className="time-tracker txt-primary">{calculateTotalDuration()}</div>
      </div>
    </div>
  )
}
export default ReportHeader