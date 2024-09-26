import { BG_INPUT_DARK, BG_INPUT_LIGHT, BG_TRADE, FONT_COLOR_DARK, FONT_COLOR_LIGHT } from "@/utils/commonConstants";
import { createTheme } from "@mui/material";

export const themeDark = createTheme({
    components: {
        MuiInputBase: {
            styleOverrides: {
                root: {
                    backgroundColor: BG_INPUT_DARK, // Set the background color
                    color: FONT_COLOR_DARK,
                    borderColor: '1px solid #0693e3'
                },
            }
        },
        MuiFormControl: {
            styleOverrides: {
                root: {
                    width: '100%',
                    borderColor: '1px solid #0693e3'
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-notchedOutline': {
                        border: '1px solid #0693e3', // Set default border color
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        border: '1px solid #0693e3', // Keep the same color on hover
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        border: '1px solid #0693e3', // Border color when focused
                    },
                },
            },
        },
        MuiPopover: {
            styleOverrides: {
                paper: {
                    backgroundColor: BG_INPUT_DARK,
                    color: FONT_COLOR_DARK
                },

            },
        },
        MuiSelect: {
            styleOverrides: {
                icon: {
                    color: BG_TRADE
                }
            }
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: FONT_COLOR_DARK,
                    '&.Mui-focused': {
                        color: BG_TRADE,
                        top: '6px',
                    },
                    '&.MuiInputLabel-shrink': {
                        color: BG_TRADE,
                        top: '6px',
                    },
                    top:'-3px'
                }
            }
        },

        MuiMenu: {
            styleOverrides: {
                paper: {
                    backgroundColor: BG_INPUT_DARK, // Change the background color for MuiMenu
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
                    color: FONT_COLOR_DARK,
                    borderColor: '1px solid #0693e3'
                },
            }
        },
        MuiFormControl: {
            styleOverrides: {
                root: {
                    width: '100%',
                    borderColor: '1px solid #0693e3'
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-notchedOutline': {
                        border: '1px solid #0693e3', // Set default border color
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        border: '1px solid #0693e3', // Keep the same color on hover
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        border: '1px solid #0693e3', // Border color when focused
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
                    color: BG_TRADE
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
    },
})