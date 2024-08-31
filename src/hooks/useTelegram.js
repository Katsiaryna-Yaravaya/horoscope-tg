const TELEGRAM = window.Telegram.WebApp

export function useTelegram() {

    const visibleBackButton = (onClick) => {
        if (TELEGRAM.BackButton.isVisible) {
            TELEGRAM.BackButton.hide()
        } else {
            TELEGRAM.BackButton.show()
            TELEGRAM.BackButton.onClick(onClick)
        }
    }

    return {
        visibleBackButton,
        TELEGRAM,
    }
}
