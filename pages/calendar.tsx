import { Typography } from "antd";
import React from "react";
import CustomCalendar from "src/components/calendar";
import CommonLayout from "src/layouts/common";
import { NextPageWithLayout } from "src/types/app.interfaces";

const { Title, Text } = Typography;

const CalendarPage: NextPageWithLayout = () => {
  return (
    <CommonLayout>
      <div className="flex flex-col gap-4 items-center">
        <Title>Mis rentas</Title>
        <Text>
          A continuación podrá observar en el calendario las rentas que ha hecho
          hasta el momento y los plazos de vencimiento de este
        </Text>
        <CustomCalendar />
      </div>
    </CommonLayout>
  );
};

CalendarPage.auth = true;

export default CalendarPage;
