import "styled-components";

declare module "styled-components/native" {
  export interface DefaultTheme {
    textColor: string;
    backgroundColor: string;
    btnBgColor: string;
    btnTextColor: string;
  }
}
