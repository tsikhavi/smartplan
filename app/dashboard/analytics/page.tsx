import TableComponent from '@app/app/components/analytics/tablecomponent'
import TableAnalytics from '@app/app/components/analytics/tableanalytics'
import AnayticsChart from '@app/app/components/analytics/analyticschart'
import FormComponent from '@app/app/components/analytics/form'

export default function Page() {
  return (
    <div className="pr-4 pl-1 py-6 bg-[#F5F4F4]">
      <section className="pl-40 flex inline-flex gap-1 items-center font-bold justify-between">
        <FormComponent />
      </section>{' '}
      <div className="grid grid-cols-6 gap-2 mt-8">
        <div className="col-span-2 py-12 bg-white shadow">
          <TableComponent />
        </div>
        <div className="col-span-2 bg-white shadow pt-16">
          <TableAnalytics />
        </div>
        <div className="col-span-2 py-12 bg-white shadow">
          <AnayticsChart />
        </div>
      </div>
    </div>
  )
}
