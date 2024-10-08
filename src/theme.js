
import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
// import { cyan, deepOrange, orange, teal } from '@mui/material/colors'


const APP_BAR_HEIGHT = '58px'
// const BOARD_BAR_HEIGHT = '60px'
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT})`
const COLUMN_HEADER_HEIGHT = '50px'
const COLUMN_FOOTER_HEIGHT = '56px'

const theme = extendTheme({
  trello: {
    appBarHeight: APP_BAR_HEIGHT,
    // boardBarHeight: BOARD_BAR_HEIGHT,
    boardContentHeight:BOARD_CONTENT_HEIGHT,
    columnHeaderHeight:COLUMN_HEADER_HEIGHT,
    columnFooterHeight:COLUMN_FOOTER_HEIGHT
  },
  colorSchemes: {
    // light: {
    //   palette: {
    //     primary: teal,
    //     secondary: deepOrange
    //   }
    // },
    // dark: {
    //   palette: {
    //     primary: cyan,
    //     secondary: orange
    //   }
    // }
  },
  components: {
    MuiCssBaseline:{
      styleOverrides:{
        body:{
          '*::-webkit-scrollbar':{
            width: '8px',
            height: '8px'
          },
          '*::-webkit-scrollbar-thumb':{
            backgroundColor: '#bdc3c7',
            borderRadius: '8px'
          },
          '*::-webkit-scrollbar-thumb:hover':{
            backgroundColor: '#55efc4'
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none'
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: () => ({
          fontSize: '0.875rem'
        })
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: () => ({
          '&.MuiTypography-body1':{
            fontSize: '0.875rem'
          }
        })
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root:({ theme }) => {
          return {
            // color:theme.palette.primary.main,
            fontSize:'0.875rem',
            // '.MuiOutlinedInput-notchedOutline' :{
            //   borderColor:theme.palette.primary.light
            // },
            // '&:hover':{
            //   '.MuiOutlinedInput-notchedOutline' :{
            //     borderColor:theme.palette.primary.main
            //   }
            // },
            '& fieldset':{
              borderWidth:'1px !important'
            }
          }
        }
      }
    }
  }
})

export default theme