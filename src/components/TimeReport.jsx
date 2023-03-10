import ReportHeader from "./ReportHeader"
import AppointmentsTable from "./AppointmentsTable"
import AddAppointment from "./AddAppointment";

function TimeReport() {
  return (
    <div className="report">
      <ReportHeader />
      <AddAppointment />
      <AppointmentsTable />
    </div>
  )
}
export default TimeReport