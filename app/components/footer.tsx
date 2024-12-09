import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="row-start-3 flex px-20 gap-6 flex-wrap items-center justify-center">
      <section className="grid grid-cols-3 gap-4">
        <div>
          <p className="pb-2 font-bold text-sm">
            Контакты:{' '}
            <span className="inline">
              <Image
                aria-hidden
                src="/e_mail.svg"
                alt="File icon"
                width={32}
                height={32}
                className="inline-flex"
              />
            </span>
            <span className="inline pl-2 font-light hover:underline hover:cursor-pointer">
              <a
                href="mailto:dmitriy.kyrdumov@gmail.com"
                target="_blank"
                title="Напишите почту"
              >
                dmitriy.kyrdumov@gmail.com
              </a>
            </span>
          </p>
          <p className="pl-[8.5ch] text-sm">
            <span className="inline">
              <Image
                aria-hidden
                src="/telegram.svg"
                alt="File icon"
                width={48}
                height={48}
                className="inline-flex"
              />
            </span>

            <span className=" inline pl-1 font-light hover:underline hover:cursor-pointer">
              <a href="https://t.me/kurdumoff" target="_blank" title="Телеграм">
                @kurdumoff
              </a>
            </span>
          </p>
        </div>
        <div className="-my-20 mx-auto underline">
          <p className="text-sm leading-normal text-justify tracking-normal">
            Сейчас сервис находиться в разработке. Если вы планируете им
            пользоваться, или хотите присоединится к разработке - пожалуйста
            напишите нам об этом. Все пожелания по функционалу категорически
            приветствуются
          </p>
        </div>
        <div>
          <div>
            <p className="text-right">Внедряем S&OP в каждый магазин</p>
          </div>
        </div>
      </section>
    </footer>
  )
}
