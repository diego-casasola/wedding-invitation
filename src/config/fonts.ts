import localFont from 'next/font/local'

export const philosopher = localFont({
    src: [
        {
            path: './Philosopher-Regular.ttf',
            weight: '400',
            style: 'normal'
        },
        {
            path: './Philosopher-Bold.ttf',
            weight: '700',
            style: 'normal'
        },
        {
            path: './Philosopher-Italic.ttf',
            weight: '400',
            style: 'italic'
        },
        {
            path: './Philosopher-BoldItalic.ttf',
            weight: '700',
            style: 'italic'
        }
    ]
})

export const weatherSunday = localFont({
    src: [
        {
            path: './Weather Sunday - Personal Use.otf',
            weight: '400',
            style: 'normal'
        }
    ]
})