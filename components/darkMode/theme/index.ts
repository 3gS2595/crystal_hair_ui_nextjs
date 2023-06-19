import { PaletteOptions, createTheme, css } from "@mui/material/styles";

export type AllowedTheme = NonNullable<PaletteOptions["mode"]>;

export const DEFAULT_THEME: AllowedTheme = "dark";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export const globalStyles = css`
  :root {
    body {
      background-color: #fff;
      color: #333;
    }
.ReactTable .rt-tbody .rt-tr-group {
  border-bottom: .51px solid rgba(128, 0, 128, .34) !important
}
.ReactTable .rt-tbody .rt-td {
  border-right: 1px solid rgba(0, 0, 255, .14) !important
}
.ReactTable .rt-thead .rt-td.-sort-desc,
 .ReactTable .rt-thead .rt-th.-sort-desc {
  box-shadow: inset 0 -1.2px 0 0 #b8bd19 !important
}
#date {
  color:rgb(46, 46, 46);
}
#descr{
  color: gray;
}
.ReactTable .rt-thead .rt-td.-sort-asc,
 .ReactTable .rt-thead .rt-th.-sort-asc {
  box-shadow: inset 0 1.2px 0 0#b8bd19 !important
}
a:link {
  color: rgba(30, 30, 249, .823)
}
#count  {
  color: #000; 
}
a:visited {
  color: #b110b1
}
 #title a {
  color: #551a8b ;
}
 #names {
  color: rgb(30, 30, 249, .823) ;
}

::-webkit-scrollbar-thumb {
  background: rgba(184, 189, 25, .4);
  height: 10px ;
}
.react-tabs #dm,
.react-tabs__tab {
  color: #551a8b !important;
}
.react-tabs__tab--selected {
  color: #551a8b ;
}
#dm {
  border-style: none !important;
  background-color: hsla(0, 0%, 100%, 0) !important
}


  }

  [data-theme="dark"] {
    body {
      background-color:rgb(45, 45, 45);
	  color: #dfdfdfd3;
    }
.ReactTable .rt-tbody .rt-tr-group {
  border-bottom: 1px solid rgba(60, 230, 202, .3) !important
}
.ReactTable .rt-tbody .rt-td {
  border-right: 1px solid rgba(116, 137, 47, .5) !important
}
#date {
  color:rgb(163, 163, 163);
}
#descr{
  color: grey;
}
.ReactTable .rt-thead .rt-td.-sort-desc,
.ReactTable .rt-thead .rt-th.-sort-desc {
  box-shadow: inset 0 -1px 0 0 #b8bd19 !important
}
.ReactTable .rt-thead .rt-td.-sort-asc,
.ReactTable .rt-thead .rt-th.-sort-asc {
  box-shadow: inset 0 1px 0 0 #b8bd19 !important
}
a:link {
  color: rgba(194, 194, 73, 0.823)
}
#count  {
  color: #fff
}
#title a {
  color: #aae574 !important
}
#names {
  color: rgb(170, 229, 116, .953) !important
}
::-webkit-scrollbar-thumb {
  background: rgba(184, 189, 25, .4);
  height: 10px ;
}
.react-tabs #dm,
.react-tabs__tab {
  color: #aae574 !important;
}
a:visited {
  color: #aae574 ;
}
.react-tabs__tab--selected {
  color: #aae574 ;
}
#dm {
  border-style: none !important;
  color: #fff !important
}
  }
`;








