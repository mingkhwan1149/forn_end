// theme/getTheme.ts
import { createTheme, type Theme } from '@mui/material/styles';

export const getTheme = (mode: 'light' | 'dark'): Theme =>
    createTheme({
        palette: {
            mode,
            ...(mode === 'light'
                ? {
                    primary: { main: '#FFFFFF' },
                    secondary: { main: '#22bfff' },
                    info: { main: '#00c8bc' },
                    background: {
                        default: '#F7F9FC',   // สีทึบ
                        paper: '#FFFFFF',
                    },
                    warning: { main: '#f73f3f' },
                    tertiary: { main: '#6C5CE7' },
                    text: {
                        primary: '#494949',
                        secondary: '#5C5C5C',
                        disabled: '#9E9E9E',
                    },
                    error: { main: '#FF3535' }
                }
                : {
                    primary: { main: '#90caf9' },
                    background: { default: '#121212', paper: '#1e1e1e' },
                    warning: { main: '#f73f3f' },
                    tertiary: { main: '#7C6BEE' },
                    text: {
                        primary: '#ffffff',
                        secondary: '#cccccc'
                    },
                    error: { main: '#FF3535' }
                })
        },
        typography: {
            fontFamily: ["IBM Plex Sans", "IBMPlexSansThai",].join(","),
            fontSize: 16,
            h1: {
                fontWeight: 700,
                fontSize: '88px',
                lineHeight: '180%',
                letterSpacing: '1.5px'
            },
            h2: {
                fontWeight: 700,
                fontSize: '56px',
                lineHeight: '180%',
                letterSpacing: '0.5px'
            },
            h3: {
                fontWeight: 700,
                fontSize: '48px',
                lineHeight: '180%'
            },
            h4: {
                fontWeight: 500,
                fontSize: '28px',
                lineHeight: '36%',
            },
            h5: {
                fontWeight: 500,
                fontSize: '22px',
                lineHeight: '28px',
            },
            h6: {
                fontSize: '16px',
                fontWeight: 500,
                lineHeight: '24px',
            },
            subtitle1: {
                fontWeight: 500,
                fontSize: '16px',
                lineHeight: '24px',
            },
            subtitle2: {
                fontWeight: 700,
                fontSize: '16px'
            },
            body1: {
                fontWeight: 600,
                fontSize: '16px'
            },
            body2: {
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '24px',
            },
            caption: {
                fontWeight: 700,
                fontSize: '12px',
                lineHeight: '140%',
                letterSpacing: '1px'
            },
            button: {
                fontWeight: 500,
                fontSize: '16px',
                lineHeight: '100%',
                letterSpacing: '0.5px'
            },
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: (theme) => ({
                    // ✅ gradient เฉพาะ light (ของเดิมคุณ)
                    body: theme.palette.mode === 'light'
                        ? { background: 'linear-gradient(90deg, #3676ff 0%, #22bfff 100%)' }
                        : {},

                    // ✅ กำหนด CSS variables ของ react-pro-sidebar ตาม theme (มีผลทุก Sidebar)
                    ':root': {
                        '--ps-sidebar-bg-color': theme.palette.background.paper,
                        '--ps-sidebar-color': theme.palette.text.primary,
                        '--ps-sidebar-border-color': theme.palette.divider,

                        '--ps-menuitem-active-bg-color': theme.palette.action.selected,
                        '--ps-menuitem-active-color': theme.palette.text.primary,

                        '--ps-menuitem-hover-bg-color': theme.palette.action.hover,
                        '--ps-menuitem-hover-color': theme.palette.text.primary,
                    },

                    // ✅ เผื่อบางเวอร์ชัน: บังคับพื้นหลัง/ตัวอักษรที่ root ของ sidebar
                    '.ps-sidebar-root': {
                        backgroundColor: theme.palette.background.paper,
                        color: theme.palette.text.primary,
                        borderRight: `1px solid ${theme.palette.divider}`,
                    },

                    // ✅ สีปุ่มเมนู/โฮเวอร์ ให้ไปตาม theme
                    '.ps-menu-root .ps-menu-button': {
                        color: theme.palette.text.primary,
                        backgroundColor: theme.palette.background.paper,
                    },
                    '.ps-menu-root .ps-menu-button:hover': {
                        backgroundColor: theme.palette.action.hover,
                        color: theme.palette.text.primary,
                    },
                    '.ps-menu-root .ps-menu-button.ps-active': {
                        backgroundColor: theme.palette.action.selected,
                        color: theme.palette.text.primary,
                    },

                    // (ถ้ามี submenu)
                    '.ps-submenu-content': {
                        backgroundColor: theme.palette.background.paper,
                    },
                }),
            },
            MuiRadio: {
                styleOverrides: {
                    root: {
                        color: '#BDBDBD',
                        '&.Mui-checked': {
                            color: '#FBBF14'
                        }
                    }
                }
            },
            MuiCheckbox: {
                styleOverrides: {
                    root: {
                        color: '#BDBDBD',
                        '&.Mui-checked': {
                            color: '#FBBF14'
                        }
                    }
                }
            },
            MuiSwitch: {
                styleOverrides: {
                    switchBase: {
                        '&.Mui-checked': {
                            color: '#FBBF14'
                        }
                    },
                    track: {
                        '&.Mui-checked': {
                            backgroundColor: '#FBBF14'
                        }
                    }
                }
            },
            MuiLink: {
                styleOverrides: {
                    root: {
                        color: '#FBBF14',
                        '&:hover': {
                            textDecoration: 'underline'
                        }
                    }
                }
            },
            MuiTabs: {
                styleOverrides: {
                    indicator: {
                        backgroundColor: '#FBBF14'
                    }
                }
            },
            MuiTab: {
                styleOverrides: {
                    root: {
                        '&.Mui-selected': {
                            color: '#FBBF14'
                        }
                    }
                }
            },
            MuiPaginationItem: {
                styleOverrides: {
                    root: {
                        '&.Mui-selected': {
                            backgroundColor: '#FBBF14',
                            color: '#000',
                            '&:hover': {
                                backgroundColor: '#e0aa10'
                            }
                        }
                    }
                }
            },
            MuiStepIcon: {
                styleOverrides: {
                    root: {
                        color: '#BDBDBD',
                        '&.Mui-active': {
                            color: '#FBBF14'
                        },
                        '&.Mui-completed': {
                            color: '#FBBF14'
                        }
                    }
                }
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: '4px',
                        fontWeight: 600,
                        '&.Mui-disabled': {
                            background: '#FBBF14',
                            color: '#483400'
                        }
                    },
                    sizeSmall: {
                        fontSize: 14,
                        height: 40
                    },
                    sizeMedium: {
                        fontSize: 16,
                        height: 36
                    },
                    sizeLarge: {
                        fontSize: 20,
                        height: 44
                    }
                },
                variants: [
                    {
                        props: { variant: 'contained', color: 'primary' },
                        style: {
                            fontSize: 14,
                            // background: 'linear-gradient(90deg, #3676ff 0%, #5B8DFF 100%)',
                            // color: 'white'
                            background: "var(--Schemes-Secondary-Container, #FBBF14)",
                            color: 'black'
                        }
                    },
                    {
                        props: { variant: 'contained', color: 'secondary' },
                        style: {
                            fontSize: 14,
                            backgroundColor: '#00598f',
                            color: 'white'
                        }
                    },
                    {
                        props: { variant: 'outlined', color: 'primary' },
                        style: {
                            fontSize: 14,
                            borderColor: '#3676ff',
                            color: '#3676ff'
                        }
                    },
                    {
                        props: { variant: 'outlined', color: 'error' },
                        style: {
                            fontSize: 14,
                            borderColor: '#BA2A2A',   // สีพื้นหลังที่ต้องการ
                            '&:hover': {
                                backgroundColor: '#BA1A1A', // สี hover (เข้มขึ้น)
                            },
                        }
                    },
                    {
                        props: { variant: 'contained', color: 'inherit' },
                        style: {
                            fontSize: 14,
                            backgroundColor: '#a2a2a2',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: '#a2a2a2'
                            }
                        }
                    },
                    {
                        props: { variant: 'contained', color: 'warning' },
                        style: {
                            fontSize: 14,
                            backgroundColor: '#FAFAFA',   // สีพื้นหลังที่ต้องการ
                            color: '#00677D',             // สีตัวอักษร
                            '&:hover': {
                                backgroundColor: '#FAFAFA', // สี hover (เข้มขึ้น)
                            },
                        },
                    },
                    {
                        props: { variant: 'contained', color: 'error' },
                        style: {
                            fontSize: 14,
                            backgroundColor: '#BA2A2A',   // สีพื้นหลังที่ต้องการ
                            color: '#FAFAFA',             // สีตัวอักษร
                            '&:hover': {
                                backgroundColor: '#BA1A1A', // สี hover (เข้มขึ้น)
                            },
                        },
                    },
                ]
            },
            MuiInputLabel: {
                styleOverrides: {
                    root: ({ theme }) => ({
                        fontSize: 16,
                        fontWeight: 400,
                        lineHeight: '24px',
                        color: theme.palette.text.secondary, // ปกติ
                        '&.Mui-focused': {
                            color: theme.palette.text.primary, // โฟกัส
                        },
                        '&.Mui-error': {
                            color: theme.palette.error.main,
                        },
                    }),
                },
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    root: ({ theme }) => ({
                        minHeight: 56,
                        borderRadius: 10,

                        // ปกติ
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.divider,
                            borderWidth: 1,
                        },

                        // โฟกัสปกติ
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.text.primary,
                            borderWidth: 2,
                        },

                        // ❗️สถานะ error
                        '&.Mui-error .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.error.main,
                            borderWidth: 2, // ปรับตามต้องการ
                        },
                        // โฟกัส + error
                        '&.Mui-focused.Mui-error .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.error.main,
                            borderWidth: 2,
                        },
                    }),
                    input: {
                        color: '#757575',
                        fontWeight: 600,
                    },
                },
            },
            MuiTextField: {
                defaultProps: {
                    variant: 'outlined',
                },
            },
            MuiAutocomplete: {
                defaultProps: {
                    // ให้ Popper/เมนูสูงกว่าบาง layout
                    disablePortal: false,
                    autoHighlight: true,
                },
                styleOverrides: {
                    // กล่องเมนู (Paper ภายใน Popper)
                    paper: ({ theme }) => ({
                        backgroundColor: theme.palette.background.paper,
                        color: theme.palette.text.primary,
                        border: `1px solid ${theme.palette.divider}`,
                        boxShadow: theme.shadows[4],
                    }),
                    // กล่องรายการ (ul)
                    // listbox: ({ theme }) => ({
                    //     backgroundColor: theme.palette.background.paper,
                    //     color: theme.palette.text.primary,
                    //     padding: 0,
                    //     // เส้นกั้นระหว่าง option
                    //     '& li + li': {
                    //         borderTop: `1px solid ${theme.palette.divider}`,
                    //     },
                    // }),
                    // แต่ละ option
                    option: ({ theme }) => ({
                        backgroundColor: 'transparent',
                        color: theme.palette.text.primary,
                        // โฮเวอร์
                        '&.Mui-focused': {
                            backgroundColor: theme.palette.action.hover,
                        },
                        // ถูกเลือก (active จาก keyboard)
                        '&[aria-selected="true"]': {
                            backgroundColor: theme.palette.action.selected,
                        },
                        // disabled
                        '&.Mui-disabled': {
                            opacity: 0.6,
                        },
                    }),
                    // tag (chip) เมื่อเป็น multiple
                    tag: ({ theme }) => ({
                        // <Chip />
                        // backgroundColor:
                        //     theme.palette.mode === 'light'
                        //         ? theme.palette.grey[100]
                        //         : theme.palette.grey[800],
                        color: theme.palette.text.primary,
                        // border: `1px solid ${theme.palette.divider}`,
                        '& .MuiChip-deleteIcon': {
                            color: theme.palette.text.primary,
                            '&:hover': { color: theme.palette.text.primary },
                        },
                    }),
                    // กล่อง root (รอบ ๆ input) — เผื่ออยากให้พื้นหลังเป็น paper เสมอ
                    root: ({ theme }) => ({
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: theme.palette.background.paper,
                            color: theme.palette.text.primary,
                        },
                        '& .MuiInputBase-input': {
                            color: theme.palette.text.primary,
                        },
                        '& .MuiInputLabel-root': {
                            color: theme.palette.text.secondary,
                        },
                        '&::placeholder': {
                            fontSize: '16px',
                            fontWeight: 500,
                            lineHeight: '24px',
                            color: '#0B0A0A',
                            opacity: 1, // ต้องใส่ opacity=1 เพราะ MUI มี default = 0.42
                        },
                    }),
                    // ไอคอนเปิด/ปิด popup & clear
                    popupIndicator: ({ theme }) => ({
                        color: theme.palette.text.secondary,
                        '&:hover': { color: theme.palette.text.primary },
                    }),
                    clearIndicator: ({ theme }) => ({
                        color: theme.palette.text.secondary,
                        '&:hover': { color: theme.palette.text.primary },
                    }),
                    // กลุ่มหัวข้อ (ถ้าใช้ groupBy)
                    groupLabel: ({ theme }) => ({
                        backgroundColor:
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[50]
                                : theme.palette.grey[900],
                        color: theme.palette.text.secondary,
                        fontWeight: 600,
                    }),
                },
            },
            MuiChip: {
                styleOverrides: {
                    root: ({ theme }) => ({
                        backgroundColor:
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[800],
                        color: theme.palette.text.primary,
                        border: `1px solid ${theme.palette.divider}`,
                    }),
                },
            },
        },
    });

export default getTheme;
