import React, { useState } from "react";
import { BadgeProps, Empty, Modal } from "antd";
import { Badge, Calendar } from "antd";
import type { Dayjs } from "dayjs";

const getListData = (value: Dayjs) => {
  let listData;
  console.log(value.date(), new Date().getDay());
  switch (value.date()) {
    case 8:
      listData = [
        { type: "warning", content: "This is warning event." },
        { type: "success", content: "This is usual event." },
      ];
      break;
    case 10:
      listData = [
        { type: "warning", content: "This is warning event." },
        { type: "success", content: "This is usual event." },
        { type: "error", content: "This is error event." },
      ];
      break;
    case 15:
      listData = [
        { type: "warning", content: "This is warning event" },
        { type: "success", content: "This is very long usual event。。...." },
        { type: "error", content: "This is error event 1." },
        { type: "error", content: "This is error event 2." },
        { type: "error", content: "This is error event 3." },
        { type: "error", content: "This is error event 4." },
      ];
      break;
    default:
  }
  return listData || [];
};

const getMonthData = (value: Dayjs) => {
  if (value.month() === 8) {
    return 1394;
  }
};

const CustomCalendar: React.FC = () => {
  const monthCellRender = (value: Dayjs) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul
        className="events"
        onClick={() => {
          setSelectDay(getListData(value));
          showModal();
        }}
      >
        {listData.map((item) => (
          <li key={item.content}>
            <Badge
              status={item.type as BadgeProps["status"]}
              text={item.content}
            />
          </li>
        ))}
      </ul>
    );
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectDay, setSelectDay] = useState<any>([]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Calendar
        onSelect={(date) => {}}
        dateCellRender={dateCellRender}
        monthCellRender={monthCellRender}
      />
      <Modal
        title="Detalle de la fecha"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <ul className="events">
          {selectDay?.length > 0 ? (
            selectDay.map((item: any) => (
              <li key={item.content}>
                <Badge
                  status={item.type as BadgeProps["status"]}
                  text={item.content}
                />
              </li>
            ))
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
        </ul>
      </Modal>
    </>
  );
};

export default CustomCalendar;
