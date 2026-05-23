import Button from "./Button";
import { useTheme } from "../ThemeContext";
 
export function ThemeButton() {
    const { randomize } = useTheme();
 
  return (
    <Button onClick={randomize} className={"font-medium theme-header"}/>
  );
}
 