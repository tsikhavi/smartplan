'use client'
import Image from 'next/image'
import AnimatedSection from '@app/app/components/animatedsection'

export default function Home() {
  return (
    <div className="grid grid-rows-1 items-center justify-items-center font-[var(--font-inter)]">
      <main className="flex flex-col items-start">
        <HeroSection />
        <AnimatedSection>
          <ServicesSection />
        </AnimatedSection>
        <AnimatedSection>
          <WhatWeDoSection />
        </AnimatedSection>
        <AnimatedSection>
          <C2ATabs />
        </AnimatedSection>
        <AnimatedSection>
          <ServicesSection4 />
        </AnimatedSection>
      </main>
    </div>
  )
}

const HeroSection: React.FC = () => {
  return (
    <section className="h-[250px] w-full ">
      <article className="relative  flex flex-col justify-center overflow-hidden h-full pt-20 pb-12 w-full mx-auto">
        <Image
          src="/landing.jpg"
          alt="smartplan"
          fill
          className="absolute  inset-0 object-cover h-fit w-fit"
        />
        <div className=" absolute inset-0 bg-gradient-to-t w-full from-black/90"></div>
        <div className="relative text-white text-xl text-center w-[400px] itms-center mx-auto leading-6">
          Платформа поможет построить прогноз продаж и на его основе рассчитать
          обьем заказа для магазина по нужным товарам
        </div>
      </article>
    </section>
  )
}

const ServicesSection: React.FC = () => {
  const IconServices = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="mr-2 size-6 text-red-500 scale-y-[-1]"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m15 15 6-6m0 0-6-6m6 6H9a6 6 0 0 0 0 12h3"
      />
    </svg>
  )

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8 py-8">
      {/* Services List */}
      <div>
        <p className="font-bold text-base mb-4">Что мы можем:</p>
        <ul className="list-disc list-inside text-sm leading-normal">
          {[
            'рассчитать индивидуальный прогноз продаж по каждому товару',
            'помочь сформировать заказ товара по прогнозу',
            'построить аналитику ваших продаж',
            'подсветить прибыльные и убыточные категории и товары',
          ].map((item, index) => (
            <li key={index} className="flex items-center mb-2">
              <IconServices />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Call to Action Button */}
      <div className="my-auto mx-auto text-center">
        <a
          href="/dashboard/"
          className="bg-malachite-300 hover:bg-malachite-400/30 px-4 py-2 rounded-full transition-all hover:ring-4 hover:ring-malachite-400"
        >
          Посмотреть тестовую версию
        </a>
      </div>

      {/* Steps List */}
      <div>
        <p className="font-bold text-base mb-4">
          Если вы ведете список товаров и учет продаж и списаний в про:
        </p>
        <ul className="list-none list-inside text-sm leading-normal">
          {[
            'шаг 1: зарегистрируйтесь на платформе',
            'шаг 2: подключите вашу товароучетную программу',
            'шаг 3: дождитесь пока мы загрузим ваши продажи в личный кабинет',
            'шаг 4: смотрите аналитику ваших продаж и стройте прогноз продаж в один клик',
          ].map((step, index) => (
            <li key={index} className="mb-2">
              <strong className="font-light">{step}</strong>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

const WhatWeDoSection: React.FC = () => {
  return (
    <section className="grid grid-cols-5 gap-2 mx-auto py-8 h-[400px] items-stretch">
      {/* First article - spans 2 columns */}
      <article className="relative isolate col-span-2 flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 max-w-md mx-auto">
        <Image
          src="/landing.jpg"
          alt="analytics"
          fill
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 "></div>
        <div className="z-10 gap-y-1 overflow-hidden text-sm hover:text-base leading-6 text-gray-100">
          мы возьмем данные из товароучетной программы (например 1С или мой
          склад), или онлайн кассы (например эвотор)
        </div>
      </article>

      {/* Second article - spans 2 columns */}
      <article className="relative isolate col-span-2 flex flex-col justify-end overflow-hidden rounded-2xl px-4 pb-8 pt-40 max-w-md mx-auto">
        <Image
          src="/main.jpg"
          alt="analytics"
          fill
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-800"></div>
        <div className="z-10 gap-y-1 mb-4 overflow-hidden text-sm hover:text-base leading-4 text-gray-100">
          <p>
            и сформируем аналитику, которая поможет ответить на такие вопросы,
            как:
          </p>
          <ul className="list-disc list-inside text-sm leading-6 overflow-clip">
            <li>на сколько дней продаж хватить вашего остатка товара</li>
            <li>какая категория приносить больше прибыли в руб или %</li>
            <li>какая средняя наценка на товар в вашем магазине</li>
            <li>сколько дней оборачивается тот или иной товар и другие</li>
          </ul>
        </div>
      </article>

      {/* Third article - spans 1 column but same height */}
      <article className="relative isolate col-span-1 flex flex-col justify-start overflow-hidden px-32 py-40">
        <Image
          src="/imagegraph.svg"
          alt="analytics"
          fill
          className="absolute inset-0 h[110%] w-full object-cover"
        />
      </article>
    </section>
  )
}

const C2ATabs: React.FC = () => {
  return (
    <section className="h-60 mx-2 max-w-screen px-4 flex justify-between py-8 mt-20 rounded-xl bg-[#404950]">
      <div className="bg-transparent grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 items-center justify-between mx-auto">
        <div className="bg-malachite-300 h-40 w-full max-w-[250px] rounded-lg flex items-center justify-center px-4">
          <p className="text-center text-base">
            Заказывайте только тот товар, который продается
          </p>
        </div>

        <div className="bg-malachite-300 h-40 w-full max-w-[250px] rounded-lg flex items-center justify-center px-4">
          <p className="text-center text-base">
            Сократите время на расчет заказа поставщику до 5 минут
          </p>
        </div>

        <div className="bg-malachite-300 h-40 w-full mt-1 max-w-[260px] rounded-lg flex items-center justify-center px-4">
          <p className="text-center text-base">
            Снизьте кол-во товаров на складе до необходимого минимума,
            съэкономив деньги
          </p>
        </div>

        <div className="bg-malachite-300 h-40 w-full max-w-[250px] rounded-lg flex items-center justify-center px-4">
          <p className="text-center text-base">
            Доступ к сервису через браузер на любом устройстве 24/7
          </p>
        </div>

        <div className="bg-malachite-300 h-40 w-full max-w-[280px] pt-2 rounded-lg flex items-center justify-center px-4">
          <p className="text-center text-base">
            Расширяйте ассортимент магазина не боясь запутаться в большом
            количестве товаров
          </p>
        </div>
      </div>
    </section>
  )
}

const ServicesSection4: React.FC = () => {
  return (
    <section className="grid grid-cols-3 gap-4 pt-20 mb-40 px-4">
      <div>
        <p className="text-sm leading-normal tracking-wide text-justify">
          Быстрый расчет заказа на основе прогноза продаж, построение прогноза
          продаж на основе статистики за прошлый период- это все процессы
          сквозного планирования и управления цепочкой поставок (S&OP) которые
          уже не первый год используют самые технологичные ритейлы всего мира.
        </p>
        <p className="text-sm leading-normal tracking-wide mt-4 text-justify">
          Раньше этот механизм каждый крупный ритейл строил внутри своей
          компании, делая процесс управления более быстрым и финансово
          эффективным.
        </p>
      </div>
      <div className="my-auto mx-auto">
        <div className="h-[100px] bg-white w-[300px] -my-28 ">
          <div className="relative w-full h-56 rounded-lg bg-gradient-to-r from-malachite-500 to-gray-700 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black opacity-50 pointer-events-none"></div>

            <div className="absolute inset-0 flex items-center justify-center text-6xl sm:text-8xl font-bold">
              <span className="text-malachite-500">S</span>
              <span className="text-white">P</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div>
          <p className="text-sm text-justify">
            <strong>SmartPlan</strong> - это платформа, цель которой сделать
            доступным подобное планирования и управление продажами в рамках S&OP
            процесса за счет использования лучших технологией, упрощая контроль
            за продажами, незвисимо от количества товаров и точек продаж для
            каждого клиента.{' '}
          </p>
        </div>
      </div>
    </section>
  )
}
