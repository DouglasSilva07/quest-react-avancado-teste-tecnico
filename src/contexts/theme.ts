import IconSun from "/icon-sun.svg"
import MoonIcon from "/icon-moon.svg"

export const themeConfig = {
    light: {
        name: 'light',
        layout: {
            heroClass: 'theme-light',
            backgroundColor:
                'bg-neutral-light-red',
            borderColor: 'border-neutral-very-light-red',
            textColor:
                'text-neutral-very-light-white'
        },
        card: {
            backgroundColor:
                'bg-neutral-dark-red',
        },
        icon: MoonIcon,
    },
    dark: {
        name: 'dark',
        layout: {
            heroClass: 'theme-dark',
            backgroundColor:
                'bg-neutral-dark-teal',
            borderColor: 'border-neutral-light-teal',
            textColor:
                'text-neutral-very-light-white'
        },
        card: {
            backgroundColor:
                'bg-neutral-very-dark-teal',
        },
        icon: IconSun,
    },
};