import styled from "@emotion/styled"

export const PageBody = styled("div")`

  width: 100%;
  height: 100%;
  padding: 2em;
`
export const TabHead = styled("div")`
  display: flex;
  background:linear-gradient(to right,purple,skyblue);
  background-position: top;
  background-repeat: no-repeat;
  background-size: auto;;
`
export const TabContainer = styled("div")`
  width: 80%;
  height: 100%;
  margin: 0 10em 0 1em;
  webkit-box-shadow: -1px 0px 5px 0px rgba(184, 184, 184, 1);
  -moz-box-shadow: -1px 0px 5px 0px rgba(184, 184, 184, 1);
  box-shadow: -1px 0px 5px 0px rgba(184, 184, 184, 1);
`
export const TabBody = styled(PageBody)`
  height: 120%;
`
export const Tab = styled("div")`
  text-decoration: none !important;
  margin: 0 1em 0 ${({ isFirst }) => (isFirst ? "0" : "1em")};
  padding: 1em .75em;  
  border-style:solid;
  border-width:0px;
  box-shadow: 0 -4px 7px 0 rgb(120 120 120 / 50%);
  background: ${("linear-gradient(to bottom, green 0%,green 100%)")};
  * {
    color: white;
  }

`
export const TabC = styled("div")`
  width: 85%;
  display: space-between;

`
export const MyHeader = styled("div")`
    display: flex;
  
`
export const Logo = styled("div")`
      padding: 0.25em 2em;
      img {
        cursor: pointer;
      }
`
export const Sepet = styled("div")`
  margin: 0 1em 0 1em;

  align-self: flex-end;
  padding: 1em .75em;  
  border-style:solid;
  border-width:0px;
  box-shadow: 0 -4px 7px 0 rgb(120 120 120 / 50%);
  ;
  background: green;
  * {
    color: white;
  }
`
export const Login = styled("div")`
  margin: 0 1em 0 1em;
  align-self: flex-end;
  padding: 1em .75em;  
  border-style:solid;
  border-width:0px;
  box-shadow: 0 -4px 7px 0 rgb(120 120 120 / 50%);
  ;
  background: white;
  * {
    color: black;
  }
  form {
    display:flex;

  }
  form > div {
    margin: 0 1em 0 1em;
    
  }
`
export const HomeMain = styled("div")`
  display: flex;
  justify-content: center;
  div {
    padding:0 1em;
  }
  form {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }
  form > div {
    justify-content: center;

  }
  form > button {
    justify-content: center;

  }
`
export const MYSepet = styled("div")`
  display: flex;
  width:100%;
  justify-content: space-evenly;
  div {
    padding:0 1em;
  }
  form {
    display: flex;
    padding: 10em;
    flex-direction: column;
    
  }
  form > div {
    justify-content: center;

  }
  form > button {
    justify-content: center;

  }
`