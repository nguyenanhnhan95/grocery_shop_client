'use client';
import React, { useRef } from "react";
import useSizeAndPosition from "@/components/ui/useSizeAndPosition";
import { Popper } from "@mui/material";
import 'dayjs/locale/vi';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {  LocalizationProvider } from "@mui/x-date-pickers";

import { CustomDatePickerProps } from "@/types/inputProps";
import { BG_TRADE, FONT_COLOR_DARK } from "@/utils/commonConstants";
import dynamic from "next/dynamic";
const DatePicker = dynamic(() => import('@mui/x-date-pickers').then(mod => mod.DatePicker), {
    ssr: false
});
const CustomDate: React.FC<CustomDatePickerProps> = (props) => {
    const paperRef = useRef<HTMLDivElement | null>(null);
    const { width } = useSizeAndPosition(paperRef)

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="vi">

                <DatePicker

                    {...props}
                    slots={{
                        popper: (props) => <Popper {...props} sx={{
                            'html[dark-theme="dark"] & .MuiDayCalendar-header .MuiTypography-root': {
                                color: FONT_COLOR_DARK,
                            },

                        }}
                            style={{ width: width }} />
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
                    slotProps={{
                        day: {
                            sx: {
                                'html[dark-theme="dark"] &': {
                                    color: FONT_COLOR_DARK
                                },
                                'html[dark-theme="dark"] &.MuiPickersDay-root:not(.Mui-selected)': {
                                    border: 'none',
                                },
                                ' &.MuiPickersDay-root:focus': {
                                    border: `1px solid ${BG_TRADE}`
                                }
                            },
                        },
                        textField: {
                            sx: {
                                'html[dark-theme="dark"] &': {
                                    color: FONT_COLOR_DARK
                                }
                            },
                        }
                    }}
                    sx={{
                        'html[dark-theme="dark"] & .MuiDayCalendar-header': {
                            color: FONT_COLOR_DARK,
                        },
                    }}
                    ref={paperRef}
                    dayOfWeekFormatter={(date) => date.format("dd")}
                />

        </LocalizationProvider>
    )
}
export default React.memo(CustomDate);