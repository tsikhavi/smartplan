'use client'
import AnimatedSection from '@app/app/components/animatedsection'
import {
  USER_DETAILS,
  STORES_INFO,
  SYNC_DATA,
  ORDER_CALC_STEPS,
  STAT_ITEMS,
  StoreInfo,
  SyncData,
  UserDetails,
} from './storeData'
import React from 'react'
import dynamic from 'next/dynamic'

const MainContent = dynamic(() => import('./mainContent'), { ssr: false })

interface UserDetailsSectionProps {
  user: UserDetails
}

const UserDetailsSection: React.FC<UserDetailsSectionProps> = ({ user }) => {
  return (
    <section className="h-fit text-xs w-full md:w-60 bg-[#B1C7DC] rounded-lg my-2 p-2 space-y-1">
      <header className="font-bold">Данные пользователя</header>
      <p>User id: {user.id}</p>
      <p>User name: {user.name}</p>
      <p>ИНН: {user.inn}</p>
    </section>
  )
}

interface StoresSectionProps {
  stores: StoreInfo[]
}

const StoresSection: React.FC<StoresSectionProps> = ({ stores }) => {
  return (
    <section className="h-fit text-xs w-full md:w-60 bg-[#B1C7DC] rounded-lg p-2 space-y-1">
      <header className="font-bold">
        Количество магазинов: {stores.length}
      </header>
      {stores.map((store, index) => (
        <article
          key={index}
          className="h-fit bg-white rounded-lg p-2 space-y-1"
        >
          <header className="font-bold text-center">{store.name}</header>
          <p className="text-xs text-justify break-words">
            <strong>Адрес:</strong> {store.address}
          </p>
        </article>
      ))}
    </section>
  )
}

interface SyncTableProps {
  syncData: SyncData[]
}

const SyncTable: React.FC<SyncTableProps> = ({ syncData }) => {
  return (
    <section className="h-fit text-xs w-full md:w-60 bg-[#B1C7DC] rounded-lg p-2 space-y-1">
      <table className="table-auto w-full text-left">
        <thead>
          <tr>
            <th className="px-1 py-2 text-xs">Актуальность данных</th>
            <th className="px-1 py-2">Дата</th>
          </tr>
        </thead>
        <tbody>
          {syncData.map((item, index) => (
            <tr key={index}>
              <td className="px-1 py-0">{item.label}</td>
              <td className="px-1 py-0">{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

interface OrderCalcStepsProps {
  steps: string[]
}

const OrderCalcSteps: React.FC<OrderCalcStepsProps> = ({ steps }) => {
  return (
    <section className="h-fit text-xs w-full md:w-60 bg-[#B1C7DC] rounded-lg p-2 space-y-1">
      <header className="font-bold">Порядок расчета заказа</header>
      <ul className="list-decimal list-inside space-y-1">
        {steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ul>
    </section>
  )
}

const Page: React.FC = () => {
  
  return (
    <main className="grid grid-cols-5 gap-2 h-screen px-2">
      {/* Sidebar */}
      <aside className="col-span-1 space-y-2 mt-1">
        <AnimatedSection>
          <UserDetailsSection user={USER_DETAILS} />
        </AnimatedSection>
        <AnimatedSection>
          <StoresSection stores={STORES_INFO} />
        </AnimatedSection>
        <AnimatedSection>
          <SyncTable syncData={SYNC_DATA} />
        </AnimatedSection>
        <AnimatedSection>
          <OrderCalcSteps steps={ORDER_CALC_STEPS} />
        </AnimatedSection>
      </aside>
      {/* Main Content */}
      <MainContent stats={STAT_ITEMS} />
    </main>
  )
}

export default Page
