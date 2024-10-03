import { BG_INPUT_DARK, BG_INPUT_LIGHT, BG_TRADE, FONT_COLOR_DARK, FONT_COLOR_LIGHT, PL_INPUT } from "@/utils/commonConstants";
import { createTheme } from "@mui/material";

export const themeDark = createTheme({
    components: {
        MuiInputBase: {
            styleOverrides: {
                root: {
                    backgroundColor: BG_INPUT_DARK, // Set the background color
                    color: FONT_COLOR_DARK,
                    borderColor: `1px solid ${BG_TRADE}`,
                },
            }
        },
        MuiInputAdornment:{
            styleOverrides:{
                root:{
                    '& .MuiTypography-root':{
                        color:FONT_COLOR_DARK
                    }
                }

            }
        },
        MuiStack: {
            styleOverrides: {
                root: {
                    overflow: 'hidden !important',
                    paddingTop: '0 !important'
                },
            },
        },
        MuiFormControl: {
            styleOverrides: {
                root: {

                    width: '100%',
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-notchedOutline': {
                        border: 'var(--bs-border-width) solid var(--bs-border-color);',
                    },

                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        border: 'var(--bs-border-width) solid var(--bs-border-color);', // Giữ nguyên màu viền
                    },

                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        border: `1px solid ${BG_TRADE}`, // Màu viền khi focus
                    },

                    '&:hover.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        border: `1px solid ${BG_TRADE}`, // Giữ nguyên màu viền focus khi hover
                    },
                },
                input: {
                    color: FONT_COLOR_DARK,

                }
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: BG_INPUT_DARK,
                    color: FONT_COLOR_DARK,
                    '&:MuiDayCalendar-root': {
                        backgroundColor: BG_INPUT_DARK,
                        color: FONT_COLOR_DARK,
                    },

                }

            }
        },

        MuiPopover: {
            styleOverrides: {
                paper: {
                    backgroundColor: BG_INPUT_DARK,
                    color: FONT_COLOR_DARK,

                },

            },
        },
        MuiSelect: {
            styleOverrides: {
                icon: {
                    color: FONT_COLOR_DARK,
                }
            }
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: PL_INPUT,
                    '&.Mui-focused': {
                        color: BG_TRADE,
                        top: '6px',
                    },
                    '&.MuiInputLabel-shrink': {
                        color: BG_TRADE,
                        top: '6px',
                    },
                    top: '-3px'
                }
            }
        },
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    color: FONT_COLOR_DARK
                }
            }
        },
        MuiMenu: {
            styleOverrides: {
                paper: {
                    backgroundColor: BG_INPUT_DARK, 
                },
            },
        },
        MuiPopper: {
            styleOverrides: {
                root: {
                    zIndex: 10,  
                },
            },
        },
        
    },

})
export const themeLight = createTheme({
    components: {
        MuiInputBase: {
            styleOverrides: {
                root: {
                    backgroundColor: BG_INPUT_LIGHT, // Set the background color
                    color: FONT_COLOR_LIGHT,
                    borderColor: `1px solid ${BG_TRADE}`
                },
            }
        },
        MuiFormControl: {
            styleOverrides: {
                root: {
                    width: '100%',
                    borderColor: `1px solid ${BG_TRADE}`
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-notchedOutline': {
                        border: 'var(--bs-border-width) solid var(--bs-border-color);',
                    },

                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        border: 'var(--bs-border-width) solid var(--bs-border-color);', // Giữ nguyên màu viền
                    },

                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        border: `1px solid ${BG_TRADE}`, // Màu viền khi focus
                    },

                    '&:hover.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        border: `1px solid ${BG_TRADE}`, // Giữ nguyên màu viền focus khi hover
                    },
                },
            },
        },

        MuiPopover: {
            styleOverrides: {
                paper: {
                    // backgroundColor: BG_INPUT_DARK,
                    color: FONT_COLOR_LIGHT
                },

            },
        },
        MuiSelect: {
            styleOverrides: {
                icon: {
                    color: FONT_COLOR_LIGHT
                }
            }
        },
        MuiMenu: {
            styleOverrides: {
                paper: {
                    // backgroundColor: BG_INPUT_DARK, // Change the background color for MuiMenu
                },
            },
        },
        MuiStack: {
            styleOverrides: {
                root: {
                    overflow: 'hidden !important',
                    paddingTop: '0 !important'
                },
            },
        },
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    color: FONT_COLOR_LIGHT
                }
            }
        },

    },
})