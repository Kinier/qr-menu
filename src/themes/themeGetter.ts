import defaultLightTheme from "./defaultLightTheme";
import defaultDarkTheme from "./defaultDarkTheme";

interface themes {
    types: 'd-dark' | 'd-light',
}

export default function themeGetter(theme: themes["types"]) { // todo мб сделать через enum ( и мб интрефейс)

    switch (theme) {
        case 'd-light':
            return defaultLightTheme;
        case 'd-dark':
            return defaultDarkTheme;
        default:
            return defaultLightTheme;
            break;
    }
}