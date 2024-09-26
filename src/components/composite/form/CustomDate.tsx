'use client';
import useSizeAndPosition from "@/components/ui/useSizeAndPosition";
import { Popper } from "@mui/material";
import { useRef } from "react";
import 'dayjs/locale/vi';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { CustomDatePickerProps } from "@/types/input";
const CustomDate: React.FC<CustomDatePickerProps> = (props) => {
    const paperRef = useRef<HTMLDivElement | null>(null);
    const { width } = useSizeAndPosition(paperRef)

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="vi">
            <DemoContainer components={['DatePicker']}  >
                <DatePicker
                    {...props}
                    slots={{
                        popper: (props) => <Popper {...props} style={{ width: width }} />
                    }}
                    localeText={{
                        toolbarTitle: props.title,
                        cancelButtonLabel: 'Hủy ',
                        clearButtonLabel: 'Xóa',
                        okButtonLabel: 'Xác nhận',
                        todayButtonLabel: 'Hôm nay',
                        start: 'Bắt đầu',
                        end: 'Kết thúc',
                        previousMonth: 'Tháng trước',
                        nextMonth: 'Tháng sau',
                    }}
                    ref={paperRef}
                    dayOfWeekFormatter={(date) => date.format("dd")}
                />
            </DemoContainer>
        </LocalizationProvider>
    )
}
export default CustomDate;