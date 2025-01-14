const AboutCompany = () => {
  return (
    <div id="about" className="py-10 container flex flex-col items-center">
      <div className="flex flex-col items-center gap-y-5">
        <h1 className="text-4xl">О нас</h1>
        <hr className="border border-darkGreen w-[163px]" />
      </div>
      <div className="flex flex-col mt-5 gap-y-5">
        <p>
          <b>
            {"\t"} Объединение административно-технических инспекций города
            Москвы
          </b>{" "}
          – это важный функциональный орган исполнительной власти, ответственный
          за контроль и предоставление государственных услуг в различных
          областях деятельности. Мы занимаемся муниципальным контролем в сфере
          благоустройства, автомобильным транспортом, городским электрическим
          транспортом и дорожным хозяйством на территории города Москвы.
        </p>
        <p>
          {"\t"}Кроме того, наша работа включает в себя ведомственный контроль в
          области благоустройства, а также региональный государственный надзор
          за техническим состоянием самоходных машин, аттракционов и других
          видов техники. Мы также оказываем государственные услуги по оформлению
          разрешений на земельные работы, проведению технического осмотра
          техники, регистрации автомобилей и аттракционов. При осуществлении
          наших обязанностей мы строго руководствуемся законодательством
          Российской Федерации и нормативными актами города Москвы, обеспечивая
          надлежащее взаимодействие с федеральными, региональными и
          муниципальными органами власти, а также с общественными организациями.
          Наша цель – обеспечить безопасность и комфортность жизни горожан и
          гармоничное развитие городской инфраструктуры.
        </p>
      </div>
    </div>
  );
};

export default AboutCompany;
