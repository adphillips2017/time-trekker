function PageTitle() {
  const title = 'Active Appointments'
  const dateRange = '03/01/2023 - 03/31/2023'

  return (
    <div className="title-container">
      <div className="title">{title}</div>
      <div className="txt-primary">{dateRange}</div>
    </div>
  )
}
export default PageTitle